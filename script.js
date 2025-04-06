document.addEventListener('DOMContentLoaded', () => {
    const dictionaryContainer = document.getElementById('dictionaryContainer');
    const searchInput = document.getElementById('searchInput');
    const loadingMessage = document.querySelector('.loading-message');
    let dictionaryData = []; // Массив для хранения данных словаря

    // --- Функция для отображения словарных статей ---
    function renderDictionary(data) {
        dictionaryContainer.innerHTML = ''; // Очищаем контейнер перед рендерингом

        if (data.length === 0) {
             dictionaryContainer.innerHTML = '<p class="loading-message">Слова не найдены.</p>';
             return;
        }

        data.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');

            // Заголовок (русский термин)
            const termRu = document.createElement('h2');
            termRu.classList.add('term-ru');
            termRu.textContent = entry.term_ru;
            entryDiv.appendChild(termRu);

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
            // Используем innerHTML для жирного шрифта у "Толкование:"
            definition.innerHTML = `<strong>Толкование:</strong> ${entry.definition}`;
            entryDiv.appendChild(definition);

            // Пример
            const example = document.createElement('p');
            example.classList.add('example');
             // Используем innerHTML для жирного шрифта у "Пример:"
             example.innerHTML = `<strong>Пример:</strong> ${entry.example}`;
            entryDiv.appendChild(example);

            // Маркер (категория)
            if (entry.marker) {
                const marker = document.createElement('span');
                marker.classList.add('marker');
                marker.textContent = entry.marker;
                entryDiv.appendChild(marker);
            }

            // Маркер (период)
            if (entry.period) {
                const periodMarker = document.createElement('span');
                // Добавляем класс для стилизации периода
                periodMarker.classList.add('period-marker');
                periodMarker.textContent = entry.period === 'старое' ? 'Устоявшееся' : (entry.period === 'среднее' ? 'XX век' : 'Современное');
                entryDiv.appendChild(periodMarker);
            }


            dictionaryContainer.appendChild(entryDiv);
        });
    }

    // --- Функция для фильтрации данных по поисковому запросу ---
    function filterDictionary() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Если оригинальные данные еще не загружены, ничего не делаем
        if (dictionaryData.length === 0) return;

        const filteredData = dictionaryData.filter(entry => {
            // Ищем совпадение в русском термине, английском или определении
            return entry.term_ru.toLowerCase().includes(searchTerm) ||
                   entry.term_en.toLowerCase().includes(searchTerm) ||
                   entry.definition.toLowerCase().includes(searchTerm);
        });
        renderDictionary(filteredData); // Отображаем отфильтрованные данные
    }


// === СТАРЫЕ / РАННИЕ ЗАИМСТВОВАНИЯ (до ~середины XX в.) ===
// === СРЕДНИЕ ЗАИМСТВОВАНИЯ (примерно середина XX в. - 1990-е) ===
// === НОВЫЕ / СОВРЕМЕННЫЕ (1990-е - наши дни) ===

    // --- Загрузка данных из JSON и первоначальный рендеринг ---
    fetch('dictionary.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            dictionaryData = data; // Сохраняем загруженные данные
            if(loadingMessage) loadingMessage.remove(); // Удаляем сообщение о загрузке
            renderDictionary(dictionaryData); // Отображаем полный словарь
        })
        .catch(error => {
            console.error('Ошибка загрузки словаря:', error);
            if(loadingMessage) loadingMessage.remove();
            dictionaryContainer.innerHTML = '<p class="loading-message error">Не удалось загрузить словарь. Пожалуйста, проверьте консоль.</p>';
        });
    // --- Добавление обработчика событий для поля поиска ---
	
	
    searchInput.addEventListener('input', filterDictionary);

}); // Конец DOMContentLoaded
