// Cases Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCasesPage();
});

function initializeCasesPage() {
    // Initialize filters
    initializeFilters();
    
    // Initialize case cards
    initializeCaseCards();
    
    // Initialize modal
    initializeModal();
    
    // Track page view
    trackPageView();
}

// Filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseCards = document.querySelectorAll('.case-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cases
            filterCases(filter);
            
            // Track filter usage
            trackEvent('filter_used', {
                filter: filter,
                cta: this.getAttribute('data-cta')
            });
        });
    });
}

function filterCases(filter) {
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });
    
    // Update grid layout
    setTimeout(() => {
        const grid = document.getElementById('casesGrid');
        if (grid) {
            grid.style.opacity = '1';
        }
    }, 300);
}

// Case cards functionality
function initializeCaseCards() {
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
        
        // Track card views
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const category = entry.target.getAttribute('data-category');
                    trackEvent('case_viewed', {
                        category: category,
                        case_id: entry.target.querySelector('h3').textContent
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(card);
    });
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('caseModal');
    const backdrop = modal.querySelector('.modal-backdrop');
    const closeBtn = modal.querySelector('.modal-close');
    
    // Close modal on backdrop click
    backdrop.addEventListener('click', closeCaseModal);
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.hasAttribute('aria-hidden')) {
            closeCaseModal();
        }
    });
    
    // Close modal on close button
    closeBtn.addEventListener('click', closeCaseModal);
}

// Case data for modal content
const caseData = {
    case1: {
        name: "Елена Иванова",
        segment: "Новичок",
        story: "Елена пришла на курс без опыта в дизайне. Работала в сфере продаж и хотела сменить профессию. За 3 месяца обучения создала портфолио из 12 работ и нашла первых клиентов.",
        task: "Создать профессиональное портфолио и найти первых клиентов",
        solution: "Прошла все модули курса, особое внимание уделила SMM-треку и практике с реальными проектами",
        result: "Первые заказы через 2 месяца обучения, стабильный заработок $1500/месяц",
        works: [
            { title: "Логотип для кофейни", image: "images/case-work-1-1.svg" },
            { title: "Сайт для салона красоты", image: "images/case-work-1-2.svg" },
            { title: "SMM-визуал для ресторана", image: "images/case-work-1-3.svg" }
        ],
        income: "$1500/месяц",
        timeline: "2 месяца до первых заказов"
    },
    case2: {
        name: "Анна Петрова",
        segment: "SMM-специалист",
        story: "Анна работала SMM-менеджером и хотела научиться создавать качественный визуальный контент самостоятельно. Это позволило бы ей увеличить чек и расширить услуги.",
        task: "Научиться создавать профессиональный визуальный контент для клиентов",
        solution: "Прошла SMM-трек и видео-трек, изучила тренды и инструменты",
        result: "Увеличила чек за дизайн в 3 раза, +40% заказов после создания портфолио",
        works: [
            { title: "Карусели для Instagram", image: "images/case-work-2-1.svg" },
            { title: "Сторис для бренда", image: "images/case-work-2-2.svg" },
            { title: "Рекламные баннеры", image: "images/case-work-2-3.svg" }
        ],
        income: "$2000/месяц",
        timeline: "1 месяц до увеличения заказов"
    },
    case3: {
        name: "Михаил Соколов",
        segment: "Предприниматель",
        story: "Михаил владеет IT-стартапом и хотел создать качественный сайт и брендинг для своей компании. Обращался в агентства, но цены были слишком высокими.",
        task: "Создать сайт и брендинг для IT-стартапа",
        solution: "Прошел модули по веб-дизайну и брендингу, изучил современные тренды",
        result: "Создал профессиональный сайт и брендинг, сэкономил $3000 на разработке",
        works: [
            { title: "Логотип и фирменный стиль", image: "images/case-work-3-1.svg" },
            { title: "Лендинг для стартапа", image: "images/case-work-3-2.svg" },
            { title: "Презентационные материалы", image: "images/case-work-3-3.svg" }
        ],
        income: "Экономия $3000",
        timeline: "3 месяца до запуска"
    },
    case4: {
        name: "Дмитрий Козлов",
        segment: "Переходник",
        story: "Дмитрий работал маркетологом и хотел перейти в дизайн. Имел базовые знания в Photoshop, но не понимал принципы дизайна и современные тренды.",
        task: "Сменить профессию с маркетолога на дизайнера",
        solution: "Прошел полный курс, особое внимание уделил карьерному треку и портфолио",
        result: "Успешно сменил профессию, работает дизайнером в агентстве",
        works: [
            { title: "Портфолио дизайнера", image: "images/case-work-4-1.svg" },
            { title: "Брендинг для клиентов", image: "images/case-work-4-2.svg" },
            { title: "Веб-дизайн проекты", image: "images/case-work-4-3.svg" }
        ],
        income: "$2500/месяц",
        timeline: "4 месяца до трудоустройства"
    },
    case5: {
        name: "Ольга Сидорова",
        segment: "Новичок",
        story: "Ольга была домохозяйкой и хотела найти удаленную работу. Выбрала дизайн как интересную и перспективную сферу. Начинала с нуля.",
        task: "Создать портфолио и найти удаленную работу",
        solution: "Прошла курс с нуля, много практиковалась, создала разнообразное портфолио",
        result: "Создала портфолио из 10 работ, работает удаленно с клиентами",
        works: [
            { title: "Логотипы для малого бизнеса", image: "images/case-work-5-1.svg" },
            { title: "Социальные сети", image: "images/case-work-5-2.svg" },
            { title: "Полиграфия", image: "images/case-work-5-3.svg" }
        ],
        income: "$1200/месяц",
        timeline: "3 месяца до первых заказов"
    },
    case6: {
        name: "Мария Волкова",
        segment: "SMM-специалист",
        story: "Мария работала SMM-менеджером и создавала простые картинки в Canva. Хотела научиться создавать уникальный контент и увеличить свой доход.",
        task: "Создавать уникальный визуальный контент и увеличить чек",
        solution: "Изучила профессиональные инструменты дизайна и тренды",
        result: "Увеличила чек за дизайн в 3 раза, создает уникальный контент",
        works: [
            { title: "Уникальные карусели", image: "images/case-work-6-1.svg" },
            { title: "Анимированные сторис", image: "images/case-work-6-2.svg" },
            { title: "Брендинг для клиентов", image: "images/case-work-6-3.svg" }
        ],
        income: "$1800/месяц",
        timeline: "2 месяца до увеличения чека"
    },
    case7: {
        name: "Александр Новиков",
        segment: "Предприниматель",
        story: "Александр запускал стартап в сфере EdTech. Нужен был качественный брендинг и сайт, но бюджет был ограничен. Решил научиться делать сам.",
        task: "Создать брендинг и сайт для EdTech стартапа",
        solution: "Прошел модули по брендингу и веб-дизайну, изучил UX/UI принципы",
        result: "Разработал профессиональный брендинг и сайт, сэкономил $5000",
        works: [
            { title: "Брендинг EdTech стартапа", image: "images/case-work-7-1.svg" },
            { title: "Лендинг для продукта", image: "images/case-work-7-2.svg" },
            { title: "Презентационные материалы", image: "images/case-work-7-3.svg" }
        ],
        income: "Экономия $5000",
        timeline: "4 месяца до запуска"
    },
    case8: {
        name: "Екатерина Морозова",
        segment: "Переходник",
        story: "Екатерина работала графическим дизайнером в полиграфии. Хотела перейти в веб-дизайн, так как там больше возможностей и выше зарплаты.",
        task: "Перейти из графического дизайна в веб-дизайн",
        solution: "Прошла модули по веб-дизайну, изучила современные технологии и тренды",
        result: "Успешно перешла в веб-дизайн, работает в digital-агентстве",
        works: [
            { title: "Веб-сайты", image: "images/case-work-8-1.svg" },
            { title: "Лендинги", image: "images/case-work-8-2.svg" },
            { title: "UI/UX дизайн", image: "images/case-work-8-3.svg" }
        ],
        income: "$3000/месяц",
        timeline: "3 месяца до трудоустройства"
    }
};

function openCaseModal(caseId) {
    const modal = document.getElementById('caseModal');
    const modalBody = document.getElementById('modalBody');
    const caseInfo = caseData[caseId];
    
    if (!caseInfo) return;
    
    // Create modal content
    const content = `
        <div class="case-modal-content">
            <div class="case-modal-header">
                <div class="case-author">
                    <img src="images/avatar-${caseId.replace('case', '')}.svg" alt="${caseInfo.name}" class="case-avatar">
                    <div class="case-author-info">
                        <h2>${caseInfo.name}</h2>
                        <span class="case-segment ${caseInfo.segment.toLowerCase()}">${caseInfo.segment}</span>
                    </div>
                </div>
                <div class="case-stats">
                    <div class="stat">
                        <span class="stat-label">Доход</span>
                        <span class="stat-value">${caseInfo.income}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Срок</span>
                        <span class="stat-value">${caseInfo.timeline}</span>
                    </div>
                </div>
            </div>
            
            <div class="case-modal-body">
                <div class="case-section">
                    <h3>История</h3>
                    <p>${caseInfo.story}</p>
                </div>
                
                <div class="case-section">
                    <h3>Задача</h3>
                    <p>${caseInfo.task}</p>
                </div>
                
                <div class="case-section">
                    <h3>Решение</h3>
                    <p>${caseInfo.solution}</p>
                </div>
                
                <div class="case-section">
                    <h3>Результат</h3>
                    <p>${caseInfo.result}</p>
                </div>
                
                <div class="case-section">
                    <h3>Работы</h3>
                    <div class="case-works">
                        ${caseInfo.works.map(work => `
                            <div class="case-work">
                                <img src="${work.image}" alt="${work.title}" loading="lazy">
                                <p>${work.title}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="case-modal-footer">
                <button class="btn-primary" onclick="handlePlanSelection('PRO')" data-cta="case_modal_pro">
                    Хочу так же — выбрать PRO
                </button>
                <button class="btn-outline" onclick="window.location.href='pricing.html'" data-cta="case_modal_pricing">
                    Посмотреть все тарифы
                </button>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = content;
    modal.removeAttribute('aria-hidden');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Track modal open
    trackEvent('case_modal_opened', {
        case_id: caseId,
        student_name: caseInfo.name,
        segment: caseInfo.segment
    });
}

function closeCaseModal() {
    const modal = document.getElementById('caseModal');
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Track modal close
    trackEvent('case_modal_closed');
}

// Analytics tracking
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: 'Кейсы студентов',
            page_location: window.location.href
        });
    }
}

function trackEvent(eventName, parameters = {}) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: 'cases_page',
            ...parameters
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, parameters);
    }
    
    // Console log for debugging
    console.log('Event tracked:', eventName, parameters);
}

// Smooth scrolling for anchor links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle plan selection (from script.js)
function handlePlanSelection(plan) {
    // Track plan selection
    trackEvent('plan_selected', {
        plan: plan,
        source: 'cases_page'
    });
    
    // Scroll to contact form or redirect to pricing
    if (window.location.pathname.includes('cases.html')) {
        window.location.href = 'pricing.html';
    } else {
        scrollToSection('contact');
    }
} 