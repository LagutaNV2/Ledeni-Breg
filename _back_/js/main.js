// Django/backend/static/js/main.js
// Основные функции сайта
document.addEventListener('DOMContentLoaded', function() {
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
