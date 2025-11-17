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
    title.textContent = point.name || 'Точка';
    popupDiv.appendChild(title);

    if (point.address) {
        const address = document.createElement('p');
        const addressLabel = document.createElement('strong');
        addressLabel.textContent = 'Адрес: ';
        address.appendChild(addressLabel);
        address.appendChild(document.createTextNode(point.address));
        popupDiv.appendChild(address);
    }

    if (point.city) {
        const city = document.createElement('p');
        const cityLabel = document.createElement('strong');
        cityLabel.textContent = 'Город: ';
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
    title.textContent = 'Карта временно недоступна';
    errorContainer.appendChild(title);

    const message = document.createElement('p');
    message.textContent = 'Попробуйте обновить страницу или зайти позже.';
    errorContainer.appendChild(message);

    if (error && error.message) {
        const errorText = document.createElement('p');
        errorText.className = 'error-details';
        errorText.textContent = `Ошибка: ${error.message}`;
        errorContainer.appendChild(errorText);
    }

    mapElement.appendChild(errorContainer);
}

// Создание контрола поиска
function createSearchControl(map) {
    const SearchControl = L.Control.extend({
        onAdd: function(map) {
            const searchContainer = L.DomUtil.create('div', 'search-control');

            const searchInput = L.DomUtil.create('input', 'search-input', searchContainer);
            searchInput.type = 'text';
            searchInput.placeholder = 'Поиск по адресу...';

            const searchButton = L.DomUtil.create('button', 'search-button', searchContainer);
            searchButton.innerHTML = '🔍';
            searchButton.title = 'Поиск';

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

            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0) {
                        const result = data[0];
                        map.setView([result.lat, result.lon], 15);

                        const popupContent = document.createElement('div');
                        const popupText = document.createElement('strong');
                        popupText.textContent = result.display_name;
                        popupContent.appendChild(popupText);

                        L.popup()
                            .setLatLng([result.lat, result.lon])
                            .setContent(popupContent)
                            .openOn(map);
                    } else {
                        alert('Адрес не найден');
                    }
                })
                .catch(error => {
                    console.error('Search error:', error);
                    alert('Ошибка при поиске');
                });
        }
    });

    return new SearchControl({ position: 'topleft' });
}

// ВОССТАНОВЛЕННАЯ ФУНКЦИЯ: Создание контрола полноэкранного режима
function createFullscreenControl(mapElement) {
    const FullscreenControl = L.Control.extend({
        onAdd: function(map) {
            const fullscreenButton = L.DomUtil.create('button', 'fullscreen-control');
            fullscreenButton.innerHTML = '⛶';
            fullscreenButton.title = 'Полноэкранный режим';

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

// КРИТИЧЕСКИ ВАЖНО: Создание контрола списка точек с правильной обработкой событий
function createPointsControl(markers, map, title) {
    const PointsControl = L.Control.extend({
        onAdd: function(map) {
            const pointsButton = L.DomUtil.create('button', 'points-control');
            pointsButton.innerHTML = '📋';
            pointsButton.title = title || 'Список точек';

            L.DomEvent.disableClickPropagation(pointsButton);
            L.DomEvent.on(pointsButton, 'click', () => {
                this.toggleSidePanel(markers, map, title);
            });

            return pointsButton;
        },

        toggleSidePanel: function(markers, map, title) {
            const mapContainer = map.getContainer();
            let sidePanel = mapContainer.querySelector('.map-side-panel');

            if (sidePanel) {
                sidePanel.remove();
                mapContainer.classList.remove('map-with-side-panel');
            } else {
                this.createSidePanel(markers, map, title, mapContainer);
            }

            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        },

        createSidePanel: function(markers, map, title, mapContainer) {
            const sidePanel = document.createElement('div');
            sidePanel.className = 'map-side-panel';

            // Заголовок панели
            const header = document.createElement('div');
            header.className = 'side-panel-header';

            const titleElement = document.createElement('h3');
            titleElement.textContent = title || 'Список точек';
            header.appendChild(titleElement);

            const closeButton = document.createElement('button');
            closeButton.className = 'side-panel-close';
            closeButton.innerHTML = '×';
            closeButton.title = 'Закрыть';
            closeButton.addEventListener('click', () => {
                sidePanel.remove();
                mapContainer.classList.remove('map-with-side-panel');
                map.invalidateSize();
            });
            header.appendChild(closeButton);

            sidePanel.appendChild(header);

            // Список точек - КРИТИЧЕСКИ ВАЖНЫЕ ИЗМЕНЕНИЯ
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
                emptyMessage.textContent = 'Точки не найдены';
                list.appendChild(emptyMessage);
            } else {
                markers.forEach(item => {
                    const pointElement = this.createPointElement(item, map, sidePanel);
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
            }, 10);
        },

        createPointElement: function(item, map, sidePanel) {
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
                map.setView([item.data.lat, item.data.lng], 15);
                item.marker.openPopup();
                this.highlightSelectedPoint(pointElement, sidePanel);
            });

            return pointElement;
        },

        highlightSelectedPoint: function(selectedElement, sidePanel) {
            const allPoints = sidePanel.querySelectorAll('.side-panel-item');
            allPoints.forEach(point => {
                point.classList.remove('selected');
            });

            selectedElement.classList.add('selected');
            selectedElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
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
        pointsListTitle = 'Список точек'
    } = options;

    if (searchEnabled) {
        const searchControl = createSearchControl(map);
        searchControl.addTo(map);
    }

    if (fullscreenEnabled) {
        const fullscreenControl = createFullscreenControl(mapElement);
        fullscreenControl.addTo(map);
    }

    if (pointsListEnabled && markers.length > 0) {
        const pointsControl = createPointsControl(markers, map, pointsListTitle);
        pointsControl.addTo(map);
    }

    L.control.zoom({ position: 'topright' }).addTo(map);

    // Настройка поведения боковой панели
    setupSidePanelBehavior(map);
}

// ВОССТАНОВЛЕННАЯ ФУНКЦИЯ: Настройка поведения боковой панели
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

    const map = L.map(mapElementId).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        minZoom: 6
    }).addTo(map);

    return map;
}

// Функция для отладки - УДАЛИТЬ ПОСЛЕ ТЕСТИРОВАНИЯ
// function debugScrollTest() {
//     console.log('=== DEBUG SCROLL TEST ===');
//     const sidePanel = document.querySelector('.map-side-panel');
//     if (sidePanel) {
//         const list = sidePanel.querySelector('.side-panel-list');
//         console.log('Side panel found:', !!sidePanel);
//         console.log('List found:', !!list);
//         console.log('List scrollHeight:', list?.scrollHeight);
//         console.log('List clientHeight:', list?.clientHeight);
//         console.log('Can scroll:', list?.scrollHeight > list?.clientHeight);

//         // Добавляем тестовые точки для проверки прокрутки
//         if (list && list.children.length < 5) {
//             for (let i = 0; i < 20; i++) {
//                 const testItem = document.createElement('div');
//                 testItem.className = 'side-panel-item';
//                 testItem.innerHTML = `
//                     <div class="point-name">Тестовая точка ${i + 1}</div>
//                     <div class="point-address">Тестовый адрес ${i + 1}</div>
//                 `;
//                 list.appendChild(testItem);
//             }
//             console.log('Added test items for scrolling');
//         }
//     } else {
//         console.log('Side panel not found');
//     }
// }

// Автоматический вызов отладки при загрузке - УДАЛИТЬ ПОСЛЕ ТЕСТИРОВАНИЯ
// document.addEventListener('DOMContentLoaded', function() {
//     setTimeout(debugScrollTest, 2000);
// });
