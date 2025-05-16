document.addEventListener('DOMContentLoaded', () => {
	const dictionaryContainer = document.getElementById('dictionaryContainer');
	const searchInput = document.getElementById('searchInput');
	const clearSearchBtn = document.getElementById('clearSearchBtn');
	const markerFilterSelect = document.getElementById('markerFilter');
	const loadingMessage = document.querySelector('.loading-message');
	const header = document.querySelector('header');
	const scrollToTopBtn = document.getElementById('scrollToTopBtn');

	let dictionaryData = [];
	let fuse;

	// ----- UI Взаимодействия -----

	// Кнопка "Наверх"
	window.onscroll = function() {scrollFunction()};

	function scrollFunction() {
	  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
		scrollToTopBtn.style.display = "block";
	  } else {
		scrollToTopBtn.style.display = "none";
	  }
	}
	scrollToTopBtn.addEventListener('click', () => {
		window.scrollTo({top: 0, behavior: 'smooth'});
	});

	// Показ/скрытие шапки при скролле (раскомментируйте, если нужно)
	/*let lastScrollTop = 0;
	const headerHeight = header.offsetHeight;
	window.addEventListener('scroll', () => {
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
			header.classList.add('header-hidden');
		} else {
			header.classList.remove('header-hidden');
		}
		lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
	}, false);*/


	// ----- Логика Словаря -----

	// Функция для заполнения фильтра маркеров
	function populateMarkerFilter(data) {
		const markers = new Set();
		data.forEach(entry => {
			if (entry.marker) {
				const entryMarkers = entry.marker.split(/[,;/]\s*/);
				entryMarkers.forEach(m => markers.add(m.trim()));
			}
		});
		const sortedMarkers = Array.from(markers).sort((a,b) => a.localeCompare(b, 'ru'));
		sortedMarkers.forEach(marker => {
			const option = document.createElement('option');
			option.value = marker;
			option.textContent = marker;
			markerFilterSelect.appendChild(option);
		});
	}

	// Вспомогательная функция для экранирования спецсимволов в строке для RegExp
	const escapeRegExp = (string) => {
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	};

	const highlightSimpleText = (text, term) => {
		if (!term || !text) return text;
		const trimmedTerm = term.trim();
		if (!trimmedTerm) return text;

		try {
			const regex = new RegExp(`(${escapeRegExp(trimmedTerm)})`, 'gi');
			return text.replace(regex, '<span class="highlight">$1</span>');
		} catch (e) {
			console.warn("Ошибка создания RegExp для подсветки:", e);
			return text;
		}
	};


	// Функция для отображения словарных статей
	function renderDictionary(dataToRender) {
		dictionaryContainer.innerHTML = '';
		const searchTerm = searchInput.value.trim();

		if (dataToRender.length === 0) {
			dictionaryContainer.innerHTML = '<p class="loading-message">Слова не найдены.</p>';
			return;
		}

		let currentPeriod = null;
		const periodHeadings = {
			"старое": "Устоявшиеся / Ранние (до ~сер. XX в.)",
			"среднее": "XX Век (~сер. XX в. - 1990-е)",
			"новое": "Современные (1990-е - наши дни)"
		};

		dataToRender.forEach(dataEntry => {
			const entry = dataEntry.item || dataEntry;
			const matches = dataEntry.matches || [];

			if (entry.period && entry.period !== currentPeriod) {
				currentPeriod = entry.period;
				const heading = document.createElement('h2');
				heading.classList.add('period-heading');
				heading.textContent = periodHeadings[currentPeriod] || currentPeriod;
				dictionaryContainer.appendChild(heading);
			}

			const entryDiv = document.createElement('div');
			entryDiv.classList.add('entry');
			entryDiv.classList.add(`period-${entry.period || 'unknown'}`);

			const getHighlightedHTML = (text, key) => {
				if (!searchTerm) return text; 

				if (matches && matches.length > 0) {
					const fieldMatches = matches.find(m => m.key === key);
					if (fieldMatches && fieldMatches.indices && fieldMatches.indices.length > 0) {
						let result = '';
						let lastIndex = 0;
						fieldMatches.indices.forEach(([start, end]) => {
							result += text.substring(lastIndex, start);
							result += `<span class="highlight">${text.substring(start, end + 1)}</span>`;
							lastIndex = end + 1;
						});
						result += text.substring(lastIndex);
						return result;
					}
				}
				return highlightSimpleText(text, searchTerm);
			};


			const termRuH3 = document.createElement('h3');
			termRuH3.classList.add('term-ru');
			termRuH3.innerHTML = getHighlightedHTML(entry.term_ru, 'term_ru');
			entryDiv.appendChild(termRuH3);

			const termEnSpan = document.createElement('span');
			termEnSpan.classList.add('term-en');
			termEnSpan.innerHTML = getHighlightedHTML(entry.term_en, 'term_en');
			entryDiv.appendChild(termEnSpan);

			const pronunciation = document.createElement('span');
			pronunciation.classList.add('pronunciation');
			pronunciation.textContent = entry.pronunciation;
			entryDiv.appendChild(pronunciation);

			entryDiv.appendChild(document.createElement('br'));

			const definition = document.createElement('p');
			definition.classList.add('definition');
			definition.innerHTML = `<strong>Толкование:</strong> ${getHighlightedHTML(entry.definition, 'definition')}`;
			entryDiv.appendChild(definition);

			const example = document.createElement('p');
			example.classList.add('example');
			example.innerHTML = `<strong>Пример:</strong> ${entry.example}`;
			entryDiv.appendChild(example);

			if (entry.marker) {
				const markerSpan = document.createElement('span');
				markerSpan.classList.add('marker');
				markerSpan.textContent = entry.marker;
				entryDiv.appendChild(markerSpan);
			}
			if (entry.period) {
				const periodMarker = document.createElement('span');
				periodMarker.classList.add('period-marker');
				periodMarker.textContent = periodHeadings[entry.period] || entry.period;
				entryDiv.appendChild(periodMarker);
			}

			dictionaryContainer.appendChild(entryDiv);
		});
	}

	// Функция для общей фильтрации данных
	function applyFilters() {
		const searchTerm = searchInput.value.trim();
		const selectedMarker = markerFilterSelect.value;

		if (searchInput.value.length > 0) {
			clearSearchBtn.style.display = 'inline';
		} else {
			clearSearchBtn.style.display = 'none';
		}

		let filteredByMarker = dictionaryData;

		if (selectedMarker) {
			filteredByMarker = dictionaryData.filter(entry =>
				entry.marker && entry.marker.split(/[,;/]\s*/).map(m => m.trim()).includes(selectedMarker)
			);
		}
		
		let finalResults;
		if (searchTerm && fuse) {
			const dataForFuse = selectedMarker ? filteredByMarker : dictionaryData;
			const fuseResults = fuse.search(searchTerm);
			let itemsFromFuse = fuseResults.map(result => result.item);
			
			if (selectedMarker) {
				finalResults = itemsFromFuse.filter(entry =>
					entry.marker && entry.marker.split(/[,;/]\s*/).map(m => m.trim()).includes(selectedMarker)
				).map(item => ({ item, matches: fuseResults.find(fr => fr.item === item)?.matches || [] })); 
			} else {
				 finalResults = fuseResults.map(result => ({ item: result.item, matches: result.matches || [] }));
			}


		} else {
			finalResults = filteredByMarker.map(item => ({ item }));
		}
		renderDictionary(finalResults);
	}

	// Загрузка данных из JSON
	fetch('file/dictionary.json')
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			const periodOrder = ["новое", "среднее", "старое"];
			data.sort((a, b) => {
				const periodIndexA = a.period ? periodOrder.indexOf(a.period) : periodOrder.length;
				const periodIndexB = b.period ? periodOrder.indexOf(b.period) : periodOrder.length;
				const periodDifference = periodIndexA - periodIndexB;
				if (periodDifference !== 0) {
					return periodDifference;
				} else {
					return a.term_ru.localeCompare(b.term_ru, 'ru');
				}
			});

			dictionaryData = data;

			const fuseOptions = {
				includeScore: false, // Оценка не нужна для отображения
				includeMatches: true, // Нужно для подсветки совпадений
				shouldSort: true,   // Fuse сортирует по релевантности
				threshold: 0.4,     // Чувствительность (0.0 - точно, 1.0 - все)
				location: 0,
				distance: 150,      // На каком расстоянии от location искать
				maxPatternLength: 32,
				minMatchCharLength: 2,
				keys: [
					{ name: "term_ru", weight: 0.7 }, // Больший вес для русского термина
					{ name: "term_en", weight: 0.5 },
					{ name: "definition", weight: 0.3 }
				]
			};
			fuse = new Fuse(dictionaryData, fuseOptions);

			if(loadingMessage) loadingMessage.remove();
			populateMarkerFilter(dictionaryData);
			applyFilters();
		})
		.catch(error => {
			console.error('Ошибка загрузки или сортировки словаря:', error);
			if(loadingMessage) loadingMessage.remove();
			dictionaryContainer.innerHTML = '<p class="loading-message error">Не удалось загрузить словарь. Пожалуйста, проверьте консоль.</p>';
		});

	// Обработчики событий
	searchInput.addEventListener('input', applyFilters);
	markerFilterSelect.addEventListener('change', applyFilters);

	clearSearchBtn.addEventListener('click', () => {
		searchInput.value = '';
		applyFilters();
		searchInput.focus();
	});

	if (searchInput.value.length > 0) {
		clearSearchBtn.style.display = 'inline';
	}
});