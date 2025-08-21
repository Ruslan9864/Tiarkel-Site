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
                url: "index.html",
                sub_sections: []
            },
            {
                id: "program",
                title: "Программа",
                url: "program.html",
                sub_sections: []
            },
            {
                id: "pricing",
                title: "Тарифы",
                url: "pricing.html",
                sub_sections: []
            },
            {
                id: "store",
                title: "Магазин",
                url: "store/",
                sub_sections: []
            },
            {
                id: "cases",
                title: "Кейсы",
                url: "cases.html",
                sub_sections: []
            },
            {
                id: "faq",
                title: "FAQ",
                url: "faq.html",
                sub_sections: []
            },
            {
                id: "contacts",
                title: "Контакты",
                url: "contacts.html",
                sub_sections: []
            }
        ]
    },
    uz: {
        main_sections: [
            {
                id: "home",
                title: "Bosh sahifa",
                url: "index.html",
                sub_sections: []
            },
            {
                id: "program",
                title: "Dastur",
                url: "program.html",
                sub_sections: []
            },
            {
                id: "pricing",
                title: "Tariflar",
                url: "pricing.html",
                sub_sections: []
            },
            {
                id: "store",
                title: "Do'kon",
                url: "store/",
                sub_sections: []
            },
            {
                id: "cases",
                title: "Ishlar",
                url: "cases.html",
                sub_sections: []
            },
            {
                id: "faq",
                title: "FAQ",
                url: "faq.html",
                sub_sections: []
            },
            {
                id: "contacts",
                title: "Aloqa",
                url: "contacts.html",
                sub_sections: []
            }
        ]
    }
};

// Логирование инициализации
console.log(`Tiarkel nav init — env=${window.location.hostname === 'ruslan9864.github.io' ? 'gh' : 'local'} — base=${BASE_PATH}`);

class Navigation {
    constructor() {
        this.navigationData = null;
        this.currentLanguage = 'ru';
        this.init();
    }

    async init() {
        try {
            await this.loadNavigationData();
            this.renderNavigation();
            this.setupLanguageToggle();
            this.highlightCurrentPage();
        } catch (error) {
            console.error('Failed to initialize navigation:', error);
            // Используем fallback навигацию
            this.navigationData = FALLBACK_NAVIGATION;
            this.renderNavigation();
            this.highlightCurrentPage();
        }
    }

    async loadNavigationData() {
        try {
            // Используем относительный путь без BASE_PATH
            const response = await fetch('data/navigation.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.navigationData = await response.json();
        } catch (error) {
            console.warn('Using fallback navigation');
            throw error;
        }
    }

    renderNavigation() {
        const navMenu = document.getElementById('nav-menu');
        if (!navMenu) {
            console.warn('Nav menu container not found');
            return;
        }

        const sections = this.navigationData[this.currentLanguage].main_sections;
        navMenu.innerHTML = sections.map(section => this.renderNavItem(section)).join('');
    }

    renderNavItem(section) {
        const isActive = this.isCurrentPage(section.url);
        const activeClass = isActive ? 'active' : '';
        
        return `
            <li class="nav-item">
                <a href="${section.url}" class="nav-link ${activeClass}" data-page="${section.id}">
                    ${section.title}
                </a>
            </li>
        `;
    }

    isCurrentPage(url) {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Обработка различных форматов URL
        if (url === 'index.html' && (currentPage === 'index.html' || currentPage === '')) {
            return true;
        }
        
        if (url === currentPage) {
            return true;
        }
        
        // Обработка store/
        if (url === 'store/' && currentPath.includes('/store/')) {
            return true;
        }
        
        return false;
    }

    highlightCurrentPage() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const isActive = this.isCurrentPage(link.getAttribute('href'));
            link.classList.toggle('active', isActive);
        });
    }

    setupLanguageToggle() {
        // Заглушка для переключателя языка
        // В будущем можно добавить реальную функциональность
    }

    // Аналитика событий
    trackNavEvent(action, item = null) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'nav_' + action, {
                item: item,
                page: window.location.pathname
            });
        }
    }
}

// Инициализация навигации при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Navigation, FALLBACK_NAVIGATION };
} 