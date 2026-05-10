document.addEventListener('DOMContentLoaded', function() {
    // ===== ТЕМА =====
    const themeToggle = document.getElementById('themeToggle');
    const themeLink = document.getElementById('theme-css');

    function setTheme(theme) {
        const basePath = theme === 'dark' ? 'dark/' : 'light/';
        const iconSrc = theme === 'dark' ? 'img/svetltem.svg' : 'img/vkltemn.svg';

        if (themeLink) themeLink.setAttribute('href', basePath + 'style.css');

        const mobileLink = document.querySelector('link[href*="mobile.css"]');
        if (mobileLink) mobileLink.setAttribute('href', basePath + 'mobile.css');

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