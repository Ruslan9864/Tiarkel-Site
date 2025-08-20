# Руководство по настройке CRM интеграции

## Обзор системы

Система форм Tiarkel включает:
- **Frontend**: `forms.js` - централизованная обработка всех форм
- **Backend**: `google-apps-script.js` - Google Apps Script для Google Sheets
- **Аналитика**: Интеграция с GTM/GA4/Meta/TikTok
- **Антиспам**: Honeypot, time-to-fill, rate limiting
- **Резервное копирование**: Telegram уведомления + localStorage

## 1. Настройка Google Apps Script

### Шаг 1: Создание Google Sheet
1. Создайте новый Google Sheet
2. Назовите первый лист "Leads"
3. Скопируйте ID таблицы из URL (между /d/ и /edit)

### Шаг 2: Создание Apps Script
1. Перейдите на [script.google.com](https://script.google.com)
2. Создайте новый проект
3. Скопируйте код из `google-apps-script.js`
4. Замените константы в начале файла:
   ```javascript
   const CONFIG = {
     SPREADSHEET_ID: 'ВАШ_ID_ТАБЛИЦЫ',
     TELEGRAM_BOT_TOKEN: 'ВАШ_BOT_TOKEN',
     TELEGRAM_CHAT_ID: 'ВАШ_CHAT_ID',
     ADMIN_EMAIL: 'admin@tiarkel.com'
   };
   ```

### Шаг 3: Настройка Telegram бота
1. Создайте бота через @BotFather
2. Получите токен бота
3. Добавьте бота в группу/канал
4. Получите Chat ID группы/канала

### Шаг 4: Деплой веб-приложения
1. Нажмите "Deploy" → "New deployment"
2. Выберите "Web app"
3. Настройте:
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Скопируйте URL веб-приложения

### Шаг 5: Обновление конфигурации
В `forms.js` замените:
```javascript
crmEndpoint: 'URL_ВАШЕГО_ВЕБ_ПРИЛОЖЕНИЯ'
```

## 2. Настройка структуры Google Sheet

### Автоматическая настройка
Запустите функцию `setupSpreadsheet()` в Apps Script Editor для создания структуры.

### Ручная настройка
Создайте заголовки в первой строке:
```
lead_id | created_at | locale | name | phone_e164 | email | product_type | product_id | comment | utm_source | utm_medium | utm_campaign | utm_content | utm_term | referrer | page_url | cta_id | user_agent | client_ip | time_to_fill_sec | consent_policy | consent_marketing | status
```

## 3. Настройка аналитики

### Google Analytics 4
Добавьте в `<head>` каждой страницы:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel
Добавьте в `<head>`:
```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->
```

### Настройка конверсий
В Google Ads и Meta Ads создайте конверсии на основе событий:
- `lead_generated` → Lead
- `form_submitted` → Submit Form

## 4. Тестирование системы

### Тестовые сценарии
1. **Позитивные тесты**:
   - Отправка формы с корректными данными
   - Отправка с UTM-метками
   - Отправка с разных страниц

2. **Негативные тесты**:
   - Пустые обязательные поля
   - Неверный формат телефона/email
   - Быстрая отправка (антиспам)
   - Множественные отправки (rate limit)

3. **Проверка интеграций**:
   - Данные в Google Sheet
   - Telegram уведомления
   - События в GA4
   - Конверсии в рекламных системах

### Команды для тестирования
```javascript
// В консоли браузера
window.formsManager.validateForm(document.getElementById('contactForm'))
window.formsManager.submitToCRM(formData)
```

## 5. Мониторинг и поддержка

### Ежедневные проверки
1. Новые лиды в Google Sheet
2. Telegram уведомления
3. Ошибки в Apps Script логах

### Еженедельные задачи
1. Экспорт данных в CSV
2. Проверка rate limiting
3. Анализ конверсий

### Ежемесячные задачи
1. Очистка старых данных
2. Обновление антиспам правил
3. Анализ эффективности форм

## 6. Безопасность

### Рекомендации
1. Регулярно обновляйте токены
2. Ограничьте доступ к Google Sheet
3. Мониторьте подозрительную активность
4. Резервное копирование данных

### Обработка инцидентов
1. Блокировка IP при спаме
2. Восстановление из резервной копии
3. Обновление конфигурации

## 7. Производительность

### Оптимизация
1. Кэширование UTM параметров
2. Минимизация запросов к API
3. Оптимизация размера данных

### Мониторинг
1. Время ответа форм
2. Успешность отправки
3. Скорость загрузки страниц

## 8. Локализация

### Поддержка языков
Система поддерживает RU/UZ локали:
- Автоматическое определение языка
- Локализованные сообщения об ошибках
- Форматы телефонов по регионам

### Настройка новых языков
1. Добавьте язык в `config.locale`
2. Создайте переводы ошибок
3. Настройте форматы телефонов

## Контакты для поддержки

При возникновении проблем:
1. Проверьте логи в Apps Script
2. Проверьте консоль браузера
3. Обратитесь к разработчику

---

**Важно**: Храните токены и ключи в безопасном месте. Не публикуйте их в публичном доступе. 