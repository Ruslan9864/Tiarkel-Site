/**
 * Google Apps Script для обработки заявок Tiarkel Site
 * Сохраняет данные в Google Sheets и отправляет уведомления
 */

// ID Google таблицы для заявок
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SHEET_NAME = 'Leads';

// Telegram Bot настройки
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

// Email настройки
const ADMIN_EMAIL = 'admin@tiarkel.com';

/**
 * Основная функция для обработки POST запросов
 */
function doPost(e) {
  try {
    // Парсим JSON данные
    const payload = JSON.parse(e.postData.contents);
    
    // Валидация данных
    if (!validatePayload(payload)) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Invalid payload' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Сохраняем в Google Sheets
    const sheetId = saveToSheet(payload);
    
    // Отправляем уведомления
    sendTelegramNotification(payload);
    sendEmailNotification(payload);
    
    // Возвращаем успешный ответ
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        lead_id: payload.lead_id,
        sheet_id: sheetId 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing request:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Валидация входящих данных
 */
function validatePayload(payload) {
  const requiredFields = ['lead_id', 'name', 'phone_e164', 'product_type', 'locale'];
  
  for (const field of requiredFields) {
    if (!payload[field]) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }
  
  // Проверка антиспам
  if (payload.anti_spam) {
    if (payload.anti_spam.honeypot) {
      console.error('Honeypot field filled');
      return false;
    }
    
    if (payload.anti_spam.time_to_fill_sec < 3) {
      console.error('Form filled too quickly');
      return false;
    }
  }
  
  return true;
}

/**
 * Сохранение данных в Google Sheets
 */
function saveToSheet(payload) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  // Подготавливаем данные для записи
  const rowData = [
    payload.lead_id,
    payload.created_at,
    payload.locale,
    payload.name,
    payload.phone_e164,
    payload.phone_display,
    payload.email,
    payload.product_type,
    payload.product_id,
    payload.comment,
    payload.utm_source,
    payload.utm_medium,
    payload.utm_campaign,
    payload.utm_content,
    payload.utm_term,
    payload.referrer,
    payload.page_url,
    payload.form_type,
    payload.user_agent,
    JSON.stringify(payload.anti_spam),
    payload.consent_policy,
    payload.consent_marketing,
    new Date().toISOString() // Время записи в таблицу
  ];
  
  // Добавляем новую строку
  const lastRow = sheet.getLastRow();
  const range = sheet.getRange(lastRow + 1, 1, 1, rowData.length);
  range.setValues([rowData]);
  
  // Форматируем строку
  formatLeadRow(sheet, lastRow + 1);
  
  return lastRow + 1;
}

/**
 * Форматирование строки с заявкой
 */
function formatLeadRow(sheet, row) {
  // Заголовки колонок
  const headers = [
    'Lead ID', 'Created At', 'Locale', 'Name', 'Phone E164', 'Phone Display',
    'Email', 'Product Type', 'Product ID', 'Comment', 'UTM Source', 'UTM Medium',
    'UTM Campaign', 'UTM Content', 'UTM Term', 'Referrer', 'Page URL',
    'Form Type', 'User Agent', 'Anti Spam', 'Consent Policy', 'Consent Marketing',
    'Sheet Created At'
  ];
  
  // Если это первая строка, добавляем заголовки
  if (row === 1) {
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#f0f0f0');
  }
  
  // Форматируем новую строку
  const rowRange = sheet.getRange(row, 1, 1, headers.length);
  
  // Цвет фона в зависимости от типа продукта
  const productType = sheet.getRange(row, 8).getValue(); // Product Type
  if (productType === 'course') {
    rowRange.setBackground('#e8f5e8'); // Зеленый для курсов
  } else if (productType === 'service') {
    rowRange.setBackground('#fff3e0'); // Оранжевый для услуг
  }
  
  // Форматируем дату
  const dateRange = sheet.getRange(row, 2); // Created At
  dateRange.setNumberFormat('yyyy-mm-dd hh:mm:ss');
  
  // Автоматическая ширина колонок
  sheet.autoResizeColumns(1, headers.length);
}

/**
 * Отправка уведомления в Telegram
 */
function sendTelegramNotification(payload) {
  try {
    const message = formatTelegramMessage(payload);
    
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    };
    
    UrlFetchApp.fetch(url, options);
    
  } catch (error) {
    console.error('Telegram notification error:', error);
  }
}

/**
 * Форматирование сообщения для Telegram
 */
function formatTelegramMessage(payload) {
  const emoji = {
    new: '🆕',
    course: '📚',
    service: '🎨',
    phone: '📞',
    email: '📧',
    time: '⏰',
    source: '🌐',
    utm: '📊'
  };
  
  const productTypeText = payload.product_type === 'course' ? 'Курс' : 'Услуга';
  const productIdText = payload.product_id ? ` (${payload.product_id})` : '';
  
  const utmInfo = payload.utm_source !== 'direct' 
    ? `\n${emoji.utm} <b>Источник:</b> ${payload.utm_source} / ${payload.utm_medium}`
    : '';
  
  const emailInfo = payload.email ? `\n${emoji.email} <b>Email:</b> ${payload.email}` : '';
  const commentInfo = payload.comment ? `\n💬 <b>Комментарий:</b> ${payload.comment}` : '';
  
  return `${emoji.new} <b>Новая заявка</b>

${payload.product_type === 'course' ? emoji.course : emoji.service} <b>Тип:</b> ${productTypeText}${productIdText}
👤 <b>Имя:</b> ${payload.name}
${emoji.phone} <b>Телефон:</b> ${payload.phone_display}${emailInfo}${commentInfo}

${emoji.time} <b>Время:</b> ${formatDateTime(payload.created_at)}
${emoji.source} <b>Страница:</b> ${payload.page_url}${utmInfo}

ID: <code>${payload.lead_id}</code>`;
}

/**
 * Отправка email уведомления
 */
function sendEmailNotification(payload) {
  try {
    const subject = `Новая заявка: ${payload.name} - ${payload.product_type}`;
    const body = formatEmailMessage(payload);
    
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      htmlBody: body
    });
    
  } catch (error) {
    console.error('Email notification error:', error);
  }
}

/**
 * Форматирование email сообщения
 */
function formatEmailMessage(payload) {
  const productTypeText = payload.product_type === 'course' ? 'Курс' : 'Услуга';
  const utmInfo = payload.utm_source !== 'direct' 
    ? `<tr><td><strong>Источник:</strong></td><td>${payload.utm_source} / ${payload.utm_medium}</td></tr>`
    : '';
  
  const emailInfo = payload.email ? `<tr><td><strong>Email:</strong></td><td>${payload.email}</td></tr>` : '';
  const commentInfo = payload.comment ? `<tr><td><strong>Комментарий:</strong></td><td>${payload.comment}</td></tr>` : '';
  
  return `
    <h2>Новая заявка</h2>
    <table style="border-collapse: collapse; width: 100%;">
      <tr><td><strong>ID заявки:</strong></td><td>${payload.lead_id}</td></tr>
      <tr><td><strong>Тип:</strong></td><td>${productTypeText}${payload.product_id ? ` (${payload.product_id})` : ''}</td></tr>
      <tr><td><strong>Имя:</strong></td><td>${payload.name}</td></tr>
      <tr><td><strong>Телефон:</strong></td><td>${payload.phone_display}</td></tr>
      ${emailInfo}
      ${commentInfo}
      <tr><td><strong>Время:</strong></td><td>${formatDateTime(payload.created_at)}</td></tr>
      <tr><td><strong>Страница:</strong></td><td>${payload.page_url}</td></tr>
      ${utmInfo}
      <tr><td><strong>Язык:</strong></td><td>${payload.locale}</td></tr>
    </table>
  `;
}

/**
 * Форматирование даты и времени
 */
function formatDateTime(isoString) {
  const date = new Date(isoString);
  return Utilities.formatDate(date, 'Asia/Tashkent', 'dd.MM.yyyy HH:mm:ss');
}

/**
 * Функция для создания таблицы (запускается один раз)
 */
function createLeadsSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // Создаем новый лист если не существует
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  
  // Заголовки колонок
  const headers = [
    'Lead ID', 'Created At', 'Locale', 'Name', 'Phone E164', 'Phone Display',
    'Email', 'Product Type', 'Product ID', 'Comment', 'UTM Source', 'UTM Medium',
    'UTM Campaign', 'UTM Content', 'UTM Term', 'Referrer', 'Page URL',
    'Form Type', 'User Agent', 'Anti Spam', 'Consent Policy', 'Consent Marketing',
    'Sheet Created At'
  ];
  
  // Записываем заголовки
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#f0f0f0');
  
  // Автоматическая ширина колонок
  sheet.autoResizeColumns(1, headers.length);
  
  // Фиксируем заголовки
  sheet.setFrozenRows(1);
  
  console.log('Leads sheet created successfully');
}

/**
 * Функция для экспорта данных в CSV (для бэкапов)
 */
function exportToCSV() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  const data = sheet.getDataRange().getValues();
  const csvContent = data.map(row => row.join(',')).join('\n');
  
  const fileName = `tiarkel_leads_${new Date().toISOString().split('T')[0]}.csv`;
  
  // Сохраняем в Google Drive
  const folder = DriveApp.getFolderById('YOUR_BACKUP_FOLDER_ID');
  const file = folder.createFile(fileName, csvContent, MimeType.CSV);
  
  console.log(`CSV backup created: ${file.getUrl()}`);
  return file.getUrl();
}

/**
 * Функция для очистки старых данных (старше 90 дней)
 */
function cleanupOldLeads() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 90);
  
  const rowsToDelete = [];
  
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const createdDate = new Date(row[1]); // Created At column
    
    if (createdDate < cutoffDate) {
      rowsToDelete.push(i + 2); // +2 because we start from row 2 and arrays are 0-indexed
    }
  }
  
  // Удаляем строки в обратном порядке
  for (let i = rowsToDelete.length - 1; i >= 0; i--) {
    sheet.deleteRow(rowsToDelete[i]);
  }
  
  console.log(`Deleted ${rowsToDelete.length} old leads`);
}

/**
 * Функция для получения статистики
 */
function getLeadsStats() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const stats = {
    total: rows.length,
    by_type: {},
    by_locale: {},
    by_source: {},
    today: 0,
    this_week: 0,
    this_month: 0
  };
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  rows.forEach(row => {
    const createdDate = new Date(row[1]);
    const productType = row[7];
    const locale = row[2];
    const utmSource = row[10];
    
    // Подсчет по типам
    stats.by_type[productType] = (stats.by_type[productType] || 0) + 1;
    
    // Подсчет по языкам
    stats.by_locale[locale] = (stats.by_locale[locale] || 0) + 1;
    
    // Подсчет по источникам
    stats.by_source[utmSource] = (stats.by_source[utmSource] || 0) + 1;
    
    // Подсчет по времени
    if (createdDate >= today) stats.today++;
    if (createdDate >= weekAgo) stats.this_week++;
    if (createdDate >= monthAgo) stats.this_month++;
  });
  
  return stats;
}

/**
 * Функция для тестирования
 */
function testFormSubmission() {
  const testPayload = {
    lead_id: 'test_' + Date.now(),
    created_at: new Date().toISOString(),
    locale: 'ru',
    name: 'Тестовый пользователь',
    phone_e164: '+79991234567',
    phone_display: '+7 (999) 123-45-67',
    email: 'test@example.com',
    product_type: 'course',
    product_id: 'pro',
    comment: 'Тестовая заявка',
    utm_source: 'test',
    utm_medium: 'manual',
    utm_campaign: 'test_campaign',
    utm_content: '',
    utm_term: '',
    referrer: '',
    page_url: 'https://tiarkel.com/test',
    form_type: 'course',
    user_agent: 'Test User Agent',
    anti_spam: {
      honeypot: '',
      time_to_fill_sec: 10
    },
    consent_policy: true,
    consent_marketing: false
  };
  
  const result = doPost({
    postData: {
      contents: JSON.stringify(testPayload)
    }
  });
  
  console.log('Test result:', result.getContent());
} 