/**
 * Единая система форм для Tiarkel Site
 * Включает: валидацию, антиспам, UTM-параметры, аналитику, локализацию
 */

class TiarkelForms {
    constructor() {
        this.forms = new Map();
        this.rateLimits = new Map();
        this.currentLocale = this.detectLocale();
        this.phoneMasks = {
            ru: '+7 (___) ___-__-__',
            uz: '+998 __ ___ __ __'
        };
        this.validationMessages = {
            ru: {
                required: 'Это поле обязательно для заполнения',
                name: 'Имя должно содержать минимум 2 символа',
                phone: 'Введите корректный номер телефона',
                email: 'Введите корректный email адрес',
                consent: 'Необходимо согласие с условиями',
                honeypot: 'Поле заполнено автоматически',
                rateLimit: 'Слишком много попыток. Попробуйте позже',
                timeout: 'Превышено время ожидания. Попробуйте еще раз'
            },
            uz: {
                required: 'Bu maydon to\'ldirilishi shart',
                name: 'Ism kamida 2 belgidan iborat bo\'lishi kerak',
                phone: 'To\'g\'ri telefon raqamini kiriting',
                email: 'To\'g\'ri email manzilini kiriting',
                consent: 'Shartlar bilan rozilik berish kerak',
                honeypot: 'Maydon avtomatik to\'ldirildi',
                rateLimit: 'Juda ko\'p urinishlar. Keyinroq urinib ko\'ring',
                timeout: 'Kutish vaqti oshdi. Qaytadan urinib ko\'ring'
            }
        };
        
        this.init();
    }

    init() {
        this.initializeForms();
        this.setupGlobalHandlers();
        this.trackFormViews();
    }

    detectLocale() {
        const path = window.location.pathname;
        return path.startsWith('/uz') ? 'uz' : 'ru';
    }

    initializeForms() {
        // Находим все формы на странице
        const formElements = document.querySelectorAll('form[data-form-type]');
        
        formElements.forEach(form => {
            const formType = form.dataset.formType;
            const formId = form.id || `form-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            
            if (!form.id) {
                form.id = formId;
            }

            this.setupForm(form, formType, formId);
        });
    }

    setupForm(form, formType, formId) {
        // Добавляем honeypot поле
        this.addHoneypotField(form);
        
        // Добавляем скрытые поля для UTM и контекста
        this.addHiddenFields(form, formType);
        
        // Настраиваем валидацию
        this.setupValidation(form);
        
        // Настраиваем отправку
        this.setupSubmission(form, formType, formId);
        
        // Настраиваем телефонную маску
        this.setupPhoneMask(form);
        
        // Сохраняем информацию о форме
        this.forms.set(formId, {
            element: form,
            type: formType,
            startTime: Date.now(),
            attempts: 0
        });

        // Трекинг показа формы
        this.trackEvent('view_form', {
            form_id: formId,
            form_type: formType,
            page_url: window.location.href,
            locale: this.currentLocale
        });
    }

    addHoneypotField(form) {
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.style.cssText = 'position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0;';
        honeypot.setAttribute('tabindex', '-1');
        honeypot.setAttribute('autocomplete', 'off');
        form.appendChild(honeypot);
    }

    addHiddenFields(form, formType) {
        const hiddenFields = [
            'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
            'referrer', 'page_url', 'form_type', 'locale', 'user_agent'
        ];

        hiddenFields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field;
            
            switch (field) {
                case 'utm_source':
                case 'utm_medium':
                case 'utm_campaign':
                case 'utm_content':
                case 'utm_term':
                    input.value = this.getUTMParameter(field.replace('utm_', ''));
                    break;
                case 'referrer':
                    input.value = document.referrer || '';
                    break;
                case 'page_url':
                    input.value = window.location.href;
                    break;
                case 'form_type':
                    input.value = formType;
                    break;
                case 'locale':
                    input.value = this.currentLocale;
                    break;
                case 'user_agent':
                    input.value = navigator.userAgent;
                    break;
            }
            
            form.appendChild(input);
        });
    }

    setupValidation(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Валидация в реальном времени
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
            
            // Специальная обработка для чекбокса согласия
            if (input.name === 'consent') {
                input.addEventListener('change', () => this.updateSubmitButton(form));
            }
        });
    }

    setupSubmission(form, formType, formId) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!this.validateForm(form)) {
                return;
            }

            if (!this.checkRateLimit(formId)) {
                this.showError(form, this.validationMessages[this.currentLocale].rateLimit);
                return;
            }

            await this.submitForm(form, formType, formId);
        });
    }

    setupPhoneMask(form) {
        const phoneInput = form.querySelector('input[name="phone"]');
        if (!phoneInput) return;

        const mask = this.phoneMasks[this.currentLocale];
        phoneInput.placeholder = mask;
        
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (this.currentLocale === 'uz') {
                // Узбекский формат: +998 XX XXX XX XX
                if (value.length > 0) {
                    value = '+998 ' + value;
                    if (value.length > 5) {
                        value = value.slice(0, 5) + ' ' + value.slice(5);
                    }
                    if (value.length > 9) {
                        value = value.slice(0, 9) + ' ' + value.slice(9);
                    }
                    if (value.length > 13) {
                        value = value.slice(0, 13) + ' ' + value.slice(13);
                    }
                    if (value.length > 16) {
                        value = value.slice(0, 16) + ' ' + value.slice(16);
                    }
                }
            } else {
                // Российский формат: +7 (XXX) XXX-XX-XX
                if (value.length > 0) {
                    value = '+7 (' + value;
                    if (value.length > 7) {
                        value = value.slice(0, 7) + ') ' + value.slice(7);
                    }
                    if (value.length > 12) {
                        value = value.slice(0, 12) + '-' + value.slice(12);
                    }
                    if (value.length > 15) {
                        value = value.slice(0, 15) + '-' + value.slice(15);
                    }
                }
            }
            
            e.target.value = value;
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Проверка обязательных полей
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = this.validationMessages[this.currentLocale].required;
        }

        // Специфичная валидация
        if (isValid && value) {
            switch (fieldName) {
                case 'name':
                    if (value.length < 2 || /[^\p{L}\s]/u.test(value)) {
                        isValid = false;
                        errorMessage = this.validationMessages[this.currentLocale].name;
                    }
                    break;
                    
                case 'phone':
                    const phoneRegex = this.currentLocale === 'uz' 
                        ? /^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/
                        : /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
                    if (!phoneRegex.test(value)) {
                        isValid = false;
                        errorMessage = this.validationMessages[this.currentLocale].phone;
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = this.validationMessages[this.currentLocale].email;
                    }
                    break;
                    
                case 'website': // honeypot
                    if (value) {
                        isValid = false;
                        errorMessage = this.validationMessages[this.currentLocale].honeypot;
                    }
                    break;
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    validateForm(form) {
        const fields = form.querySelectorAll('input, select, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Проверка времени заполнения (антиспам)
        const formInfo = this.forms.get(form.id);
        if (formInfo) {
            const timeToFill = (Date.now() - formInfo.startTime) / 1000;
            if (timeToFill < 3) {
                this.showError(form, this.validationMessages[this.currentLocale].timeout);
                return false;
            }
        }

        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'color: #dc3545; font-size: 0.875rem; margin-top: 0.25rem;';
        
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    showError(form, message) {
        const errorDiv = form.querySelector('.form-error') || document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'background: #f8d7da; color: #721c24; padding: 0.75rem; border-radius: 0.375rem; margin-bottom: 1rem; border: 1px solid #f5c6cb;';
        
        if (!form.querySelector('.form-error')) {
            form.insertBefore(errorDiv, form.firstChild);
        }
    }

    clearFormError(form) {
        const errorDiv = form.querySelector('.form-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    checkRateLimit(formId) {
        const now = Date.now();
        const limit = this.rateLimits.get(formId) || { count: 0, resetTime: now + 300000 }; // 5 минут
        
        if (now > limit.resetTime) {
            limit.count = 0;
            limit.resetTime = now + 300000;
        }
        
        if (limit.count >= 3) {
            return false;
        }
        
        limit.count++;
        this.rateLimits.set(formId, limit);
        return true;
    }

    async submitForm(form, formType, formId) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Показываем состояние загрузки
        submitBtn.disabled = true;
        submitBtn.textContent = this.currentLocale === 'ru' ? 'Отправляем...' : 'Yuborilmoqda...';
        
        this.clearFormError(form);

        try {
            // Трекинг клика по кнопке отправки
            this.trackEvent('submit_form_click', {
                form_id: formId,
                form_type: formType,
                page_url: window.location.href
            });

            const formData = new FormData(form);
            const payload = this.preparePayload(formData, formType, formId);
            
            // Отправка в основное хранилище (Google Sheets)
            const success = await this.sendToStorage(payload);
            
            if (success) {
                // Отправка уведомления менеджеру
                await this.sendNotification(payload);
                
                // Трекинг успешной отправки
                this.trackEvent('lead_generated', {
                    lead_id: payload.lead_id,
                    product_type: payload.product_type,
                    product_id: payload.product_id,
                    locale: payload.locale,
                    utm_source: payload.utm_source,
                    utm_medium: payload.utm_medium,
                    utm_campaign: payload.utm_campaign
                });
                
                // Показываем успех
                this.showSuccess(form, formType, payload);
                
                // Сброс формы
                form.reset();
                this.updateSubmitButton(form);
                
            } else {
                throw new Error('Storage error');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Трекинг ошибки
            this.trackEvent('lead_failed', {
                form_id: formId,
                form_type: formType,
                error_code: 'submission_error',
                error_message: error.message
            });
            
            this.showError(form, this.currentLocale === 'ru' 
                ? 'Ошибка отправки. Попробуйте еще раз или свяжитесь с нами через Telegram.'
                : 'Yuborishda xatolik. Qaytadan urinib ko\'ring yoki Telegram orqali bog\'laning.'
            );
        } finally {
            // Восстанавливаем кнопку
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    preparePayload(formData, formType, formId) {
        const leadId = this.generateLeadId();
        const now = new Date().toISOString();
        
        // Нормализация телефона в E.164
        const phone = formData.get('phone');
        const phoneE164 = this.normalizePhone(phone);
        
        return {
            lead_id: leadId,
            created_at: now,
            locale: this.currentLocale,
            name: formData.get('name'),
            phone_e164: phoneE164,
            phone_display: phone,
            email: formData.get('email') || '',
            product_type: formType,
            product_id: formData.get('product_id') || '',
            comment: formData.get('comment') || '',
            utm_source: formData.get('utm_source') || 'direct',
            utm_medium: formData.get('utm_medium') || 'none',
            utm_campaign: formData.get('utm_campaign') || '',
            utm_content: formData.get('utm_content') || '',
            utm_term: formData.get('utm_term') || '',
            referrer: formData.get('referrer') || '',
            page_url: formData.get('page_url') || '',
            form_type: formType,
            user_agent: formData.get('user_agent') || '',
            anti_spam: {
                honeypot: formData.get('website') || '',
                time_to_fill_sec: Math.round((Date.now() - this.forms.get(formId)?.startTime) / 1000)
            },
            consent_policy: formData.get('consent') === 'on',
            consent_marketing: formData.get('consent_marketing') === 'on'
        };
    }

    generateLeadId() {
        return 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    normalizePhone(phone) {
        // Убираем все символы кроме цифр
        const digits = phone.replace(/\D/g, '');
        
        if (this.currentLocale === 'uz') {
            // Узбекский номер: +998 XX XXX XX XX
            if (digits.startsWith('998') && digits.length === 12) {
                return '+' + digits;
            }
        } else {
            // Российский номер: +7 XXX XXX XX XX
            if (digits.startsWith('7') && digits.length === 11) {
                return '+' + digits;
            }
        }
        
        return phone; // Возвращаем как есть, если не удалось нормализовать
    }

    async sendToStorage(payload) {
        try {
            // Google Sheets через Apps Script
            const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                timeout: 10000
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const result = await response.json();
            return result.success;
            
        } catch (error) {
            console.error('Storage error:', error);
            
            // Резервное сохранение в localStorage
            this.saveToLocalStorage(payload);
            
            return false;
        }
    }

    async sendNotification(payload) {
        try {
            // Telegram бот уведомление
            const message = this.formatTelegramMessage(payload);
            
            await fetch('https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: 'YOUR_CHAT_ID',
                    text: message,
                    parse_mode: 'HTML'
                })
            });
            
        } catch (error) {
            console.error('Notification error:', error);
        }
    }

    formatTelegramMessage(payload) {
        const emoji = {
            new: '🆕',
            course: '📚',
            service: '🎨',
            phone: '📞',
            email: '📧',
            time: '⏰'
        };
        
        return `
${emoji.new} <b>Новая заявка</b>

${payload.product_type === 'course' ? emoji.course : emoji.service} <b>Тип:</b> ${payload.product_type}
👤 <b>Имя:</b> ${payload.name}
${emoji.phone} <b>Телефон:</b> ${payload.phone_display}
${payload.email ? `${emoji.email} <b>Email:</b> ${payload.email}` : ''}
${payload.comment ? `💬 <b>Комментарий:</b> ${payload.comment}` : ''}

${emoji.time} <b>Время:</b> ${new Date(payload.created_at).toLocaleString('ru-RU', {timeZone: 'Asia/Tashkent'})}
🌐 <b>Страница:</b> ${payload.page_url}
${payload.utm_source !== 'direct' ? `📊 <b>Источник:</b> ${payload.utm_source} / ${payload.utm_medium}` : ''}

ID: <code>${payload.lead_id}</code>
        `.trim();
    }

    saveToLocalStorage(payload) {
        try {
            const backups = JSON.parse(localStorage.getItem('tiarkel_leads_backup') || '[]');
            backups.push({
                ...payload,
                backup_time: new Date().toISOString()
            });
            
            // Храним только последние 10 заявок
            if (backups.length > 10) {
                backups.splice(0, backups.length - 10);
            }
            
            localStorage.setItem('tiarkel_leads_backup', JSON.stringify(backups));
        } catch (error) {
            console.error('LocalStorage backup error:', error);
        }
    }

    showSuccess(form, formType, payload) {
        const successMessage = this.currentLocale === 'ru' 
            ? `Спасибо! Заявка №${payload.lead_id} принята. Мы свяжемся с вами в течение 2-6 часов (Пн-Сб, 10:00-19:00, Азия/Ташкент).`
            : `Rahmat! Arizangiz №${payload.lead_id} qabul qilindi. Biz siz bilan 2-6 soat ichida bog\'lanamiz (Dush-Shan, 10:00-19:00, Osiyo/Toshkent).`;
        
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                <h3 style="color: #28a745; margin-bottom: 1rem;">${this.currentLocale === 'ru' ? 'Заявка отправлена!' : 'Ariza yuborildi!'}</h3>
                <p style="color: #666; line-height: 1.6; margin-bottom: 1.5rem;">${successMessage}</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="https://t.me/tatvorit" target="_blank" class="btn-secondary" style="text-decoration: none;">
                        📱 Telegram
                    </a>
                    <a href="https://wa.me/998XXXXXXXXX" target="_blank" class="btn-secondary" style="text-decoration: none;">
                        💬 WhatsApp
                    </a>
                </div>
            </div>
        `;
        
        form.style.display = 'none';
        form.parentNode.appendChild(successDiv);
    }

    updateSubmitButton(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const consentCheckbox = form.querySelector('input[name="consent"]');
        
        if (submitBtn && consentCheckbox) {
            submitBtn.disabled = !consentCheckbox.checked;
        }
    }

    getUTMParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(`utm_${name}`) || '';
    }

    trackFormViews() {
        const forms = document.querySelectorAll('form[data-form-type]');
        forms.forEach(form => {
            const formType = form.dataset.formType;
            const formId = form.id;
            
            this.trackEvent('view_form', {
                form_id: formId,
                form_type: formType,
                page_url: window.location.href,
                locale: this.currentLocale
            });
        });
    }

    trackEvent(eventName, parameters = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, parameters);
        }
        
        // Console для отладки
        console.log(`[Analytics] ${eventName}:`, parameters);
    }

    setupGlobalHandlers() {
        // Отслеживание первого взаимодействия с формой
        document.addEventListener('focusin', (e) => {
            if (e.target.closest('form')) {
                const form = e.target.closest('form');
                const formId = form.id;
                
                if (formId && !this.forms.get(formId)?.firstInteraction) {
                    this.forms.get(formId).firstInteraction = true;
                    
                    this.trackEvent('start_fill_form', {
                        form_id: formId,
                        form_type: form.dataset.formType,
                        page_url: window.location.href
                    });
                }
            }
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.tiarkelForms = new TiarkelForms();
});

// Экспорт для использования в других модулях
window.TiarkelForms = TiarkelForms; 