// backend/static/js/water-map.js

function initWaterMap(points) {
    console.log('Initializing water map with points:', points);

    let map;

    try {
        // Инициализация базовой карты
        map = initBaseMap('water-map', [43.5, 19.5], 7);
        if (!map) return;

        // Сохраняем ссылку на карту для доступа извне
        window.waterMap = map;

        // Создание кастомной иконки для водоматов
        const waterIcon = L.icon({
            iconUrl: '/static/images/drop-blu-kontur.png',
            iconSize: [25, 25],
            iconAnchor: [12, 12],
            popupAnchor: [0, -15]
        });

        // Нормализуем точки
        const normalizedPoints = normalizePoints(points);

        // Добавляем маркеры и создаем слои
        const markers = [];
        const markerLayer = L.layerGroup().addTo(map);

        normalizedPoints.forEach(point => {
            if (point.lat && point.lng) {
                const marker = L.marker([point.lat, point.lng], {
                    icon: waterIcon,
                    title: point.name
                }).addTo(markerLayer);

                const popupContent = createPopupContent(point);
                marker.bindPopup(popupContent, {
                    className: 'custom-popup',
                    maxWidth: 300,
                    minWidth: 200
                });

                // Обработчик клика для открытия попапа
                marker.on('click', function() {
                    this.openPopup();
                });

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

        } else {
            showDemoPoints(map, waterIcon);
        }

        // Добавляем элементы управления
        const mapElement = document.getElementById('water-map');
        addMapControls(map, markers, mapElement, {
            pointsListTitle: t('List of water points')'
        });

        // Адаптация для мобильных устройств
        setupMobileBehavior(map);

        console.log('✅ Water map initialized successfully with', markers.length, 'points');

        setTimeout(() => {
            if (map) {
                map.invalidateSize(true);
            }
        }, 500);

    } catch (error) {
        console.error('Error initializing water map:', error);
        const mapElement = document.getElementById('water-map');
        if (mapElement) {
            showErrorMessage(mapElement, error);
        }
    }
}

// Показ демо-точек при отсутствии реальных
function showDemoPoints(map, icon) {
    const demoPoints = [
        {
            lat: 44.802874,
            lng: 20.465132,
            name: "Белград (демо)",
            address: "Центр города",
            city: "Белград"
        },
        {
            lat: 43.3219,
            lng: 21.8958,
            name: "Ниш (демо)",
            address: "Торговый центр",
            city: "Ниш"
        },
        {
            lat: 42.4415,
            lng: 19.2622,
            name: "Подгорица (демо)",
            address: "Центральная площадь",
            city: "Подгорица"
        }
    ];

    demoPoints.forEach(point => {
        const marker = L.marker([point.lat, point.lng], { icon: icon })
            .addTo(map)
            .bindPopup(createPopupContent(point));

    });

    // Центрируем на демо-точках
    if (demoPoints.length > 0) {
        const group = L.featureGroup(demoPoints.map(p => L.marker([p.lat, p.lng])));
        map.fitBounds(group.getBounds().pad(0.1));
    }

}
