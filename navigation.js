// Navigation Module

// Определяем базовый путь для GitHub Pages
const BASE_PATH = (() => {
    const path = window.location.pathname;
    if (path.includes('/Tiarkel-Site/')) {
        return '/Tiarkel-Site/';
    }
    return './';
})();

// Fallback навигация при ошибке загрузки JSON
const FALLBACK_NAVIGATION = {
    ru: {
        main_sections: [
            {
                id: "home",
                title: "Главная",
                url: `${BASE_PATH}index.html`,
                sub_sections: []
            },
            {
                id: "about-course",
                title: "О курсе",
                url: "#about",
                sub_sections: []
            },
            {
                id: "program",
                title: "Программа курса",
                url: `${BASE_PATH}program.html`,
                sub_sections: []
            },
            {
                id: "store",
                title: "Магазин",
                url: `${BASE_PATH}store/`,
                sub_sections: []
            },
            {
                id: "cases",
                title: "Кейсы студентов",
                url: `${BASE_PATH}cases.html`,
                sub_sections: []
            },
            {
                id: "services",
                title: "Услуги дизайна",
                url: `${BASE_PATH}services.html`,
                sub_sections: []
            },
            {
                id: "pricing",
                title: "Тарифы и запись",
                sub_sections: [
                    {
                        id: "tariffs",
                        title: "Тарифы",
                        url: `${BASE_PATH}pricing.html`
                    },
                    {
                        id: "faq",
                        title: "FAQ",
                        url: `${BASE_PATH}faq.html`
                    },
                    {
                        id: "contacts",
                        title: "Контакты",
                        url: `${BASE_PATH}contacts.html`
                    },
                    {
                        id: "apply",
                        title: "Заявка на курс",
                        url: "#contact"
                    }
                ]
            }
        ]
    },
    uz: {
        main_sections: [
            {
                id: "home",
                title: "Bosh sahifa",
                url: `${BASE_PATH}index.html`,
                sub_sections: []
            },
            {
                id: "about-course",
                title: "Kurs haqida",
                url: "#about",
                sub_sections: []
            },
            {
                id: "program",
                title: "Kurs dasturi",
                url: `${BASE_PATH}program.html`,
                sub_sections: []
            },
            {
                id: "store",
                title: "Do'kon",
                url: `${BASE_PATH}store/`,
                sub_sections: []
            },
            {
                id: "cases",
                title: "Talabalar ishlari",
                url: `${BASE_PATH}cases.html`,
                sub_sections: []
            },
            {
                id: "services",
                title: "Dizayn xizmatlari",
                url: `${BASE_PATH}services.html`,
                sub_sections: []
            },
            {
                id: "pricing",
                title: "Tariflar va ro'yxatdan o'tish",
                sub_sections: [
                    {
                        id: "tariffs",
                        title: "Tariflar",
                        url: `${BASE_PATH}pricing.html`
                    },
                    {
                        id: "faq",
                        title: "FAQ",
                        url: `${BASE_PATH}faq.html`
                    },
                    {
                        id: "contacts",
                        title: "Aloqa",
                        url: `${BASE_PATH}contacts.html`
                    },
                    {
                        id: "apply",
                        title: "Kursga ariza",
                        url: "#contact"
                    }
                ]
            }
        ]
    }
};

class Navigation {
    constructor() {
        this.currentLanguage = 'ru';
        this.navigationData = null;
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.init();
    }

    async init() {
        try {
            await this.loadNavigationData();
            this.renderNavigation();
            this.bindEvents();
        } catch (error) {
            console.error('Failed to initialize navigation:', error);
            // Используем fallback навигацию
            this.navigationData = FALLBACK_NAVIGATION;
            this.renderNavigation();
            this.bindEvents();
        }
    }

    async loadNavigationData() {
        try {
            const response = await fetch(`${BASE_PATH}data/navigation.json`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            this.navigationData = await response.json();
        } catch (error) {
            console.error('Failed to load navigation data:', error);
            console.log('Using fallback navigation');
            // Fallback to basic navigation
            this.navigationData = FALLBACK_NAVIGATION;
        }
    }

    renderNavigation() {
        const navDrawer = document.getElementById('nav-drawer');
        if (!navDrawer) {
            console.warn('Nav drawer not found');
            return;
        }

        const navMenuContainer = navDrawer.querySelector('.nav-menu-container');
        if (!navMenuContainer) {
            console.warn('Nav menu container not found');
            return;
        }

        const sections = this.navigationData[this.currentLanguage].main_sections;
        
        navMenuContainer.innerHTML = `
            <ul class="nav-menu" role="menubar">
                ${sections.map(section => this.renderSection(section)).join('')}
            </ul>
        `;
    }

    renderSection(section) {
        const hasSubSections = section.sub_sections && section.sub_sections.length > 0;
        const isActive = this.isCurrentPage(section.url);
        
        if (hasSubSections) {
            return `
                <li class="nav-item has-dropdown" role="none">
                    <button class="nav-link dropdown-toggle ${isActive ? 'active' : ''}" 
                            aria-expanded="false" 
                            aria-haspopup="true"
                            role="menuitem"
                            aria-label="${section.title}">
                        ${section.title}
                        <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <ul class="dropdown-menu" role="menu" aria-label="${section.title}">
                        ${section.sub_sections.map(subSection => this.renderSubSection(subSection)).join('')}
                    </ul>
                </li>
            `;
        } else {
            return `
                <li class="nav-item" role="none">
                    <a href="${section.url}" 
                       class="nav-link ${isActive ? 'active' : ''}"
                       role="menuitem"
                       aria-label="${section.title}"
                       title="${section.title}">
                        ${section.title}
                    </a>
                </li>
            `;
        }
    }

    renderSubSection(subSection) {
        const isActive = this.isCurrentPage(subSection.url);
        return `
            <li role="none">
                <a href="${subSection.url}" 
                   class="dropdown-item ${isActive ? 'active' : ''}"
                   role="menuitem"
                   aria-label="${subSection.title}"
                   title="${subSection.title}">
                    ${subSection.title}
                </a>
            </li>
        `;
    }

    isCurrentPage(url) {
        if (url.startsWith('#')) return false;
        if (url === 'index.html' || url === '/') {
            return this.currentPage === 'index.html' || this.currentPage === '';
        }
        return this.currentPage === url;
    }

    bindEvents() {
        // Dropdown toggle events
        document.addEventListener('click', (e) => {
            const dropdownToggle = e.target.closest('.dropdown-toggle');
            if (dropdownToggle) {
                e.preventDefault();
                this.toggleDropdown(dropdownToggle);
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-item')) {
                this.closeAllDropdowns();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
            }
        });

        // Отключаем старое мобильное меню - теперь используется боковое меню
        // Mobile menu toggle - DISABLED
        /*
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
        */

        // Language switcher (if exists)
        const languageSwitcher = document.querySelector('.language-switcher');
        if (languageSwitcher) {
            languageSwitcher.addEventListener('click', () => {
                this.switchLanguage();
            });
        }
    }

    toggleDropdown(toggle) {
        const navItem = toggle.closest('.nav-item');
        const dropdown = navItem.querySelector('.dropdown-menu');
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

        // Close all other dropdowns
        this.closeAllDropdowns();

        if (!isExpanded) {
            toggle.setAttribute('aria-expanded', 'true');
            dropdown.classList.add('show');
        }
    }

    closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown-menu.show');
        const toggles = document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]');

        dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
        toggles.forEach(toggle => toggle.setAttribute('aria-expanded', 'false'));
    }

    toggleMobileMenu() {
        const navDrawer = document.getElementById('nav-drawer');
        const navBackdrop = document.querySelector('.nav-backdrop');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');

        if (navDrawer && navBackdrop && mobileToggle) {
            navDrawer.classList.add('active');
            navBackdrop.classList.add('active');
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