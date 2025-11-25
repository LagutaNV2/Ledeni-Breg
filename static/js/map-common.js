// backend/static/js/map-common.js

// Безопасная нормализация точек
function normalizePoints(points) {
    if (!points || !Array.isArray(points)) {
        return [];
    }

    return points.map(point => {
        let lat = point.lat;
        let lng = point.lng;

        if (typeof lat === 'string') {
            lat = parseFloat(lat.replace(',', '.'));
        }
        if (typeof lng === 'string') {
            lng = parseFloat(lng.replace(',', '.'));
        }

        return {
            ...point,
            lat: isValidCoordinate(lat) ? lat : null,
            lng: isValidCoordinate(lng) ? lng : null
        };
    }).filter(point => point.lat && point.lng);
}

// Проверка валидности координат
function isValidCoordinate(coord) {
    return typeof coord === 'number' && !isNaN(coord) && coord !== 0;
}

// Безопасное создание содержимого попапа
function createPopupContent(point) {
    const popupDiv = document.createElement('div');
    popupDiv.className = 'map-popup';

    const title = document.createElement('h3');
    title.textContent = point.name || t('Point');
    popupDiv.appendChild(title);

    if (point.address) {
        const address = document.createElement('p');
        const addressLabel = document.createElement('strong');
        addressLabel.textContent = t('Address') + ': ';
        address.appendChild(addressLabel);
        address.appendChild(document.createTextNode(point.address));
        popupDiv.appendChild(address);
    }

    if (point.city) {
        const city = document.createElement('p');
        const cityLabel = document.createElement('strong');
        cityLabel.textContent = t('City') + ': ';
        city.appendChild(cityLabel);
        city.appendChild(document.createTextNode(point.city));
        popupDiv.appendChild(city);
    }

    return popupDiv;
}

// Безопасное отображение ошибки
function showErrorMessage(mapElement, error) {
    while (mapElement.firstChild) {
        mapElement.removeChild(mapElement.firstChild);
    }

    const errorContainer = document.createElement('div');
    errorContainer.className = 'map-error';

    const title = document.createElement('h3');
    title.textContent = t('Map is temporarily unavailable');
    errorContainer.appendChild(title);

    const message = document.createElement('p');
    message.textContent = t('Try refreshing the page or come back later.');
    errorContainer.appendChild(message);

    if (error && error.message) {
        const errorText = document.createElement('p');
        errorText.className = 'error-details';
        errorText.textContent = `${t('Error')}: ${error.message}`;
        errorContainer.appendChild(errorText);
    }

    mapElement.appendChild(errorContainer);
}

// Создание контрола поиска
function createSearchControl(map) {
    const SearchControl = L.Control.extend({
        onAdd: function(map) {
            const searchContainer = L.DomUtil.create('div', 'search-control mobile-optimized');

            const searchInput = L.DomUtil.create('input', 'search-input', searchContainer);
            searchInput.type = 'text';
            searchInput.placeholder = t('Search by address...');

            const searchButton = L.DomUtil.create('button', 'search-button', searchContainer);
            searchButton.textContent = '🔍';
            searchButton.title = t('Search');

            L.DomEvent.disableClickPropagation(searchContainer);

            searchButton.addEventListener('click', () => {
                this.performSearch(searchInput.value, map);
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(searchInput.value, map);
                }
            });

            return searchContainer;
        },

        performSearch: function(query, map) {
            if (!query.trim()) return;

            const apiKey = '49ccc4bbc07e45788dc79eb85de14eb5';
            const openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}&limit=1&language=sr&countrycode=rs`;

            // Индикация загрузки
            const searchContainer = document.querySelector('.search-control');
            const searchButton = searchContainer?.querySelector('.search-button');
            if (searchContainer && searchButton) {
                searchContainer.classList.add('searching');
                searchButton.disabled = true;
            }

            fetch(openCageUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.results && data.results.length > 0) {
                        const result = data.results[0];
                        const lat = result.geometry.lat;
                        const lng = result.geometry.lng;

                        map.setView([lat, lng], 15);

                        const popupContent = document.createElement('div');
                        const popupText = document.createElement('strong');
                        popupText.textContent = result.formatted;
                        popupContent.appendChild(popupText);

                        L.popup()
                            .setLatLng([lat, lng])
                            .setContent(popupContent)
                            .openOn(map);
                    } else {
                        alert(`${t('Address not found')}. ${t('Try another query')}.`);
                    }
                })
                .catch(error => {
                    console.error('Search error:', error);

                    let errorMessage = `${t('Search error')}. `;

                    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                        errorMessage += t('Check internet connection');
                    } else if (error.message.includes('HTTP error')) {
                        errorMessage += t('Search service unavailable');
                    } else if (error.message.includes('quota') || error.message.includes('limit')) {
                        errorMessage += `${t('Daily search limit reached')}. ${t('Try tomorrow')}.`;
                    } else {
                        errorMessage += t('Try again later');
                    }

                    alert(errorMessage);
                })
                .finally(() => {
                    if (searchContainer && searchButton) {
                        searchContainer.classList.remove('searching');
                        searchButton.disabled = false;
                    }
                });
        }
    });

    return new SearchControl({ position: 'topleft' });
}

// Создание контрола полноэкранного режима
function createFullscreenControl(mapElement) {
    const FullscreenControl = L.Control.extend({
        onAdd: function(map) {
            const fullscreenButton = L.DomUtil.create('button', 'fullscreen-control');
            fullscreenButton.textContent = '⛶';
            fullscreenButton.title = t('Fullscreen mode');

            L.DomEvent.disableClickPropagation(fullscreenButton);
            L.DomEvent.on(fullscreenButton, 'click', () => {
                this.toggleFullscreen(mapElement);
            });

            return fullscreenButton;
        },

        toggleFullscreen: function(element) {
            if (!document.fullscreenElement) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        }
    });

    return new FullscreenControl({ position: 'topright' });
}

// Функция для создания маркеров с попапами NEW
// !проверить, есть сомнение об использовании!
function createMarkersWithPopups(points, map, customIcon) {
    const markers = [];

    points.forEach(point => {
        if (!point.lat || !point.lng) return;

        const marker = L.marker([point.lat, point.lng], {
            icon: customIcon
        }).addTo(map);

        // Создаем и привязываем попап
        const popupContent = createPopupContent(point);
        marker.bindPopup(popupContent);

        // Обработчик клика для открытия попапа
        marker.on('click', function() {
            this.openPopup();
        });

        markers.push({
            marker: marker,
            data: point
        });
    });

    return markers;
}

// Создание контрола списка точек с правильной обработкой событий
function createPointsControl(markers, map, title) {
    let mapContainer; // Сохраняем ссылку на контейнер карты

    const PointsControl = L.Control.extend({
        onAdd: function(map) {
            mapContainer = map.getContainer();

            const pointsButton = L.DomUtil.create('button', 'points-control');
            pointsButton.textContent = '📋';
            pointsButton.title = title || t('List of points');

            L.DomEvent.disableClickPropagation(pointsButton);
            L.DomEvent.on(pointsButton, 'click', () => {
                this.toggleSidePanel(markers, map, title);
            });

            return pointsButton;
        },

        toggleSidePanel: function(markers, map, title) {
            let sidePanel = mapContainer.querySelector('.map-side-panel');

            if (sidePanel) {
                this.closeSidePanel();
            } else {
                this.createSidePanel(markers, map, title);
            }
        },

        createSidePanel: function(markers, map, title) {
            const sidePanel = document.createElement('div');
            sidePanel.className = 'map-side-panel';

            // Заголовок панели
            const header = document.createElement('div');
            header.className = 'side-panel-header';

            const titleElement = document.createElement('h3');
            titleElement.textContent = title || t('List of points');
            header.appendChild(titleElement);

            const closeButton = document.createElement('button');
            closeButton.className = 'side-panel-close';
            closeButton.innerHTML = '×';
            closeButton.title = t('Close');
            closeButton.addEventListener('click', () => {
                this.closeSidePanel();
            });
            header.appendChild(closeButton);

            sidePanel.appendChild(header);

            // Список точек с сохранением прокрутки
            const list = document.createElement('div');
            list.className = 'side-panel-list';

            // Отключаем обработку событий Leaflet для списка
            L.DomEvent.disableScrollPropagation(list);
            L.DomEvent.disableClickPropagation(list);

            // Разрешаем события прокрутки для самого списка
            list.addEventListener('wheel', function(e) {
                e.stopPropagation();

                // Проверяем, достигли ли мы границ прокрутки
                const isAtTop = list.scrollTop === 0;
                const isAtBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 1;

                // Если прокрутка вниз и достигли дна - останавливаем распространение
                if (e.deltaY > 0 && isAtBottom) {
                    e.stopPropagation();
                }
                // Если прокрутка вверх и достигли верха - останавливаем распространение
                else if (e.deltaY < 0 && isAtTop) {
                    e.stopPropagation();
                }
                // В остальных случаях позволяем прокрутку
                else {
                    e.stopPropagation();
                }
            });

            if (markers.length === 0) {
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'side-panel-empty';
                emptyMessage.textContent = t('Points not found');
                list.appendChild(emptyMessage);
            } else {
                markers.forEach(item => {
                    const pointElement = this.createPointElement(item, map);
                    list.appendChild(pointElement);
                });
            }

            sidePanel.appendChild(list);
            mapContainer.appendChild(sidePanel);
            mapContainer.classList.add('map-with-side-panel');

            // Фокус на список для немедленной работы прокрутки
            setTimeout(() => {
                sidePanel.classList.add('active');
                list.focus();
                map.invalidateSize();
            }, 10);
        },

        createPointElement: function(item, map) {
            const pointElement = document.createElement('div');
            pointElement.className = 'side-panel-item';

            const nameElement = document.createElement('div');
            nameElement.className = 'point-name';
            nameElement.textContent = item.data.name;

            const addressElement = document.createElement('div');
            addressElement.className = 'point-address';
            addressElement.textContent = `${item.data.address}, ${item.data.city}`;

            pointElement.appendChild(nameElement);
            pointElement.appendChild(addressElement);

            // Отключаем обработку Leaflet для элементов списка
            L.DomEvent.disableClickPropagation(pointElement);

            pointElement.addEventListener('click', (e) => {
                e.stopPropagation();
                map.setView([item.data.lat, item.data.lng], 16);
                item.marker.openPopup();

                // Автоматическое закрытие панели на мобильных
                if (isMobileDevice()) {
                    setTimeout(() => {
                        this.closeSidePanel();
                    }, 500);
                } else {
                    // На десктопе только подсвечиваем выбранную точку
                    this.highlightSelectedPoint(pointElement);
                }
            });

            return pointElement;
        },

        highlightSelectedPoint: function(selectedElement) {
            const sidePanel = mapContainer.querySelector('.map-side-panel');
            if (!sidePanel) return;

            const allPoints = sidePanel.querySelectorAll('.side-panel-item');
            allPoints.forEach(point => {
                point.classList.remove('selected');
            });

            selectedElement.classList.add('selected');
            selectedElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        },

        closeSidePanel: function() {
            const sidePanel = mapContainer.querySelector('.map-side-panel');
            if (sidePanel) {
                sidePanel.remove();
                mapContainer.classList.remove('map-with-side-panel');
                // Используем существующий zoomControl карты
                if (mapContainer._leaflet_map) {
                    mapContainer._leaflet_map.invalidateSize();
                }
            }
        }
    });

    return new PointsControl({ position: 'topright' });
}

// Добавление элементов управления картой
function addMapControls(map, markers, mapElement, options = {}) {
    const {
        searchEnabled = true,
        fullscreenEnabled = true,
        pointsListEnabled = true,
        pointsListTitle = 'Lista tačaka'
    } = options;

    // Добавляем поиск
    if (searchEnabled) {
        const searchControl = createSearchControl(map);
        searchControl.addTo(map);

        // ГАРАНТИРУЕМ видимость на мобильных
        if (isMobileDevice()) {
            const searchContainer = mapElement.querySelector('.search-control');
            if (searchContainer) {
                searchContainer.style.display = 'flex';
                searchContainer.style.visibility = 'visible';
                searchContainer.style.opacity = '1';
            }
        }
    }

    // Полноэкранный режим с умным определением устройства
    if (fullscreenEnabled) {
        const fullscreenControl = createFullscreenControl(mapElement);
        fullscreenControl.addTo(map);

        // Скрываем на мобильных через CSS
        if (isMobileDevice()) {
            const fullscreenBtn = mapElement.querySelector('.fullscreen-control');
            if (fullscreenBtn) {
                fullscreenBtn.classList.add('mobile-hidden');
            }
        }
    }

   // Список точек
    if (pointsListEnabled && markers.length > 0) {
        const pointsControl = createPointsControl(markers, map, pointsListTitle);
        pointsControl.addTo(map);

        // ГАРАНТИРУЕМ видимость на мобильных
        if (isMobileDevice()) {
            const pointsBtn = mapElement.querySelector('.points-control');
            if (pointsBtn) {
                pointsBtn.style.display = 'block';
                pointsBtn.style.visibility = 'visible';
                pointsBtn.style.opacity = '1';
            }
        }
    }

    // Кастомный zoom контрол
    const customZoomControl = createCustomZoomControl(map);
    customZoomControl.addTo(map);

     // ГАРАНТИРУЕМ видимость на мобильных
    if (isMobileDevice()) {
        const zoomControl = mapElement.querySelector('.custom-zoom-control');
        if (zoomControl) {
            zoomControl.style.display = 'block';
            zoomControl.style.visibility = 'visible';
            zoomControl.style.opacity = '1';
        }
    }

    // Настройка поведения
    setupSidePanelBehavior(map);
    setupMobileBehavior(map);

    // Финальная проверка размера с задержкой
    setTimeout(() => {
        if (map && typeof map.invalidateSize === 'function') {
            map.invalidateSize(true);
        }
    }, 500);
}

// Создание кастомного zoom контрола (альтернативный вариант)
function createCustomZoomControl(map) {
    const ZoomControl = L.Control.extend({
        onAdd: function(map) {
            const zoomContainer = L.DomUtil.create('div', 'custom-zoom-control');

            const zoomIn = L.DomUtil.create('button', 'zoom-btn zoom-in', zoomContainer);
            zoomIn.textContent = '+';
            zoomIn.title = t('Zoom in');

            const zoomOut = L.DomUtil.create('button', 'zoom-btn zoom-out', zoomContainer);
            zoomOut.textContent = '−';
            zoomOut.title = t('Zoom out');

            L.DomEvent.disableClickPropagation(zoomContainer);

            zoomIn.addEventListener('click', () => {
                map.zoomIn();
            });

            zoomOut.addEventListener('click', () => {
                map.zoomOut();
            });

            return zoomContainer;
        }
    });

    return new ZoomControl({ position: 'topright' });
}

// Определение мобильного устройства NEW
function isMobileDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isTouchDevice = ('ontouchstart' in window) ||
                         (navigator.maxTouchPoints > 0) ||
                         (navigator.msMaxTouchPoints > 0);

    const isMobileScreen = window.innerWidth <= 768;
    const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

    return (isTouchDevice && isMobileScreen) || isMobileUserAgent;
}

// Настройка поведения боковой панели
function setupSidePanelBehavior(map) {
    // Закрытие боковой панели при клике на маркер на карте
    map.on('popupopen', function(e) {
        const mapContainer = map.getContainer();
        const sidePanel = mapContainer.querySelector('.map-side-panel');
        if (sidePanel) {
            // Находим соответствующий элемент в боковой панели и подсвечиваем его
            const popupContent = e.popup.getContent();
            if (popupContent && popupContent.querySelector) {
                const pointName = popupContent.querySelector('h3').textContent;
                const pointItems = sidePanel.querySelectorAll('.side-panel-item');
                pointItems.forEach(item => {
                    const itemName = item.querySelector('.point-name').textContent;
                    if (itemName === pointName) {
                        item.classList.add('selected');
                        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    } else {
                        item.classList.remove('selected');
                    }
                });
            }
        }
    });

    // Закрытие боковой панели при изменении размера окна (на мобильных)
    window.addEventListener('resize', () => {
        const mapContainer = map.getContainer();
        const sidePanel = mapContainer.querySelector('.map-side-panel');
        if (sidePanel && window.innerWidth < 768) {
            sidePanel.remove();
            mapContainer.classList.remove('map-with-side-panel');
            map.invalidateSize();
        }
    });
}

// Настройка мобильного поведения
function setupMobileBehavior(map) {
    map.touchZoom.enable();
    map.scrollWheelZoom.enable();
    map.doubleClickZoom.enable();

    setTimeout(() => map.invalidateSize(), 100);
    window.addEventListener('resize', () => {
        setTimeout(() => map.invalidateSize(), 100);
    });
}

// Базовая инициализация карты
function initBaseMap(mapElementId, center, zoom) {
    const mapElement = document.getElementById(mapElementId);
    if (!mapElement) {
        console.error(`Map element ${mapElementId} not found`);
        return null;
    }

    if (typeof L === 'undefined') {
        throw new Error('Leaflet library not loaded');
    }

    if (mapElement._leaflet_map) {
        mapElement._leaflet_map.remove();
    }

    // Очищаем контейнер карты
    while (mapElement.firstChild) {
        mapElement.removeChild(mapElement.firstChild);
    }

    // Создаем карту с правильными настройками
    const map = L.map(mapElementId, {
        zoomControl: false,
        attributionControl: true,
        preferCanvas: true
    }).setView(center, zoom);

    // Основной провайдер тайлов
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        minZoom: 6,
        crossOrigin: true
    }).addTo(map);

    // Резервный провайдер
    const cartoLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap, © CartoDB',
        maxZoom: 18,
        minZoom: 6,
        crossOrigin: true
    });

    // Альтернативный резервный провайдер
    const stadiaLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        attribution: '© Stadia Maps, © OpenStreetMap contributors',
        maxZoom: 18,
        minZoom: 6,
        crossOrigin: true
    });

    // Обработка ошибок загрузки тайлов
    let currentLayer = osmLayer;
    let errorCount = 0;

    function switchToBackupLayer() {
        errorCount++;
        if (errorCount === 1) {
            console.warn('OSM tiles failed, switching to CartoDB...');
            map.removeLayer(currentLayer);
            currentLayer = cartoLayer;
            currentLayer.addTo(map);
        } else if (errorCount === 2) {
            console.warn('CartoDB tiles failed, switching to Stadia...');
            map.removeLayer(currentLayer);
            currentLayer = stadiaLayer;
            currentLayer.addTo(map);
        }
    }

    osmLayer.on('tileerror', function(e) {
        console.warn('OSM tile error:', e);
        switchToBackupLayer();
    });

    cartoLayer.on('tileerror', function(e) {
        console.warn('CartoDB tile error:', e);
        switchToBackupLayer();
    });

    // Принудительная проверка размера карты
    setTimeout(() => {
        map.invalidateSize();
    }, 100);

    return map;
}
