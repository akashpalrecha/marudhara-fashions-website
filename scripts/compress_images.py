#!/usr/bin/env python3
"""
Image compression script for website optimization.
- Resizes images to max 800px width (maintaining aspect ratio)
- Converts PNG to JPEG
- Uses JPEG quality of 85%
- Outputs to a new folder

Usage:
  uv run scripts/compress_images.py                    # Use defaults (products -> products-compressed)
  uv run scripts/compress_images.py --input uploads --output products  # Custom directories
"""

import argparse
from pathlib import Path
from PIL import Image

# Configuration
MAX_WIDTH = 800
JPEG_QUALITY = 85
PROJECT_ROOT = Path(__file__).parent.parent

# Supported image extensions
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}


def optimize_image(input_path: Path, output_dir: Path) -> dict:
    """Optimize a single image and return stats."""
    original_size = input_path.stat().st_size

    with Image.open(input_path) as img:
        original_dimensions = img.size

        # Convert RGBA to RGB (for PNG with transparency)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        # Resize if width exceeds MAX_WIDTH
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            new_height = int(img.height * ratio)
            img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)

        new_dimensions = img.size

        # Output as JPEG
        output_name = input_path.stem + ".jpg"
        output_path = output_dir / output_name

        img.save(output_path, "JPEG", quality=JPEG_QUALITY, optimize=True)

    new_size = output_path.stat().st_size

    return {
        "name": input_path.name,
        "original_size": original_size,
        "new_size": new_size,
        "original_dimensions": original_dimensions,
        "new_dimensions": new_dimensions,
        "reduction": (1 - new_size / original_size) * 100
    }


def format_size(bytes_size: int) -> str:
    """Format bytes to human readable string."""
    if bytes_size < 1024:
        return f"{bytes_size} B"
    elif bytes_size < 1024 * 1024:
        return f"{bytes_size / 1024:.1f} KB"
    else:
        return f"{bytes_size / (1024 * 1024):.2f} MB"


def main():
    parser = argparse.ArgumentParser(description="Compress and optimize images for web")
    parser.add_argument(
        "--input", "-i",
        type=Path,
        default=PROJECT_ROOT / "products",
        help="Input directory containing images (default: products)"
    )
    parser.add_argument(
        "--output", "-o",
        type=Path,
        default=PROJECT_ROOT / "products-compressed",
        help="Output directory for compressed images (default: products-compressed)"
    )
    args = parser.parse_args()

    # Resolve paths (handle both relative and absolute)
    input_dir = args.input if args.input.is_absolute() else PROJECT_ROOT / args.input
    output_dir = args.output if args.output.is_absolute() else PROJECT_ROOT / args.output

    # Create output directory
    output_dir.mkdir(exist_ok=True)

    # Find all images
    image_files = [
        f for f in input_dir.iterdir()
        if f.is_file() and f.suffix.lower() in IMAGE_EXTENSIONS
    ]

    if not image_files:
        print("No images found!")
        return

    print(f"Found {len(image_files)} images to optimize\n")
    print("-" * 80)

    total_original = 0
    total_new = 0
    results = []

    for img_path in sorted(image_files):
        try:
            stats = optimize_image(img_path, output_dir)
            results.append(stats)
            total_original += stats["original_size"]
            total_new += stats["new_size"]

            print(f"{stats['name']}")
            print(f"  Size: {format_size(stats['original_size'])} -> {format_size(stats['new_size'])} ({stats['reduction']:.1f}% reduction)")
            print(f"  Dimensions: {stats['original_dimensions'][0]}x{stats['original_dimensions'][1]} -> {stats['new_dimensions'][0]}x{stats['new_dimensions'][1]}")
            print()
        except Exception as e:
            print(f"Error processing {img_path.name}: {e}\n")

    print("-" * 80)
    print(f"\nSUMMARY")
    print(f"  Images processed: {len(results)}")
    print(f"  Total original size: {format_size(total_original)}")
    print(f"  Total new size: {format_size(total_new)}")
    print(f"  Total reduction: {(1 - total_new / total_original) * 100:.1f}%")
    print(f"\n  Output folder: {output_dir}")


if __name__ == "__main__":
    main()
