// Cases Page Functionality
class CasesPage {
    constructor() {
        this.currentFilter = 'all';
        this.casesData = this.getCasesData();
        this.init();
    }

    init() {
        this.bindFilterEvents();
        this.bindCaseCardEvents();
        this.initializeAnalytics();
    }

    getCasesData() {
        return {
            case1: {
                name: 'Мария Иванова',
                category: 'beginners',
                categoryLabel: 'Новичок',
                result: 'Первые заказы через 2 месяца',
                description: 'Пришла с нуля, сейчас работаю с 3 постоянными клиентами',
                story: 'Мария пришла на курс без опыта в дизайне. Работала администратором, но всегда мечтала о творческой профессии. На курсе освоила все необходимые инструменты и создала портфолио из 15 работ.',
                task: 'Освоить дизайн с нуля и найти первых клиентов',
                solution: 'Прошла все 6 этапов курса, освоила Adobe Illustrator, Photoshop и Figma. Создала портфолио в разных стилях.',
                results: [
                    'Создала портфолио из 15 работ',
                    'Нашла 3 постоянных клиента',
                    'Зарабатывает $800 в месяц',
                    'Получила предложение о работе в дизайн-студии'
                ],
                images: [
                    { src: 'images/case-detail-1-1.webp', alt: 'Логотип для кофейни' },
                    { src: 'images/case-detail-1-2.webp', alt: 'Фирменный стиль для салона красоты' },
                    { src: 'images/case-detail-1-3.webp', alt: 'Упаковка для косметики' }
                ],
                social: { instagram: '@maria_design', telegram: '@maria_design' }
            },
            case2: {
                name: 'Нурали',
                category: 'entrepreneurs',
                categoryLabel: 'Предприниматель e-com',
                result: '+30% продаж за счёт нового визуала',
                description: 'После курса сам делаю все баннеры для маркетплейса. Экономлю $500 в месяц на дизайне',
                story: 'Нурали владеет интернет-магазином электроники. Постоянно тратил деньги на дизайнера для создания баннеров и карточек товаров. Решил освоить дизайн сам.',
                task: 'Создать качественный визуал для маркетплейса и увеличить продажи',
                solution: 'Освоил SMM-трек курса, научился создавать баннеры, карточки товаров и рекламные материалы.',
                results: [
                    'Увеличил продажи на 30%',
                    'Экономит $500 в месяц на дизайне',
                    'Создал узнаваемый стиль бренда',
                    'Ускорил запуск новых товаров'
                ],
                images: [
                    { src: 'images/case-detail-2-1.webp', alt: 'Баннеры для маркетплейса' },
                    { src: 'images/case-detail-2-2.webp', alt: 'Карточки товаров' },
                    { src: 'images/case-detail-2-3.webp', alt: 'Рекламные материалы' }
                ],
                social: { instagram: '@nurali_shop', telegram: '@nurali_shop' }
            },
            case3: {
                name: 'Анна Полищук',
                category: 'smm',
                categoryLabel: 'SMM-специалист',
                result: 'Повысила чек с $300 до $800',
                description: 'Теперь делаю визуал и видео для клиентов. Доход вырос в 2.5 раза',
                story: 'Анна работала SMM-менеджером, но постоянно зависела от дизайнеров. Клиенты жаловались на долгие сроки и высокие цены. Решила освоить дизайн сама.',
                task: 'Расширить услуги и увеличить доход',
                solution: 'Прошла SMM-трек и видео-трек курса. Научилась создавать визуал и анимации.',
                results: [
                    'Повысила чек с $300 до $800',
                    'Доход вырос в 2.5 раза',
                    'Получила 5 новых клиентов',
                    'Сократила сроки выполнения в 3 раза'
                ],
                images: [
                    { src: 'images/case-detail-3-1.webp', alt: 'SMM-визуал для бренда' },
                    { src: 'images/case-detail-3-2.webp', alt: 'Анимированные сторис' },
                    { src: 'images/case-detail-3-3.webp', alt: 'Видео-контент' }
                ],
                social: { instagram: '@anna_smm', telegram: '@anna_smm' }
            },
            case4: {
                name: 'Дмитрий Козлов',
                category: 'switchers',
                categoryLabel: 'Переходник (веб-разработчик)',
                result: 'Открыл дизайн-студию',
                description: 'Был веб-разработчиком, теперь делаю полный цикл: дизайн + разработка',
                story: 'Дмитрий работал веб-разработчиком, но часто сталкивался с некачественным дизайном от клиентов. Решил освоить дизайн, чтобы предлагать полный цикл услуг.',
                task: 'Освоить дизайн и открыть студию полного цикла',
                solution: 'Прошла все треки курса, включая видео и моушн. Создал портфолио в разных стилях.',
                results: [
                    'Открыл дизайн-студию',
                    'Увеличил доход в 4 раза',
                    'Получил крупных клиентов',
                    'Создал команду из 3 дизайнеров'
                ],
                images: [
                    { src: 'images/case-detail-4-1.webp', alt: 'Веб-дизайн проекты' },
                    { src: 'images/case-detail-4-2.webp', alt: 'Логотипы и брендинг' },
                    { src: 'images/case-detail-4-3.webp', alt: 'Анимации и видео' }
                ],
                social: { instagram: '@dmitry_studio', telegram: '@dmitry_studio' }
            },
            case5: {
                name: 'Елена Смирнова',
                category: 'beginners',
                categoryLabel: 'Новичок',
                result: 'Первые $500 за первый месяц',
                description: 'Была в декрете, теперь зарабатываю на дизайне удаленно',
                story: 'Елена была в декрете и искала возможность зарабатывать удаленно. Дизайн показался идеальным вариантом - можно работать из дома и развиваться творчески.',
                task: 'Освоить дизайн и начать зарабатывать удаленно',
                solution: 'Прошла курс в своем темпе, создала портфолио и начала искать клиентов на фриланс-платформах.',
                results: [
                    'Заработала первые $500 за месяц',
                    'Нашла 2 постоянных клиента',
                    'Создала портфолио из 12 работ',
                    'Получила предложения о работе'
                ],
                images: [
                    { src: 'images/case-detail-5-1.webp', alt: 'Логотипы для малого бизнеса' },
                    { src: 'images/case-detail-5-2.webp', alt: 'Социальные сети' },
                    { src: 'images/case-detail-5-3.webp', alt: 'Печатная продукция' }
                ],
                social: { instagram: '@elena_design', telegram: '@elena_design' }
            },
            case6: {
                name: 'Александр Петров',
                category: 'entrepreneurs',
                categoryLabel: 'Предприниматель (ресторан)',
                result: '+40% клиентов после ребрендинга',
                description: 'Сделал полный ребрендинг своего ресторана. Теперь сам создаю все материалы',
                story: 'Александр владеет рестораном, но бизнес не рос. Понял, что проблема в визуальном образе. Решил освоить дизайн и сделать ребрендинг сам.',
                task: 'Создать новый визуальный образ ресторана и привлечь клиентов',
                solution: 'Прошел курс по брендингу, создал новый логотип, фирменный стиль и все рекламные материалы.',
                results: [
                    'Увеличил количество клиентов на 40%',
                    'Создал узнаваемый бренд',
                    'Экономит $1000 в месяц на дизайне',
                    'Открыл второй ресторан'
                ],
                images: [
                    { src: 'images/case-detail-6-1.webp', alt: 'Новый логотип ресторана' },
                    { src: 'images/case-detail-6-2.webp', alt: 'Фирменный стиль' },
                    { src: 'images/case-detail-6-3.webp', alt: 'Рекламные материалы' }
                ],
                social: { instagram: '@alex_restaurant', telegram: '@alex_restaurant' }
            },
            case7: {
                name: 'Ольга Морозова',
                category: 'smm',
                categoryLabel: 'SMM-специалист',
                result: 'Увеличила портфель клиентов в 3 раза',
                description: 'Теперь предлагаю клиентам полный пакет: SMM + дизайн + видео',
                story: 'Ольга работала SMM-специалистом, но клиенты часто просили дизайн и видео. Приходилось искать подрядчиков, что увеличивало сроки и стоимость.',
                task: 'Расширить услуги и увеличить портфель клиентов',
                solution: 'Освоила дизайн и видео-треки курса. Теперь предлагает клиентам полный пакет услуг.',
                results: [
                    'Портфель клиентов вырос в 3 раза',
                    'Средний чек увеличился на 60%',
                    'Получила крупных клиентов',
                    'Создала агентство'
                ],
                images: [
                    { src: 'images/case-detail-7-1.webp', alt: 'SMM-кампании' },
                    { src: 'images/case-detail-7-2.webp', alt: 'Дизайн-контент' },
                    { src: 'images/case-detail-7-3.webp', alt: 'Видео-реклама' }
                ],
                social: { instagram: '@olga_agency', telegram: '@olga_agency' }
            },
            case8: {
                name: 'Ирина Волкова',
                category: 'switchers',
                categoryLabel: 'Переходник (фотограф)',
                result: 'Создала бренд-студию',
                description: 'Была фотографом, теперь делаю полный цикл: фото + дизайн + брендинг',
                story: 'Ирина работала фотографом, но клиенты часто просили дополнительно дизайн и брендинг. Решила освоить эти направления и создать студию полного цикла.',
                task: 'Создать студию полного цикла: фото + дизайн + брендинг',
                solution: 'Прошла курс по дизайну и брендингу. Объединила фотографию с дизайном.',
                results: [
                    'Создала бренд-студию',
                    'Доход вырос в 5 раз',
                    'Получила премиум-клиентов',
                    'Наняла 2 дизайнера'
                ],
                images: [
                    { src: 'images/case-detail-8-1.webp', alt: 'Фотосессии + дизайн' },
                    { src: 'images/case-detail-8-2.webp', alt: 'Брендинг проекты' },
                    { src: 'images/case-detail-8-3.webp', alt: 'Портфолио студии' }
                ],
                social: { instagram: '@irina_studio', telegram: '@irina_studio' }
            }
        };
    }

    bindFilterEvents() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setActiveFilter(filter);
                this.filterCases(filter);
                this.trackFilterClick(filter);
            });
        });
    }

    bindCaseCardEvents() {
        const caseCards = document.querySelectorAll('.case-card');
        caseCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('case-cta')) {
                    const caseId = card.dataset.cta.replace('cases_card_', 'case');
                    this.openCaseModal(caseId);
                }
            });
        });
    }

    setActiveFilter(filter) {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-filter="${filter}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        this.currentFilter = filter;
    }

    filterCases(filter) {
        const caseCards = document.querySelectorAll('.case-card');
        
        caseCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                card.classList.add('animate-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('animate-in');
            }
        });
    }

    openCaseModal(caseId) {
        const caseData = this.casesData[caseId];
        if (!caseData) return;

        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = this.generateModalContent(caseData);
        
        const modal = document.getElementById('caseModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.trackCaseView(caseId);
    }

    generateModalContent(caseData) {
        return `
            <div class="case-modal-header">
                <div class="case-modal-info">
                    <h2>${caseData.name}</h2>
                    <span class="case-category ${caseData.category}">${caseData.categoryLabel}</span>
                </div>
                <div class="case-modal-result">
                    <h3>${caseData.result}</h3>
                </div>
            </div>
            
            <div class="case-modal-content">
                <div class="case-story">
                    <h4>История</h4>
                    <p>${caseData.story}</p>
                </div>
                
                <div class="case-details">
                    <div class="case-task">
                        <h4>Задача</h4>
                        <p>${caseData.task}</p>
                    </div>
                    
                    <div class="case-solution">
                        <h4>Решение</h4>
                        <p>${caseData.solution}</p>
                    </div>
                </div>
                
                <div class="case-results">
                    <h4>Результаты</h4>
                    <ul>
                        ${caseData.results.map(result => `<li>${result}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="case-gallery">
                    <h4>Работы</h4>
                    <div class="gallery-grid">
                        ${caseData.images.map(img => `
                            <div class="gallery-item">
                                <img src="${img.src}" alt="${img.alt}" loading="lazy">
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                ${caseData.social ? `
                    <div class="case-social">
                        <h4>Социальные сети</h4>
                        <div class="social-links">
                            ${caseData.social.instagram ? `<a href="https://instagram.com/${caseData.social.instagram.replace('@', '')}" target="_blank" rel="noopener">Instagram</a>` : ''}
                            ${caseData.social.telegram ? `<a href="https://t.me/${caseData.social.telegram.replace('@', '')}" target="_blank" rel="noopener">Telegram</a>` : ''}
                        </div>
                    </div>
                ` : ''}
            </div>
            
            <div class="case-modal-cta">
                <button class="btn-primary btn-large" data-cta="case_modal_cta" onclick="window.location.href='pricing.html'">
                    Хочу так же — записаться на курс
                </button>
            </div>
        `;
    }

    closeCaseModal() {
        const modal = document.getElementById('caseModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    initializeAnalytics() {
        // Track page view
        if (typeof trackEvent === 'function') {
            trackEvent('page_view', {
                page: 'cases',
                title: document.title,
                timestamp: new Date().toISOString()
            });
        }
    }

    trackFilterClick(filter) {
        if (typeof trackEvent === 'function') {
            trackEvent('cases_filter_clicked', {
                filter: filter,
                timestamp: new Date().toISOString()
            });
        }
    }

    trackCaseView(caseId) {
        if (typeof trackEvent === 'function') {
            trackEvent('case_viewed', {
                case_id: caseId,
                timestamp: new Date().toISOString()
            });
        }
    }
}

// Global functions for onclick handlers
function openCaseModal(caseId) {
    if (window.casesPage) {
        window.casesPage.openCaseModal(caseId);
    }
}

function closeCaseModal() {
    if (window.casesPage) {
        window.casesPage.closeCaseModal();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.casesPage = new CasesPage();
    
    // Close modal on backdrop click
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            closeCaseModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCaseModal();
        }
    });
}); 