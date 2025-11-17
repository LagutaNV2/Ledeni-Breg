document.addEventListener('DOMContentLoaded', function() {
    console.log('=== BURGER MENU DEBUG INIT ===');
    console.log('Window dimensions:', window.innerWidth, 'x', window.innerHeight);
    console.log('User Agent:', navigator.userAgent);
    console.log('Orientation:', window.screen.orientation?.type);
    console.log('Touch support:', 'ontouchstart' in window);

    const burgerMenu = document.getElementById('burger-menu');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (burgerMenu && mainNav) {
        // Функция для определения мобильного режима
        function isMobileMode() {
            return window.innerWidth <= 1024;
        }

        // Функция для определения ландшафтного режима
        function isLandscapeMode() {
            return window.innerWidth > 768 && window.innerWidth <= 1024 && window.matchMedia("(orientation: landscape)").matches;
        }

        // Функция для определения, нужно ли показывать бургер
        function shouldShowBurger() {
            return window.innerWidth <= 768 || (window.innerWidth <= 1024 && window.matchMedia("(orientation: portrait)").matches);
        }

        burgerMenu.addEventListener('click', function() {
            // В ландшафтном режиме бургер не должен работать
            if (isLandscapeMode()) return;

            this.classList.toggle('active');
            mainNav.classList.toggle('active');

            // Блокировка прокрутки при открытом меню
            if (mainNav.classList.contains('active')) {
                body.style.overflow = 'hidden';
                body.classList.add('menu-open');
            } else {
                body.style.overflow = '';
                body.classList.remove('menu-open');
            }
        });

        // Обработка кликов на dropdown элементы
        document.querySelectorAll('.dropdown > a').forEach(dropdownLink => {
            dropdownLink.addEventListener('click', function(e) {
                console.log('Dropdown clicked:', this);

                if (isMobileMode() || isLandscapeMode()) {
                    e.preventDefault();
                    e.stopPropagation();

                    const dropdown = this.parentElement;
                    const wasActive = dropdown.classList.contains('active');

                    // Закрытие всех dropdown
                    document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });

                    // Открываем текущий dropdown, если он не был активен
                    if (!wasActive) {
                        dropdown.classList.add('active');
                    } else {
                        dropdown.classList.remove('active');
                    }
                }
            });
        });

        // Закрытие dropdown при клике вне его
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Закрытие меню при клике на обычную ссылку (только в мобильном режиме)
        document.querySelectorAll('.nav-list a:not(.dropdown > a)').forEach(link => {
            link.addEventListener('click', () => {
                if (shouldShowBurger()) {
                    burgerMenu.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.style.overflow = '';
                    body.classList.remove('menu-open');

                    // Закрытие всех dropdown
                    document.querySelectorAll('.dropdown').forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            });
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', function(event) {
            const isClickInsideHeader = event.target.closest('.header-container');
            const isClickInsideNav = event.target.closest('.main-nav');

            if (!isClickInsideHeader && !isClickInsideNav && mainNav.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                body.style.overflow = '';
                body.classList.remove('menu-open');

                // Закрытие всех dropdown
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Автоматическое закрытие dropdown при изменении размера
        window.addEventListener('resize', function() {
            clearTimeout(window.resizeTimer);
            window.resizeTimer = setTimeout(function() {
                // В ландшафтном режиме оставляем меню открытым
                if (!shouldShowBurger()) {
                    burgerMenu.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.style.overflow = '';
                    body.classList.remove('menu-open');
                }

                // Закрытие всех dropdown при изменении размера
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }, 250);
        });

        // Обработка изменения ориентации экрана
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                // В ландшафтном режиме оставляем меню видимым
                if (isLandscapeMode()) {
                    burgerMenu.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.style.overflow = '';
                    body.classList.remove('menu-open');
                }

                // Закрытие всех dropdown при смене ориентации
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }, 300);
        });
    }
});
