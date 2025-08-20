// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Track scroll event for analytics
        trackEvent('scroll_to_section', {
            section: sectionId,
            timestamp: new Date().toISOString()
        });
    }
}

// Analytics tracking function
function trackEvent(eventName, parameters = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, parameters);
    }
    
    // Console log for debugging
    console.log('Event tracked:', eventName, parameters);
}

// CTA button click tracking
function trackCTAClick(ctaType, destination) {
    trackEvent('cta_click', {
        cta_type: ctaType,
        destination: destination,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
    });
}

// Enhanced scroll to section with CTA tracking
function scrollToSectionWithTracking(sectionId, ctaType = 'navigation') {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        trackEvent('scroll_to_section', {
            section: sectionId,
            cta_type: ctaType,
            timestamp: new Date().toISOString()
        });
    }
}

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
        
        // Track FAQ open event
        const question = button.querySelector('span').textContent;
        trackEvent('faq_opened', {
            question: question,
            timestamp: new Date().toISOString()
        });
    }
}

// Program accordion toggle function
function toggleProgram(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.program-icon');
    const isOpen = content.classList.contains('active');
    
    // Close all other program items
    document.querySelectorAll('.program-content').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.program-icon').forEach(item => {
        item.textContent = '+';
    });
    
    // Toggle current item
    if (!isOpen) {
        content.classList.add('active');
        icon.textContent = '−';
        
        // Track program section open event
        const section = button.querySelector('span').textContent;
        trackEvent('program_section_opened', {
            section: section,
            timestamp: new Date().toISOString()
        });
    }
}

// Form validation and submission
function validateForm(form) {
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const phone = form.querySelector('input[name="phone"]');
    
    let isValid = true;
    
    // Clear previous error states
    [name, email, phone].forEach(field => {
        if (field) {
            field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    });
    
    // Validate name
    if (name && name.value.trim().length < 2) {
        name.style.borderColor = '#ff6b6b';
        isValid = false;
    }
    
    // Validate email
    if (email && !isValidEmail(email.value)) {
        email.style.borderColor = '#ff6b6b';
        isValid = false;
    }
    
    // Validate phone (optional but if provided, should be valid)
    if (phone && phone.value.trim() && !isValidPhone(phone.value)) {
        phone.style.borderColor = '#ff6b6b';
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize CTA button tracking
    initializeCTATracking();
    
    // Initialize pricing page specific tracking
    if (window.location.pathname.includes('pricing.html')) {
        initializePricingCTATracking();
    }
    
    // Initialize scroll tracking
    initializeScrollTracking();
    
    // Initialize form tracking
    initializeFormTracking();
    
    // Track page view
    trackEvent('page_view', {
        page: window.location.pathname,
        title: document.title,
        timestamp: new Date().toISOString()
    });
    
    // Close modal on backdrop click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-backdrop')) {
            closePricingModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePricingModal();
        }
    });
});

// Initialize CTA button tracking
function initializeCTATracking() {
    // Track all CTA buttons with data-cta attribute
    document.querySelectorAll('[data-cta]').forEach(button => {
        button.addEventListener('click', function(e) {
            const ctaType = this.getAttribute('data-cta');
            const destination = this.getAttribute('href') || this.getAttribute('onclick') || 'unknown';
            
            trackCTAClick(ctaType, destination);
        });
    });
    
    // Track hero CTA buttons specifically
    const heroPricingBtn = document.querySelector('[data-cta="hero_pricing"]');
    const heroProgramBtn = document.querySelector('[data-cta="hero_program"]');
    const reviewsCasesBtn = document.querySelector('[data-cta="reviews_cases"]');
    
    if (heroPricingBtn) {
        heroPricingBtn.addEventListener('click', function() {
            trackCTAClick('hero_pricing', 'pricing.html');
        });
    }
    
    if (heroProgramBtn) {
        heroProgramBtn.addEventListener('click', function() {
            trackCTAClick('hero_program', '#program');
        });
    }
    
    if (reviewsCasesBtn) {
        reviewsCasesBtn.addEventListener('click', function() {
            trackCTAClick('reviews_cases', 'cases.html');
        });
    }
}

// Initialize scroll tracking
function initializeScrollTracking() {
    let scrollDepth = 0;
    const scrollThresholds = [25, 50, 75, 90];
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        scrollThresholds.forEach(threshold => {
            if (scrollPercent >= threshold && scrollDepth < threshold) {
                scrollDepth = threshold;
                trackEvent('scroll_depth', {
                    depth: threshold,
                    timestamp: new Date().toISOString()
                });
            }
        });
    });
}

// Initialize form tracking
function initializeFormTracking() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                trackEvent('form_submitted', {
                    form_type: 'contact',
                    timestamp: new Date().toISOString()
                });
                
                // Here you would typically submit the form data
                // For now, we'll just show a success message
                showSuccessMessage('Спасибо! Мы свяжемся с вами в ближайшее время.');
            }
        });
    }
}

// Show success message
function showSuccessMessage(message) {
    const form = document.getElementById('contactForm');
    if (form) {
        form.innerHTML = `
            <div class="success-message">
                <h3>✅ ${message}</h3>
                <p>Мы получили вашу заявку и ответим в течение 2 часов.</p>
            </div>
        `;
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

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Отправлено!';
                submitBtn.style.background = '#10B981';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                }, 3000);
                
                // Here you would typically send the form data to your server
                console.log('Form submitted successfully');
            }
        });
    }

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
        .about-school,
        .advantage-item,
        .program-item,
        .about-course-content,
        .final-cta-content
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
        } else if (el.classList.contains('advantage-item')) {
            animationType = 'fade-in-up';
            delay = index * 0.1;
        } else if (el.classList.contains('program-item')) {
            animationType = 'slide-in-bottom';
            delay = index * 0.1;
        } else if (el.classList.contains('about-course-content')) {
            animationType = 'fade-in-up';
            delay = 0.3;
        } else if (el.classList.contains('final-cta-content')) {
            animationType = 'bounce-in';
            delay = 0.2;
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
        .icon-square, .tool-icon, .course-actions a,
        .advantage-item, .program-question
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

    // Header CTA button
    const headerCta = document.getElementById('header-cta');
    if (headerCta) {
        headerCta.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('contact');
        });
    }

    // Menu item clicks tracking
    const menuItems = document.querySelectorAll('.nav-menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemText = this.textContent.trim();
            console.log('Menu item clicked:', itemText);
            
            // Close menu after click
            setTimeout(() => {
                // The mobile menu toggle logic is now handled by the navigation module
                // This setTimeout is no longer needed here.
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
    const sliders = document.querySelectorAll('.companies-slider, .cases-slider, .speakers-grid, .reviews-slider');
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

// Pricing page functions
function handlePlanSelection(planName) {
    // Track plan selection
    trackEvent('plan_selected', {
        plan: planName,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
    });
    
    // Show pricing modal
    showPricingModal(planName);
}

function showPricingModal(selectedPlan) {
    // Create modal HTML
    const modalHTML = `
        <div class="pricing-modal" id="pricingModal">
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="closePricingModal()" aria-label="Закрыть">×</button>
                <div class="modal-header">
                    <h3>Выбрать тариф ${selectedPlan}</h3>
                    <p>Заполните форму и мы свяжемся с вами в течение 2 часов</p>
                </div>
                <form class="pricing-form" id="pricingForm" onsubmit="handlePricingFormSubmit(event)">
                    <input type="hidden" name="selected_plan" value="${selectedPlan}">
                    <input type="hidden" name="utm_source" id="utm_source">
                    <input type="hidden" name="utm_medium" id="utm_medium">
                    <input type="hidden" name="utm_campaign" id="utm_campaign">
                    
                    <div class="form-group">
                        <label for="name">Ваше имя *</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Телефон</label>
                        <input type="tel" id="phone" name="phone">
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Дополнительная информация</label>
                        <textarea id="message" name="message" rows="3" placeholder="Расскажите о ваших целях"></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn-primary btn-large">
                            Отправить заявку
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Extract UTM parameters
    extractUTMParameters();
    
    // Show modal with animation
    setTimeout(() => {
        document.getElementById('pricingModal').classList.add('active');
    }, 10);
    
    // Track modal open
    trackEvent('pricing_modal_opened', {
        plan: selectedPlan,
        timestamp: new Date().toISOString()
    });
}

function closePricingModal() {
    const modal = document.getElementById('pricingModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function handlePricingFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const selectedPlan = formData.get('selected_plan');
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Track form submission
    trackEvent('pricing_form_submitted', {
        plan: selectedPlan,
        timestamp: new Date().toISOString()
    });
    
    // Show success message
    showPricingSuccess(selectedPlan);
}

function showPricingSuccess(planName) {
    const modal = document.getElementById('pricingModal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <button class="modal-close" onclick="closePricingModal()" aria-label="Закрыть">×</button>
        <div class="success-content">
            <div class="success-icon">✅</div>
            <h3>Спасибо за заявку!</h3>
            <p>Мы получили вашу заявку на тариф <strong>${planName}</strong> и свяжемся с вами в течение 2 часов.</p>
            <div class="success-details">
                <p><strong>Что дальше:</strong></p>
                <ul>
                    <li>Наш менеджер свяжется с вами</li>
                    <li>Ответит на все вопросы</li>
                    <li>Поможет с оплатой</li>
                    <li>Добавит в закрытый чат курса</li>
                </ul>
            </div>
        </div>
    `;
    
    // Track success
    trackEvent('pricing_success', {
        plan: planName,
        timestamp: new Date().toISOString()
    });
}

function extractUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    
    if (utmSource) document.getElementById('utm_source').value = utmSource;
    if (utmMedium) document.getElementById('utm_medium').value = utmMedium;
    if (utmCampaign) document.getElementById('utm_campaign').value = utmCampaign;
}

// Enhanced CTA tracking for pricing page
function initializePricingCTATracking() {
    // Track all pricing CTA buttons
    document.querySelectorAll('[data-cta^="pricing_"]').forEach(button => {
        button.addEventListener('click', function() {
            const ctaType = this.getAttribute('data-cta');
            const planName = this.closest('.pricing-card')?.id?.toUpperCase() || 'unknown';
            
            trackCTAClick(ctaType, planName);
        });
    });
    
    // Track comparison table interactions
    const comparisonTable = document.querySelector('.comparison-table');
    if (comparisonTable) {
        comparisonTable.addEventListener('click', function(e) {
            if (e.target.closest('td')) {
                trackEvent('comparison_table_clicked', {
                    timestamp: new Date().toISOString()
                });
            }
        });
    }
    
    // Track FAQ interactions
    document.querySelectorAll('.pricing-faq-section .faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const questionText = this.querySelector('span').textContent;
            trackEvent('pricing_faq_opened', {
                question: questionText,
                timestamp: new Date().toISOString()
            });
        });
    });
} 