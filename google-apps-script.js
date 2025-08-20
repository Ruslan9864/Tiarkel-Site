// Google Apps Script for Tiarkel CRM Integration
// Deploy as web app: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

// Configuration
const CONFIG = {
  // Google Sheets
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID', // Replace with your actual spreadsheet ID
  SHEET_NAME: 'Leads',
  
  // Telegram Bot
  TELEGRAM_BOT_TOKEN: 'YOUR_BOT_TOKEN', // Replace with your bot token
  TELEGRAM_CHAT_ID: 'YOUR_CHAT_ID', // Replace with your chat ID
  
  // Email settings
  ADMIN_EMAIL: 'admin@tiarkel.com',
  
  // Rate limiting
  MAX_REQUESTS_PER_MINUTE: 10,
  
  // Backup settings
  BACKUP_FOLDER_ID: 'YOUR_BACKUP_FOLDER_ID' // Optional: for daily backups
};

// Main function to handle form submissions
function doPost(e) {
  try {
    // Parse request
    const requestData = JSON.parse(e.postData.contents);
    
    // Validate request
    if (!validateRequest(requestData)) {
      return createResponse(400, { error: 'Invalid request data' });
    }
    
    // Rate limiting
    if (!checkRateLimit(requestData)) {
      return createResponse(429, { error: 'Too many requests' });
    }
    
    // Process lead
    const result = processLead(requestData);
    
    // Send notifications
    sendNotifications(requestData, result);
    
    // Return success response
    return createResponse(200, { 
      success: true, 
      lead_id: requestData.lead_id,
      message: 'Lead processed successfully' 
    });
    
  } catch (error) {
    console.error('Error processing lead:', error);
    return createResponse(500, { error: 'Internal server error' });
  }
}

// Validate incoming request data
function validateRequest(data) {
  const requiredFields = ['name', 'phone', 'product_type', 'product_id', 'lead_id', 'created_at'];
  
  for (const field of requiredFields) {
    if (!data[field]) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }
  
  // Validate phone number
  if (!isValidPhone(data.phone)) {
    console.error('Invalid phone number:', data.phone);
    return false;
  }
  
  // Validate email if provided
  if (data.email && !isValidEmail(data.email)) {
    console.error('Invalid email:', data.email);
    return false;
  }
  
  return true;
}

// Check rate limiting
function checkRateLimit(data) {
  const cache = CacheService.getScriptCache();
  const clientId = data.user_agent || data.lead_id; // Use lead_id as fallback
  const key = `rate_limit_${clientId}`;
  
  const requests = cache.get(key);
  const currentTime = new Date().getTime();
  
  if (requests) {
    const requestTimes = JSON.parse(requests);
    const recentRequests = requestTimes.filter(time => currentTime - time < 60000);
    
    if (recentRequests.length >= CONFIG.MAX_REQUESTS_PER_MINUTE) {
      return false;
    }
    
    recentRequests.push(currentTime);
    cache.put(key, JSON.stringify(recentRequests), 60);
  } else {
    cache.put(key, JSON.stringify([currentTime]), 60);
  }
  
  return true;
}

// Process lead and save to Google Sheets
function processLead(data) {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  
  // Prepare row data
  const rowData = [
    data.lead_id,
    new Date(data.created_at),
    data.name,
    data.phone,
    data.phone_e164 || data.phone,
    data.email || '',
    data.product_type,
    data.product_id,
    data.comment || '',
    data.locale,
    data.utm_source,
    data.utm_medium,
    data.utm_campaign,
    data.utm_content,
    data.utm_term,
    data.referrer,
    data.page_url,
    data.cta_id,
    data.user_agent,
    data.time_to_fill,
    data.form_type,
    data.form_id,
    'New', // Status
    new Date(), // Processed at
    Session.getActiveUser().getEmail() // Processed by
  ];
  
  // Add row to sheet
  sheet.appendRow(rowData);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, rowData.length);
  
  // Add formatting to new row
  const lastRow = sheet.getLastRow();
  const range = sheet.getRange(lastRow, 1, 1, rowData.length);
  
  // Add borders
  range.setBorder(true, true, true, true, true, true);
  
  // Highlight status column
  sheet.getRange(lastRow, 23).setBackground('#e8f5e8');
  
  return {
    row: lastRow,
    sheet_id: CONFIG.SPREADSHEET_ID
  };
}

// Send notifications
function sendNotifications(data, result) {
  // Send Telegram notification
  sendTelegramNotification(data);
  
  // Send email notification (optional)
  if (CONFIG.ADMIN_EMAIL) {
    sendEmailNotification(data, result);
  }
  
  // Send auto-email to customer if email provided
  if (data.email) {
    sendCustomerAutoEmail(data);
  }
}

// Send Telegram notification
function sendTelegramNotification(data) {
  try {
    const message = formatTelegramMessage(data);
    const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const payload = {
      chat_id: CONFIG.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    };
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify(payload)
    };
    
    UrlFetchApp.fetch(url, options);
    
  } catch (error) {
    console.error('Telegram notification failed:', error);
  }
}

// Format Telegram message
function formatTelegramMessage(data) {
  const productNames = {
    lite: 'LITE',
    pro: 'PRO',
    studio: 'STUDIO',
    vip: 'VIP',
    branding: 'Брендинг',
    smm: 'SMM-дизайн',
    video: 'Видео',
    print: 'Полиграфия'
  };
  
  const emoji = data.product_type === 'course' ? '🎓' : '🎨';
  const productName = productNames[data.product_id] || data.product_id;
  
  return `${emoji} <b>Новая заявка!</b>

👤 <b>Имя:</b> ${data.name}
📱 <b>Телефон:</b> ${data.phone}
${data.email ? `📧 <b>Email:</b> ${data.email}\n` : ''}
🎯 <b>Продукт:</b> ${productName}
${data.comment ? `💬 <b>Комментарий:</b> ${data.comment}\n` : ''}
🌐 <b>Источник:</b> ${data.utm_source} / ${data.utm_medium}
📄 <b>Страница:</b> ${data.page_url}

🆔 <b>ID:</b> ${data.lead_id}
⏰ <b>Время:</b> ${new Date(data.created_at).toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })}
🌍 <b>Язык:</b> ${data.locale.toUpperCase()}`;
}

// Send email notification to admin
function sendEmailNotification(data, result) {
  try {
    const subject = `Новая заявка: ${data.name} - ${data.product_id}`;
    const body = `
Новая заявка получена:

Имя: ${data.name}
Телефон: ${data.phone}
Email: ${data.email || 'Не указан'}
Продукт: ${data.product_type} - ${data.product_id}
Комментарий: ${data.comment || 'Нет'}

Источник: ${data.utm_source} / ${data.utm_medium}
Страница: ${data.page_url}
ID заявки: ${data.lead_id}

Заявка сохранена в строке ${result.row} таблицы.
    `;
    
    MailApp.sendEmail(CONFIG.ADMIN_EMAIL, subject, body);
    
  } catch (error) {
    console.error('Email notification failed:', error);
  }
}

// Send auto-email to customer
function sendCustomerAutoEmail(data) {
  try {
    const subject = `Заявка принята - Tiarkel`;
    const body = `
Здравствуйте, ${data.name}!

Спасибо за вашу заявку. Мы получили ваш запрос и свяжемся с вами в течение 2-6 часов (Пн-Сб, 10:00-19:00, Азия/Ташkент).

Номер вашей заявки: ${data.lead_id}

Если у вас есть срочные вопросы, вы можете связаться с нами напрямую:
📱 Telegram: https://t.me/tatvorit
💬 WhatsApp: https://wa.me/998XXXXXXXXX

С уважением,
Команда Tiarkel
    `;
    
    MailApp.sendEmail(data.email, subject, body);
    
  } catch (error) {
    console.error('Customer auto-email failed:', error);
  }
}

// Create HTTP response
function createResponse(statusCode, data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setStatusCode(statusCode);
}

// Validation helpers
function isValidPhone(phone) {
  const patterns = [
    /^\+7\s?\(?(\d{3})\)?[\s\-]?(\d{3})[\s\-]?(\d{2})[\s\-]?(\d{2})$/,
    /^\+998\s?(\d{2})\s?(\d{3})\s?(\d{2})\s?(\d{2})$/
  ];
  
  return patterns.some(pattern => pattern.test(phone));
}

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Setup function - run once to create spreadsheet structure
function setupSpreadsheet() {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME) || spreadsheet.insertSheet(CONFIG.SHEET_NAME);
  
  // Set up headers
  const headers = [
    'Lead ID',
    'Created At',
    'Name',
    'Phone',
    'Phone E164',
    'Email',
    'Product Type',
    'Product ID',
    'Comment',
    'Locale',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'UTM Content',
    'UTM Term',
    'Referrer',
    'Page URL',
    'CTA ID',
    'User Agent',
    'Time to Fill',
    'Form Type',
    'Form ID',
    'Status',
    'Processed At',
    'Processed By'
  ];
  
  // Clear existing data
  sheet.clear();
  
  // Add headers
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#f0f0f0');
  headerRange.setFontWeight('bold');
  headerRange.setBorder(true, true, true, true, true, true);
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  console.log('Spreadsheet setup completed');
}

// Daily backup function
function createDailyBackup() {
  if (!CONFIG.BACKUP_FOLDER_ID) return;
  
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    
    const data = sheet.getDataRange().getValues();
    const csvContent = data.map(row => row.join(',')).join('\n');
    
    const backupFolder = DriveApp.getFolderById(CONFIG.BACKUP_FOLDER_ID);
    const fileName = `leads_backup_${new Date().toISOString().split('T')[0]}.csv`;
    
    backupFolder.createFile(fileName, csvContent, MimeType.CSV);
    
    console.log('Daily backup created:', fileName);
    
  } catch (error) {
    console.error('Backup failed:', error);
  }
}

// Test function
function testLeadProcessing() {
  const testData = {
    lead_id: 'test_' + Date.now(),
    created_at: new Date().toISOString(),
    name: 'Тестовый пользователь',
    phone: '+998 90 123 45 67',
    phone_e164: '+998901234567',
    email: 'test@example.com',
    product_type: 'course',
    product_id: 'pro',
    comment: 'Тестовая заявка',
    locale: 'ru',
    utm_source: 'test',
    utm_medium: 'test',
    utm_campaign: 'test',
    utm_content: '',
    utm_term: '',
    referrer: 'https://example.com',
    page_url: 'https://tiarkel.com/test',
    cta_id: 'test_cta',
    user_agent: 'Test Browser',
    time_to_fill: 5000,
    form_type: 'test',
    form_id: 'test_form'
  };
  
  const result = processLead(testData);
  console.log('Test result:', result);
}

// Set up daily backup trigger
function setupBackupTrigger() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'createDailyBackup') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create new trigger for daily backup at 2 AM
  ScriptApp.newTrigger('createDailyBackup')
    .timeBased()
    .everyDays(1)
    .atHour(2)
    .create();
    
  console.log('Backup trigger set up');
} 