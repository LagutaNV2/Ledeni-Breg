// Django/backend/static/js/main.js
// Основные функции сайта
document.addEventListener('DOMContentLoaded', function() {
    // Сохраняем выбранный язык
    const languageForm = document.getElementById('language-form');
    if (languageForm) {
        const languageSelect = languageForm.querySelector('select[name="language"]');

        // Автоматическая отправка формы при изменении языка
        languageSelect.addEventListener('change', function() {
            // Показываем индикатор загрузки
            showLanguageLoading();

            // Отправляем форму
            languageForm.submit();
        });
    }

    // Функция для показа индикатора загрузки при смене языка
    function showLanguageLoading() {
        const existingLoader = document.getElementById('language-loading');
        if (existingLoader) return;

        const loader = document.createElement('div');
        loader.id = 'language-loading';
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            font-family: 'Helvetica Neue', Arial, sans-serif;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            text-align: center;
        `;

        const icon = document.createElement('div');
        icon.style.cssText = 'font-size: 2rem; margin-bottom: 1rem;';
        icon.textContent = '🔄';

        const heading = document.createElement('h3');
        heading.style.cssText = 'color: #1e3c72; margin-bottom: 0.5rem;';
        heading.textContent = 'Меняем язык...';

        const text = document.createElement('p');
        text.style.cssText = 'color: #666;';
        text.textContent = 'Пожалуйста, подождите';

        // Собираем структуру
        content.appendChild(icon);
        content.appendChild(heading);
        content.appendChild(text);
        overlay.appendChild(content);
        loader.appendChild(overlay);

        document.body.appendChild(loader);
    }


    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Обработка форм
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Валидация и обработка формы
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });

    function validateForm(form) {
        // Реализация валидации
        return true;
    }
});
