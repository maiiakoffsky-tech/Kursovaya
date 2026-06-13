document.addEventListener('DOMContentLoaded', function() {
    // ===== ТЕМА =====
    const themeToggle = document.getElementById('themeToggle');
    const themeLink = document.getElementById('theme-css');
    const tabletLink = document.getElementById('tablet-css');
    const mobileLink = document.getElementById('mobile-css');

    function setTheme(theme) {
        const basePath = theme === 'dark' ? 'dark/' : 'light/';
        // Иконка темы: светлая тема -> иконка для переключения на тёмную, и наоборот
        const iconSrc = theme === 'dark' ? 'img/icons/svetltem.svg' : 'img/icons/vkltemn.svg';

        // Основной стиль
        if (themeLink) themeLink.setAttribute('href', basePath + 'style.css');

        // Планшетный стиль
        if (tabletLink) {
            tabletLink.setAttribute('href', basePath + 'tablet.css');
            tabletLink.setAttribute('media', 'screen and (min-width: 600px) and (max-width: 1024px)');
        }

        // Мобильный стиль
        if (mobileLink) {
            mobileLink.setAttribute('href', basePath + 'mobile.css');
            mobileLink.setAttribute('media', 'screen and (max-width: 599px)');
        }

        // Иконка темы
        if (themeToggle) {
            themeToggle.src = iconSrc;
            themeToggle.alt = theme === 'dark' ? 'Светлая тема' : 'Тёмная тема';
        }

        localStorage.setItem('theme', theme);
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const current = localStorage.getItem('theme') || 'light';
            setTheme(current === 'light' ? 'dark' : 'light');
        });
    }

    // ===== БУРГЕР-МЕНЮ =====
    const burgerBtn = document.getElementById('burgerIcon') || document.querySelector('.burger-icon');
    const menuPanel = document.getElementById('menuPanel');

    if (burgerBtn && menuPanel) {
        // Гарантируем закрытое состояние при загрузке
        menuPanel.classList.remove('open');

        burgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            menuPanel.classList.toggle('open');
        });

        document.addEventListener('click', function(e) {
            if (menuPanel.classList.contains('open') && 
                !menuPanel.contains(e.target) && 
                !burgerBtn.contains(e.target)) {
                menuPanel.classList.remove('open');
            }
        });

        menuPanel.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuPanel.classList.remove('open');
            });
        });
    }
});