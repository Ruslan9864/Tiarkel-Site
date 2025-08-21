// Store Module

// Определяем базовый путь для GitHub Pages
const BASE_PATH = (() => {
    const path = window.location.pathname;
    if (path.includes('/Tiarkel-Site/')) {
        return '/Tiarkel-Site/';
    }
    return './';
})();

class Store {
    constructor() {
        this.products = [];
        this.categories = [];
        this.compatibilityTags = [];
        this.exchangeRates = null;
        this.currentCurrency = 'USD';
        this.filters = {
            category: [],
            compatibility: [],
            priceRange: { min: 0, max: 1000 },
            search: '',
            sortBy: 'popular'
        };
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.setupEventListeners();
            this.renderStore();
        } catch (error) {
            console.error('Failed to initialize store:', error);
        }
    }

    async loadData() {
        try {
            // Load products data
            const productsResponse = await fetch(`${BASE_PATH}data/products.json`);
            const productsData = await productsResponse.json();
            this.products = productsData.products;
            this.categories = productsData.categories;
            this.compatibilityTags = productsData.compatibility_tags;

            // Load exchange rates
            const ratesResponse = await fetch(`${BASE_PATH}data/exchange-rates.json`);
            this.exchangeRates = await ratesResponse.json();

            // Track analytics
            this.trackEvent('view_item_list', {
                item_list_id: 'store_catalog',
                item_list_name: 'Store Catalog'
            });
        } catch (error) {
            console.error('Failed to load store data:', error);
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('store-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value;
                this.renderStore();
                this.trackEvent('search_submit', {
                    search_term: e.target.value
                });
            });
        }

        // Category filters
        const categoryFilters = document.querySelectorAll('.category-filter');
        categoryFilters.forEach(filter => {
            filter.addEventListener('change', (e) => {
                const category = e.target.value;
                if (e.target.checked) {
                    this.filters.category.push(category);
                } else {
                    this.filters.category = this.filters.category.filter(c => c !== category);
                }
                this.renderStore();
                this.trackEvent('filter_apply', {
                    filter_type: 'category',
                    filter_value: category
                });
            });
        });

        // Compatibility filters
        const compatibilityFilters = document.querySelectorAll('.compatibility-filter');
        compatibilityFilters.forEach(filter => {
            filter.addEventListener('change', (e) => {
                const compatibility = e.target.value;
                if (e.target.checked) {
                    this.filters.compatibility.push(compatibility);
                } else {
                    this.filters.compatibility = this.filters.compatibility.filter(c => c !== compatibility);
                }
                this.renderStore();
                this.trackEvent('filter_apply', {
                    filter_type: 'compatibility',
                    filter_value: compatibility
                });
            });
        });

        // Price range filter
        const priceRange = document.getElementById('price-range');
        if (priceRange) {
            priceRange.addEventListener('input', (e) => {
                this.filters.priceRange.max = parseInt(e.target.value);
                this.renderStore();
            });
        }

        // Sort functionality
        const sortSelect = document.getElementById('store-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.filters.sortBy = e.target.value;
                this.renderStore();
            });
        }

        // Currency toggle
        const currencyToggle = document.getElementById('currency-toggle');
        if (currencyToggle) {
            currencyToggle.addEventListener('change', (e) => {
                this.currentCurrency = e.target.checked ? 'UZS' : 'USD';
                this.renderStore();
                this.trackEvent('currency_toggle', {
                    currency: this.currentCurrency
                });
            });
        }
    }

    renderStore() {
        const filteredProducts = this.getFilteredProducts();
        const storeContainer = document.getElementById('store-products');
        
        if (!storeContainer) return;

        if (filteredProducts.length === 0) {
            storeContainer.innerHTML = this.renderEmptyState();
            return;
        }

        storeContainer.innerHTML = filteredProducts.map(product => 
            this.renderProductCard(product)
        ).join('');
    }

    getFilteredProducts() {
        let filtered = [...this.products];

        // Search filter
        if (this.filters.search) {
            const searchTerm = this.filters.search.toLowerCase();
            filtered = filtered.filter(product => 
                product.title.toLowerCase().includes(searchTerm) ||
                product.subtitle.toLowerCase().includes(searchTerm) ||
                product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        // Category filter
        if (this.filters.category.length > 0) {
            filtered = filtered.filter(product => 
                this.filters.category.includes(product.category)
            );
        }

        // Compatibility filter
        if (this.filters.compatibility.length > 0) {
            filtered = filtered.filter(product => 
                product.compatibility.some(comp => 
                    this.filters.compatibility.includes(comp)
                )
            );
        }

        // Price filter
        filtered = filtered.filter(product => {
            const minPrice = Math.min(...product.license_options.map(opt => opt.price_usd));
            return minPrice <= this.filters.priceRange.max;
        });

        // Sort
        filtered.sort((a, b) => {
            switch (this.filters.sortBy) {
                case 'new':
                    return new Date(b.last_update) - new Date(a.last_update);
                case 'price-low':
                    return Math.min(...a.license_options.map(opt => opt.price_usd)) - 
                           Math.min(...b.license_options.map(opt => opt.price_usd));
                case 'price-high':
                    return Math.min(...b.license_options.map(opt => opt.price_usd)) - 
                           Math.min(...a.license_options.map(opt => opt.price_usd));
                case 'popular':
                default:
                    return (b.badges.includes('best') ? 1 : 0) - (a.badges.includes('best') ? 1 : 0);
            }
        });

        return filtered;
    }

    renderProductCard(product) {
        const defaultLicense = product.license_options.find(opt => opt.type === product.default_license);
        const price = this.formatPrice(defaultLicense.price_usd);
        const badges = this.renderBadges(product.badges);
        const compatibility = this.renderCompatibility(product.compatibility);

        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
                    ${badges}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-subtitle">${product.subtitle}</p>
                    <div class="product-price">
                        <span class="price-usd">${price.usd}</span>
                        <span class="price-uzs">${price.uzs}</span>
                    </div>
                    <div class="product-compatibility">
                        ${compatibility}
                    </div>
                    <a href="store/product.html?id=${product.id}" class="btn-secondary">
                        Подробнее
                    </a>
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
            `<span class="badge badge-${badge}">${badgeLabels[badge] || badge}</span>`
        ).join('');
    }

    renderCompatibility(compatibility) {
        if (!compatibility || compatibility.length === 0) return '';
        
        return compatibility.map(comp => {
            const tag = this.compatibilityTags.find(t => t.id === comp);
            return tag ? `<span class="compatibility-tag" title="${tag.title}">${tag.title}</span>` : '';
        }).join('');
    }

    formatPrice(priceUsd) {
        const usd = `$${priceUsd}`;
        let uzs = '';
        
        if (this.exchangeRates && this.exchangeRates.rates.UZS) {
            const uzsAmount = Math.round(priceUsd * this.exchangeRates.rates.UZS);
            uzs = `≈${uzsAmount.toLocaleString('ru-RU')} UZS`;
        }

        return { usd, uzs };
    }

    renderEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>Товары не найдены</h3>
                <p>Попробуйте изменить фильтры или поисковый запрос</p>
                <button class="btn-primary" onclick="store.resetFilters()">
                    Сбросить фильтры
                </button>
            </div>
        `;
    }

    resetFilters() {
        this.filters = {
            category: [],
            compatibility: [],
            priceRange: { min: 0, max: 1000 },
            search: '',
            sortBy: 'popular'
        };
        
        // Reset form elements
        const searchInput = document.getElementById('store-search');
        if (searchInput) searchInput.value = '';
        
        const categoryFilters = document.querySelectorAll('.category-filter');
        categoryFilters.forEach(filter => filter.checked = false);
        
        const compatibilityFilters = document.querySelectorAll('.compatibility-filter');
        compatibilityFilters.forEach(filter => filter.checked = false);
        
        const priceRange = document.getElementById('price-range');
        if (priceRange) priceRange.value = 1000;
        
        const sortSelect = document.getElementById('store-sort');
        if (sortSelect) sortSelect.value = 'popular';
        
        this.renderStore();
    }

    trackEvent(eventName, parameters = {}) {
        // Google Analytics 4 event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        // Console log for debugging
        console.log('Store Event:', eventName, parameters);
    }

    // Product page methods
    async loadProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            console.error('Product not found:', productId);
            return null;
        }

        this.trackEvent('view_item', {
            item_id: product.id,
            item_name: product.title,
            item_category: product.category,
            price: product.license_options[0].price_usd,
            currency: 'USD'
        });

        return product;
    }

    renderProductPage(product) {
        const gallery = this.renderProductGallery(product);
        const licenseOptions = this.renderLicenseOptions(product);
        const compatibility = this.renderCompatibility(product.compatibility);
        const recommendations = this.getRecommendations(product);

        return {
            gallery,
            licenseOptions,
            compatibility,
            recommendations
        };
    }

    renderProductGallery(product) {
        return product.gallery.map((image, index) => `
            <div class="gallery-item">
                <img src="${image}" alt="${product.title} - изображение ${index + 1}" 
                     loading="${index === 0 ? 'eager' : 'lazy'}"
                     onclick="store.openLightbox(${index})">
            </div>
        `).join('');
    }

    renderLicenseOptions(product) {
        return product.license_options.map(option => {
            const price = this.formatPrice(option.price_usd);
            const isDefault = option.type === product.default_license;
            
            return `
                <label class="license-option ${isDefault ? 'selected' : ''}">
                    <input type="radio" name="license" value="${option.type}" 
                           ${isDefault ? 'checked' : ''} 
                           onchange="store.updatePrice('${product.id}', '${option.type}')">
                    <div class="license-info">
                        <h4>${this.getLicenseTitle(option.type)}</h4>
                        <p>${this.getLicenseDescription(option.type)}</p>
                        <div class="license-price">
                            <span class="price-usd">${price.usd}</span>
                            <span class="price-uzs">${price.uzs}</span>
                        </div>
                    </div>
                </label>
            `;
        }).join('');
    }

    getLicenseTitle(type) {
        const titles = {
            'personal': 'Personal',
            'commercial': 'Commercial',
            'extended': 'Extended'
        };
        return titles[type] || type;
    }

    getLicenseDescription(type) {
        const descriptions = {
            'personal': '1 пользователь, некоммерческое использование',
            'commercial': 'До 5 коммерческих проектов',
            'extended': 'Без ограничений, мультиклиент'
        };
        return descriptions[type] || '';
    }

    updatePrice(productId, licenseType) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const license = product.license_options.find(opt => opt.type === licenseType);
        if (!license) return;

        const price = this.formatPrice(license.price_usd);
        
        // Update price display
        const priceElement = document.querySelector('.product-price');
        if (priceElement) {
            priceElement.innerHTML = `
                <span class="price-usd">${price.usd}</span>
                <span class="price-uzs">${price.uzs}</span>
            `;
        }

        // Update checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.href = `${license.archive_url}?license=${licenseType}`;
        }

        this.trackEvent('license_select', {
            item_id: productId,
            license_type: licenseType,
            price: license.price_usd
        });
    }

    getRecommendations(currentProduct) {
        return this.products
            .filter(p => p.id !== currentProduct.id && 
                        (p.category === currentProduct.category || 
                         p.tags.some(tag => currentProduct.tags.includes(tag))))
            .slice(0, 4);
    }

    openLightbox(index) {
        // Implement lightbox functionality
        console.log('Open lightbox for image:', index);
    }
}

// Initialize store when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.store = new Store();
}); 