class PricingPage {
    constructor() {
        this.tariffs = [
            {
                id: 'vip',
                name: 'VIP',
                subtitle: 'Максимальный результат',
                price: 1099,
                installmentPrice: 367,
                installmentMonths: 3,
                features: [
                    { text: 'Пожизненный доступ к курсу', included: true },
                    { text: '156 базовых уроков + все треки', included: true },
                    { text: 'Проверка всех работ', included: true },
                    { text: 'Персональный куратор', included: true },
                    { text: 'Карьерный трек', included: true },
                    { text: 'Индивидуальные консультации', included: true },
                    { text: 'Видео/моушн трек', included: true },
                    { text: 'Помощь в трудоустройстве', included: true },
                    { text: 'Приоритетная поддержка', included: true }
                ],
                badge: 'Для тех, кто хочет максимум',
                ctaText: 'Выбрать тариф',
                isPopular: false,
                isDecoy: false
            },
            {
                id: 'pro',
                name: 'PRO',
                subtitle: 'Самый популярный',
                price: 399,
                installmentPrice: 133,
                installmentMonths: 3,
                features: [
                    { text: 'Доступ к курсу на 12 месяцев', included: true },
                    { text: '156 базовых уроков + SMM-трек', included: true },
                    { text: 'Проверка всех работ', included: true },
                    { text: 'Персональный куратор', included: true },
                    { text: 'Карьерный трек', included: true },
                    { text: 'Помощь в трудоустройстве', included: true },
                    { text: 'Сертификат', included: true },
                    { text: 'Поддержка 24/7', included: true }
                ],
                badge: 'Самый популярный',
                ctaText: 'Выбрать тариф',
                isPopular: true,
                isDecoy: false
            },
            {
                id: 'studio',
                name: 'STUDIO',
                subtitle: 'Для команд и студий',
                price: 479,
                installmentPrice: 160,
                installmentMonths: 3,
                features: [
                    { text: 'Пожизненный доступ к курсу', included: true },
                    { text: '156 базовых уроков + все треки', included: true },
                    { text: 'Проверка всех работ', included: true },
                    { text: 'Персональный куратор', included: true },
                    { text: 'Индивидуальные консультации', included: true },
                    { text: 'Сертификат', included: true },
                    { text: 'Карьерный трек', included: false },
                    { text: 'Помощь в трудоустройстве', included: false }
                ],
                badge: 'Для команд',
                ctaText: 'Выбрать тариф',
                isPopular: false,
                isDecoy: true
            },
            {
                id: 'lite',
                name: 'LITE',
                subtitle: 'Стартовый пакет',
                price: 239,
                installmentPrice: 80,
                installmentMonths: 3,
                features: [
                    { text: 'Доступ к курсу на 6 месяцев', included: true },
                    { text: '156 базовых уроков', included: true },
                    { text: 'Проверка 5 работ', included: true },
                    { text: 'Общий чат', included: true },
                    { text: 'Сертификат', included: true },
                    { text: 'SMM-трек', included: false },
                    { text: 'Персональный куратор', included: false },
                    { text: 'Карьерный канал', included: false }
                ],
                badge: 'Минимум, чтобы стартовать',
                ctaText: 'Выбрать тариф',
                isPopular: false,
                isDecoy: false
            }
        ];

        this.comparisonData = [
            { feature: 'Доступ к курсу', lite: '6 месяцев', pro: '12 месяцев', studio: 'Пожизненно', vip: 'Пожизненно' },
            { feature: 'Базовые уроки', lite: '✅ 156 уроков', pro: '✅ 156 уроков', studio: '✅ 156 уроков', vip: '✅ 156 уроков' },
            { feature: 'SMM-трек', lite: '❌', pro: '✅', studio: '✅', vip: '✅' },
            { feature: 'Видео-трек', lite: '❌', pro: '❌', studio: '✅', vip: '✅' },
            { feature: 'Проверка работ', lite: '5 работ', pro: 'Все работы', studio: 'Все работы', vip: 'Все работы' },
            { feature: 'Персональный куратор', lite: '❌', pro: '✅', studio: '✅', vip: '✅' },
            { feature: 'Карьерный трек', lite: '❌', pro: '✅', studio: '❌', vip: '✅' },
            { feature: 'Индивидуальные консультации', lite: '❌', pro: '❌', studio: '✅', vip: '✅' },
            { feature: 'Помощь в трудоустройстве', lite: '❌', pro: '✅', studio: '❌', vip: '✅' }
        ];

        this.faqData = [
            {
                question: 'Можно ли оплатить в рассрочку?',
                answer: 'Да, у нас есть два варианта рассрочки:<br><br><strong>1. Доверительная рассрочка</strong> на два платежа от нас. Первую часть оплачиваете сразу, а вторую половину на первом этапе.<br><br><strong>2. Рассрочка от банка</strong> на 3-12 месяцев с минимальными требованиями.'
            },
            {
                question: 'Чем PRO лучше LITE?',
                answer: 'PRO включает значительно больше возможностей:<br><br>• Доступ к курсу на 12 месяцев вместо 6<br>• SMM-трек (дополнительные уроки по соцсетям)<br>• Проверку всех работ вместо 5<br>• Персонального куратора<br>• Карьерный канал и помощь в трудоустройстве<br>• Приоритетную поддержку'
            },
            {
                question: 'Что если я не успеваю по времени?',
                answer: 'У тарифов PRO и STUDIO есть страховка в виде дополнительных дней к дедлайну на каждом этапе курса. Для VIP тарифа нет дедлайнов — вы можете проходить курс в своем темпе в течение 5 месяцев. В LITE тарифе есть фиксированные сроки, но можно продлить доступ за дополнительную плату.'
            },
            {
                question: 'Есть ли гарантия возврата денег?',
                answer: 'Да, мы предоставляем гарантию возврата денег в течение 7 дней с момента покупки, если вы не просмотрели обучающие материалы. Это наша гарантия качества и вашего спокойствия.'
            },
            {
                question: 'Какой тариф выбрать новичку?',
                answer: 'Для новичков мы рекомендуем тариф PRO — он оптимален по цене и включает все необходимые функции для успешного обучения. Если бюджет ограничен, начните с LITE, а потом можно будет апгрейдиться до PRO.'
            }
        ];

        this.init();
    }

    init() {
        this.renderPricingCards();
        this.renderComparisonTable();
        this.renderFAQ();
        this.bindEvents();
        this.setupAnalytics();
    }

    renderPricingCards() {
        const pricingGrid = document.querySelector('.pricing-grid');
        if (!pricingGrid) return;

        pricingGrid.innerHTML = this.tariffs.map(tariff => this.renderTariffCard(tariff)).join('');
    }

    renderTariffCard(tariff) {
        const cardClass = `pricing-card ${tariff.id}-card${tariff.isPopular ? ' featured' : ''}`;
        const buttonClass = `btn-${tariff.isPopular ? 'primary' : 'secondary'} btn-pricing`;
        
        return `
            <div class="pricing-card ${tariff.id}-card${tariff.isPopular ? ' featured' : ''}" id="${tariff.id}">
                <div class="card-header">
                    ${tariff.isPopular ? '<div class="popular-badge">САМЫЙ ПОПУЛЯРНЫЙ</div>' : ''}
                    <h3>${tariff.name}</h3>
                    <div class="card-subtitle">${tariff.subtitle}</div>
                    ${tariff.badge ? `<div class="card-badge">${tariff.badge}</div>` : ''}
                </div>
                <div class="price-container">
                    <div class="price">
                        <span class="price-currency">$</span>
                        <span class="price-amount">${tariff.price}</span>
                    </div>
                    <div class="price-installment">от $${tariff.installmentPrice} × ${tariff.installmentMonths} месяца</div>
                </div>
                <ul class="pricing-features">
                    ${tariff.features.map(feature => `
                        <li>
                            <span class="feature-icon">${feature.included ? '✅' : '❌'}</span>
                            <span class="${!feature.included ? 'feature-disabled' : ''}">${feature.text}</span>
                        </li>
                    `).join('')}
                </ul>
                <button class="${buttonClass}" data-cta="pricing_${tariff.id}" onclick="handlePlanSelection('${tariff.name}')" aria-label="Выбрать тариф ${tariff.name}">
                    ${tariff.ctaText}
                </button>
            </div>
        `;
    }

    renderComparisonTable() {
        const tableBody = document.querySelector('.comparison-table tbody');
        if (!tableBody) return;

        tableBody.innerHTML = this.comparisonData.map(row => `
            <tr>
                <td>${row.feature}</td>
                <td>${row.lite}</td>
                <td>${row.pro}</td>
                <td>${row.studio}</td>
                <td>${row.vip}</td>
            </tr>
        `).join('');
    }

    renderFAQ() {
        const faqAccordion = document.querySelector('.faq-accordion');
        if (!faqAccordion) return;

        faqAccordion.innerHTML = this.faqData.map((item, index) => `
            <div class="faq-item">
                <button class="faq-question" onclick="toggleFAQ(this)" data-faq-index="${index}">
                    <span>${item.question}</span>
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-content">
                    <div>${item.answer}</div>
                </div>
            </div>
        `).join('');
    }

    bindEvents() {
        // Track CTA button clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-pricing')) {
                const tariff = e.target.getAttribute('data-cta').replace('pricing_', '').toUpperCase();
                this.trackEvent('pricing_cta_click', { tariff, location: this.getButtonLocation(e.target) });
            }
        });

        // Track scroll depth
        this.trackScrollDepth();
    }

    setupAnalytics() {
        this.trackEvent('pricing_page_view');
        
        // Track popular badge visibility
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.trackEvent('pricing_popular_badge_view');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        const popularBadge = document.querySelector('.popular-badge');
        if (popularBadge) {
            observer.observe(popularBadge);
        }
    }

    trackScrollDepth() {
        let maxScroll = 0;
        const trackScroll = () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll >= 25 && maxScroll < 50) {
                    this.trackEvent('pricing_scroll_25');
                } else if (maxScroll >= 50 && maxScroll < 75) {
                    this.trackEvent('pricing_scroll_50');
                } else if (maxScroll >= 75) {
                    this.trackEvent('pricing_scroll_75');
                }
            }
        };
        
        window.addEventListener('scroll', trackScroll);
    }

    getButtonLocation(button) {
        const card = button.closest('.pricing-card');
        if (card) {
            const tariff = card.id.toUpperCase();
            return `pricing_card_${tariff}`;
        }
        return 'pricing_unknown';
    }

    trackEvent(eventName, parameters = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'pricing',
                event_label: parameters.tariff || 'general',
                ...parameters
            });
        }

        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'CustomEvent', {
                event_name: eventName,
                event_category: 'pricing',
                ...parameters
            });
        }

        // Console for debugging
        console.log('Pricing Event:', eventName, parameters);
    }
}

// Global function for plan selection
function handlePlanSelection(tariff) {
    // Track the selection
    if (window.pricingPage) {
        window.pricingPage.trackEvent('pricing_plan_selected', { tariff });
    }

    // Show form modal or redirect to form
    showPricingForm(tariff);
}

// Global function to show pricing form
function showPricingForm(selectedTariff) {
    // Create modal with form
    const modal = document.createElement('div');
    modal.className = 'pricing-form-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closePricingForm()" aria-label="Закрыть">✕</button>
            <h3>Выбрать тариф ${selectedTariff}</h3>
            <form class="pricing-form" id="pricing-form">
                <div class="form-group">
                    <label for="name">Имя *</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="phone">Телефон *</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email">
                </div>
                <div class="form-group">
                    <label for="tariff">Выбранный тариф</label>
                    <input type="text" id="tariff" name="tariff" value="${selectedTariff}" readonly>
                </div>
                <div class="form-group">
                    <label for="message">Сообщение</label>
                    <textarea id="message" name="message" placeholder="Дополнительная информация"></textarea>
                </div>
                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" name="agreement" required>
                        <span>Я согласен с <a href="oferta.html" target="_blank">договором оферты</a> и <a href="privacy.html" target="_blank">политикой конфиденциальности</a></span>
                    </label>
                </div>
                <button type="submit" class="btn-primary">Отправить заявку</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Handle form submission
    const form = modal.querySelector('#pricing-form');
    form.addEventListener('submit', handlePricingFormSubmit);
}

// Global function to close pricing form
function closePricingForm() {
    const modal = document.querySelector('.pricing-form-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Global function to handle pricing form submission
function handlePricingFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Track form submission
    if (window.pricingPage) {
        window.pricingPage.trackEvent('pricing_form_submitted', { 
            tariff: data.tariff,
            hasEmail: !!data.email 
        });
    }

    // Here you would typically send the data to your backend
    // For now, we'll show a success message
    const modal = document.querySelector('.pricing-form-modal');
    if (modal) {
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="closePricingForm()" aria-label="Закрыть">✕</button>
                <div class="success-message">
                    <h3>Спасибо за заявку!</h3>
                    <p>Мы свяжемся с вами в ближайшее время для уточнения деталей по тарифу ${data.tariff}.</p>
                    <button class="btn-primary" onclick="closePricingForm()">Закрыть</button>
                </div>
            </div>
        `;
    }
}

// Initialize pricing page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pricingPage = new PricingPage();
}); 