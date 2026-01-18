# Products Folder

This folder contains product images that will be automatically displayed on the website.

## How to Add Product Images

### Step 1: Add Your Images

1. Copy your product images into this folder (`/products`)
2. Supported formats: JPG, JPEG, PNG, WebP
3. Recommended image dimensions: At least 800x800 pixels
4. Keep file sizes reasonable (under 2MB each for faster loading)

### Step 2: Update products.json

After adding images, update the `products.json` file in this folder with the list of your image filenames.

Example `products.json`:

```json
{
  "products": [
    "chiffon-dupatta-red.jpg",
    "lycra-dupatta-blue.jpg",
    "cotton-dupatta-white.jpg",
    "designer-dupatta-golden.jpg",
    "embroidered-scarf-pink.jpg"
  ]
}
```

### Step 3: Naming Convention (Recommended)

For best results, name your files descriptively. The website will:

1. **Auto-detect categories** based on keywords in the filename:
   - `chiffon` → Chiffon Dupatta
   - `lycra` → Lycra Dupatta
   - `cotton` → Cotton Dupatta
   - `chanderi` → Chanderi Dupatta
   - `net` → Net Dupatta
   - `embroidered` → Embroidered Dupatta
   - `designer` → Designer Dupatta
   - `scarf` → Scarf

2. **Format the display name** from the filename:
   - `chiffon-dupatta-red.jpg` → "Chiffon Dupatta Red"
   - `designer_blue_scarf.jpg` → "Designer Blue Scarf"

### Example Filenames

Good examples:
- `chiffon-dupatta-red-floral.jpg`
- `lycra-dupatta-navy-blue.jpg`
- `cotton-dupatta-printed-green.jpg`
- `designer-dupatta-golden-embroidery.jpg`
- `embroidered-scarf-pink-border.jpg`

## Quick Start

1. Drop your images here
2. Create/update `products.json` with the list of filenames
3. Commit and push to GitHub
4. Your products will appear automatically on the website!

## Need Help?

If you need to customize categories or product names further, you can edit the JavaScript in `/js/main.js`.
