"""
Remove background from every frame using rembg.

Usage:
    python scripts/remove_bg.py [input_dir] [output_dir]

Defaults:
    input_dir  = frames
    output_dir = public/frames

Requirements:
    pip install rembg pillow

The script reads JPG/PNG files, removes the background with a segmentation model,
and writes numbered PNGs (0000.png, 0001.png, ...) with transparency preserved.
"""

import os
import sys
from PIL import Image
from rembg import remove


def main():
    input_dir = sys.argv[1] if len(sys.argv) > 1 else 'frames'
    output_dir = sys.argv[2] if len(sys.argv) > 2 else 'public/frames'

    os.makedirs(output_dir, exist_ok=True)

    files = [
        f for f in os.listdir(input_dir)
        if f.lower().endswith(('.jpg', '.jpeg', '.png'))
    ]
    files.sort(key=lambda name: int(''.join(filter(str.isdigit, os.path.splitext(name)[0])) or 0))

    if not files:
        print(f'No images found in {input_dir}')
        return

    print(f'Processing {len(files)} images from {input_dir} into {output_dir}...')

    for i, filename in enumerate(files):
        input_path = os.path.join(input_dir, filename)
        output_path = os.path.join(output_dir, f'{i:04d}.png')

        if os.path.exists(output_path):
            print(f'  [{i+1}/{len(files)}] SKIP {filename} -> {output_path} already exists')
            continue

        try:
            with Image.open(input_path) as img:
                # Convert to RGBA so the output always has an alpha channel
                if img.mode != 'RGBA':
                    img = img.convert('RGBA')
                output = remove(img)
                output.save(output_path, 'PNG')
                print(f'  [{i+1}/{len(files)}] OK {filename} -> {output_path}')
        except Exception as e:
            print(f'  [{i+1}/{len(files)}] ERROR {filename}: {e}')

    print('Done.')


if __name__ == '__main__':
    main()
