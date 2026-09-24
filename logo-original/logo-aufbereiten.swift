// Bereitet das AVE-Logo auf: weißer Hintergrund → transparent, Schrift je nach Variante.
// Aufruf: swift logo.swift <quelle.jpg> <zielordner>
import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
let src = URL(fileURLWithPath: args[1]), out = URL(fileURLWithPath: args[2])

guard let isrc = CGImageSourceCreateWithURL(src as CFURL, nil),
      let img = CGImageSourceCreateImageAtIndex(isrc, 0, nil) else { fatalError("Bild nicht lesbar") }
let W = img.width, H = img.height
let cs = CGColorSpaceCreateDeviceRGB()
var px = [UInt8](repeating: 0, count: W * H * 4)
let ctx = CGContext(data: &px, width: W, height: H, bitsPerComponent: 8, bytesPerRow: W * 4, space: cs,
                    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
ctx.draw(img, in: CGRect(x: 0, y: 0, width: W, height: H))

enum Text { case schwarz, weiss, weg }

// Liefert ein neues RGBA-Bild (nicht vormultipliziert → danach vormultiplizieren).
func variante(_ text: Text) -> [UInt8] {
    var o = [UInt8](repeating: 0, count: W * H * 4)
    for i in stride(from: 0, to: W * H * 4, by: 4) {
        let r = Double(px[i]), g = Double(px[i+1]), b = Double(px[i+2])
        // Farbe-zu-Alpha gegen Weiß
        let abstand = max((255 - r), (255 - g), (255 - b)) / 255
        let a = min(1, abstand / 0.35) // Farbflächen voll deckend, nur Kanten weich
        if a < 0.02 { continue }
        var cr = (r - 255 * (1 - a)) / a, cg = (g - 255 * (1 - a)) / a, cb = (b - 255 * (1 - a)) / a
        cr = min(max(cr, 0), 255); cg = min(max(cg, 0), 255); cb = min(max(cb, 0), 255)
        let neutral = (max(cr, cg, cb) - min(cr, cg, cb)) < 40 // Schrift und ihre grauen Kanten (ohne Farbton)
        var alpha = a
        if neutral {
            switch text {
            case .schwarz: break
            case .weiss: cr = 255; cg = 255; cb = 255
            case .weg: alpha = 0
            }
        }
        o[i] = UInt8(cr * alpha); o[i+1] = UInt8(cg * alpha); o[i+2] = UInt8(cb * alpha); o[i+3] = UInt8(alpha * 255)
    }
    return o
}

func bild(_ data: [UInt8]) -> CGImage {
    var d = data
    let c = CGContext(data: &d, width: W, height: H, bitsPerComponent: 8, bytesPerRow: W * 4, space: cs,
                      bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
    return c.makeImage()!
}

func speichern(_ img: CGImage, _ name: String, breite: Int, hoehe: Int, hintergrund: CGColor? = nil, rand: Double = 0, zuschnitt: CGRect? = nil) {
    let c = CGContext(data: nil, width: breite, height: hoehe, bitsPerComponent: 8, bytesPerRow: 0, space: cs,
                      bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
    c.interpolationQuality = .high
    if let bg = hintergrund { c.setFillColor(bg); c.fill(CGRect(x: 0, y: 0, width: breite, height: hoehe)) }
    let quelle = zuschnitt.flatMap { img.cropping(to: $0) } ?? img
    let innenB = Double(breite) * (1 - 2 * rand), innenH = Double(hoehe) * (1 - 2 * rand)
    let s = min(innenB / Double(quelle.width), innenH / Double(quelle.height))
    let w = Double(quelle.width) * s, h = Double(quelle.height) * s
    c.draw(quelle, in: CGRect(x: (Double(breite) - w) / 2, y: (Double(hoehe) - h) / 2, width: w, height: h))
    let url = out.appendingPathComponent(name)
    let dest = CGImageDestinationCreateWithURL(url as CFURL, UTType.png.identifier as CFString, 1, nil)!
    CGImageDestinationAddImage(dest, c.makeImage()!, nil)
    CGImageDestinationFinalize(dest)
    print("geschrieben:", name, breite, "x", hoehe)
}

// Begrenzungsrahmen der sichtbaren Pixel (für den Adler ohne Schrift)
func rahmen(_ data: [UInt8]) -> CGRect {
    var x0 = W, y0 = H, x1 = 0, y1 = 0
    for y in 0..<H { for x in 0..<W where data[(y * W + x) * 4 + 3] > 20 {
        x0 = min(x0, x); x1 = max(x1, x); y0 = min(y0, y); y1 = max(y1, y) } }
    return CGRect(x: x0, y: y0, width: x1 - x0 + 1, height: y1 - y0 + 1)
}

let anthrazit = CGColor(red: 0x1C/255.0, green: 0x1F/255.0, blue: 0x24/255.0, alpha: 1)
let hoehe = Int((480.0 * Double(H) / Double(W)).rounded())

let dunkel = bild(variante(.weiss))
speichern(dunkel, "logo.png", breite: 480, hoehe: hoehe)                 // für Kopf-/Fußzeile (dunkler Grund)
speichern(dunkel, "vorschau-dunkel.png", breite: 480, hoehe: hoehe, hintergrund: anthrazit)
speichern(bild(variante(.schwarz)), "logo-hell.png", breite: 480, hoehe: hoehe) // für hellen Grund / Teilen-Vorschau

let adlerDaten = variante(.weg)
let adler = bild(adlerDaten)
let box = rahmen(adlerDaten)
speichern(adler, "icon-192.png", breite: 192, hoehe: 192, hintergrund: anthrazit, rand: 0.12, zuschnitt: box)
speichern(adler, "icon-512.png", breite: 512, hoehe: 512, hintergrund: anthrazit, rand: 0.12, zuschnitt: box)
speichern(adler, "icon-maskable-512.png", breite: 512, hoehe: 512, hintergrund: anthrazit, rand: 0.22, zuschnitt: box)
speichern(adler, "apple-touch-icon.png", breite: 180, hoehe: 180, hintergrund: anthrazit, rand: 0.12, zuschnitt: box)
speichern(adler, "favicon.png", breite: 128, hoehe: 128, hintergrund: anthrazit, rand: 0.08, zuschnitt: box)
