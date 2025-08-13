// FAQ toggle function
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');
    const isOpen = content.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-content').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.faq-icon').forEach(item => {
        item.textContent = '+';
    });
    
    // Toggle current item
    if (!isOpen) {
        content.classList.add('active');
        icon.textContent = '−';
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Remove initial animation classes
                element.classList.remove('animate-on-scroll');
                
                // Add specific animation based on element type
                if (element.classList.contains('fade-in-up')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                } else if (element.classList.contains('fade-in-left')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                } else if (element.classList.contains('fade-in-right')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                } else if (element.classList.contains('scale-in')) {
                    element.style.opacity = '1';
                    element.style.transform = 'scale(1)';
                } else if (element.classList.contains('slide-in-bottom')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                } else if (element.classList.contains('rotate-in')) {
                    element.style.opacity = '1';
                    element.style.transform = 'rotate(0deg)';
                } else if (element.classList.contains('bounce-in')) {
                    element.style.opacity = '1';
                    element.style.transform = 'scale(1)';
                    element.style.animation = 'bounceIn 0.8s ease-out';
                } else if (element.classList.contains('slide-in-left')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                } else if (element.classList.contains('slide-in-right')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                } else if (element.classList.contains('zoom-in')) {
                    element.style.opacity = '1';
                    element.style.transform = 'scale(1)';
                } else if (element.classList.contains('flip-in')) {
                    element.style.opacity = '1';
                    element.style.transform = 'rotateY(0deg)';
                }
            }
        });
    }, observerOptions);

    // Apply animations to all elements
    const animateElements = document.querySelectorAll(`
        .hero-content > *,
        .hero-badges .badge,
        .hero-card,
        .tools-grid .tool-item,
        .profession-item,
        .card,
        .stat-item,
        .company-item,
        .case-item,
        .speaker-card,
        .stage,
        .pricing-card,
        .faq-item,
        .why-item,
        .course-card,
        .review-item,
        .contact-container,
        .nav-menu a,
        .btn-primary,
        .btn-secondary,
        .social-link,
        .logo,
        .section-title,
        .hero-title,
        .hero-subtitle,
        .hero-description,
        .hero-info p,
        .scroll-hint,
        .cases-description,
        .courses-cta h3,
        .courses-cta p,
        .tools-note,
        .program-toc .toc-link,
        .program-rich h2,
        .program-rich h3,
        .program-rich h4,
        .callout,
        .short-program .sp-item,
        .sp-link,
        .course-features .feature,
        .course-price,
        .course-actions,
        .pricing-features li,
        .pricing-cta,
        .footer-social,
        .footer-legal,
        .vacancy-item,
        .earning-tier,
        .services-list li,
        .skills-list li,
        .portfolio-tag,
        .tool-icon,
        .icon-square,
        .faq-question,
        .contact-left,
        .contact-right,
        .btn-contact,
        .featured-badge,
        .services-divider,
        .earnings-title .title-line-1,
        .earnings-title .title-line-2,
        .earnings-description,
        .resume-title,
        .resume-subtitle,
        .about-school
    `);

    animateElements.forEach((el, index) => {
        // Set initial animation state
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Add animation delay based on element type and position
        let delay = index * 0.1;
        let animationType = 'fade-in-up';
        
        // Determine animation type based on element
        if (el.classList.contains('hero-title')) {
            animationType = 'fade-in-up';
            delay = 0.2;
        } else if (el.classList.contains('hero-subtitle')) {
            animationType = 'fade-in-up';
            delay = 0.4;
        } else if (el.classList.contains('hero-badges') || el.classList.contains('badge')) {
            animationType = 'bounce-in';
            delay = 0.6 + (index * 0.1);
        } else if (el.classList.contains('hero-card')) {
            animationType = 'scale-in';
            delay = 0.8;
        } else if (el.classList.contains('tool-item')) {
            animationType = 'slide-in-left';
            delay = index * 0.1;
        } else if (el.classList.contains('profession-item') || el.classList.contains('card')) {
            animationType = index % 2 === 0 ? 'fade-in-left' : 'fade-in-right';
            delay = index * 0.15;
        } else if (el.classList.contains('stat-item')) {
            animationType = 'zoom-in';
            delay = index * 0.2;
        } else if (el.classList.contains('company-item') || el.classList.contains('case-item')) {
            animationType = 'slide-in-bottom';
            delay = index * 0.15;
        } else if (el.classList.contains('speaker-card')) {
            animationType = 'flip-in';
            delay = index * 0.2;
        } else if (el.classList.contains('pricing-card')) {
            animationType = 'scale-in';
            delay = index * 0.15;
        } else if (el.classList.contains('faq-item')) {
            animationType = 'slide-in-bottom';
            delay = index * 0.1;
        } else if (el.classList.contains('why-item')) {
            animationType = 'rotate-in';
            delay = index * 0.15;
        } else if (el.classList.contains('course-card')) {
            animationType = 'fade-in-up';
            delay = index * 0.2;
        } else if (el.classList.contains('review-item')) {
            animationType = 'slide-in-right';
            delay = index * 0.15;
        } else if (el.classList.contains('contact-container')) {
            animationType = 'bounce-in';
            delay = 0.3;
        } else if (el.classList.contains('section-title')) {
            animationType = 'fade-in-up';
            delay = 0.2;
        } else if (el.classList.contains('vacancy-item')) {
            animationType = 'zoom-in';
            delay = index * 0.05;
        } else if (el.classList.contains('earning-tier')) {
            animationType = 'slide-in-left';
            delay = index * 0.1;
        } else if (el.classList.contains('services-list') || el.classList.contains('skills-list')) {
            animationType = 'fade-in-up';
            delay = index * 0.05;
        } else if (el.classList.contains('portfolio-tag')) {
            animationType = 'bounce-in';
            delay = index * 0.08;
        } else if (el.classList.contains('tool-icon') || el.classList.contains('icon-square')) {
            animationType = 'rotate-in';
            delay = index * 0.1;
        } else if (el.classList.contains('faq-question')) {
            animationType = 'slide-in-bottom';
            delay = index * 0.1;
        } else if (el.classList.contains('btn-primary') || el.classList.contains('btn-secondary') || el.classList.contains('btn-contact')) {
            animationType = 'scale-in';
            delay = 0.2;
        } else if (el.classList.contains('social-link')) {
            animationType = 'bounce-in';
            delay = index * 0.1;
        } else if (el.classList.contains('logo')) {
            animationType = 'fade-in-up';
            delay = 0.1;
        } else if (el.classList.contains('nav-menu') || el.classList.contains('nav-menu a')) {
            animationType = 'slide-in-left';
            delay = index * 0.1;
        }
        
        // Apply initial transform based on animation type
        switch(animationType) {
            case 'fade-in-up':
                el.style.transform = 'translateY(30px)';
                break;
            case 'fade-in-left':
                el.style.transform = 'translateX(-30px)';
                break;
            case 'fade-in-right':
                el.style.transform = 'translateX(30px)';
                break;
            case 'scale-in':
                el.style.transform = 'scale(0.8)';
                break;
            case 'slide-in-bottom':
                el.style.transform = 'translateY(30px)';
                break;
            case 'rotate-in':
                el.style.transform = 'rotate(-10deg)';
                break;
            case 'bounce-in':
                el.style.transform = 'scale(0.3)';
                break;
            case 'slide-in-left':
                el.style.transform = 'translateX(-50px)';
                break;
            case 'slide-in-right':
                el.style.transform = 'translateX(50px)';
                break;
            case 'zoom-in':
                el.style.transform = 'scale(0.5)';
                break;
            case 'flip-in':
                el.style.transform = 'rotateY(90deg)';
                break;
        }
        
        // Add animation class and delay
        el.classList.add(animationType);
        el.style.transitionDelay = `${delay}s`;
        
        // Observe element
        observer.observe(el);
    });

    // Staggered animation for badges
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        badge.style.animationDelay = `${0.6 + (index * 0.1)}s`;
    });

    // Hover animations for interactive elements
    const interactiveElements = document.querySelectorAll(`
        .btn-primary, .btn-secondary, .btn-contact,
        .tool-item, .card, .profession-item,
        .pricing-card, .speaker-card, .course-card,
        .case-item, .review-item, .why-item,
        .faq-question, .social-link, .nav-menu a,
        .vacancy-item, .earning-tier, .portfolio-tag,
        .icon-square, .tool-icon, .course-actions a
    `);

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace(/scale\([^)]*\)/, '') + ' scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(/scale\([^)]*\)/, '');
        });
    });

    // Special hover effects for specific elements
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.icon-square');
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.1)';
                icon.style.transition = 'transform 0.6s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.icon-square');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });

    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('premium')) {
                this.style.transform = 'scale(1.08) translateY(-8px)';
                this.style.boxShadow = '0 25px 50px rgba(191, 215, 50, 0.4)';
            } else {
                this.style.transform = 'scale(1.03) translateY(-5px)';
                this.style.boxShadow = '0 15px 30px rgba(98, 60, 151, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('premium')) {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 20px 40px rgba(191, 215, 50, 0.3)';
            } else {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            }
        });
    });

    // FAQ question hover effects
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.faq-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        question.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.faq-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
            this.style.transition = 'transform 0.3s ease, color 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Logo hover effect
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(10, 10, 15, 0.98)';
            header.style.transform = 'translateY(0)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
            header.style.transform = 'translateY(0)';
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isOpen = content.style.display === 'block';
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // Toggle current item
            if (!isOpen) {
                content.style.display = 'block';
            }
        });
    });

    // Mobile menu toggle (burger + drawer)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const drawer = document.querySelector('.nav-drawer');
    const backdrop = document.querySelector('.nav-backdrop');
    const drawerClose = document.querySelector('.drawer-close');
    const navMenu = document.querySelector('.nav-menu');
    const firstMenuItem = document.querySelector('.nav-menu a');

    const closeDrawer = () => {
        if (!drawer) return;
        drawer.classList.remove('active');
        backdrop && backdrop.classList.remove('active');
        mobileMenuToggle && mobileMenuToggle.classList.remove('active');
        mobileMenuToggle && mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        
        // Return focus to burger button
        mobileMenuToggle && mobileMenuToggle.focus();
    };

    const openDrawer = () => {
        if (!drawer) return;
        drawer.classList.add('active');
        backdrop && backdrop.classList.add('active');
        mobileMenuToggle && mobileMenuToggle.classList.add('active');
        mobileMenuToggle && mobileMenuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        
        // Focus first menu item
        setTimeout(() => {
            firstMenuItem && firstMenuItem.focus();
        }, 300);
    };

    // Toggle menu
    mobileMenuToggle && mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isOpen = drawer && drawer.classList.contains('active');
        
        if (isOpen) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    // Close on backdrop click
    backdrop && backdrop.addEventListener('click', closeDrawer);

    // Close on close button click
    drawerClose && drawerClose.addEventListener('click', closeDrawer);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) {
            closeDrawer();
        }
    });

    // Focus trap for menu
    if (drawer && navMenu) {
        const focusableElements = navMenu.querySelectorAll('a, button');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        drawer.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }

    // Header CTA button
    const headerCta = document.getElementById('header-cta');
    if (headerCta) {
        headerCta.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Header CTA clicked');
            // Здесь можно добавить аналитику
            // gtag('event', 'header_cta_click', { label: 'placeholder_button' });
        });
    }

    // Menu item clicks tracking
    const menuItems = document.querySelectorAll('.nav-menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemText = this.textContent.trim();
            console.log('Menu item clicked:', itemText);
            // Здесь можно добавить аналитику
            // gtag('event', 'menu_item_click', { label: itemText });
            
            // Close menu after click
            setTimeout(() => {
                closeDrawer();
            }, 100);
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-item h3');
    const animateCounters = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (stat.textContent.includes('$')) {
                    stat.textContent = `$${Math.floor(current)}+`;
                } else if (stat.textContent.includes('%')) {
                    stat.textContent = `${Math.floor(current)}%`;
                } else if (stat.textContent.includes('+')) {
                    stat.textContent = `${Math.floor(current)}+`;
                } else if (stat.textContent.includes('БОЛЬШОЕ')) {
                    stat.textContent = stat.textContent; // Don't animate text
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    };

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Smooth horizontal scrolling for sliders
    const sliders = document.querySelectorAll('.companies-slider, .cases-slider, .speakers-grid');
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 16);

window.addEventListener('scroll', optimizedScrollHandler); 