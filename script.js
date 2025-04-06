document.addEventListener('DOMContentLoaded', () => {
    const dictionaryContainer = document.getElementById('dictionaryContainer');
    const searchInput = document.getElementById('searchInput');
    const loadingMessage = document.querySelector('.loading-message');
    let dictionaryData = []; // Массив для хранения ВСЕХ данных словаря
    let currentFilteredData = []; // Массив для хранения отфильтрованных/отсортированных данных

    // --- Функция для отображения словарных статей ---
    function renderDictionary(data) {
        dictionaryContainer.innerHTML = ''; // Очищаем контейнер перед рендерингом

        if (data.length === 0) {
             dictionaryContainer.innerHTML = '<p class="loading-message">Слова не найдены.</p>';
             return;
        }

        let currentPeriod = null; // Для отслеживания смены периода
        const periodHeadings = { // Названия для заголовков периодов
            "старое": "Устоявшиеся / Ранние (до ~сер. XX в.)",
            "среднее": "XX Век (~сер. XX в. - 1990-е)",
            "новое": "Современные (1990-е - наши дни)"
        };

        data.forEach(entry => {
             // --- Добавление заголовка периода при смене ---
             if (entry.period && entry.period !== currentPeriod) {
                currentPeriod = entry.period;
                const heading = document.createElement('h2');
                heading.classList.add('period-heading'); // Добавляем класс для стилей
                // Используем название из periodHeadings или само значение period, если его нет в объекте
                heading.textContent = periodHeadings[currentPeriod] || currentPeriod;
                dictionaryContainer.appendChild(heading);
            }
             // --- Конец добавления заголовка ---

            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');
            // Добавляем класс периода для возможной доп. стилизации или фильтрации
            entryDiv.classList.add(`period-${entry.period || 'unknown'}`);

            // Заголовок (русский термин)
            const termRuH3 = document.createElement('h3'); // Используем H3 для термина внутри блока
            termRuH3.classList.add('term-ru');
            termRuH3.textContent = entry.term_ru;
            entryDiv.appendChild(termRuH3);

            // Английский термин
            const termEn = document.createElement('span');
            termEn.classList.add('term-en');
            termEn.textContent = entry.term_en;
            entryDiv.appendChild(termEn);

            // Произношение
            const pronunciation = document.createElement('span');
            pronunciation.classList.add('pronunciation');
            pronunciation.textContent = entry.pronunciation;
            entryDiv.appendChild(pronunciation);

             // Разрыв строки для лучшего форматирования
             entryDiv.appendChild(document.createElement('br'));

            // Определение
            const definition = document.createElement('p');
            definition.classList.add('definition');
            definition.innerHTML = `<strong>Толкование:</strong> ${entry.definition}`;
            entryDiv.appendChild(definition);

            // Пример
            const example = document.createElement('p');
            example.classList.add('example');
             example.innerHTML = `<strong>Пример:</strong> ${entry.example}`;
            entryDiv.appendChild(example);

            // Маркер (категория)
            if (entry.marker) {
                const marker = document.createElement('span');
                marker.classList.add('marker');
                marker.textContent = entry.marker;
                entryDiv.appendChild(marker);
            }

            // Маркер (период) - теперь он больше для информации, т.к. есть заголовки
            if (entry.period) {
                const periodMarker = document.createElement('span');
                periodMarker.classList.add('period-marker');
                periodMarker.textContent = periodHeadings[entry.period] || entry.period; // Используем полные названия
                // Можно скрыть, если заголовков достаточно: periodMarker.style.display = 'none';
                entryDiv.appendChild(periodMarker);
            }

            dictionaryContainer.appendChild(entryDiv);
        });
    }

    // --- Функция для фильтрации данных по поисковому запросу ---
    function filterDictionary() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Фильтруем ВСЕГДА из оригинального, отсортированного массива данных
        currentFilteredData = dictionaryData.filter(entry => {
            // Ищем совпадение в русском термине, английском или определении
            return entry.term_ru.toLowerCase().includes(searchTerm) ||
                   entry.term_en.toLowerCase().includes(searchTerm) ||
                   entry.definition.toLowerCase().includes(searchTerm);
        });
        renderDictionary(currentFilteredData); // Отображаем отфильтрованные данные
    }


    // --- Загрузка данных из JSON, СОРТИРОВКА и первоначальный рендеринг ---
    fetch('dictionary.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // --- СОРТИРОВКА ДАННЫХ ---
            const periodOrder = ["новое", "среднее", "старое"]; // Задаем порядок периодов

            data.sort((a, b) => {
                // Определяем индексы периодов для сортировки
                // Если период не указан, отправляем его в конец
                const periodIndexA = a.period ? periodOrder.indexOf(a.period) : periodOrder.length;
                const periodIndexB = b.period ? periodOrder.indexOf(b.period) : periodOrder.length;

                // Сравниваем по периоду
                const periodDifference = periodIndexA - periodIndexB;

                if (periodDifference !== 0) {
                    return periodDifference; // Если периоды разные, сортируем по ним
                } else {
                    // Если периоды одинаковые, сортируем по алфавиту (русский термин)
                    // Используем localeCompare для правильной сортировки кириллицы
                    return a.term_ru.localeCompare(b.term_ru, 'ru'); // 'ru' для русской локали
                }
            });
            // --- Конец сортировки ---

            dictionaryData = data; // Сохраняем отсортированные данные как основные
            currentFilteredData = dictionaryData; // Изначально показываем всё
            if(loadingMessage) loadingMessage.remove(); // Удаляем сообщение о загрузке
            renderDictionary(currentFilteredData); // Отображаем ПОЛНЫЙ ОТСОРТИРОВАННЫЙ словарь
        })
        .catch(error => {
            console.error('Ошибка загрузки или сортировки словаря:', error);
            if(loadingMessage) loadingMessage.remove();
            dictionaryContainer.innerHTML = '<p class="loading-message error">Не удалось загрузить словарь. Пожалуйста, проверьте консоль.</p>';
        });

    // --- Добавление обработчика событий для поля поиска ---
    searchInput.addEventListener('input', filterDictionary);

}); // Конец DOMContentLoaded
