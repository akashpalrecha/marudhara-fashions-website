# Marudhara Fashions Website

A professional, mobile-friendly website for Marudhara Fashions - a Surat-based textile manufacturing company specializing in ladies dupattas and scarves.

## Features

- **Professional Design**: Clean, easy-to-navigate interface with good contrast and readability
- **Mobile Responsive**: Optimized for all devices - desktop, tablet, and mobile
- **SEO-Friendly**: Proper heading structure, meta tags, and semantic HTML
- **Auto-loading Products**: Just drop images in the `/products` folder and update a JSON file
- **WhatsApp Integration**: Direct contact via WhatsApp with pre-filled messages
- **Privacy Policy**: Simple privacy policy page included
- **GitHub Pages Ready**: Can be hosted directly from GitHub

## Live Demo

Once deployed to GitHub Pages, your website will be available at:
`https://[your-username].github.io/marudhara-fashions-website/`

## Quick Start

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to "Pages" section
4. Under "Source", select the branch `claude/textile-business-website-vAtoM` (or `main` if merged)
5. Click "Save"
6. Your site will be published in a few minutes!

### 2. Add Product Images

1. Add your product images to the `/products` folder
2. Update `/products/products.json` with the list of image filenames:

```json
{
  "products": [
    "chiffon-dupatta-red.jpg",
    "lycra-dupatta-blue.jpg",
    "cotton-dupatta-white.jpg"
  ]
}
```

3. Commit and push the changes
4. Images will automatically appear on the website!

See `/products/README.md` for detailed instructions on naming conventions and best practices.

## File Structure

```
marudhara-fashions-website/
├── index.html              # Main homepage
├── privacy-policy.html     # Privacy policy page
├── css/
│   └── style.css          # All styling
├── js/
│   └── main.js            # JavaScript functionality
├── products/
│   ├── README.md          # Instructions for adding products
│   └── products.json      # List of product images
└── README.md              # This file
```

## Customization

### Update Contact Information

Edit the contact details in `index.html`:
- Phone numbers
- Email address
- Physical address
- GST number
- Working hours

### Change Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #8B4513;
    --secondary-color: #D4AF37;
    --accent-color: #25D366;
    /* ... more variables */
}
```

### Modify Product Categories

Edit the category mapping in `js/main.js`:

```javascript
const productCategories = {
    'chiffon': 'Chiffon Dupatta',
    'lycra': 'Lycra Dupatta',
    // Add or modify categories here
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

The website follows basic accessibility guidelines:
- High contrast colors for readability
- Large, readable text (18px base)
- Keyboard navigation support
- Semantic HTML structure
- Alt text for images
- Focus indicators for interactive elements

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid)
- Vanilla JavaScript (No frameworks)
- GitHub Pages for hosting

## Support

For questions or issues:
- Email: sales@marudharafashions.com
- WhatsApp: +91 91575 41409

## License

Copyright © 2026 Marudhara Fashions. All rights reserved.
