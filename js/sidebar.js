/**
 * Объединенное боковое меню для Tiarkel Site
 * Управляет открытием/закрытием и навигацией
 */

// Определяем базовый путь для GitHub Pages
const BASE_PATH = (() => {
    const path = window.location.pathname;
    if (path.includes('/Tiarkel-Site/')) {
        return '/Tiarkel-Site/';
    }
    return './';
})();

// Логирование инициализации
console.log(`Tiarkel nav init — base=${BASE_PATH} — env=${window.location.hostname === 'ruslan9864.github.io' ? 'gh' : 'local'}`);

class SidebarMenu {
    constructor() {
        this.sidebar = null;
        this.sidebarToggle = null;
        this.sidebarBackdrop = null;
        this.sidebarClose = null;
        this.burgerButton = null;
        this.currentPage = this.getCurrentPage();
        
        this.init();
    }
    
    init() {
        this.createSidebar();
        this.setupEventListeners();
        this.highlightCurrentPage();
        this.setupKeyboardNavigation();
    }
    
    createSidebar() {
        // Создаем HTML структуру бокового меню
        const sidebarHTML = `
            <div class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <a href="${BASE_PATH}index.html" class="sidebar-logo">
                        <img src="${BASE_PATH}Logo.svg" alt="Tiarkel">
                    </a>
                    <button class="sidebar-close" id="sidebar-close" aria-label="Закрыть меню">
                        <span>×</span>
                    </button>
                </div>
                
                <nav class="sidebar-nav">
                    <div class="sidebar-section">
                        <div class="sidebar-section-title">Основные разделы</div>
                        <ul class="sidebar-menu">
                            <li><a href="${BASE_PATH}index.html" class="sidebar-link" data-page="home">
                                <span class="sidebar-icon">🏠</span>
                                <span class="sidebar-text">Главная</span>
                            </a></li>
                            <li><a href="${BASE_PATH}program.html" class="sidebar-link" data-page="program">
                                <span class="sidebar-icon">📚</span>
                                <span class="sidebar-text">Программа курса</span>
                            </a></li>
                            <li><a href="${BASE_PATH}pricing.html" class="sidebar-link" data-page="pricing">
                                <span class="sidebar-icon">💰</span>
                                <span class="sidebar-text">Тарифы</span>
                                <span class="sidebar-badge">4 тарифа</span>
                            </a></li>
                            <li><a href="${BASE_PATH}cases.html" class="sidebar-link" data-page="cases">
                                <span class="sidebar-icon">🎯</span>
                                <span class="sidebar-text">Кейсы студентов</span>
                                <span class="sidebar-badge">8 кейсов</span>
                            </a></li>
                            <li><a href="${BASE_PATH}services.html" class="sidebar-link" data-page="services">
                                <span class="sidebar-icon">🎨</span>
                                <span class="sidebar-text">Услуги студии</span>
                                <span class="sidebar-badge">4 услуги</span>
                            </a></li>
                        </ul>
                    </div>
                    
                    <div class="sidebar-section">
                        <div class="sidebar-section-title">Информация</div>
                        <ul class="sidebar-menu">
                            <li><a href="${BASE_PATH}contacts.html" class="sidebar-link" data-page="contacts">
                                <span class="sidebar-icon">📞</span>
                                <span class="sidebar-text">Контакты</span>
                            </a></li>
                            <li><a href="${BASE_PATH}faq.html" class="sidebar-link" data-page="faq">
                                <span class="sidebar-icon">❓</span>
                                <span class="sidebar-text">FAQ</span>
                            </a></li>
                        </ul>
                    </div>
                    
                    <div class="sidebar-section">
                        <div class="sidebar-section-title">Документы</div>
                        <ul class="sidebar-menu">
                            <li><a href="${BASE_PATH}oferta.html" class="sidebar-link" data-page="oferta">
                                <span class="sidebar-icon">📄</span>
                                <span class="sidebar-text">Публичная оферта</span>
                            </a></li>
                            <li><a href="${BASE_PATH}privacy.html" class="sidebar-link" data-page="privacy">
                                <span class="sidebar-icon">🔒</span>
                                <span class="sidebar-text">Политика конфиденциальности</span>
                            </a></li>
                        </ul>
                    </div>
                    
                    <div class="sidebar-section">
                        <div class="sidebar-section-title">Курсы</div>
                        <ul class="sidebar-menu">
                            <li><a href="${BASE_PATH}courses/osnovnoy-kurs.html" class="sidebar-link" data-page="course">
                                <span class="sidebar-icon">🎓</span>
                                <span class="sidebar-text">Основной курс</span>
                                <span class="sidebar-badge">LITE</span>
                            </a></li>
                        </ul>
                    </div>
                </nav>
                
                <div class="sidebar-footer">
                    <div class="sidebar-social">
                        <a href="https://www.instagram.com/tiarkel/" target="_blank" aria-label="Instagram">
                            <span>📷</span>
                        </a>
                        <a href="https://t.me/tatvorit" target="_blank" aria-label="Telegram">
                            <span>📱</span>
                        </a>
                        <a href="https://www.behance.net/1db30958" target="_blank" aria-label="Behance">
                            <span>🎨</span>
                        </a>
                    </div>
                    <div class="sidebar-contact">
                        <p>Нужна помощь?</p>
                        <a href="https://t.me/tatvorit" target="_blank">Написать в Telegram</a>
                    </div>
                </div>
            </div>
            
            <div class="sidebar-backdrop" id="sidebar-backdrop"></div>
        `;
        
        // Добавляем HTML в body
        document.body.insertAdjacentHTML('beforeend', sidebarHTML);
        
        // Получаем ссылки на элементы
        this.sidebar = document.getElementById('sidebar');
        this.sidebarBackdrop = document.getElementById('sidebar-backdrop');
        this.sidebarClose = document.getElementById('sidebar-close');
        this.burgerButton = document.querySelector('.burger');
    }
    
    setupEventListeners() {
        // Открытие меню через бургер
        if (this.burgerButton) {
            this.burgerButton.addEventListener('click', () => {
                this.openSidebar();
            });
        } else {
            console.warn('Burger button not found - sidebar may not work properly');
        }
        
        // Закрытие меню
        if (this.sidebarClose) {
            this.sidebarClose.addEventListener('click', () => {
                this.closeSidebar();
            });
        }
        
        // Закрытие по клику на backdrop
        if (this.sidebarBackdrop) {
            this.sidebarBackdrop.addEventListener('click', () => {
                this.closeSidebar();
            });
        }
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.closeSidebar();
            }
        });
        
        // Обработка кликов по ссылкам
        if (this.sidebar) {
            this.sidebar.addEventListener('click', (e) => {
                if (e.target.closest('.sidebar-link')) {
                    const link = e.target.closest('.sidebar-link');
                    this.handleLinkClick(link);
                }
            });
            
            // Анимация элементов при открытии
            this.sidebar.addEventListener('transitionend', () => {
                if (this.isOpen()) {
                    this.animateMenuItems();
                }
            });
        }
    }
    
    openSidebar() {
        if (!this.sidebar || !this.sidebarBackdrop) {
            console.error('Sidebar elements not found');
            return;
        }
        
        this.sidebar.classList.add('active');
        this.sidebarBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Активируем бургер
        if (this.burgerButton) {
            this.burgerButton.classList.add('active');
        }
        
        // Фокус на кнопку закрытия для доступности
        setTimeout(() => {
            if (this.sidebarClose) {
                this.sidebarClose.focus();
            }
        }, 300);
        
        // Трекинг события
        this.trackEvent('sidebar_opened');
    }
    
    closeSidebar() {
        if (!this.sidebar || !this.sidebarBackdrop) {
            console.error('Sidebar elements not found');
            return;
        }
        
        this.sidebar.classList.remove('active');
        this.sidebarBackdrop.classList.remove('active');
        document.body.style.overflow = '';
        
        // Деактивируем бургер
        if (this.burgerButton) {
            this.burgerButton.classList.remove('active');
        }
        
        // Возвращаем фокус на бургер
        setTimeout(() => {
            if (this.burgerButton) {
                this.burgerButton.focus();
            }
        }, 300);
        
        // Трекинг события
        this.trackEvent('sidebar_closed');
    }
    
    isOpen() {
        return this.sidebar && this.sidebar.classList.contains('active');
    }
    
    handleLinkClick(link) {
        const href = link.getAttribute('href');
        const page = link.getAttribute('data-page');
        
        // Если это внешняя ссылка или текущая страница, закрываем меню
        if (href.startsWith('http') || href === window.location.pathname.split('/').pop()) {
            this.closeSidebar();
        }
        
        // Трекинг клика по ссылке
        this.trackEvent('sidebar_link_clicked', {
            page: page,
            href: href
        });
    }
    
    highlightCurrentPage() {
        if (!this.sidebar) return;
        
        const currentLink = this.sidebar.querySelector(`[data-page="${this.currentPage}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename === '' || filename === 'index.html') return 'home';
        if (filename === 'program.html') return 'program';
        if (filename === 'pricing.html') return 'pricing';
        if (filename === 'cases.html') return 'cases';
        if (filename === 'services.html') return 'services';
        if (filename === 'contacts.html') return 'contacts';
        if (filename === 'faq.html') return 'faq';
        if (filename === 'oferta.html') return 'oferta';
        if (filename === 'privacy.html') return 'privacy';
        if (path.includes('courses/')) return 'course';
        
        return 'home';
    }
    
    animateMenuItems() {
        if (!this.sidebar) return;
        
        const menuItems = this.sidebar.querySelectorAll('.sidebar-menu a');
        
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 100);
        });
    }
    
    setupKeyboardNavigation() {
        if (!this.sidebar) return;
        
        // Навигация по Tab
        this.sidebar.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusableElements = this.sidebar.querySelectorAll(
                    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
                );
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
    
    trackEvent(eventName, parameters = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'sidebar',
                ...parameters
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'CustomEvent', {
                event_name: eventName,
                event_category: 'sidebar',
                ...parameters
            });
        }
        
        // Console для отладки
        console.log(`Sidebar Event: ${eventName}`, parameters);
    }
    
    // Публичные методы для внешнего использования
    toggle() {
        if (this.isOpen()) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }
    
    open() {
        this.openSidebar();
    }
    
    close() {
        this.closeSidebar();
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.sidebarMenu = new SidebarMenu();
});

// Глобальные функции для внешнего использования
window.openSidebar = () => {
    if (window.sidebarMenu) {
        window.sidebarMenu.open();
    }
};

window.closeSidebar = () => {
    if (window.sidebarMenu) {
        window.sidebarMenu.close();
    }
};

window.toggleSidebar = () => {
    if (window.sidebarMenu) {
        window.sidebarMenu.toggle();
    }
}; 