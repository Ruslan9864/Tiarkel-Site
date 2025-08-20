/**
 * Program Page JavaScript
 * Управление модулями, аккордеоном и интерактивностью
 */

class ProgramPage {
    constructor() {
        this.modules = [
            {
                id: 1,
                title: "Основы брендинга",
                description: "Изучаем принципы создания бренда, психологию восприятия и основы фирменного стиля. Разбираем современные тренды в брендинге.",
                deliverables: ["Логотип для собственного проекта", "Базовая бренд-система", "Презентация концепции"]
            },
            {
                id: 2,
                title: "Логотипы и символы",
                description: "Создаем эффективные логотипы, изучаем принципы символизма и работаем с различными стилями дизайна.",
                deliverables: ["3 варианта логотипа", "Векторная графика", "Адаптивные версии"]
            },
            {
                id: 3,
                title: "Фирменный стиль",
                description: "Разрабатываем полный фирменный стиль: цветовая палитра, типографика, носители и гайдлайны.",
                deliverables: ["Брендбук", "Цветовая палитра", "Типографическая система"]
            },
            {
                id: 4,
                title: "Веб-дизайн и UI/UX",
                description: "Создаем современные веб-интерфейсы, изучаем принципы UX и работаем с Figma.",
                deliverables: ["Лендинг-страница", "Мобильная версия", "Прототип в Figma"]
            },
            {
                id: 5,
                title: "SMM-дизайн",
                description: "Создаем визуал для социальных сетей: посты, сторис, карусели и рекламные баннеры.",
                deliverables: ["Набор постов для Instagram", "Сторис-шаблоны", "Рекламные баннеры"]
            },
            {
                id: 6,
                title: "Полиграфия",
                description: "Работаем с печатными носителями: визитки, буклеты, плакаты и наружная реклама.",
                deliverables: ["Визитки и буклеты", "Плакат", "Наружная реклама"]
            },
            {
                id: 7,
                title: "Видео и анимация",
                description: "Создаем короткие видео, анимации и motion-графику для социальных сетей.",
                deliverables: ["Reels/Shorts видео", "Анимированный логотип", "Motion-графика"]
            },
            {
                id: 8,
                title: "Портфолио и презентация",
                description: "Создаем профессиональное портфолио и учимся презентовать свои работы клиентам.",
                deliverables: ["Портфолио-сайт", "Презентация проектов", "Case study"]
            },
            {
                id: 9,
                title: "Работа с клиентами",
                description: "Изучаем процесс работы с клиентами: брифы, презентации, правки и сдача проектов.",
                deliverables: ["Бриф-шаблон", "Презентация для клиента", "Процесс сдачи проекта"]
            },
            {
                id: 10,
                title: "Продвижение и маркетинг",
                description: "Учимся продвигать свои услуги, находить клиентов и строить личный бренд.",
                deliverables: ["Стратегия продвижения", "Личный бренд", "Маркетинговые материалы"]
            },
            {
                id: 11,
                title: "Бизнес-процессы",
                description: "Настраиваем бизнес-процессы: ценообразование, договоры, работа с командой.",
                deliverables: ["Прайс-лист", "Договор-шаблон", "Бизнес-план"]
            },
            {
                id: 12,
                title: "Дипломный проект",
                description: "Создаем полноценный проект для реального клиента или собственного бренда.",
                deliverables: ["Полный брендинг проекта", "Веб-сайт", "SMM-стратегия"]
            }
        ];

        this.specialTracks = [
            {
                id: 'smm',
                title: 'SMM-трек',
                description: 'Создание визуального контента для социальных сетей',
                features: ['Карусели для Instagram', 'Сторис и Reels', 'Рекламные баннеры', 'Визуальная стратегия'],
                tariffs: {
                    lite: 'Демо-доступ',
                    pro: 'Полный доступ',
                    vip: 'Полный доступ + ментор',
                    studio: 'Полный доступ'
                }
            },
            {
                id: 'video',
                title: 'Видео-трек',
                description: 'Создание видео контента и анимации',
                features: ['Монтаж Reels/Shorts', 'Интро-анимации', 'Motion Design', 'Видео-стратегия'],
                tariffs: {
                    lite: 'Недоступно',
                    pro: 'Ограниченный доступ',
                    vip: 'Полный доступ + ментор',
                    studio: 'Полный доступ'
                }
            }
        ];

        this.careerTrack = {
            title: 'Карьерный трек',
            description: 'Подготовка к работе в дизайн-студии или фрилансе',
            features: [
                'Резюме и портфолио',
                'Подготовка к собеседованию',
                'Личный бренд и соцсети',
                'Поиск первых клиентов'
            ],
            available: ['pro', 'vip']
        };

        this.learningFormats = [
            {
                icon: '📹',
                title: 'Онлайн-лекции',
                description: 'Живые вебинары с экспертами индустрии'
            },
            {
                icon: '✏️',
                title: 'Домашние задания',
                description: 'Практические задания с проверкой менторами'
            },
            {
                icon: '💬',
                title: 'Групповой чат',
                description: 'Общение с однокурсниками и наставниками'
            },
            {
                icon: '👁️',
                title: 'Ревью работ',
                description: 'Персональная обратная связь по каждому проекту'
            }
        ];

        this.testimonials = [
            {
                name: 'Анна Петрова',
                profession: 'SMM-менеджер',
                photo: '👩‍💼',
                text: 'После курса я смогла создать полноценный бренд для своего бизнеса. Теперь у меня есть стабильный поток клиентов!'
            },
            {
                name: 'Михаил Козлов',
                profession: 'Фрилансер',
                photo: '👨‍💻',
                text: 'Курс дал мне все необходимые навыки для работы с клиентами. Портфолио из 12 работ помогло найти первых заказчиков.'
            },
            {
                name: 'Елена Сидорова',
                profession: 'Дизайнер',
                photo: '👩‍🎨',
                text: 'Отличная программа! Особенно полезны были спец-треки по SMM и видео. Теперь я могу предложить клиентам полный спектр услуг.'
            }
        ];

        this.studentWorks = [
            { image: 'images/work-1.svg', title: 'Брендинг кафе', category: 'Брендинг' },
            { image: 'images/work-2.svg', title: 'Фирменный стиль', category: 'Айдентика' },
            { image: 'images/student-work-3.svg', title: 'SMM-визуал', category: 'SMM' },
            { image: 'images/student-work-4.svg', title: 'Видео контент', category: 'Видео' },
            { image: 'images/student-work-5.svg', title: 'Веб-дизайн', category: 'Веб' }
        ];

        this.init();
    }

    init() {
        this.renderHero();
        this.renderModules();
        this.renderSpecialTracks();
        this.renderCareerTrack();
        this.renderTimeline();
        this.renderLearningFormats();
        this.renderTestimonials();
        this.renderStudentWorks();
        this.renderFAQ();
        this.renderFinalCTA();
        this.bindEvents();
        this.setupAnalytics();
    }

    renderHero() {
        const hero = document.querySelector('.program-hero');
        if (!hero) return;

        hero.innerHTML = `
            <div class="container">
                <h1 class="hero-title">Программа курса Tiarkel — 12 модулей, спец-треки, портфолио 10–12 работ</h1>
                <p class="hero-description">
                    Научитесь создавать профессиональный дизайн и брендинг с нуля. 
                    За 3 месяца освоите все необходимые навыки для работы в дизайн-студии или фрилансе.
                </p>
                <button class="cta-button" onclick="scrollToSection('pricing')">
                    Записаться на курс
                </button>
            </div>
        `;
    }

    renderModules() {
        const accordion = document.getElementById('modules-accordion');
        if (!accordion) return;

        const modulesHTML = this.modules.map(module => this.renderModule(module)).join('');
        accordion.innerHTML = modulesHTML;
    }

    renderModule(module) {
        const deliverablesHTML = module.deliverables.map(item => `<li>${item}</li>`).join('');
        return `
            <div class="module-item">
                <button class="module-question" aria-expanded="false" aria-controls="module-${module.id}">
                    <span class="module-number">${module.id.toString().padStart(2, '0')}</span>
                    <span class="module-title">${module.title}</span>
                    <span class="module-arrow">▼</span>
                </button>
                <div class="module-content" id="module-${module.id}">
                    <div class="module-description">
                        <p>${module.description}</p>
                    </div>
                    <div class="module-deliverables">
                        <h4>→ К концу модуля у тебя будет:</h4>
                        <ul>
                            ${deliverablesHTML}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    renderSpecialTracks() {
        const section = document.querySelector('.special-tracks-section');
        if (!section) return;

        const tracksHTML = this.specialTracks.map(track => `
            <div class="track-card">
                <div class="track-header">
                    <h3>${track.title}</h3>
                    <p>${track.description}</p>
                </div>
                <div class="track-features">
                    <h4>Что входит:</h4>
                    <ul>
                        ${track.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="track-tariffs">
                    <h4>Доступ по тарифам:</h4>
                    <div class="tariff-access">
                        <span class="tariff lite">LITE: ${track.tariffs.lite}</span>
                        <span class="tariff pro">PRO: ${track.tariffs.pro}</span>
                        <span class="tariff vip">VIP: ${track.tariffs.vip}</span>
                        <span class="tariff studio">STUDIO: ${track.tariffs.studio}</span>
                    </div>
                </div>
            </div>
        `).join('');

        section.innerHTML = `
            <div class="container">
                <h2 class="section-title">Специальные треки</h2>
                <p class="section-description">Углубленные программы по SMM и видео контенту</p>
                <div class="tracks-grid">
                    ${tracksHTML}
                </div>
            </div>
        `;
    }

    renderCareerTrack() {
        const section = document.querySelector('.career-track-section');
        if (!section) return;

        const featuresHTML = this.careerTrack.features.map(feature => `<li>${feature}</li>`).join('');

        section.innerHTML = `
            <div class="container">
                <div class="career-track-card">
                    <div class="career-badge">PRO+</div>
                    <h2>${this.careerTrack.title}</h2>
                    <p>${this.careerTrack.description}</p>
                    <ul>
                        ${featuresHTML}
                    </ul>
                    <div class="career-note">
                        <p>⚠️ Доступно только в тарифах PRO и VIP</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderTimeline() {
        const section = document.querySelector('.timeline-section');
        if (!section) return;

        section.innerHTML = `
            <div class="container">
                <h2 class="section-title">Таймлайн обучения</h2>
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-point"></div>
                        <div class="timeline-content">
                            <h4>Недели 1-2</h4>
                            <p>Первые работы и основы</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-point"></div>
                        <div class="timeline-content">
                            <h4>Недели 3-6</h4>
                            <p>Базовые модули</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-point"></div>
                        <div class="timeline-content">
                            <h4>Недели 7-10</h4>
                            <p>Спец-треки</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-point"></div>
                        <div class="timeline-content">
                            <h4>Недели 11-12</h4>
                            <p>Дипломный проект</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderLearningFormats() {
        const section = document.querySelector('.learning-formats-section');
        if (!section) return;

        const formatsHTML = this.learningFormats.map(format => `
            <div class="format-card">
                <div class="format-icon">${format.icon}</div>
                <h3>${format.title}</h3>
                <p>${format.description}</p>
            </div>
        `).join('');

        section.innerHTML = `
            <div class="container">
                <h2 class="section-title">Как проходит обучение</h2>
                <div class="formats-grid">
                    ${formatsHTML}
                </div>
            </div>
        `;
    }

    renderTestimonials() {
        const section = document.querySelector('.testimonials-section');
        if (!section) return;

        const testimonialsHTML = this.testimonials.map(testimonial => `
            <div class="testimonial-card">
                <div class="testimonial-photo">${testimonial.photo}</div>
                <div class="testimonial-content">
                    <p>"${testimonial.text}"</p>
                    <div class="testimonial-author">
                        <strong>${testimonial.name}</strong>
                        <span>${testimonial.profession}</span>
                    </div>
                </div>
            </div>
        `).join('');

        section.innerHTML = `
            <div class="container">
                <h2 class="section-title">Отзывы студентов</h2>
                <div class="testimonials-grid">
                    ${testimonialsHTML}
                </div>
            </div>
        `;
    }

    renderStudentWorks() {
        const section = document.querySelector('.student-works-section');
        if (!section) return;

        const worksHTML = this.studentWorks.map(work => `
            <div class="work-item" onclick="openWorkModal('${work.image}', '${work.title}', '${work.category}')">
                <img src="${work.image}" alt="Работа студента: ${work.title}" loading="lazy">
                <div class="work-overlay">
                    <h4>${work.title}</h4>
                    <span>${work.category}</span>
                </div>
            </div>
        `).join('');

        section.innerHTML = `
            <div class="container">
                <h2 class="section-title">Работы студентов</h2>
                <div class="works-grid">
                    ${worksHTML}
                </div>
                <div class="works-cta">
                    <button class="cta-button" onclick="scrollToSection('pricing')">
                        Хочу так же — выбрать тариф
                    </button>
                </div>
            </div>
        `;
    }

    renderFAQ() {
        const section = document.querySelector('.faq-section');
        if (!section) return;

        const faqs = [
            {
                question: "Сколько времени нужно уделять обучению?",
                answer: "Рекомендуем 2-3 часа в день, 5 дней в неделю. Общая продолжительность курса — 3 месяца."
            },
            {
                question: "Нужны ли навыки дизайна для начала обучения?",
                answer: "Нет, курс рассчитан на новичков. Мы начинаем с основ и постепенно переходим к сложным проектам."
            },
            {
                question: "Какие программы используются в курсе?",
                answer: "Основные: Figma, Adobe Photoshop, Adobe Illustrator. Также изучаем бесплатные альтернативы."
            },
            {
                question: "Получу ли я сертификат по окончании?",
                answer: "Да, все студенты получают сертификат о прохождении курса и портфолио из 10-12 работ."
            },
            {
                question: "Есть ли поддержка после окончания курса?",
                answer: "Да, у вас остается доступ к материалам курса и чату с однокурсниками на 6 месяцев."
            }
        ];

        const faqHTML = faqs.map((faq, index) => `
            <div class="faq-item">
                <button class="faq-question" aria-expanded="false" aria-controls="faq-${index}">
                    ${faq.question}
                    <span class="faq-arrow">▼</span>
                </button>
                <div class="faq-content" id="faq-${index}">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `).join('');

        section.innerHTML = `
            <div class="container">
                <h2 class="section-title">Часто задаваемые вопросы</h2>
                <div class="faq-list">
                    ${faqHTML}
                </div>
            </div>
        `;
    }

    renderFinalCTA() {
        const section = document.querySelector('.final-cta-section');
        if (!section) return;

        section.innerHTML = `
            <div class="container">
                <h2>Готовы начать обучение?</h2>
                <p>Присоединяйтесь к курсу и создайте свое портфолио из 10-12 работ</p>
                <button class="cta-button" onclick="scrollToSection('pricing')">
                    Выбрать тариф
                </button>
            </div>
        `;
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.module-question')) {
                this.toggleModule(e.target.closest('.module-question'));
            }
            if (e.target.closest('.faq-question')) {
                this.toggleFAQ(e.target.closest('.faq-question'));
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const target = e.target.closest('.module-question, .faq-question');
                if (target) {
                    e.preventDefault();
                    if (target.classList.contains('module-question')) {
                        this.toggleModule(target);
                    } else {
                        this.toggleFAQ(target);
                    }
                }
            }
        });
    }

    toggleModule(button) {
        const content = document.getElementById(button.getAttribute('aria-controls'));
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        
        // Close all other modules
        document.querySelectorAll('.module-question[aria-expanded="true"]').forEach(btn => {
            if (btn !== button) {
                btn.setAttribute('aria-expanded', 'false');
                btn.querySelector('.module-arrow').textContent = '▼';
                document.getElementById(btn.getAttribute('aria-controls')).style.display = 'none';
            }
        });

        // Toggle current module
        button.setAttribute('aria-expanded', !isExpanded);
        button.querySelector('.module-arrow').textContent = isExpanded ? '▼' : '▲';
        content.style.display = isExpanded ? 'none' : 'block';

        // Track analytics
        this.trackEvent('module_toggled', {
            module_id: button.getAttribute('aria-controls'),
            action: isExpanded ? 'closed' : 'opened'
        });
    }

    toggleFAQ(button) {
        const content = document.getElementById(button.getAttribute('aria-controls'));
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        
        button.setAttribute('aria-expanded', !isExpanded);
        button.querySelector('.faq-arrow').textContent = isExpanded ? '▼' : '▲';
        content.style.display = isExpanded ? 'none' : 'block';

        // Track analytics
        this.trackEvent('faq_toggled', {
            faq_id: button.getAttribute('aria-controls'),
            action: isExpanded ? 'closed' : 'opened'
        });
    }

    setupAnalytics() {
        // Track page view
        this.trackEvent('program_page_viewed');

        // Track scroll depth
        this.trackScrollDepth();

        // Track CTA clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('cta-button')) {
                this.trackEvent('program_cta_clicked', {
                    location: this.getButtonLocation(e.target)
                });
            }
        });
    }

    getButtonLocation(button) {
        const section = button.closest('section');
        if (section) {
            return section.className.replace('-section', '');
        }
        return 'unknown';
    }

    trackScrollDepth() {
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll % 25 === 0) { // Track every 25%
                    this.trackEvent('program_scroll_depth', {
                        depth: maxScroll
                    });
                }
            }
        });
    }

    trackEvent(eventName, parameters = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'program_page',
                ...parameters
            });
        }

        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, parameters);
        }

        // Console log for debugging
        console.log('Program Page Event:', eventName, parameters);
    }
}

// Global function for scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'pricing') {
        window.location.href = 'pricing.html';
    }
}

// Global function for opening work modal
function openWorkModal(image, title, category) {
    // Create modal HTML
    const modalHTML = `
        <div class="work-modal" id="work-modal">
            <div class="work-modal-content">
                <button class="work-modal-close" onclick="closeWorkModal()">×</button>
                <img src="${image}" alt="Работа студента: ${title}">
                <h3>${title}</h3>
                <p>Категория: ${category}</p>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Track modal open
    if (window.programPage) {
        window.programPage.trackEvent('work_modal_opened', {
            work_title: title,
            work_category: category
        });
    }
}

// Global function for closing work modal
function closeWorkModal() {
    const modal = document.getElementById('work-modal');
    if (modal) {
        modal.remove();
    }
}

// Close modal on backdrop click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('work-modal')) {
        closeWorkModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeWorkModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    window.programPage = new ProgramPage();
}); 