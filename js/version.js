/**
 * Версионирование ресурсов для Tiarkel Site
 * Используется для избежания кеша после релиза
 */

// Версия билда - обновляется при каждом релизе
const BUILD_VERSION = '202501201200';

// Функция для добавления версии к URL
function addVersionToUrl(url) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${BUILD_VERSION}`;
}

// Функция для обновления всех ресурсов с версией
function updateResourceVersions() {
    // Обновляем CSS файлы
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
    cssLinks.forEach(link => {
        if (link.href && !link.href.includes('googleapis.com')) {
            link.href = addVersionToUrl(link.href);
        }
    });

    // Обновляем JS файлы
    const jsScripts = document.querySelectorAll('script[src]');
    jsScripts.forEach(script => {
        if (script.src && !script.src.includes('googletagmanager.com')) {
            script.src = addVersionToUrl(script.src);
        }
    });

    // Обновляем изображения
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        if (img.src && !img.src.includes('http')) {
            img.src = addVersionToUrl(img.src);
        }
    });
}

// Экспортируем для использования в других модулях
window.BUILD_VERSION = BUILD_VERSION;
window.addVersionToUrl = addVersionToUrl;
window.updateResourceVersions = updateResourceVersions;

// Логирование версии при загрузке
console.log(`Tiarkel Site v${BUILD_VERSION} loaded`); 