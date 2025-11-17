// backend/static/js/grabber-map.js

function initGrabberMap(points) {
    console.log('Initializing grabber map with points:', points);

    try {
        // Инициализация базовой карты
        const map = initBaseMap('grabber-map', [43.5, 19.5], 7);
        if (!map) return;

        // Сохраняем ссылку на карту для доступа извне
        window.grabberMap = map;

        // Создание кастомной иконки для игрушек
        const grabberIcon = L.icon({
            iconUrl: '/static/images/drop-red-kontur.png',
            iconSize: [25, 25],
            iconAnchor: [12, 12],
            popupAnchor: [0, -15]
        });

        // Нормализуем точки
        const normalizedPoints = normalizePoints(points);

        // Добавляем маркеры
        const markers = [];
        const markerLayer = L.layerGroup().addTo(map);

        normalizedPoints.forEach(point => {
            if (point.lat && point.lng) {
                const marker = L.marker([point.lat, point.lng], {
                    icon: grabberIcon,
                    title: point.name
                }).addTo(markerLayer);

                const popupContent = createPopupContent(point);
                marker.bindPopup(popupContent);

                markers.push({
                    marker: marker,
                    data: point
                });
            }
        });

        // Автоматическое определение границ
        if (markers.length > 0) {
            const group = L.featureGroup(markers.map(m => m.marker));
            map.fitBounds(group.getBounds().pad(0.1));

            // Открываем первый попап
            setTimeout(() => markers[0].marker.openPopup(), 500);
        } else {
            showDemoPoints(map, grabberIcon);
        }

        // Добавляем элементы управления
        addMapControls(map, markers, document.getElementById('grabber-map'), {
            pointsListTitle: 'Список автоматов с игрушками'
        });

        // Адаптация для мобильных устройств
        setupMobileBehavior(map);

        console.log('✅ Grabber map initialized successfully with', markers.length, 'points');

    } catch (error) {
        console.error('Error initializing grabber map:', error);
        const mapElement = document.getElementById('grabber-map');
        if (mapElement) {
            showErrorMessage(mapElement, error);
        }
    }
}

// Показ демо-точек для игрушек
function showDemoPoints(map, icon) {
    const demoPoints = [
        {
            lat: 44.806234,
            lng: 20.465132,
            name: "Белград Игрушки (демо)",
            address: "ТЦ Ушче",
            city: "Белград"
        },
        {
            lat: 43.320902,
            lng: 21.8958,
            name: "Ниш Игрушки (демо)",
            address: "ТЦ Казино",
            city: "Ниш"
        }
    ];

    demoPoints.forEach(point => {
        const marker = L.marker([point.lat, point.lng], { icon: icon })
            .addTo(map)
            .bindPopup(createPopupContent(point));

        // Добавляем демо-пометку
        const popupContent = marker.getPopup().getContent();
        const demoLabel = document.createElement('p');
        demoLabel.className = 'demo-label';
        demoLabel.textContent = 'Демо-точка для тестирования';
        popupContent.appendChild(demoLabel);
    });
}
