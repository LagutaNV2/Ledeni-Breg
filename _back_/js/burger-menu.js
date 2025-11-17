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
        // function isMobileMode() {
        //     return window.innerWidth <= 1024;
        // }
        function isMobileMode() {
            const widthCheck = window.innerWidth <= 1024;
            const heightCheck = window.innerWidth <= 1024 && window.innerHeight <= 768;
            const userAgentCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            const result = widthCheck || heightCheck || userAgentCheck;

            console.log('🔍 isMobileMode():', {
                result,
                width: window.innerWidth,
                height: window.innerHeight,
                widthCheck,
                heightCheck,
                userAgentCheck,
                userAgent: navigator.userAgent
            });

            return result;
        }

        // Функция для определения ландшафтного режима
        // function isLandscapeMode() {
        //     return window.innerWidth > 768 && window.innerWidth <= 1024 && window.matchMedia("(orientation: landscape)").matches;
        // }
        function isLandscapeMode() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isLandscape = width > height;
            const isTabletSize = width > 768 && width <= 1200;

            const result = isLandscape && isTabletSize;

            console.log('🔍 UPDATED isLandscapeMode():', {
                result,
                width,
                height,
                isLandscape,
                isTabletSize
            });

            return result;
        }

        // Функция для определения, нужно ли показывать бургер
        function shouldShowBurger() {
            return window.innerWidth <= 768 || (window.innerWidth <= 1024 && window.matchMedia("(orientation: portrait)").matches);
        }

        // Функция для проверки CSS правил, влияющих на элемент
        function checkAffectingCSSRules(selector) {
            console.log(`🔍 Checking CSS rules for: ${selector}`);

            // Проверим наличие важных CSS классов
            const importantClasses = [
                '.dropdown-menu',
                '.dropdown.active .dropdown-menu',
                '.main-nav .dropdown-menu',
                '.main-nav.compact-landscape .dropdown-menu',
                '.main-nav.compact-landscape .dropdown.active .dropdown-menu'
            ];

            importantClasses.forEach(cssClass => {
                const elements = document.querySelectorAll(cssClass);
                console.log(`Elements matching "${cssClass}":`, elements.length);
                elements.forEach((el, idx) => {
                    const styles = window.getComputedStyle(el);
                    console.log(`  ${cssClass} [${idx}]:`, {
                        display: styles.display,
                        position: styles.position,
                        visible: styles.display !== 'none' && styles.visibility !== 'hidden'
                    });
                });
            });
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


                console.log('🎯 === DROPDOWN CLICK START ===');
                checkAffectingCSSRules('.dropdown-menu');

                console.log('Dropdown clicked:', this);
                console.log('Target element:', e.target);
                console.log('Current classes on link:', this.classList.toString());

                const dropdown = this.parentElement;
                console.log('Parent dropdown classes:', dropdown.classList.toString());
                console.log('Dropdown menu element:', dropdown.querySelector('.dropdown-menu'));

                console.log('🎯 Checking all dropdown elements:');
                document.querySelectorAll('.dropdown').forEach((dropdown, index) => {
                    console.log(`Dropdown ${index}:`, {
                        classes: dropdown.classList.toString(),
                        menu: dropdown.querySelector('.dropdown-menu'),
                        menuDisplay: dropdown.querySelector('.dropdown-menu') ?
                            window.getComputedStyle(dropdown.querySelector('.dropdown-menu')).display : 'no menu'
                    });
                });

                const mobileMode = isMobileMode();
                const landscapeMode = isLandscapeMode();

                console.log('📱 Mode checks:', {
                    mobileMode,
                    landscapeMode,
                    shouldHandleClick: mobileMode || landscapeMode
                });

                console.log('📡 === ACTIVE MEDIA QUERIES AT CLICK TIME ===');
                const mediaQueries = [
                    '(max-width: 768px)',
                    '(max-width: 1024px)',
                    '(orientation: landscape)',
                    '(max-width: 1024px) and (orientation: landscape)',
                    '(min-width: 747px) and (max-width: 1024px) and (orientation: landscape)'
                ];
                mediaQueries.forEach(query => {
                    const matches = window.matchMedia(query).matches;
                    console.log(`Media query "${query}": ${matches ? 'ACTIVE' : 'inactive'}`);
                });
                console.log('📡 === END MEDIA QUERIES ===');

                if (isMobileMode() || isLandscapeMode()) {
                    e.preventDefault();
                    e.stopPropagation();

                    const wasActive = dropdown.classList.contains('active');
                    console.log('📊 Dropdown was active:', wasActive);


                    // Закрытие всех dropdown
                    document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            console.log('🔒 Closing other dropdown:', otherDropdown);
                            otherDropdown.classList.remove('active');
                        }
                    });

                    // Открываем текущий dropdown, если он не был активен
                    if (!wasActive) {
                        console.log('📂 Opening dropdown');
                        dropdown.classList.add('active');

                        // Проверим стили после добавления класса
                        setTimeout(() => {
                            const menu = dropdown.querySelector('.dropdown-menu');
                            console.log('🎨 After activation - Dropdown menu styles:', {
                                display: window.getComputedStyle(menu).display,
                                visibility: window.getComputedStyle(menu).visibility,
                                opacity: window.getComputedStyle(menu).opacity,
                                position: window.getComputedStyle(menu).position,
                                zIndex: window.getComputedStyle(menu).zIndex
                            });
                        }, 10);
                    } else {
                        console.log('📁 Closing dropdown');
                        dropdown.classList.remove('active');
                    }
                } else {
                    console.log('❌ Not handling click - desktop mode');
                }

                // Проверим стили в разных контекстах
                console.log('🎨 === COMPREHENSIVE STYLE CHECK ===');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    const styles = window.getComputedStyle(menu);
                    console.log('Dropdown menu styles:', {
                        display: styles.display,
                        visibility: styles.visibility,
                        opacity: styles.opacity,
                        position: styles.position,
                        zIndex: styles.zIndex,
                        width: styles.width,
                        height: styles.height,
                        overflow: styles.overflow
                    });
                }

                // Проверим родительские элементы
                let parent = dropdown;
                while (parent) {
                    const styles = window.getComputedStyle(parent);
                    console.log(`Parent ${parent.tagName}.${parent.className}:`, {
                        display: styles.display,
                        position: styles.position,
                        overflow: styles.overflow
                    });
                    parent = parent.parentElement;
                    if (!parent || parent.tagName === 'BODY') break;
                }
                console.log('🎨 === END STYLE CHECK ===');

                console.log('🎯 === DROPDOWN CLICK END ===');
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
