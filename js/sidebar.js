/**
 * Боковое меню для Tiarkel Site
 * Управляет открытием/закрытием и навигацией
 */

class SidebarMenu {
    constructor() {
        this.sidebar = null;
        this.sidebarToggle = null;
        this.sidebarBackdrop = null;
        this.sidebarClose = null;
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
                    <a href="/" class="sidebar-logo">
                        <img src="Logo.svg" alt="Tiarkel">
                        <span>Tiarkel</span>
                    </a>
                    <button class="sidebar-close" id="sidebar-close" aria-label="Закрыть меню">
                        <span>×</span>
                    </button>
                </div>
                
                <nav class="sidebar-nav">
                    <div class="sidebar-section">
                        <div class="sidebar-section-title">Основные разделы</div>
                        <ul class="sidebar-menu">
                            <li><a href="/" class="sidebar-link" data-page="home">
                                <span class="sidebar-icon">🏠</span>
                                <span class="sidebar-text">Главная</span>
                            </a></li>
                            <li><a href="/program.html" class="sidebar-link" data-page="program">
                                <span class="sidebar-icon">📚</span>
                                <span class="sidebar-text">Программа курса</span>
                            </a></li>
                            <li><a href="/pricing.html" class="sidebar-link" data-page="pricing">
                                <span class="sidebar-icon">💰</span>
                                <span class="sidebar-text">Тарифы</span>
                                <span class="sidebar-badge">4 тарифа</span>
                            </a></li>
                            <li><a href="/cases.html" class="sidebar-link" data-page="cases">
                                <span class="sidebar-icon">🎯</span>
                                <span class="sidebar-text">Кейсы студентов</span>
                                <span class="sidebar-badge">8 кейсов</span>
                            </a></li>
                            <li><a href="/services.html" class="sidebar-link" data-page="services">
                                <span class="sidebar-icon">🎨</span>
                                <span class="sidebar-text">Услуги студии</span>
                                <span class="sidebar-badge">4 услуги</span>
                            </a></li>
                        </ul>
                    </div>
                    
                    <div class="sidebar-section">
                        <div class="sidebar-section-title">Информация</div>
                        <ul class="sidebar-menu">
                            <li><a href="/contacts.html" class="sidebar-link" data-page="contacts">
                                <span class="sidebar-icon">📞</span>
                                <span class="sidebar-text">Контакты</span>
                            </a></li>
                            <li><a href="/faq.html" class="sidebar-link" data-page="faq">
                                <span class="sidebar-icon">❓</span>
                                <span class="sidebar-text">FAQ</span>
                            </a></li>
                        </ul>
                    </div>
                    
                    <div class="sidebar-section">
                        <div class="sidebar-section-title">Документы</div>
                        <ul class="sidebar-menu">
                            <li><a href="/oferta.html" class="sidebar-link" data-page="oferta">
                                <span class="sidebar-icon">📄</span>
                                <span class="sidebar-text">Публичная оферта</span>
                            </a></li>
                            <li><a href="/privacy.html" class="sidebar-link" data-page="privacy">
                                <span class="sidebar-icon">🔒</span>
                                <span class="sidebar-text">Политика конфиденциальности</span>
                            </a></li>
                        </ul>
                    </div>
                    
                    <div class="sidebar-section">
                        <div class="sidebar-section-title">Курсы</div>
                        <ul class="sidebar-menu">
                            <li><a href="/courses/osnovnoy-kurs.html" class="sidebar-link" data-page="course">
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
            
            <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Открыть меню">
                <span>☰</span>
            </button>
        `;
        
        // Добавляем HTML в body
        document.body.insertAdjacentHTML('beforeend', sidebarHTML);
        
        // Получаем ссылки на элементы
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebar-toggle');
        this.sidebarBackdrop = document.getElementById('sidebar-backdrop');
        this.sidebarClose = document.getElementById('sidebar-close');
    }
    
    setupEventListeners() {
        // Открытие меню
        this.sidebarToggle.addEventListener('click', () => {
            this.openSidebar();
        });
        
        // Закрытие меню
        this.sidebarClose.addEventListener('click', () => {
            this.closeSidebar();
        });
        
        // Закрытие по клику на backdrop
        this.sidebarBackdrop.addEventListener('click', () => {
            this.closeSidebar();
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.closeSidebar();
            }
        });
        
        // Обработка кликов по ссылкам
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
        
        // Скрытие/показ кнопки при скролле
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Скролл вниз - скрываем кнопку
                this.sidebarToggle.classList.add('hidden');
            } else {
                // Скролл вверх - показываем кнопку
                this.sidebarToggle.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    openSidebar() {
        this.sidebar.classList.add('active');
        this.sidebarBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Фокус на кнопку закрытия для доступности
        setTimeout(() => {
            this.sidebarClose.focus();
        }, 300);
        
        // Трекинг события
        this.trackEvent('sidebar_opened');
    }
    
    closeSidebar() {
        this.sidebar.classList.remove('active');
        this.sidebarBackdrop.classList.remove('active');
        document.body.style.overflow = '';
        
        // Возвращаем фокус на кнопку открытия
        setTimeout(() => {
            this.sidebarToggle.focus();
        }, 300);
        
        // Трекинг события
        this.trackEvent('sidebar_closed');
    }
    
    isOpen() {
        return this.sidebar.classList.contains('active');
    }
    
    handleLinkClick(link) {
        const href = link.getAttribute('href');
        const page = link.getAttribute('data-page');
        
        // Если это внешняя ссылка или текущая страница, закрываем меню
        if (href.startsWith('http') || href === window.location.pathname) {
            this.closeSidebar();
        }
        
        // Трекинг клика по ссылке
        this.trackEvent('sidebar_link_clicked', {
            page: page,
            href: href
        });
    }
    
    highlightCurrentPage() {
        const currentLink = this.sidebar.querySelector(`[data-page="${this.currentPage}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        
        if (path === '/' || path === '/index.html') return 'home';
        if (path.includes('program')) return 'program';
        if (path.includes('pricing')) return 'pricing';
        if (path.includes('cases')) return 'cases';
        if (path.includes('services')) return 'services';
        if (path.includes('contacts')) return 'contacts';
        if (path.includes('faq')) return 'faq';
        if (path.includes('oferta')) return 'oferta';
        if (path.includes('privacy')) return 'privacy';
        if (path.includes('course')) return 'course';
        
        return 'home';
    }
    
    animateMenuItems() {
        const menuItems = this.sidebar.querySelectorAll('.sidebar-menu a');
        
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 100);
        });
    }
    
    setupKeyboardNavigation() {
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