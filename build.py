#!/usr/bin/env python3
"""
Build script for Neko.js
Converts ICO sprites to base64-encoded PNG and bundles with JavaScript
"""

import os
import base64
import sys
from pathlib import Path

def convert_ico_to_base64_png(ico_path):
    """
    Convert ICO file to base64-encoded PNG data URI
    Uses PIL/Pillow if available, otherwise embeds ICO directly
    """
    try:
        from PIL import Image
        import io

        # Load ICO and convert to PNG
        img = Image.open(ico_path)

        # Convert to RGBA if not already
        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        # Save as PNG to bytes
        png_io = io.BytesIO()
        img.save(png_io, format='PNG')
        png_data = png_io.getvalue()

        # Encode as base64
        b64_data = base64.b64encode(png_data).decode('ascii')
        return f'data:image/png;base64,{b64_data}'

    except ImportError:
        # Fallback: embed ICO directly (browsers support ICO)
        print(f"Warning: PIL/Pillow not available, embedding ICO directly for {ico_path}")
        with open(ico_path, 'rb') as f:
            ico_data = f.read()
        b64_data = base64.b64encode(ico_data).decode('ascii')
        return f'data:image/x-icon;base64,{b64_data}'

def build():
    """Main build function"""
    script_dir = Path(__file__).parent
    res_dir = script_dir / 'nkosrc4' / 'Neko98' / 'Res'
    src_dir = script_dir / 'src'
    docs_dir = script_dir / 'docs'

    # Create docs directory
    docs_dir.mkdir(exist_ok=True)

    # Sprite files in the correct order (matching animation table)
    sprite_files = [
        'Awake.ico',      # 0: Awake
        'Up1.ico',        # 1: Up frame 1
        'Up2.ico',        # 2: Up frame 2
        'Upright1.ico',   # 3: Up-right frame 1 (repurposed for down)
        'Upright2.ico',   # 4: Up-right frame 2 (repurposed for down)
        'left1.ico',      # 5: Left frame 1
        'left2.ico',      # 6: Left frame 2
        'Right1.ico',     # 7: Right frame 1
        'right2.ico',     # 8: Right frame 2
        'wash2.ico',      # 9: Wash
        'scratch1.ico',   # 10: Scratch frame 1
        'scratch2.ico',   # 11: Scratch frame 2
        'yawn2.ico',      # 12: Yawn frame 1
        'yawn3.ico',      # 13: Yawn frame 2
        'sleep1.ico',     # 14: Sleep frame 1
        'sleep2.ico',     # 15: Sleep frame 2
        'upclaw1.ico',    # 16: Up claw frame 1
        'upclaw2.ico',    # 17: Up claw frame 2
        'Rightclaw2.ico', # 18: Right claw frame 1
        'rightclaw1.ico', # 19: Right claw frame 2
        'leftclaw1.ico',  # 20: Left claw frame 1
        'leftclaw2.ico',  # 21: Left claw frame 2
        'downright1.ico', # 22: Down claw frame 1 (repurposed)
        'downright2.ico', # 23: Down claw frame 2 (repurposed)
    ]

    print('Converting sprites to base64...')
    sprites_b64 = []

    for sprite_file in sprite_files:
        sprite_path = res_dir / sprite_file
        if not sprite_path.exists():
            print(f'Warning: {sprite_file} not found, skipping')
            sprites_b64.append('')
            continue

        print(f'  Converting {sprite_file}...')
        b64_uri = convert_ico_to_base64_png(sprite_path)
        sprites_b64.append(b64_uri)

    print(f'Converted {len([s for s in sprites_b64 if s])} sprites')

    # Read JavaScript source
    print('Reading JavaScript source...')
    js_source = (src_dir / 'neko.js').read_text()

    # Create bundled output
    print('Creating bundle...')
    output = []
    output.append('/**')
    output.append(' * Neko.js - Bundled version')
    output.append(' * ')
    output.append(' * Based on Neko98 by David Harvey (1998)')
    output.append(' * Original Neko by Masayuki Koba')
    output.append(' * ')
    output.append(' * This JavaScript implementation created by AI (Claude) from original C++ source')
    output.append(' * Licensed under GPL v3 (see LICENSE.md)')
    output.append(' */')
    output.append('')
    output.append('(function() {')
    output.append('    "use strict";')
    output.append('')
    output.append('    // Embedded sprite data (base64-encoded)')
    output.append('    const NEKO_SPRITES = [')

    for i, sprite_data in enumerate(sprites_b64):
        comma = ',' if i < len(sprites_b64) - 1 else ''
        if sprite_data:
            output.append(f'        "{sprite_data}"{comma}')
        else:
            output.append(f'        ""{comma}')

    output.append('    ];')
    output.append('')

    # Extract the main code (remove IIFE wrapper and auto-start)
    lines = js_source.split('\n')
    in_code = False
    code_lines = []

    for line in lines:
        if line.strip().startswith('(function()'):
            in_code = True
            continue
        elif line.strip() == "})();":
            in_code = False
            continue
        elif in_code:
            # Skip the 'use strict' since we already added it
            if line.strip() == "'use strict';" or line.strip() == '"use strict";':
                continue
            code_lines.append(line)

    # Add the code
    output.extend(code_lines)

    # Add initialization code
    output.append('')
    output.append('    // Auto-initialize function')
    output.append('    window.createNeko = function(options) {')
    output.append('        const neko = new Neko(options);')
    output.append('        neko.setSprites(NEKO_SPRITES);')
    output.append('        neko.start();')
    output.append('        return neko;')
    output.append('    };')
    output.append('')
    output.append('    // Auto-start if script has data-autostart attribute')
    output.append('    if (document.currentScript && document.currentScript.hasAttribute("data-autostart")) {')
    output.append('        if (document.readyState === "loading") {')
    output.append('            document.addEventListener("DOMContentLoaded", function() {')
    output.append('                window.neko = createNeko();')
    output.append('            });')
    output.append('        } else {')
    output.append('            window.neko = createNeko();')
    output.append('        }')
    output.append('    }')
    output.append('})();')

    # Write output
    output_path = docs_dir / 'neko.js'
    print(f'Writing to {output_path}...')
    output_path.write_text('\n'.join(output))

    # Get file size
    size_kb = output_path.stat().st_size / 1024
    print(f'Done! Output size: {size_kb:.1f} KB')
    print(f'Output written to: {output_path}')

if __name__ == '__main__':
    try:
        build()
    except Exception as e:
        print(f'Error: {e}', file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)
