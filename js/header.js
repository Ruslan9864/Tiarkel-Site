/**
 * Header functionality for Tiarkel website
 * Handles mobile navigation drawer, focus management, and analytics
 */

class Header {
    constructor() {
        this.header = document.getElementById('header');
        this.burger = document.getElementById('burger');
        this.drawer = document.getElementById('navDrawer');
        this.backdrop = document.querySelector('.backdrop');
        this.drawerClose = document.querySelector('.drawer-close');
        this.body = document.body;
        
        this.isDrawerOpen = false;
        this.previousFocus = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupLanguageToggle();
        this.setupActiveLinks();
        this.setupAnalytics();
        
        console.log('Tiarkel header init — env=' + (window.location.hostname === 'ruslan9864.github.io' ? 'gh' : 'local'));
    }
    
    setupEventListeners() {
        // Burger menu toggle
        if (this.burger) {
            this.burger.addEventListener('click', () => this.toggleDrawer());
        }
        
        // Close drawer events
        if (this.drawerClose) {
            this.drawerClose.addEventListener('click', () => this.closeDrawer());
        }
        
        if (this.backdrop) {
            this.backdrop.addEventListener('click', () => this.closeDrawer());
        }
        
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Close drawer on navigation
        const drawerLinks = this.drawer?.querySelectorAll('.drawer-link');
        if (drawerLinks) {
            drawerLinks.forEach(link => {
                link.addEventListener('click', () => this.closeDrawer());
            });
        }
    }
    
    setupScrollEffects() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            // Add scrolled class for shadow effect
            if (window.scrollY > 10) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            // Optional: Show/hide mobile sticky CTA
            this.handleMobileStickyCTA();
            
            // Debounce scroll events
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Additional scroll-based effects can be added here
            }, 100);
        });
    }
    
    setupLanguageToggle() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }
    
    setupActiveLinks() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link, .drawer-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const page = link.dataset.page;
            
            // Remove existing active classes
            link.classList.remove('active');
            
            // Set active based on current page
            if (this.isCurrentPage(href, currentPath, page)) {
                link.classList.add('active');
            }
        });
    }
    
    setupAnalytics() {
        // Navigation click tracking
        const navLinks = document.querySelectorAll('.nav-link, .drawer-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const page = link.dataset.page;
                if (page && page !== 'home') {
                    this.trackEvent('nav_click', { item: page });
                }
            });
        });
        
        // CTA click tracking
        const ctaButtons = document.querySelectorAll('.header-cta, .drawer-cta');
        ctaButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.trackEvent('cta_enroll_click', { location: 'header' });
            });
        });
    }
    
    toggleDrawer() {
        if (this.isDrawerOpen) {
            this.closeDrawer();
        } else {
            this.openDrawer();
        }
    }
    
    openDrawer() {
        if (!this.drawer || this.isDrawerOpen) return;
        
        this.isDrawerOpen = true;
        this.previousFocus = document.activeElement;
        
        // Update ARIA attributes
        this.burger.setAttribute('aria-expanded', 'true');
        this.drawer.setAttribute('aria-hidden', 'false');
        
        // Show drawer and backdrop
        this.drawer.classList.add('open');
        this.backdrop.classList.add('visible');
        this.backdrop.hidden = false;
        
        // Prevent body scroll
        this.body.classList.add('drawer-open');
        
        // Add active class to burger
        this.burger.classList.add('active');
        
        // Focus management
        this.trapFocus();
        
        // Track analytics
        this.trackEvent('nav_open', { device: 'mobile' });
    }
    
    closeDrawer() {
        if (!this.drawer || !this.isDrawerOpen) return;
        
        this.isDrawerOpen = false;
        
        // Update ARIA attributes
        this.burger.setAttribute('aria-expanded', 'false');
        this.drawer.setAttribute('aria-hidden', 'true');
        
        // Hide drawer and backdrop
        this.drawer.classList.remove('open');
        this.backdrop.classList.remove('visible');
        setTimeout(() => {
            this.backdrop.hidden = true;
        }, 300);
        
        // Restore body scroll
        this.body.classList.remove('drawer-open');
        
        // Remove active class from burger
        this.burger.classList.remove('active');
        
        // Restore focus
        if (this.previousFocus) {
            this.previousFocus.focus();
        }
        
        // Track analytics
        this.trackEvent('nav_close', { device: 'mobile' });
    }
    
    trapFocus() {
        const focusableElements = this.drawer.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (firstElement) {
            firstElement.focus();
        }
        
        // Handle tab navigation within drawer
        this.drawer.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
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
    
    handleKeydown(e) {
        if (e.key === 'Escape' && this.isDrawerOpen) {
            this.closeDrawer();
        }
    }
    
    switchLanguage(lang) {
        // Update active state
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
        
        // Track analytics
        this.trackEvent('lang_switch', { to: lang });
        
        // TODO: Implement actual language switching logic
        console.log('Language switched to:', lang);
    }
    
    handleMobileStickyCTA() {
        // Optional: Show sticky CTA on mobile after scroll
        if (window.innerWidth <= 1023) {
            const scrollY = window.scrollY;
            const stickyCTA = document.querySelector('.mobile-sticky-cta');
            
            if (stickyCTA) {
                if (scrollY > 200) {
                    stickyCTA.classList.add('visible');
                } else {
                    stickyCTA.classList.remove('visible');
                }
            }
        }
    }
    
    isCurrentPage(href, currentPath, page) {
        // Handle home page
        if (page === 'home' && (currentPath === '/' || currentPath.endsWith('index.html'))) {
            return true;
        }
        
        // Handle other pages
        if (href && currentPath.includes(href.replace('.html', ''))) {
            return true;
        }
        
        // Handle store pages
        if (page === 'store' && currentPath.includes('/store')) {
            return true;
        }
        
        return false;
    }
    
    trackEvent(eventName, parameters = {}) {
        // Google Analytics 4 tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'navigation',
                ...parameters
            });
        }
        
        // Console logging for debugging
        console.log('Header event:', eventName, parameters);
    }
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Header();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Header;
} 