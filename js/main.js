/**
 * Marudhara Fashions - Main JavaScript
 */

// =============================================
// Mobile Menu Toggle
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// =============================================
// Product Categories Mapping
// =============================================
const productCategories = {
    'chiffon': 'Chiffon Dupatta',
    'lycra': 'Lycra Dupatta',
    'cotton': 'Cotton Dupatta',
    'chanderi': 'Chanderi Dupatta',
    'net': 'Net Dupatta',
    'embroidered': 'Embroidered Dupatta',
    'designer': 'Designer Dupatta',
    'scarf': 'Scarf',
    'dupatta': 'Dupatta'
};

/**
 * Determine category from filename
 * @param {string} filename - The image filename
 * @returns {string} - The category name
 */
function getCategoryFromFilename(filename) {
    const lowerFilename = filename.toLowerCase();

    for (const [key, value] of Object.entries(productCategories)) {
        if (lowerFilename.includes(key)) {
            return value;
        }
    }

    return 'Dupatta'; // Default category
}

/**
 * Format filename into product name
 * @param {string} filename - The image filename
 * @returns {string} - Formatted product name
 */
function formatProductName(filename) {
    // Remove extension
    let name = filename.replace(/\.[^/.]+$/, '');

    // Replace hyphens, underscores with spaces
    name = name.replace(/[-_]/g, ' ');

    // Capitalize first letter of each word
    name = name.replace(/\b\w/g, char => char.toUpperCase());

    return name;
}

// =============================================
// Auto-load Product Images
// =============================================
/**
 * Load product images from the products folder
 */
async function loadProductImages() {
    const productsGrid = document.getElementById('productsGrid');

    if (!productsGrid) return;

    try {
        // GitHub Pages static file listing workaround
        // We'll try to load a products.json file if it exists
        // Otherwise, we'll show instructions for manual setup

        const response = await fetch('products/products.json');

        if (response.ok) {
            const data = await response.json();
            displayProducts(data.products);
        } else {
            // If no products.json, keep the default message
            console.log('No products.json found. Add images to /products folder and create products.json');
        }
    } catch (error) {
        console.log('Products will be loaded when products.json is available');
    }
}

/**
 * Display products in the grid
 * @param {Array} products - Array of product image filenames
 */
function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');

    if (!products || products.length === 0) {
        return;
    }

    // Remove the "no products" message
    productsGrid.innerHTML = '';

    // Create product cards
    products.forEach(productFile => {
        const productCard = createProductCard(productFile);
        productsGrid.appendChild(productCard);
    });
}

/**
 * Create a product card element
 * @param {string} productFile - The product image filename
 * @returns {HTMLElement} - The product card element
 */
function createProductCard(productFile) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const productName = formatProductName(productFile);
    const category = getCategoryFromFilename(productFile);
    const imagePath = `products/${productFile}`;

    card.innerHTML = `
        <img src="${imagePath}" alt="${productName}" class="product-image" loading="lazy">
        <div class="product-info">
            <h3 class="product-name">${productName}</h3>
            <span class="product-category">${category}</span>
        </div>
    `;

    return card;
}

// Load products when DOM is ready
document.addEventListener('DOMContentLoaded', loadProductImages);

// =============================================
// Contact Form Handling
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                mobile: document.getElementById('mobile').value,
                company: document.getElementById('company').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Create WhatsApp message
            const whatsappMessage = createWhatsAppMessage(formData);

            // Open WhatsApp with pre-filled message
            const whatsappUrl = `https://wa.me/919157541409?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');

            // Show success message
            showFormSuccess();
        });
    }
});

/**
 * Create WhatsApp message from form data
 * @param {Object} data - Form data
 * @returns {string} - Formatted WhatsApp message
 */
function createWhatsAppMessage(data) {
    let message = `*New Inquiry from Website*\n\n`;
    message += `*Name:* ${data.name}\n`;
    message += `*Mobile:* ${data.mobile}\n`;

    if (data.company) {
        message += `*Company:* ${data.company}\n`;
    }

    if (data.city) {
        message += `*City:* ${data.city}\n`;
    }

    if (data.email) {
        message += `*Email:* ${data.email}\n`;
    }

    if (data.message) {
        message += `\n*Message:*\n${data.message}`;
    }

    return message;
}

/**
 * Show success message after form submission
 */
function showFormSuccess() {
    const form = document.getElementById('contactForm');
    const successMessage = document.createElement('div');

    successMessage.style.cssText = `
        background-color: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
        font-size: 1.1rem;
    `;

    successMessage.textContent = 'Opening WhatsApp... Please send your message!';

    form.appendChild(successMessage);

    // Reset form
    form.reset();

    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// =============================================
// Smooth Scroll Enhancement
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// Scroll-based Header Effect
// =============================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');

    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});
