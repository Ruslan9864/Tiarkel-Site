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
                    <a href="index.html" class="sidebar-logo">
                        <img src="Logo.svg" alt="Tiarkel">
                    </a>
                    <button class="sidebar-close" id="sidebar-close" aria-label="Закрыть меню">
                        <span>×</span>
                    </button>
                </div>
                
                <nav class="sidebar-nav" role="navigation" aria-label="Основная навигация">
                    <ul class="sidebar-menu">
                        <li><a href="index.html" class="sidebar-link" data-page="home">
                            <span class="sidebar-icon">🏠</span>
                            <span class="sidebar-text">Главная</span>
                        </a></li>
                        <li><a href="program.html" class="sidebar-link" data-page="program">
                            <span class="sidebar-icon">📚</span>
                            <span class="sidebar-text">Программа</span>
                        </a></li>
                        <li><a href="pricing.html" class="sidebar-link" data-page="pricing">
                            <span class="sidebar-icon">💰</span>
                            <span class="sidebar-text">Тарифы</span>
                        </a></li>
                        <li><a href="store/" class="sidebar-link" data-page="store">
                            <span class="sidebar-icon">🛍️</span>
                            <span class="sidebar-text">Магазин</span>
                        </a></li>
                        <li><a href="cases.html" class="sidebar-link" data-page="cases">
                            <span class="sidebar-icon">🎯</span>
                            <span class="sidebar-text">Кейсы</span>
                        </a></li>
                        <li><a href="faq.html" class="sidebar-link" data-page="faq">
                            <span class="sidebar-icon">❓</span>
                            <span class="sidebar-text">FAQ</span>
                        </a></li>
                        <li><a href="contacts.html" class="sidebar-link" data-page="contacts">
                            <span class="sidebar-icon">📞</span>
                            <span class="sidebar-text">Контакты</span>
                        </a></li>
                    </ul>
                </nav>
                
                <div class="sidebar-footer">
                    <div class="language-toggle">
                        <span>RU</span>
                        <button class="lang-switch" aria-label="Переключить язык">UZ</button>
                    </div>
                    <a href="pricing.html#pro" class="btn-primary sidebar-cta">
                        Поступить на курс
                    </a>
                </div>
            </div>
        `;
        
        // Добавляем сайдбар в DOM
        document.body.insertAdjacentHTML('beforeend', sidebarHTML);
        
        // Создаем backdrop
        const backdropHTML = '<div class="sidebar-backdrop" id="sidebar-backdrop"></div>';
        document.body.insertAdjacentHTML('beforeend', backdropHTML);
        
        // Получаем ссылки на элементы
        this.sidebar = document.getElementById('sidebar');
        this.sidebarBackdrop = document.getElementById('sidebar-backdrop');
        this.sidebarClose = document.getElementById('sidebar-close');
    }
    
    setupEventListeners() {
        // Кнопка бургера
        this.burgerButton = document.querySelector('.burger, .mobile-menu-toggle');
        if (this.burgerButton) {
            this.burgerButton.addEventListener('click', () => this.openSidebar());
        } else {
            console.warn('Burger button not found');
        }
        
        // Кнопка закрытия
        if (this.sidebarClose) {
            this.sidebarClose.addEventListener('click', () => this.closeSidebar());
        } else {
            console.error('Sidebar close button not found');
        }
        
        // Backdrop
        if (this.sidebarBackdrop) {
            this.sidebarBackdrop.addEventListener('click', () => this.closeSidebar());
        } else {
            console.error('Sidebar backdrop not found');
        }
        
        // Ссылки в меню
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.trackNavEvent('click', link.dataset.page);
            });
        });
    }
    
    setupKeyboardNavigation() {
        // Ловушка фокуса в сайдбаре
        if (this.sidebar) {
            this.sidebar.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    const focusableElements = this.sidebar.querySelectorAll(
                        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
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
        
        // Закрытие по Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.closeSidebar();
            }
        });
    }
    
    openSidebar() {
        if (!this.sidebar || !this.sidebarBackdrop) {
            console.error('Sidebar or backdrop not found');
            return;
        }
        
        this.sidebar.classList.add('active');
        this.sidebarBackdrop.classList.add('active');
        
        if (this.burgerButton) {
            this.burgerButton.setAttribute('aria-expanded', 'true');
        }
        
        document.body.style.overflow = 'hidden';
        
        // Фокус на первый элемент сайдбара
        const firstFocusable = this.sidebar.querySelector('a[href], button');
        if (firstFocusable) {
            firstFocusable.focus();
        }
        
        this.trackNavEvent('open');
    }
    
    closeSidebar() {
        if (!this.sidebar || !this.sidebarBackdrop) {
            console.error('Sidebar or backdrop not found');
            return;
        }
        
        this.sidebar.classList.remove('active');
        this.sidebarBackdrop.classList.remove('active');
        
        if (this.burgerButton) {
            this.burgerButton.setAttribute('aria-expanded', 'false');
            // Возвращаем фокус на кнопку бургера
            this.burgerButton.focus();
        }
        
        document.body.style.overflow = '';
        
        this.trackNavEvent('close');
    }
    
    isOpen() {
        return this.sidebar && this.sidebar.classList.contains('active');
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        
        // Обработка store/
        if (path.includes('/store/')) {
            return 'store';
        }
        
        return page.replace('.html', '');
    }
    
    highlightCurrentPage() {
        const currentPage = this.getCurrentPage();
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        
        sidebarLinks.forEach(link => {
            const pageId = link.dataset.page;
            if (pageId === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    trackNavEvent(action, item = null) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'nav_' + action, {
                item: item,
                page: window.location.pathname
            });
        }
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.sidebarMenu = new SidebarMenu();
}); 