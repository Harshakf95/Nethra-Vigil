import cairosvg
import os
from PIL import Image, ImageDraw, ImageFont
import math

def generate_favicon():
    # Ensure output directory exists
    os.makedirs('public', exist_ok=True)
    
    # Generate PNG in various sizes
    sizes = [16, 32, 48, 64, 128, 192, 256, 384, 512]
    
    # Generate SVG first
    with open('public/favicon.svg', 'r') as f:
        svg_content = f.read()
    
    # Generate PNGs from SVG
    for size in sizes:
        cairosvg.svg2png(
            bytestring=svg_content.encode('utf-8'),
            write_to=f'public/favicon-{size}.png',
            output_width=size,
            output_height=size
        )
    
    # Generate ICO file with multiple sizes (16x16, 32x32, 48x48, 64x64)
    ico_sizes = [16, 32, 48, 64]
    ico_files = [f'public/favicon-{size}.png' for size in ico_sizes]
    os.system(f'magick convert {" ".join(ico_files)} -colors 256 public/favicon.ico')
    
    # Generate Apple Touch Icon (180x180)
    os.system('magick convert public/favicon-180.png -background white -gravity center -extent 180x180 public/apple-touch-icon.png')
    
    # Generate Android Chrome Icons (192x192 and 512x512)
    os.system('magick convert public/favicon-192.png -background white -gravity center -extent 192x192 public/android-chrome-192x192.png')
    os.system('magick convert public/favicon-512.png -background white -gravity center -extent 512x512 public/android-chrome-512x512.png')
    
    # Generate manifest file
    with open('public/site.webmanifest', 'w') as f:
        f.write("""{
  "name": "Nethra Vigil",
  "short_name": "Nethra",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#1E40AF",
  "background_color": "#ffffff",
  "display": "standalone"
}""")
    
    # Generate browserconfig.xml for Windows 8/10/11
    with open('public/browserconfig.xml', 'w') as f:
        f.write("""<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>#1E40AF</TileColor>
    </tile>
  </msapplication>
</browserconfig>""")
    
    # Generate MS Tile (150x150)
    os.system('magick convert public/favicon-150.png -background white -gravity center -extent 150x150 public/mstile-150x150.png')
    
    # Clean up temporary files
    for size in sizes:
        try:
            os.remove(f'public/favicon-{size}.png')
        except FileNotFoundError:
            pass

if __name__ == '__main__':
    generate_favicon()
