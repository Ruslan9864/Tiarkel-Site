// Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeServicesPage();
});

function initializeServicesPage() {
    // Initialize UTM parameters
    initializeUTMParameters();
    
    // Initialize portfolio modals
    initializePortfolioModals();
    
    // Initialize request modals
    initializeRequestModals();
    
    // Initialize form handlers
    initializeFormHandlers();
    
    // Track page view
    trackPageView();
    
    // Initialize animations
    initializeAnimations();
}

function initializeUTMParameters() {
    const utmParams = getUTMParameters();
    
    // Set UTM parameters for main form
    document.getElementById('utm_source').value = utmParams.utm_source || '';
    document.getElementById('utm_medium').value = utmParams.utm_medium || '';
    document.getElementById('utm_campaign').value = utmParams.utm_campaign || '';
    document.getElementById('utm_content').value = utmParams.utm_content || '';
    document.getElementById('utm_term').value = utmParams.utm_term || '';
    
    // Set UTM parameters for request form
    document.getElementById('request_utm_source').value = utmParams.utm_source || '';
    document.getElementById('request_utm_medium').value = utmParams.utm_medium || '';
    document.getElementById('request_utm_campaign').value = utmParams.utm_campaign || '';
    document.getElementById('request_utm_content').value = utmParams.utm_content || '';
    document.getElementById('request_utm_term').value = utmParams.utm_term || '';
}

function initializePortfolioModals() {
    // Portfolio data
    const portfolioData = {
        branding1: {
            title: 'Ресторан "Вкус"',
            description: 'Полный брендинг для ресторана современной кухни. Разработан логотип, фирменный стиль, меню и рекламные материалы.',
            image: 'images/service-branding-1.svg',
            details: [
                'Логотип с элементами кулинарной тематики',
                'Фирменный стиль в теплых тонах',
                'Дизайн меню и визиток',
                'Рекламные баннеры для соцсетей'
            ],
            results: 'Увеличение посещаемости на 40% после ребрендинга'
        },
        branding2: {
            title: 'IT-стартап "TechFlow"',
            description: 'Создание современного брендинга для IT-компании. Минималистичный дизайн отражает технологичность и инновационность.',
            image: 'images/service-branding-2.svg',
            details: [
                'Логотип с технологическими элементами',
                'Фирменный стиль в синих тонах',
                'Презентационные материалы',
                'Веб-дизайн для сайта'
            ],
            results: 'Успешный запуск продукта с узнаваемым брендом'
        },
        branding3: {
            title: 'Фитнес-клуб "Power"',
            description: 'Энергичный брендинг для фитнес-клуба. Дизайн передает динамику и силу, привлекая активную аудиторию.',
            image: 'images/service-branding-3.svg',
            details: [
                'Логотип с элементами движения',
                'Фирменный стиль в ярких тонах',
                'Дизайн клубных карт',
                'Рекламные материалы'
            ],
            results: 'Увеличение продаж абонементов на 60%'
        },
        smm1: {
            title: 'Косметика "Beauty"',
            description: 'SMM-визуал для косметического бренда. Создан контент-план и дизайн постов для Instagram и Facebook.',
            image: 'images/service-smm-1.svg',
            details: [
                '30 постов для Instagram',
                '15 сторис-шаблонов',
                'Рекламные баннеры',
                'Контент-план на месяц'
            ],
            results: 'Увеличение вовлеченности на 60%'
        },
        smm2: {
            title: 'Онлайн-школа "EduPro"',
            description: 'Рекламные материалы для онлайн-школы. Созданы баннеры для различных рекламных каналов.',
            image: 'images/service-smm-2.svg',
            details: [
                'Баннеры для Google Ads',
                'Реклама для соцсетей',
                'Email-рассылки',
                'Лендинг-страница'
            ],
            results: 'Увеличение конверсии на 45%'
        },
        smm3: {
            title: 'Кофейня "Aroma"',
            description: 'Карусели и посты для кофейни. Создан визуал, отражающий уютную атмосферу заведения.',
            image: 'images/service-smm-3.svg',
            details: [
                'Карусели для Instagram',
                'Посты о кофе и атмосфере',
                'Сторис с акциями',
                'Рекламные материалы'
            ],
            results: 'Увеличение заказов через соцсети на 80%'
        },
        video1: {
            title: 'Фитнес-тренер "FitLife"',
            description: 'Reels для фитнес-тренера. Созданы короткие видео с упражнениями и мотивацией.',
            image: 'images/service-video-1.svg',
            details: [
                '10 Reels с упражнениями',
                'Мотивационные видео',
                'Анимация логотипа',
                'Титры и переходы'
            ],
            results: 'Увеличение подписчиков на 200%'
        },
        video2: {
            title: 'Банк "FinancePro"',
            description: 'Motion-графика для банка. Созданы анимированные ролики для объяснения финансовых продуктов.',
            image: 'images/service-video-2.svg',
            details: [
                'Motion-графика для продуктов',
                'Анимированные инфографики',
                'Корпоративные ролики',
                'Рекламные видео'
            ],
            results: 'Увеличение понимания продуктов на 70%'
        },
        video3: {
            title: 'Ресторан "Gourmet"',
            description: 'Короткие видео для ресторана. Созданы ролики о блюдах и атмосфере заведения.',
            image: 'images/service-video-3.svg',
            details: [
                'Видео о блюдах',
                'Атмосферные ролики',
                'Анимация меню',
                'Рекламные видео'
            ],
            results: 'Увеличение бронирований на 50%'
        },
        print1: {
            title: 'Стоматология "Smile"',
            description: 'Визитки и полиграфия для стоматологической клиники. Создан комплект печатных материалов.',
            image: 'images/service-print-1.svg',
            details: [
                'Дизайн визиток',
                'Буклеты о услугах',
                'Плакаты для клиники',
                'Бланки документов'
            ],
            results: 'Увеличение узнаваемости бренда на 40%'
        },
        print2: {
            title: 'Автосалон "AutoElite"',
            description: 'Буклеты и каталоги для автосалона. Созданы материалы для презентации автомобилей.',
            image: 'images/service-print-2.svg',
            details: [
                'Каталоги автомобилей',
                'Буклеты о услугах',
                'Плакаты для салона',
                'Презентационные материалы'
            ],
            results: 'Увеличение продаж на 35%'
        },
        print3: {
            title: 'ТЦ "MegaMall"',
            description: 'Наружная реклама для торгового центра. Созданы баннеры и вывески.',
            image: 'images/service-print-3.svg',
            details: [
                'Баннеры для фасада',
                'Вывески магазинов',
                'Указатели и навигация',
                'Рекламные стенды'
            ],
            results: 'Увеличение посещаемости на 25%'
        }
    };

    // Store portfolio data globally
    window.portfolioData = portfolioData;
}

function initializeRequestModals() {
    // Request modal functionality
    window.openRequestForm = function(service = '') {
        const modal = document.getElementById('requestModal');
        const serviceSelect = document.getElementById('requestForm').querySelector('select[name="service"]');
        
        if (service && serviceSelect) {
            serviceSelect.value = service;
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Track event
        trackEvent('request_modal_opened', {
            service: service || 'general'
        });
    };

    window.closeRequestModal = function() {
        const modal = document.getElementById('requestModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Track event
        trackEvent('request_modal_closed');
    };
}

function initializeFormHandlers() {
    // Services form handler
    window.handleServicesFormSubmit = function(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        
        // Track form submission
        trackEvent('services_form_submitted', {
            service: formData.get('service'),
            source: 'services_page'
        });
        
        // Handle form submission
        handleFormSubmission('servicesForm', formData);
    };

    // Request form handler
    window.handleRequestFormSubmit = function(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        
        // Track form submission
        trackEvent('request_form_submitted', {
            service: formData.get('service'),
            source: 'request_modal'
        });
        
        // Handle form submission
        handleFormSubmission('requestForm', formData);
    };
}

function initializeAnimations() {
    // Add animation classes to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-category, .pricing-item, .testimonial-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Portfolio Modal Functions
function openPortfolioModal(portfolioId) {
    const modal = document.getElementById('portfolioModal');
    const modalBody = document.getElementById('portfolioModalBody');
    const portfolioData = window.portfolioData[portfolioId];
    
    if (!portfolioData) return;
    
    // Create modal content
    modalBody.innerHTML = `
        <div class="portfolio-modal-content">
            <div class="portfolio-modal-image">
                <img src="${portfolioData.image}" alt="${portfolioData.title}" loading="lazy">
            </div>
            <div class="portfolio-modal-info">
                <h2>${portfolioData.title}</h2>
                <p class="portfolio-description">${portfolioData.description}</p>
                
                <div class="portfolio-details">
                    <h3>Что было сделано:</h3>
                    <ul>
                        ${portfolioData.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="portfolio-results">
                    <h3>Результат:</h3>
                    <p>${portfolioData.results}</p>
                </div>
                
                <div class="portfolio-actions">
                    <button class="btn-primary" onclick="openRequestForm('${portfolioData.title}')">
                        Заказать похожий проект
                    </button>
                    <button class="btn-outline" onclick="window.location.href='pricing.html'">
                        Научиться делать самому
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Track event
    trackEvent('portfolio_modal_opened', {
        portfolio_id: portfolioId,
        portfolio_title: portfolioData.title
    });
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Track event
    trackEvent('portfolio_modal_closed');
}

// Utility Functions
function getUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_content: urlParams.get('utm_content'),
        utm_term: urlParams.get('utm_term')
    };
}

function handleFormSubmission(formId, formData) {
    // Add form ID to form data
    formData.append('form_id', formId);
    formData.append('page', 'services');
    
    // Show loading state
    const submitButton = document.querySelector(`#${formId} button[type="submit"]`);
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Отправляем...';
    submitButton.disabled = true;
    
    // Submit to Formspree
    fetch('https://formspree.io/f/xpzgwqzg', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showFormSuccess(formId);
            trackEvent('form_submitted', {
                form_id: formId,
                service: formData.get('service')
            });
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFormError(formId, 'Произошла ошибка при отправке. Попробуйте еще раз.');
    })
    .finally(() => {
        // Restore button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

function showFormSuccess(formId) {
    const form = document.getElementById(formId);
    const formContainer = form.closest('.contact-container') || form.closest('.modal-body');
    
    formContainer.innerHTML = `
        <div class="form-success">
            <div class="success-icon">✅</div>
            <h3>Спасибо за заявку!</h3>
            <p>Мы свяжемся с вами в течение 24 часов для обсуждения проекта.</p>
            <div class="success-actions">
                <button class="btn-primary" onclick="window.location.href='pricing.html'">
                    Пока ждёте — узнайте о курсе
                </button>
                <button class="btn-outline" onclick="location.reload()">
                    Отправить ещё одну заявку
                </button>
            </div>
        </div>
    `;
}

function showFormError(formId, message) {
    const form = document.getElementById(formId);
    const errorDiv = form.querySelector('.form-error') || document.createElement('div');
    
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    
    if (!form.querySelector('.form-error')) {
        form.insertBefore(errorDiv, form.firstChild);
    }
    
    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Analytics Functions
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: 'Services Page',
            page_location: window.location.href
        });
    }
    
    if (typeof fbq !== 'undefined') {
        fbq('track', 'PageView');
    }
}

function trackEvent(eventName, parameters = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: 'Services Page',
            ...parameters
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'CustomEvent', {
            event_name: eventName,
            ...parameters
        });
    }
    
    // Console log for debugging
    console.log('Event tracked:', eventName, parameters);
}

// Navigation Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Global functions for onclick handlers
window.openPortfolioModal = openPortfolioModal;
window.closePortfolioModal = closePortfolioModal;
window.openRequestForm = openRequestForm;
window.closeRequestModal = closeRequestModal;
window.handleServicesFormSubmit = handleServicesFormSubmit;
window.handleRequestFormSubmit = handleRequestFormSubmit;
window.scrollToSection = scrollToSection; 