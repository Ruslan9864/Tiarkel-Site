// Navigation Module
class Navigation {
    constructor() {
        this.currentLanguage = 'ru';
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.init();
    }

    init() {
        this.renderNavigation();
        this.bindEvents();
    }

    renderNavigation() {
        const navDrawer = document.getElementById('nav-drawer');
        if (!navDrawer) return;

        const navMenuContainer = navDrawer.querySelector('.nav-menu-container');
        if (!navMenuContainer) return;

        // Статическая навигация для русского языка
        const navigationItems = [
            { title: 'Главная', url: this.getCorrectPath('index.html'), isActive: this.isCurrentPage('index.html') },
            { title: 'О курсе', url: this.getCorrectPath('#about'), isActive: false },
            { title: 'Программа курса', url: this.getCorrectPath('program.html'), isActive: this.isCurrentPage('program.html') },
            { title: 'Отзывы', url: this.getCorrectPath('#reviews'), isActive: false },
            { title: 'Кейсы студентов', url: this.getCorrectPath('cases.html'), isActive: this.isCurrentPage('cases.html') },
            { title: 'Услуги дизайна', url: this.getCorrectPath('services.html'), isActive: this.isCurrentPage('services.html') },
            { title: 'Тарифы', url: this.getCorrectPath('pricing.html'), isActive: this.isCurrentPage('pricing.html') },
            { title: 'FAQ', url: this.getCorrectPath('faq.html'), isActive: this.isCurrentPage('faq.html') },
            { title: 'Записаться', url: this.getCorrectPath('#contact'), isActive: false }
        ];
        
        navMenuContainer.innerHTML = `
            <ul class="nav-menu" role="menubar">
                ${navigationItems.map(item => this.renderNavItem(item)).join('')}
            </ul>
        `;
    }

    renderNavItem(item) {
        const activeClass = item.isActive ? 'active' : '';
        const ariaCurrent = item.isActive ? 'aria-current="page"' : '';
        
        return `
            <li class="nav-item" role="none">
                <a href="${item.url}" 
                   class="nav-link ${activeClass}"
                   role="menuitem"
                   aria-label="${item.title}"
                   title="${item.title}"
                   ${ariaCurrent}>
                    ${item.title}
                </a>
            </li>
        `;
    }

    getCorrectPath(url) {
        // Если мы находимся в папке courses, добавляем ../
        if (window.location.pathname.includes('/courses/')) {
            if (url.startsWith('#')) {
                return `../index.html${url}`;
            } else if (url === 'index.html') {
                return '../index.html';
            } else {
                return `../${url}`;
            }
        }
        return url;
    }

    isCurrentPage(url) {
        if (url.startsWith('#')) return false;
        if (url === 'index.html' || url === '/') {
            return this.currentPage === 'index.html' || this.currentPage === '';
        }
        return this.currentPage === url;
    }

    bindEvents() {
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navDrawer = document.getElementById('nav-drawer');
        const navBackdrop = document.querySelector('.nav-backdrop');
        const drawerClose = document.querySelector('.drawer-close');

        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        if (drawerClose) {
            drawerClose.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        if (navBackdrop) {
            navBackdrop.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Language switcher (if exists)
        const languageSwitcher = document.querySelector('.language-switcher');
        if (languageSwitcher) {
            languageSwitcher.addEventListener('click', () => {
                this.switchLanguage();
            });
        }

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const navDrawer = document.getElementById('nav-drawer');
        const navBackdrop = document.querySelector('.nav-backdrop');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');

        if (navDrawer && navBackdrop && mobileToggle) {
            navDrawer.classList.add('active');
            navBackdrop.classList.add('active');
            mobileToggle.classList.add('active');
            mobileToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }

    closeMobileMenu() {
        const navDrawer = document.getElementById('nav-drawer');
        const navBackdrop = document.querySelector('.nav-backdrop');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');

        if (navDrawer && navBackdrop && mobileToggle) {
            navDrawer.classList.remove('active');
            navBackdrop.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    switchLanguage() {
        this.currentLanguage = this.currentLanguage === 'ru' ? 'uz' : 'ru';
        this.renderNavigation();
        
        // Update language indicator
        const languageIndicator = document.querySelector('.language-indicator');
        if (languageIndicator) {
            languageIndicator.textContent = this.currentLanguage.toUpperCase();
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
}); 