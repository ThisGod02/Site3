// Загрузка текстовых данных
async function loadTextFile(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error('File not found');
        return await response.text();
    } catch (error) {
        console.error('Error loading file:', error);
        return '';
    }
}

// Загрузка данных о конкурсах
async function loadCompetitions() {
    const text = await loadTextFile('media/text/competitions.txt');
    return text.split('\n').filter(line => line.trim() !== '');
}

// Загрузка отзывов
async function loadFeedback() {
    const text = await loadTextFile('media/text/feedback.txt');
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return lines.map(line => {
        const parts = line.split('|');
        return {
            author: parts[0] || 'Аноним',
            date: parts[1] || '',
            text: parts[2] || ''
        };
    });
}

// Переключение темы
function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // Загрузка сохраненной темы
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
});

// Экспорт функций для использования в других скриптах
window.loadCompetitions = loadCompetitions;
window.loadFeedback = loadFeedback;

