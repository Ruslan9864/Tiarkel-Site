// Services Page Functionality
class ServicesPage {
    constructor() {
        this.portfolioData = this.getPortfolioData();
        this.serviceData = this.getServiceData();
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeAnalytics();
        // Form tracking is now handled by FormsManager
        // this.initializeFormTracking();
    }

    getPortfolioData() {
        return {
            branding1: {
                title: 'Кофейня "Утро"',
                category: 'Брендинг',
                description: 'Полный брендинг для кофейни: логотип, фирменный стиль, упаковка, меню',
                image: 'images/service-branding-1.webp',
                details: [
                    'Логотип с элементами кофе и утра',
                    'Фирменные цвета: тёплые коричневые тона',
                    'Упаковка для кофе и выпечки',
                    'Дизайн меню и визиток'
                ]
            },
            branding2: {
                title: 'Салон "Красота"',
                category: 'Брендинг',
                description: 'Элегантный брендинг для салона красоты с акцентом на женственность',
                image: 'images/service-branding-2.webp',
                details: [
                    'Логотип с цветочными элементами',
                    'Фирменный стиль в пастельных тонах',
                    'Дизайн визиток и буклетов',
                    'Оформление салона'
                ]
            },
            branding3: {
                title: 'IT-стартап "TechFlow"',
                category: 'Брендинг',
                description: 'Современный брендинг для IT-компании с технологичным подходом',
                image: 'images/service-branding-3.webp',
                details: [
                    'Логотип с технологичными элементами',
                    'Фирменный стиль в синих тонах',
                    'Презентационные материалы',
                    'Веб-дизайн'
                ]
            },
            smm1: {
                title: 'Косметика "Beauty"',
                category: 'SMM-дизайн',
                description: 'Визуал для Instagram косметического бренда',
                image: 'images/service-smm-1.webp',
                details: [
                    'Набор постов для Instagram',
                    'Сторис и карусели',
                    'Рекламные баннеры',
                    'Анимированные элементы'
                ]
            },
            smm2: {
                title: 'E-com "ShopStyle"',
                category: 'SMM-дизайн',
                description: 'Рекламные материалы для интернет-магазина',
                image: 'images/service-smm-2.webp',
                details: [
                    'Баннеры для соцсетей',
                    'Карточки товаров',
                    'Рекламные креативы',
                    'Email-рассылки'
                ]
            },
            smm3: {
                title: 'Ресторан "Вкусно"',
                category: 'SMM-дизайн',
                description: 'Визуал для ресторана с акцентом на еду',
                image: 'images/service-smm-3.webp',
                details: [
                    'Фотографии блюд',
                    'Посты о событиях',
                    'Сторис с рецептами',
                    'Промо-материалы'
                ]
            },
            video1: {
                title: 'Анимация логотипа',
                category: 'Видео',
                description: 'Анимированный логотип для бренда',
                image: 'images/service-video-1.webp',
                details: [
                    'Motion-дизайн логотипа',
                    'Различные варианты анимации',
                    'Форматы для соцсетей',
                    'Версии для веб-сайта'
                ]
            },
            video2: {
                title: 'Reels для бренда',
                category: 'Видео',
                description: 'Короткие видео для Instagram Reels',
                image: 'images/service-video-2.webp',
                details: [
                    'Серия Reels для бренда',
                    'Трендовые эффекты',
                    'Музыкальное сопровождение',
                    'Оптимизация под алгоритмы'
                ]
            },
            video3: {
                title: 'Motion-графика',
                category: 'Видео',
                description: 'Анимированная графика для презентаций',
                image: 'images/service-video-3.webp',
                details: [
                    'Анимированные элементы',
                    'Переходы и эффекты',
                    'Типографика в движении',
                    'Инфографика'
                ]
            },
            print1: {
                title: 'Визитки и буклеты',
                category: 'Полиграфия',
                description: 'Печатные материалы для компании',
                image: 'images/service-print-1.webp',
                details: [
                    'Дизайн визиток',
                    'Информационные буклеты',
                    'Подготовка к печати',
                    'Различные форматы'
                ]
            },
            print2: {
                title: 'Наружная реклама',
                category: 'Полиграфия',
                description: 'Баннеры и вывески для наружной рекламы',
                image: 'images/service-print-2.webp',
                details: [
                    'Дизайн баннеров',
                    'Вывески и указатели',
                    'Рекламные щиты',
                    'Световые короба'
                ]
            },
            print3: {
                title: 'Упаковка товаров',
                category: 'Полиграфия',
                description: 'Дизайн упаковки для различных товаров',
                image: 'images/service-print-3.webp',
                details: [
                    'Дизайн коробок',
                    'Этикетки и наклейки',
                    '3D-мокапы',
                    'Подготовка к производству'
                ]
            }
        };
    }

    getServiceData() {
        return {
            branding: {
                title: 'Брендинг и айдентика',
                description: 'Создание уникального образа вашего бренда',
                price: 'от $300',
                features: [
                    'Логотип и фирменный знак',
                    'Брендбук и гайдлайны',
                    'Фирменные цвета и шрифты',
                    'Носители бренда',
                    'Срок выполнения: 2-3 недели'
                ]
            },
            smm: {
                title: 'SMM-дизайн и реклама',
                description: 'Визуал для социальных сетей и рекламные материалы',
                price: 'от $100',
                features: [
                    'Визуал для Instagram',
                    'Рекламные баннеры',
                    'Карусели и сторис',
                    'Анимированные элементы',
                    'Срок выполнения: 1-2 недели'
                ]
            },
            video: {
                title: 'Видео и анимация',
                description: 'Создание динамичного видеоконтента',
                price: 'от $200',
                features: [
                    'Reels и короткие видео',
                    'Motion-графика',
                    'Анимированные логотипы',
                    'Презентационные ролики',
                    'Срок выполнения: 2-4 недели'
                ]
            },
            print: {
                title: 'Полиграфия и офлайн-реклама',
                description: 'Материалы для печати и наружной рекламы',
                price: 'от $150',
                features: [
                    'Визитки и буклеты',
                    'Наружная реклама',
                    'Упаковка товаров',
                    'Каталоги и презентации',
                    'Срок выполнения: 1-3 недели'
                ]
            }
        };
    }

    bindEvents() {
        // Portfolio click events
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const portfolioId = item.getAttribute('data-portfolio');
                this.openPortfolioModal(portfolioId);
            });
        });
        
        // Service CTA click events
        document.querySelectorAll('.service-cta').forEach(cta => {
            cta.addEventListener('click', (e) => {
                const serviceType = cta.getAttribute('data-service');
                this.openServiceModal(serviceType);
            });
        });
        
        // Modal close events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                this.closeServiceModal();
                this.closePortfolioModal();
            }
        });
        
        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeServiceModal();
                this.closePortfolioModal();
            }
        });
        
        // Form submission is now handled by FormsManager
        // Removed: this.handleServiceFormSubmit(e);
    }

    openServiceModal(serviceType = null) {
        const modalBody = document.getElementById('serviceModalBody');
        const serviceInfo = serviceType ? this.serviceData[serviceType] : null;
        
        modalBody.innerHTML = this.generateServiceModalContent(serviceInfo, serviceType);
        
        const modal = document.getElementById('serviceModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.trackServiceModalOpen(serviceType);
    }

    generateServiceModalContent(serviceInfo, serviceType) {
        if (serviceInfo) {
            return `
                <div class="service-modal-header">
                    <h2>${serviceInfo.title}</h2>
                    <p>${serviceInfo.description}</p>
                    <div class="service-price">${serviceInfo.price}</div>
                </div>
                
                <div class="service-modal-content">
                    <div class="service-features-list">
                        <h3>Что входит в услугу:</h3>
                        <ul>
                            ${serviceInfo.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <form class="service-form" id="serviceModalForm">
                        <input type="hidden" name="service_type" value="${serviceType}">
                        <input type="hidden" name="utm_source" id="utm_source">
                        <input type="hidden" name="utm_medium" id="utm_medium">
                        <input type="hidden" name="utm_campaign" id="utm_campaign">
                        
                        <div class="form-group">
                            <label for="modal_name">Ваше имя *</label>
                            <input type="text" id="modal_name" name="name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="modal_email">Email *</label>
                            <input type="email" id="modal_email" name="email" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="modal_phone">Телефон</label>
                            <input type="tel" id="modal_phone" name="phone">
                        </div>
                        
                        <div class="form-group">
                            <label for="modal_message">Опишите ваш проект</label>
                            <textarea id="modal_message" name="message" rows="4" placeholder="Расскажите о ваших целях и требованиях"></textarea>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn-primary btn-large">
                                Отправить заявку
                            </button>
                        </div>
                    </form>
                </div>
            `;
        } else {
            return `
                <div class="service-modal-header">
                    <h2>Заказать услугу</h2>
                    <p>Оставьте заявку и мы свяжемся с вами в течение 2 часов</p>
                </div>
                
                <div class="service-modal-content">
                    <form class="service-form" id="serviceModalForm">
                        <input type="hidden" name="utm_source" id="utm_source">
                        <input type="hidden" name="utm_medium" id="utm_medium">
                        <input type="hidden" name="utm_campaign" id="utm_campaign">
                        
                        <div class="form-group">
                            <label for="modal_name">Ваше имя *</label>
                            <input type="text" id="modal_name" name="name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="modal_email">Email *</label>
                            <input type="email" id="modal_email" name="email" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="modal_phone">Телефон</label>
                            <input type="tel" id="modal_phone" name="phone">
                        </div>
                        
                        <div class="form-group">
                            <label for="modal_service">Услуга *</label>
                            <select id="modal_service" name="service" required>
                                <option value="">Выберите услугу</option>
                                <option value="branding">Брендинг и айдентика</option>
                                <option value="smm">SMM-дизайн и реклама</option>
                                <option value="video">Видео и анимация</option>
                                <option value="print">Полиграфия и офлайн-реклама</option>
                                <option value="other">Другое</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="modal_message">Опишите ваш проект</label>
                            <textarea id="modal_message" name="message" rows="4" placeholder="Расскажите о ваших целях и требованиях"></textarea>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn-primary btn-large">
                                Отправить заявку
                            </button>
                        </div>
                    </form>
                </div>
            `;
        }
    }

    closeServiceModal() {
        const modal = document.getElementById('serviceModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openPortfolioModal(portfolioId) {
        const portfolioInfo = this.portfolioData[portfolioId];
        if (!portfolioInfo) return;

        const modalBody = document.getElementById('portfolioModalBody');
        modalBody.innerHTML = this.generatePortfolioModalContent(portfolioInfo);
        
        const modal = document.getElementById('portfolioModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.trackPortfolioView(portfolioId);
    }

    generatePortfolioModalContent(portfolioInfo) {
        return `
            <div class="portfolio-modal-header">
                <h2>${portfolioInfo.title}</h2>
                <span class="portfolio-category">${portfolioInfo.category}</span>
            </div>
            
            <div class="portfolio-modal-content">
                <div class="portfolio-image">
                    <img src="${portfolioInfo.image}" alt="${portfolioInfo.title}" loading="lazy">
                </div>
                
                <div class="portfolio-details">
                    <h3>Описание проекта</h3>
                    <p>${portfolioInfo.description}</p>
                    
                    <h3>Что было сделано:</h3>
                    <ul>
                        ${portfolioInfo.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="portfolio-cta">
                    <button class="btn-primary" onclick="openServiceModal()">
                        Заказать похожий проект
                    </button>
                    <button class="btn-secondary" onclick="window.location.href='pricing.html'">
                        Научиться делать так же
                    </button>
                </div>
            </div>
        `;
    }

    closePortfolioModal() {
        const modal = document.getElementById('portfolioModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    initializeAnalytics() {
        // Track page view
        if (typeof trackEvent === 'function') {
            trackEvent('page_view', {
                page: 'services',
                title: document.title,
                timestamp: new Date().toISOString()
            });
        }
    }

    // Form tracking is now handled by FormsManager
    // initializeFormTracking() { ... } - REMOVED

    trackServiceModalOpen(serviceType) {
        if (typeof trackEvent === 'function') {
            trackEvent('service_modal_opened', {
                service_type: serviceType || 'general',
                timestamp: new Date().toISOString()
            });
        }
    }

    trackPortfolioView(portfolioId) {
        if (typeof trackEvent === 'function') {
            trackEvent('portfolio_viewed', {
                portfolio_id: portfolioId,
                timestamp: new Date().toISOString()
            });
        }
    }

    // Form submission tracking is now handled by FormsManager
    // trackServiceFormSubmit(formData) { ... } - REMOVED

    // Form field focus tracking is now handled by FormsManager
    // trackFormFieldFocus(fieldName) { ... } - REMOVED
}

// Global functions for onclick handlers
function openServiceModal(serviceType) {
    if (window.servicesPage) {
        window.servicesPage.openServiceModal(serviceType);
    }
}

function closeServiceModal() {
    if (window.servicesPage) {
        window.servicesPage.closeServiceModal();
    }
}

function openPortfolioModal(portfolioId) {
    if (window.servicesPage) {
        window.servicesPage.openPortfolioModal(portfolioId);
    }
}

function closePortfolioModal() {
    if (window.servicesPage) {
        window.servicesPage.closePortfolioModal();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.servicesPage = new ServicesPage();
}); 