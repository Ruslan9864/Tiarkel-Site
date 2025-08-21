/**
 * Скрипт для обновления версий во всех HTML файлах
 * Запускать при каждом релизе
 */

const fs = require('fs');
const path = require('path');

// Новая версия
const NEW_VERSION = '202501201200';

// Файлы для обновления
const htmlFiles = [
    'index.html',
    'program.html',
    'pricing.html',
    'cases.html',
    'services.html',
    'contacts.html',
    'faq.html',
    'privacy.html',
    'oferta.html',
    'courses/osnovnoy-kurs.html',
    'store/index.html',
    'store/product.html'
];

// Скрипты для версионирования
const scriptsToVersion = [
    'script.js',
    'navigation.js',
    'js/sidebar.js',
    'js/store-preview.js',
    'js/program.js',
    'js/forms.js'
];

function updateFileVersions(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;

        // Обновляем версии скриптов
        scriptsToVersion.forEach(script => {
            const oldPattern = new RegExp(`src="${script}"`, 'g');
            const newPattern = `src="${script}?v=${NEW_VERSION}"`;
            
            if (content.includes(`src="${script}"`)) {
                content = content.replace(oldPattern, newPattern);
                updated = true;
                console.log(`Updated ${script} in ${filePath}`);
            }
        });

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated ${filePath}`);
        } else {
            console.log(`⏭️  No changes needed for ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
    }
}

// Обновляем версию в version.js
function updateVersionFile() {
    try {
        const versionPath = 'js/version.js';
        let content = fs.readFileSync(versionPath, 'utf8');
        
        content = content.replace(
            /const BUILD_VERSION = '[\d]+';/,
            `const BUILD_VERSION = '${NEW_VERSION}';`
        );
        
        fs.writeFileSync(versionPath, content, 'utf8');
        console.log(`✅ Updated version in ${versionPath}`);
    } catch (error) {
        console.error(`❌ Error updating version file:`, error.message);
    }
}

// Основная функция
function main() {
    console.log(`🔄 Updating versions to ${NEW_VERSION}...\n`);
    
    // Обновляем версию в version.js
    updateVersionFile();
    
    // Обновляем HTML файлы
    htmlFiles.forEach(file => {
        if (fs.existsSync(file)) {
            updateFileVersions(file);
        } else {
            console.log(`⚠️  File not found: ${file}`);
        }
    });
    
    console.log(`\n✅ Version update completed!`);
}

// Запускаем если скрипт вызван напрямую
if (require.main === module) {
    main();
}

module.exports = { updateFileVersions, updateVersionFile, NEW_VERSION }; 