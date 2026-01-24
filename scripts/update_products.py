#!/usr/bin/env python3
"""Scans the products folder and updates products.json with all image files."""

import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
PRODUCTS_DIR = PROJECT_ROOT / "products"
VALID_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}


def get_product_images() -> list[str]:
    """Returns list of image filenames in the products folder."""
    images = []
    for file in PRODUCTS_DIR.iterdir():
        if file.is_file() and file.suffix.lower() in VALID_EXTENSIONS:
            images.append(file.name)
    return sorted(images)


def main():
    images = get_product_images()
    output = {"products": images}
    
    output_path = PRODUCTS_DIR / "products.json"
    output_path.write_text(json.dumps(output, indent=2) + "\n")
    
    print(f"Updated products.json with {len(images)} products:")
    for img in images:
        print(f"  - {img}")


if __name__ == "__main__":
    main()
