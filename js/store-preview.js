// Store Preview Module for Homepage
class StorePreview {
    constructor() {
        this.products = [];
        this.init();
    }

    async init() {
        try {
            await this.loadProducts();
            this.renderStorePreview();
        } catch (error) {
            console.error('Failed to initialize store preview:', error);
        }
    }

    async loadProducts() {
        try {
            const response = await fetch('data/products.json');
            const data = await response.json();
            
            // Filter products with "new" badge and sort by last_update
            this.products = data.products
                .filter(product => product.badges.includes('new'))
                .sort((a, b) => new Date(b.last_update) - new Date(a.last_update))
                .slice(0, 4); // Show only 4 newest products
        } catch (error) {
            console.error('Failed to load products:', error);
            this.products = [];
        }
    }

    renderStorePreview() {
        const container = document.getElementById('store-preview-grid');
        if (!container) return;

        if (this.products.length === 0) {
            container.innerHTML = `
                <div class="store-preview-empty">
                    <p>Товары загружаются...</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.products.map(product => 
            this.renderStorePreviewItem(product)
        ).join('');
    }

    renderStorePreviewItem(product) {
        const defaultLicense = product.license_options.find(opt => opt.type === product.default_license);
        const price = this.formatPrice(defaultLicense.price_usd);
        const badges = this.renderBadges(product.badges);

        return `
            <div class="store-preview-item" onclick="window.location.href='store/product.html?id=${product.id}'">
                <div class="store-preview-image">
                    <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
                    ${badges}
                </div>
                <div class="store-preview-info">
                    <h3 class="store-preview-title">${product.title}</h3>
                    <p class="store-preview-subtitle">${product.subtitle}</p>
                    <div class="store-preview-price">
                        <span class="store-preview-price-usd">${price.usd}</span>
                        <span class="store-preview-price-uzs">${price.uzs}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderBadges(badges) {
        if (!badges || badges.length === 0) return '';
        
        const badgeLabels = {
            'new': 'Новинка',
            'best': 'Популярное',
            'free': 'Бесплатно'
        };

        return badges.map(badge => 
            `<span class="store-preview-badge store-preview-badge-${badge}">${badgeLabels[badge] || badge}</span>`
        ).join('');
    }

    formatPrice(priceUsd) {
        const usd = `$${priceUsd}`;
        let uzs = '';
        
        // Simple conversion (in real app, would use exchange rates)
        const uzsAmount = Math.round(priceUsd * 12500);
        uzs = `≈${uzsAmount.toLocaleString('ru-RU')} UZS`;

        return { usd, uzs };
    }
}

// Initialize store preview when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on homepage
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        window.storePreview = new StorePreview();
    }
}); 