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
    /*fetch('dictionary.json')
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
	*/
    // --- Добавление обработчика событий для поля поиска ---
	
	dictionaryData = [
  {
    "term_ru": "СПОРТ",
    "term_en": "Sport",
    "pronunciation": "[спорт]",
    "definition": "Физические упражнения, игры, направленные на развитие и укрепление организма, соревнования.",
    "example": "Он увлекается зимними видами спорта.",
    "marker": "Общеупотр.",
    "period": "старое"
  },
  {
    "term_ru": "КЛУБ",
    "term_en": "Club",
    "pronunciation": "[клуб]",
    "definition": "Общественная организация, объединяющая людей с общими интересами; место для встреч, отдыха.",
    "example": "Мы записались в шахматный клуб.",
    "marker": "Общеупотр.",
    "period": "старое"
  },
  {
    "term_ru": "ФУТБОЛ",
    "term_en": "Football",
    "pronunciation": "[фудбол]",
    "definition": "Командная спортивная игра с мячом, который игроки стремятся забить ногами или головой в ворота противника.",
    "example": "Миллионы людей смотрят чемпионат мира по футболу.",
    "marker": "Спорт",
    "period": "старое"
  },
  {
    "term_ru": "ТЕННИС",
    "term_en": "Tennis",
    "pronunciation": "[тэ́ннис]",
    "definition": "Спортивная игра с мячом и ракетками на специальной площадке (корте).",
    "example": "Летом она любит играть в теннис.",
    "marker": "Спорт",
    "period": "старое"
  },
  {
    "term_ru": "ГОЛ",
    "term_en": "Goal",
    "pronunciation": "[гол]",
    "definition": "В спортивных играх: попадание мячом или шайбой в ворота противника, засчитываемое как очко.",
    "example": "Нападающий забил решающий гол.",
    "marker": "Спорт",
    "period": "старое"
  },
  {
    "term_ru": "БОКС",
    "term_en": "Box",
    "pronunciation": "[бокс]",
    "definition": "Вид спорта, кулачный бой по особым правилам на ринге.",
    "example": "Он много лет занимался боксом.",
    "marker": "Спорт",
    "period": "старое"
  },
  {
    "term_ru": "ЯХТА",
    "term_en": "Yacht",
    "pronunciation": "[я́хта]",
    "definition": "Лёгкое быстроходное судно, парусное или моторное, для спорта или прогулок.",
    "example": "Они отправились в путешествие на собственной яхте.",
    "marker": "Транспорт, Спорт",
    "period": "старое"
  },
  {
    "term_ru": "ЛИДЕР",
    "term_en": "Leader",
    "pronunciation": "[ли́дер]",
    "definition": "Руководитель, человек, пользующийся авторитетом и ведущий за собой.",
    "example": "Он признанный лидер в своей команде.",
    "marker": "Общеупотр.",
    "period": "старое"
  },
  {
    "term_ru": "МИ́ТИНГ",
    "term_en": "Meeting",
    "pronunciation": "[ми́тинг]",
    "definition": "Массовое собрание для обсуждения политических или иных актуальных вопросов (значение сужено по сравнению с англ.).",
    "example": "На площади состоялся предвыборный митинг.",
    "marker": "Политика",
    "period": "старое"
  },
  {
    "term_ru": "БОЙКО́Т",
    "term_en": "Boycott",
    "pronunciation": "[бойко́т]",
    "definition": "Организованное прекращение отношений с кем-либо (государством, организацией, лицом) в знак протеста.",
    "example": "Профсоюзы объявили бойкот продукции этой компании.",
    "marker": "Политика, Экономика",
    "period": "старое"
  },
  {
    "term_ru": "ДЖЕНТЛЬМЕН",
    "term_en": "Gentleman",
    "pronunciation": "[джентльме́н]",
    "definition": "В Англии: воспитанный, образованный и уравновешенный мужчина; корректный и порядочный человек.",
    "example": "Он вел себя как истинный джентльмен.",
    "marker": "Общеупотр.",
    "period": "старое"
  },
  {
    "term_ru": "КОМФОРТ",
    "term_en": "Comfort",
    "pronunciation": "[комфо́рт]",
    "definition": "Бытовые удобства, уют.",
    "example": "В новом доме есть все для комфорта.",
    "marker": "Общеупотр.",
    "period": "старое"
  },
  {
    "term_ru": "РЕКОРД",
    "term_en": "Record",
    "pronunciation": "[реко́рд]",
    "definition": "Высшее достижение в какой-либо области, особенно в спорте.",
    "example": "Спортсмен установил новый мировой рекорд.",
    "marker": "Спорт, Общеупотр.",
    "period": "старое"
  },
  {
    "term_ru": "ЧЕМПИО́Н",
    "term_en": "Champion",
    "pronunciation": "[чемпио́н]",
    "definition": "Победитель в спортивных соревнованиях на первенство; звание такого победителя.",
    "example": "Он стал чемпионом страны по плаванию.",
    "marker": "Спорт",
    "period": "старое"
  },
  {
    "term_ru": "ФИЛЬМ",
    "term_en": "Film",
    "pronunciation": "[фильм]",
    "definition": "Кинокартина, произведение киноискусства.",
    "example": "Мы посмотрели интересный документальный фильм.",
    "marker": "Культура, Кино",
    "period": "старое"
  },
  {
    "term_ru": "РЕЛЬС",
    "term_en": "Rails",
    "pronunciation": "[рельс]",
    "definition": "Стальной брус специального сечения, укладываемый на шпалах как часть железнодорожного или трамвайного пути.",
    "example": "Поезд сошел с рельсов.",
    "marker": "Техника, Транспорт",
    "period": "старое"
  },
  {
    "term_ru": "ТРАМВА́Й",
    "term_en": "Tramway",
    "pronunciation": "[трамва́й]",
    "definition": "Городской наземный электрический вид транспорта, передвигающийся по рельсам.",
    "example": "До работы удобнее всего добираться на трамвае.",
    "marker": "Транспорт",
    "period": "старое"
  },
  {
    "term_ru": "ТУННЕ́ЛЬ (ТОННЕ́ЛЬ)",
    "term_en": "Tunnel",
    "pronunciation": "[туннэ́ль / тоннэ́ль]",
    "definition": "Подземное или подводное сооружение для прокладки путей сообщения, коммуникаций.",
    "example": "Машины въехали в длинный горный туннель.",
    "marker": "Транспорт, Строительство",
    "period": "старое"
  },
  {
    "term_ru": "ВОКЗА́Л",
    "term_en": "Vauxhall (по названию увеселительного сада в Лондоне)",
    "pronunciation": "[вокза́л]",
    "definition": "Здание или комплекс зданий на станции железной дороги или пристани, предназначенные для обслуживания пассажиров.",
    "example": "Мы встретились на вокзале у главного входа.",
    "marker": "Транспорт",
    "period": "старое"
  },
  {
    "term_ru": "ПАРК",
    "term_en": "Park",
    "pronunciation": "[парк]",
    "definition": "Большой сад или роща с аллеями, цветниками для прогулок.",
    "example": "Дети любят гулять в городском парке.",
    "marker": "Общеупотр.",
    "period": "старое"
  },
  {
    "term_ru": "СКВЕР",
    "term_en": "Square",
    "pronunciation": "[сквэр]",
    "definition": "Небольшой общественный сад в городе.",
    "example": "В центре площади разбит уютный сквер.",
    "marker": "Общеупотр.",
    "period": "старое"
  },
  {
    "term_ru": "ПУДИНГ",
    "term_en": "Pudding",
    "pronunciation": "[пу́динг]",
    "definition": "Английское десертное блюдо из муки, круп, творога и т.п. с различными добавками.",
    "example": "На десерт подали рождественский пудинг.",
    "marker": "Еда",
    "period": "старое"
  },
  {
    "term_ru": "БИФШТЕ́КС",
    "term_en": "Beefsteak",
    "pronunciation": "[бифштэ́кс]",
    "definition": "Блюдо из жареного куска говядины.",
    "example": "Он заказал бифштекс с кровью.",
    "marker": "Еда",
    "period": "старое"
  },
  {
    "term_ru": "РОСТБИФ",
    "term_en": "Roast beef",
    "pronunciation": "[ро́стбиф]",
    "definition": "Блюдо из запечённого в духовке большого куска говядины.",
    "example": "На праздничный стол подали сочный ростбиф.",
    "marker": "Еда",
    "period": "старое"
  },
  {
    "term_ru": "ПЛЕД",
    "term_en": "Plaid",
    "pronunciation": "[плэт]",
    "definition": "Большой тёплый платок, одеяло из шерстяной ткани, часто с клетчатым узором.",
    "example": "Прохладным вечером приятно укрыться пледом.",
    "marker": "Быт",
    "period": "старое"
  },
  {
    "term_ru": "ДЖИНСЫ",
    "term_en": "Jeans",
    "pronunciation": "[джи́нсы]",
    "definition": "Брюки из плотной хлопчатобумажной ткани (денима).",
    "example": "Джинсы – удобная повседневная одежда.",
    "marker": "Одежда",
    "period": "среднее"
  },
  {
    "term_ru": "ШОРТЫ",
    "term_en": "Shorts",
    "pronunciation": "[шо́рты]",
    "definition": "Короткие брюки выше колен.",
    "example": "Летом он всегда носит шорты.",
    "marker": "Одежда",
    "period": "среднее"
  },
  {
    "term_ru": "СВИТЕР",
    "term_en": "Sweater",
    "pronunciation": "[сви́тер]",
    "definition": "Вязаная фуфайка без застёжек с высоким воротом или без него.",
    "example": "В холодную погоду он надел теплый свитер.",
    "marker": "Одежда",
    "period": "среднее"
  },
  {
    "term_ru": "ДИЗАЙН",
    "term_en": "Design",
    "pronunciation": "[диза́йн]",
    "definition": "Художественное проектирование, конструирование вещей, интерьеров; внешний вид, оформление.",
    "example": "Мне нравится современный дизайн этой квартиры.",
    "marker": "Искусство, Технологии",
    "period": "среднее"
  },
  {
    "term_ru": "КОМПЬЮТЕР",
    "term_en": "Computer",
    "pronunciation": "[компью́тэр]",
    "definition": "Электронно-вычислительная машина (ЭВМ), устройство для обработки информации.",
    "example": "Современный компьютер может выполнять множество задач.",
    "marker": "IT",
    "period": "среднее"
  },
  {
    "term_ru": "ИНТЕРНЕТ",
    "term_en": "Internet",
    "pronunciation": "[интэрнэ́т]",
    "definition": "Всемирная компьютерная сеть, система связанных сетей для хранения и передачи информации.",
    "example": "Мы нашли всю нужную информацию в интернете.",
    "marker": "IT",
    "period": "среднее"
  },
  {
    "term_ru": "ФАЙЛ",
    "term_en": "File",
    "pronunciation": "[файл]",
    "definition": "Именованный блок информации на компьютерном носителе.",
    "example": "Сохрани этот документ как отдельный файл.",
    "marker": "IT",
    "period": "среднее"
  },
   {
    "term_ru": "ДИСПЛЕЙ",
    "term_en": "Display",
    "pronunciation": "[дисплэ́й]",
    "definition": "Экран электронного устройства для визуального отображения информации.",
    "example": "У этого ноутбука яркий дисплей.",
    "marker": "IT",
    "period": "среднее"
  },
   {
    "term_ru": "ПРОГРАММИСТ",
    "term_en": "Programmer",
    "pronunciation": "[программи́ст]",
    "definition": "Специалист по разработке компьютерных программ.",
    "example": "Он работает программистом в IT-компании.",
    "marker": "IT, Работа",
    "period": "среднее"
  },
   {
    "term_ru": "ПРОГРАММА",
    "term_en": "Program",
    "pronunciation": "[програ́мма]",
    "definition": "1. План деятельности, работ. 2. Последовательность команд для компьютера.",
    "example": "Нужно установить специальную программу для обработки видео.",
    "marker": "Общеупотр., IT",
    "period": "среднее"
  },
  {
    "term_ru": "БИЗНЕС",
    "term_en": "Business",
    "pronunciation": "[би́знэс]",
    "definition": "Предпринимательская деятельность, направленная на получение прибыли; дело.",
    "example": "Он решил открыть свой собственный бизнес.",
    "marker": "Экономика",
    "period": "среднее"
  },
  {
    "term_ru": "МАРКЕТИНГ",
    "term_en": "Marketing",
    "pronunciation": "[марке́тинг] / [ма́ркетинг]",
    "definition": "Деятельность по продвижению товаров или услуг на рынке, изучению спроса.",
    "example": "Эффективный маркетинг помог увеличить продажи.",
    "marker": "Экономика",
    "period": "среднее"
  },
  {
    "term_ru": "МЕНЕДЖЕР",
    "term_en": "Manager",
    "pronunciation": "[мэ́нэджэр]",
    "definition": "Специалист по управлению производством, продажами, персоналом; управляющий.",
    "example": "Он работает менеджером по продажам в крупной компании.",
    "marker": "Экономика, Работа",
    "period": "среднее"
  },
  {
    "term_ru": "СЕРВИС",
    "term_en": "Service",
    "pronunciation": "[сэ́рвис]",
    "definition": "Обслуживание; система организаций, предоставляющих бытовые услуги.",
    "example": "Уровень сервиса в этом отеле был превосходным.",
    "marker": "Экономика, Быт",
    "period": "среднее"
  },
   {
    "term_ru": "СУПЕРМАРКЕТ",
    "term_en": "Supermarket",
    "pronunciation": "[суперма́ркет]",
    "definition": "Крупный магазин самообслуживания, торгующий преимущественно продуктами питания и товарами повседневного спроса.",
    "example": "За продуктами мы обычно ходим в ближайший супермаркет.",
    "marker": "Торговля, Быт",
    "period": "среднее"
  },
  {
    "term_ru": "ПРИНТЕР",
    "term_en": "Printer",
    "pronunciation": "[при́нтэр]",
    "definition": "Устройство для вывода информации из компьютера на бумагу.",
    "example": "Нужно заменить картридж в принтере.",
    "marker": "IT",
    "period": "среднее"
  },
  {
    "term_ru": "СКАНЕР",
    "term_en": "Scanner",
    "pronunciation": "[ска́нэр]",
    "definition": "Устройство для считывания и преобразования изображений или документов в цифровой формат.",
    "example": "Отсканируй этот документ с помощью сканера.",
    "marker": "IT",
    "period": "среднее"
  },
  {
    "term_ru": "БРЕНД",
    "term_en": "Brand",
    "pronunciation": "[брэнд]",
    "definition": "Торговая марка; образ компании или продукта, узнаваемый потребителями.",
    "example": "Этот бренд ассоциируется с высоким качеством.",
    "marker": "Экономика",
    "period": "среднее"
  },
   {
    "term_ru": "ПИАР (PR)",
    "term_en": "Public Relations (PR)",
    "pronunciation": "[пиа́р]",
    "definition": "Связи с общественностью; деятельность по созданию и поддержанию положительного имиджа компании или персоны.",
    "example": "Хороший пиар важен для любого политика.",
    "marker": "Медиа, Экономика",
    "period": "среднее"
  },
  {
    "term_ru": "ШОУ",
    "term_en": "Show",
    "pronunciation": "[шо́у]",
    "definition": "Зрелищное представление, спектакль, программа.",
    "example": "Вчера мы смотрели новое ледовое шоу.",
    "marker": "Культура, Медиа",
    "period": "среднее"
  },
   {
    "term_ru": "ХИТ",
    "term_en": "Hit",
    "pronunciation": "[хит]",
    "definition": "Очень популярное, успешное произведение (песня, фильм и т.п.).",
    "example": "Эта песня стала настоящим хитом лета.",
    "marker": "Культура, Медиа",
    "period": "среднее"
  },
  {
    "term_ru": "СЕЙЛ",
    "term_en": "Sale",
    "pronunciation": "[сэйл]",
    "definition": "Распродажа товаров по сниженным ценам.",
    "example": "В магазине сейчас идет сезонный сейл.",
    "marker": "Торговля",
    "period": "среднее"
  },
  {
    "term_ru": "ИНТЕРВЬЮ",
    "term_en": "Interview",
    "pronunciation": "[интервью́]",
    "definition": "Беседа журналиста с кем-либо для печати, радио, телевидения; собеседование при приеме на работу.",
    "example": "Журналист взял интервью у известного актера.",
    "marker": "Медиа, Работа",
    "period": "среднее"
  },
  {
    "term_ru": "ОФИС",
    "term_en": "Office",
    "pronunciation": "[о́фис]",
    "definition": "Контора, учреждение; служебное помещение.",
    "example": "Наш офис находится в центре города.",
    "marker": "Работа, Быт",
    "period": "среднее"
  },
  {
    "term_ru": "ХОББИ",
    "term_en": "Hobby",
    "pronunciation": "[хо́бби]",
    "definition": "Увлечение, любимое занятие на досуге.",
    "example": "Его хобби – коллекционирование марок.",
    "marker": "Общеупотр.",
    "period": "среднее"
  },
  {
    "term_ru": "ТЕСТ",
    "term_en": "Test",
    "pronunciation": "[тэст]",
    "definition": "Испытание, проверка; задание для определения знаний или способностей.",
    "example": "Студенты писали тест по пройденному материалу.",
    "marker": "Общеупотр., Обучение",
    "period": "среднее"
  },
  {
    "term_ru": "БАСКЕТБОЛ",
    "term_en": "Basketball",
    "pronunciation": "[баскетбо́л]",
    "definition": "Командная спортивная игра с мячом, который игроки забрасывают руками в корзину противника.",
    "example": "Он играет в школьной команде по баскетболу.",
    "marker": "Спорт",
    "period": "среднее"
  },
  {
    "term_ru": "ВОЛЕЙБОЛ",
    "term_en": "Volleyball",
    "pronunciation": "[волейбо́л]",
    "definition": "Командная спортивная игра с мячом через сетку, ударяя по нему руками.",
    "example": "Летом на пляже часто играют в волейбол.",
    "marker": "Спорт",
    "period": "среднее"
  },
  {
    "term_ru": "ХОККЕЙ",
    "term_en": "Hockey",
    "pronunciation": "[хокке́й]",
    "definition": "Командная спортивная игра на льду (или траве) с клюшками и шайбой (или мячом).",
    "example": "Сборная страны победила в чемпионате мира по хоккею.",
    "marker": "Спорт",
    "period": "среднее"
  },
  {
    "term_ru": "ДЖАЗ",
    "term_en": "Jazz",
    "pronunciation": "[джаз]",
    "definition": "Род музыкального искусства, возникший в США, характеризующийся импровизацией и особым ритмом.",
    "example": "В клубе играл живой джаз.",
    "marker": "Музыка, Культура",
    "period": "среднее"
  },
  {
    "term_ru": "РОК-Н-РОЛЛ",
    "term_en": "Rock and roll",
    "pronunciation": "[рок-н-ро́лл]",
    "definition": "Ранняя форма рок-музыки; парный танец под эту музыку.",
    "example": "Элвис Пресли – король рок-н-ролла.",
    "marker": "Музыка, Культура",
    "period": "среднее"
  },
  {
    "term_ru": "КОКТЕЙЛЬ",
    "term_en": "Cocktail",
    "pronunciation": "[кокте́йль]",
    "definition": "Смешанный напиток (алкогольный или безалкогольный).",
    "example": "Бармен приготовил экзотический коктейль.",
    "marker": "Еда, Напитки",
    "period": "среднее"
  },
   {
    "term_ru": "ТОСТЕР",
    "term_en": "Toaster",
    "pronunciation": "[то́стер]",
    "definition": "Прибор для поджаривания ломтиков хлеба (тостов).",
    "example": "На завтрак он приготовил тосты в тостере.",
    "marker": "Быт, Техника",
    "period": "среднее"
  },
  {
    "term_ru": "МИКСЕР",
    "term_en": "Mixer",
    "pronunciation": "[ми́ксер]",
    "definition": "Прибор для смешивания, взбивания продуктов.",
    "example": "Она взбила крем для торта с помощью миксера.",
    "marker": "Быт, Техника",
    "period": "среднее"
  },
   {
    "term_ru": "ТЕЛЕВИЗОР",
    "term_en": "Television (tele+vision)",
    "pronunciation": "[телеви́зор]",
    "definition": "Аппарат для приема телевизионных передач.",
    "example": "Вся семья собралась у телевизора посмотреть фильм.",
    "marker": "Техника, Медиа",
    "period": "среднее"
  },
  {
    "term_ru": "ЮЗЕР",
    "term_en": "User",
    "pronunciation": "[ю́зер]",
    "definition": "Пользователь (компьютера, программы, системы).",
    "example": "Опытный юзер быстро разберется в настройках.",
    "marker": "IT, Разг.",
    "period": "среднее"
  },
  {
    "term_ru": "УИКЕНД",
    "term_en": "Weekend",
    "pronunciation": "[уикэ́нд]",
    "definition": "Конец недели, выходные дни.",
    "example": "Как прошел твой уикенд?",
    "marker": "Быт, Разг.",
    "period": "среднее"
  },
    {
    "term_ru": "ПАРКИНГ",
    "term_en": "Parking",
    "pronunciation": "[па́ркинг]",
    "definition": "Место для стоянки автомобилей, парковка.",
    "example": "Возле торгового центра есть большой подземный паркинг.",
    "marker": "Быт, Транспорт",
    "period": "среднее"
  },
  {
    "term_ru": "ОКЕЙ (ОК)",
    "term_en": "Okay (OK)",
    "pronunciation": "[оке́й] / [ок]",
    "definition": "Хорошо, ладно, согласен.",
    "example": "Окей, встретимся завтра.",
    "marker": "Разг.",
    "period": "среднее"
  },
  {
    "term_ru": "ПЛИЗ",
    "term_en": "Please",
    "pronunciation": "[плиз]",
    "definition": "Пожалуйста.",
    "example": "Передай соль, плиз.",
    "marker": "Разг.",
    "period": "среднее"
  },
  {
    "term_ru": "СОРРИ",
    "term_en": "Sorry",
    "pronunciation": "[со́рри]",
    "definition": "Извини(те), прости(те).",
    "example": "Сорри, я опоздал.",
    "marker": "Разг.",
    "period": "среднее"
  },
  {
    "term_ru": "СКОТЧ",
    "term_en": "Scotch (tape)",
    "pronunciation": "[скотч]",
    "definition": "Клейкая лента.",
    "example": "Заклей коробку скотчем.",
    "marker": "Быт",
    "period": "среднее"
  },
  {
    "term_ru": "ПАМПЕРС",
    "term_en": "Pampers (brand name)",
    "pronunciation": "[па́мперс]",
    "definition": "Одноразовый подгузник (по названию торговой марки).",
    "example": "Нужно купить новую упаковку памперсов.",
    "marker": "Быт",
    "period": "среднее"
  },
  {
    "term_ru": "ТРОЛЛЕЙБУС",
    "term_en": "Trolleybus",
    "pronunciation": "[тролле́йбус]",
    "definition": "Безрельсовый городской транспорт с питанием от контактной сети.",
    "example": "Троллейбус остановился на остановке.",
    "marker": "Транспорт",
    "period": "среднее"
  },
  {
    "term_ru": "СМАРТФОН",
    "term_en": "Smartphone",
    "pronunciation": "[смартфо́н]",
    "definition": "Мобильный телефон с функциями карманного компьютера.",
    "example": "Почти у каждого сейчас есть смартфон.",
    "marker": "IT",
    "period": "новое"
  },
  {
    "term_ru": "НОУТБУК",
    "term_en": "Notebook / Laptop",
    "pronunciation": "[ноутбу́к]",
    "definition": "Портативный персональный компьютер.",
    "example": "Я всегда беру ноутбук с собой в поездки.",
    "marker": "IT",
    "period": "новое"
  },
  {
    "term_ru": "ПЛАНШЕТ",
    "term_en": "Tablet",
    "pronunciation": "[планшэ́т]",
    "definition": "Портативный компьютер с сенсорным экраном, без клавиатуры.",
    "example": "Детям удобно смотреть мультфильмы на планшете.",
    "marker": "IT",
    "period": "новое"
  },
  {
    "term_ru": "ГАДЖЕТ",
    "term_en": "Gadget",
    "pronunciation": "[га́джэт]",
    "definition": "Небольшое электронное устройство, приспособление (смартфон, плеер, фитнес-браслет и т.п.).",
    "example": "На день рождения ему подарили новый гаджет.",
    "marker": "IT",
    "period": "новое"
  },
  {
    "term_ru": "ДЕВАЙС",
    "term_en": "Device",
    "pronunciation": "[дива́йс]",
    "definition": "Устройство, прибор, механизм (часто электронный). Синоним гаджета.",
    "example": "Подключите ваше мобильное девайс к сети Wi-Fi.",
    "marker": "IT",
    "period": "новое"
  },
  {
    "term_ru": "ОНЛАЙН",
    "term_en": "Online",
    "pronunciation": "[онла́йн]",
    "definition": "В сети, подключенный к интернету; происходящий в интернете в реальном времени.",
    "example": "Лекция будет проходить онлайн.",
    "marker": "IT, Общеупотр.",
    "period": "новое"
  },
  {
    "term_ru": "ОФЛАЙН",
    "term_en": "Offline",
    "pronunciation": "[офла́йн]",
    "definition": "Вне сети интернет; происходящий в реальном мире, не виртуально.",
    "example": "Давай встретимся офлайн и обсудим это.",
    "marker": "IT, Общеупотр.",
    "period": "новое"
  },
  {
    "term_ru": "АККАУНТ",
    "term_en": "Account",
    "pronunciation": "[акка́унт]",
    "definition": "Учетная запись пользователя в какой-либо системе (на сайте, в приложении).",
    "example": "Я забыл пароль от своего аккаунта.",
    "marker": "IT",
    "period": "новое"
  },
  {
    "term_ru": "ЛОГИН",
    "term_en": "Login",
    "pronunciation": "[логи́н]",
    "definition": "Имя пользователя для входа в систему, на сайт.",
    "example": "Введите ваш логин и пароль.",
    "marker": "IT",
    "period": "новое"
  },
   {
    "term_ru": "ПАРОЛЬ",
    "term_en": "Password",
    "pronunciation": "[паро́ль]",
    "definition": "Секретное слово или набор символов для доступа к системе, информации.",
    "example": "Никому не сообщайте свой пароль.",
    "marker": "IT",
    "period": "новое"
  },
  {
    "term_ru": "КОНТЕНТ",
    "term_en": "Content",
    "pronunciation": "[контэ́нт]",
    "definition": "Содержание (текстовое, графическое, аудиовизуальное) информационного ресурса (сайта, блога и т.п.).",
    "example": "Нужно создавать качественный контент для привлечения аудитории.",
    "marker": "IT, Медиа",
    "period": "новое"
  },
  {
    "term_ru": "ПОСТ",
    "term_en": "Post",
    "pronunciation": "[пост]",
    "definition": "Сообщение, запись в блоге, на форуме, в социальной сети.",
    "example": "Она написала интересный пост о своем путешествии.",
    "marker": "IT, Медиа",
    "period": "новое"
  },
  {
    "term_ru": "РЕПОСТ",
    "term_en": "Repost",
    "pronunciation": "[репо́ст]",
    "definition": "Повторная публикация чужого сообщения (поста) на своей странице в социальной сети.",
    "example": "Сделай репост этой записи, пожалуйста.",
    "marker": "IT, Медиа",
    "period": "новое"
  },
  {
    "term_ru": "ЛАЙК",
    "term_en": "Like",
    "pronunciation": "[лайк]",
    "definition": "Отметка «нравится» в социальных сетях; одобрение.",
    "example": "Моя фотография собрала много лайков.",
    "marker": "IT, Медиа",
    "period": "новое"
  },
  {
    "term_ru": "ДИЗЛАЙК",
    "term_en": "Dislike",
    "pronunciation": "[дизла́йк]",
    "definition": "Отметка «не нравится» в социальных сетях; неодобрение.",
    "example": "Под видео было больше дизлайков, чем лайков.",
    "marker": "IT, Медиа",
    "period": "новое"
  },
  {
    "term_ru": "ФЕЙК",
    "term_en": "Fake",
    "pronunciation": "[фэйк]",
    "definition": "Подделка, фальшивка; ложная информация, недостоверные новости.",
    "example": "В сети распространился фейк о закрытии компании.",
    "marker": "Медиа, IT",
    "period": "новое"
  },
  {
    "term_ru": "ХАЙП",
    "term_en": "Hype",
    "pronunciation": "[хайп]",
    "definition": "Шумиха, ажиотаж (часто искусственно созданный) вокруг какого-либо события, персоны, продукта.",
    "example": "Вокруг нового фильма поднялся большой хайп.",
    "marker": "Медиа, Разг.",
    "period": "новое"
  },
  {
    "term_ru": "АПДЕЙТ",
    "term_en": "Update",
    "pronunciation": "[апдэ́йт]",
    "definition": "Обновление (программного обеспечения, информации, данных).",
    "example": "Не забудь установить последний апдейт операционной системы.",
    "marker": "IT",
    "period": "новое"
  },
  {
    "term_ru": "АПГРЕЙД",
    "term_en": "Upgrade",
    "pronunciation": "[апгрэ́йд]",
    "definition": "Модернизация, улучшение (обычно оборудования или программного обеспечения).",
    "example": "Пора сделать апгрейд компьютера.",
    "marker": "IT",
    "period": "новое"
  },
   {
    "term_ru": "ИНСТАЛЛЯЦИЯ",
    "term_en": "Installation",
    "pronunciation": "[инсталля́ция]",
    "definition": "1. Установка программного обеспечения. 2. Форма современного искусства.",
    "example": "Инсталляция программы займет несколько минут.",
    "marker": "IT, Искусство",
    "period": "новое"
  },
  {
    "term_ru": "БАГ",
    "term_en": "Bug",
    "pronunciation": "[баг]",
    "definition": "Ошибка, сбой в компьютерной программе или системе.",
    "example": "Программисты ищут баг, который вызывает зависание приложения.",
    "marker": "IT, Разг.",
    "period": "новое"
  },
   {
    "term_ru": "ФИКСИТЬ",
    "term_en": "Fix",
    "pronunciation": "[фи́ксить]",
    "definition": "Исправлять (ошибки, баги в программе).",
    "example": "Нужно срочно фиксить этот критический баг.",
    "marker": "IT, Разг.",
    "period": "новое"
  },
  {
    "term_ru": "БЛОГЕР",
    "term_en": "Blogger",
    "pronunciation": "[бло́гер]",
    "definition": "Человек, ведущий блог (интернет-дневник).",
    "example": "Популярный блогер рассказал о новинках техники.",
    "marker": "Медиа, IT",
    "period": "новое"
  },
   {
    "term_ru": "ВЛОГ",
    "term_en": "Vlog (video blog)",
    "pronunciation": "[влог]",
    "definition": "Видеоблог.",
    "example": "Она ведет свой влог о путешествиях на YouTube.",
    "marker": "Медиа, IT",
    "period": "новое"
  },
   {
    "term_ru": "СТРИМИТЬ",
    "term_en": "Stream",
    "pronunciation": "[стри́мить]",
    "definition": "Вести прямую трансляцию (обычно видео) в интернете.",
    "example": "Он любит стримить прохождение компьютерных игр.",
    "marker": "IT, Медиа",
    "period": "новое"
  },
   {
    "term_ru": "ПОДКАСТ",
    "term_en": "Podcast",
    "pronunciation": "[подка́ст]",
    "definition": "Аудио- или видеопередача, доступная для прослушивания или просмотра в интернете.",
    "example": "Я слушаю интересный подкаст по дороге на работу.",
    "marker": "Медиа, IT",
    "period": "новое"
  },
  {
    "term_ru": "ДЕДЛАЙН",
    "term_en": "Deadline",
    "pronunciation": "[дэдла́йн]",
    "definition": "Крайний срок выполнения задачи, сдачи работы.",
    "example": "Дедлайн по проекту – пятница, нужно успеть.",
    "marker": "Работа, Экономика",
    "period": "новое"
  },
  {
    "term_ru": "ИВЕНТ",
    "term_en": "Event",
    "pronunciation": "[ивэ́нт]",
    "definition": "Мероприятие, событие (часто организованное, публичное).",
    "example": "Компания организует большой ивент для своих клиентов.",
    "marker": "Бизнес, Культура",
    "period": "новое"
  },
  {
    "term_ru": "КОВОРКИНГ",
    "term_en": "Coworking",
    "pronunciation": "[ково́ркинг]",
    "definition": "Оборудованное рабочее пространство, которое арендуется и используется совместно людьми разных профессий, часто фрилансерами.",
    "example": "Он работает не дома, а в коворкинге в центре города.",
    "marker": "Работа, Бизнес",
    "period": "новое"
  },
  {
    "term_ru": "НЕТВОРКИНГ",
    "term_en": "Networking",
    "pronunciation": "[нэтво́ркинг]",
    "definition": "Создание и развитие сети полезных знакомств (особенно в профессиональной сфере).",
    "example": "Конференция – отличное место для нетворкинга.",
    "marker": "Бизнес, Работа",
    "period": "новое"
  },
  {
    "term_ru": "ОФФЕР",
    "term_en": "Offer",
    "pronunciation": "[о́ффер]",
    "definition": "Предложение (о работе, о заключении сделки).",
    "example": "Ему сделали выгодный оффер в другой компании.",
    "marker": "Работа, Бизнес",
    "period": "новое"
  },
  {
    "term_ru": "СТАРТАП",
    "term_en": "Startup",
    "pronunciation": "[старта́п]",
    "definition": "Новая компания, обычно технологическая, находящаяся на стадии развития и поиска бизнес-модели.",
    "example": "Он основал успешный IT-стартап.",
    "marker": "Бизнес, IT",
    "period": "новое"
  },
  {
    "term_ru": "ФРИЛАНСЕР",
    "term_en": "Freelancer",
    "pronunciation": "[фрила́нсер]",
    "definition": "Специалист, работающий на себя, выполняющий заказы для разных клиентов без постоянного трудового договора.",
    "example": "Она работает дизайнером как фрилансер.",
    "marker": "Работа",
    "period": "новое"
  },
  {
    "term_ru": "АУТСОРСИНГ",
    "term_en": "Outsourcing",
    "pronunciation": "[аутсо́рсинг]",
    "definition": "Передача организацией определённых бизнес-процессов или производственных функций на обслуживание другой компании.",
    "example": "Многие компании передают бухгалтерию на аутсорсинг.",
    "marker": "Бизнес, Экономика",
    "period": "новое"
  },
  {
    "term_ru": "БРЕЙНШТОРМ (БРЕЙНСТОРМ)",
    "term_en": "Brainstorm",
    "pronunciation": "[брэйншто́рм]",
    "definition": "Метод коллективного генерирования идей, мозговой штурм.",
    "example": "Мы устроили брейншторм, чтобы найти решение проблемы.",
    "marker": "Работа, Бизнес",
    "period": "новое"
  },
   {
    "term_ru": "ТИМЛИД",
    "term_en": "Team lead",
    "pronunciation": "[тимли́д]",
    "definition": "Руководитель команды (часто в IT).",
    "example": "Наш тимлид распределил задачи между разработчиками.",
    "marker": "Работа, IT",
    "period": "новое"
  },
   {
    "term_ru": "ЭЙЧАР (HR)",
    "term_en": "Human Resources (HR)",
    "pronunciation": "[эйча́р]",
    "definition": "Специалист по управлению персоналом.",
    "example": "Нужно связаться с эйчаром по поводу вакансии.",
    "marker": "Работа, Бизнес",
    "period": "новое"
  },
  {
    "term_ru": "КАСТИНГ",
    "term_en": "Casting",
    "pronunciation": "[ка́стинг]",
    "definition": "Отбор претендентов на роль (в кино, театре), на участие в проекте, на работу моделью.",
    "example": "Она успешно прошла кастинг на главную роль.",
    "marker": "Культура, Медиа",
    "period": "новое"
  },
  {
    "term_ru": "МЕЙНСТРИМ",
    "term_en": "Mainstream",
    "pronunciation": "[мэйнстри́м]",
    "definition": "Основное, преобладающее направление в какой-либо области (искусстве, музыке, моде).",
    "example": "Эта группа играет музыку, далекую от мейнстрима.",
    "marker": "Культура",
    "period": "новое"
  },
   {
    "term_ru": "АНДЕГРАУНД",
    "term_en": "Underground",
    "pronunciation": "[андегра́унд]",
    "definition": "Неофициальное, не признанное истеблишментом искусство, культура.",
    "example": "В 90-е был популярен музыкальный андеграунд.",
    "marker": "Культура, Искусство",
    "period": "новое"
  },
   {
    "term_ru": "ПЕРФОРМАНС",
    "term_en": "Performance",
    "pronunciation": "[перфо́рманс]",
    "definition": "Форма современного искусства, представляющая собой действия художника или группы лиц в определённом месте и времени.",
    "example": "На выставке был показан необычный перформанс.",
    "marker": "Искусство",
    "period": "новое"
  },
  {
    "term_ru": "САУНДТРЕК",
    "term_en": "Soundtrack",
    "pronunciation": "[саундтрэ́к]",
    "definition": "Музыкальное сопровождение фильма, мультфильма, компьютерной игры.",
    "example": "Саундтрек к этому фильму стал очень популярным.",
    "marker": "Культура, Музыка",
    "period": "новое"
  },
  {
    "term_ru": "РЕЛИЗ",
    "term_en": "Release",
    "pronunciation": "[рели́з]",
    "definition": "Выпуск (в свет, в продажу) нового продукта (фильма, альбома, книги, программы).",
    "example": "Релиз новой версии программы запланирован на осень.",
    "marker": "Медиа, IT, Культура",
    "period": "новое"
  },
  {
    "term_ru": "ПРОДЮСЕР",
    "term_en": "Producer",
    "pronunciation": "[продю́сер]",
    "definition": "Лицо, осуществляющее организационно-финансовое руководство постановкой фильма, спектакля, музыкального проекта.",
    "example": "Продюсер вложил большие средства в этот фильм.",
    "marker": "Культура, Медиа, Бизнес",
    "period": "новое"
  },
   {
    "term_ru": "ДИДЖЕЙ (DJ)",
    "term_en": "Disc Jockey (DJ)",
    "pronunciation": "[дидже́й]",
    "definition": "Человек, который публично воспроизводит записанные музыкальные произведения, подбирая и микшируя их.",
    "example": "На вечеринке играл известный диджей.",
    "marker": "Музыка, Культура",
    "period": "новое"
  },
   {
    "term_ru": "СТЕНДАП",
    "term_en": "Stand-up",
    "pronunciation": "[стэнда́п]",
    "definition": "Комедийное представление, в котором артист выступает перед живой аудиторией, обычно с монологом.",
    "example": "Он решил попробовать себя в жанре стендап.",
    "marker": "Культура, Юмор",
    "period": "новое"
  },
  {
    "term_ru": "ТОК-ШОУ",
    "term_en": "Talk show",
    "pronunciation": "[ток-шо́у]",
    "definition": "Теле- или радиопередача разговорного жанра, в которой ведущий и гости обсуждают актуальные темы.",
    "example": "Его пригласили на популярное ток-шоу.",
    "marker": "Медиа",
    "period": "новое"
  },
   {
    "term_ru": "ТРИЛЛЕР",
    "term_en": "Thriller",
    "pronunciation": "[три́ллер]",
    "definition": "Жанр произведений литературы и кино, стремящихся создать у зрителя или читателя напряжённое ожидание, волнение.",
    "example": "Это захватывающий психологический триллер.",
    "marker": "Культура, Кино",
    "period": "новое"
  },
   {
    "term_ru": "БЛОКБАСТЕР",
    "term_en": "Blockbuster",
    "pronunciation": "[блокба́стер]",
    "definition": "Очень популярный и коммерчески успешный фильм или книга.",
    "example": "Новый фильм о супергероях стал настоящим блокбастером.",
    "marker": "Кино, Культура",
    "period": "новое"
  },
   {
    "term_ru": "ФЭНТЕЗИ",
    "term_en": "Fantasy",
    "pronunciation": "[фэ́нтези]",
    "definition": "Жанр литературы, кино и игр, основанный на использовании мифологических и сказочных мотивов.",
    "example": "Он зачитывается книгами в жанре фэнтези.",
    "marker": "Культура, Литература, Кино",
    "period": "новое"
  },
  {
    "term_ru": "ЛУК",
    "term_en": "Look",
    "pronunciation": "[лук]",
    "definition": "Образ, внешний вид человека, подобранный комплект одежды.",
    "example": "Оцени мой сегодняшний лук!",
    "marker": "Мода, Разг.",
    "period": "новое"
  },
  {
    "term_ru": "ОВЕРСАЙЗ",
    "term_en": "Oversize",
    "pronunciation": "[оверса́йз]",
    "definition": "Стиль одежды, характеризующийся свободным, мешковатым кроем, вещами большего размера.",
    "example": "Сейчас в моде пальто оверсайз.",
    "marker": "Мода",
    "period": "новое"
  },
  {
    "term_ru": "ТРЕНД",
    "term_en": "Trend",
    "pronunciation": "[трэнд]",
    "definition": "Основная тенденция изменения чего-либо; актуальное направление моды.",
    "example": "Здоровый образ жизни – это современный тренд.",
    "marker": "Общеупотр., Мода",
    "period": "новое"
  },
  {
    "term_ru": "ХУДИ",
    "term_en": "Hoodie",
    "pronunciation": "[ху́ди]",
    "definition": "Толстовка с капюшоном.",
    "example": "В прохладную погоду он носит теплое худи.",
    "marker": "Одежда",
    "period": "новое"
  },
   {
    "term_ru": "КРОССОВКИ",
    "term_en": "Cross(-country shoes)",
    "pronunciation": "[кроссо́вки]",
    "definition": "Спортивная обувь.",
    "example": "Для бега нужны удобные кроссовки.",
    "marker": "Обувь, Спорт",
    "period": "новое"
  },
   {
    "term_ru": "КЭЖУАЛ",
    "term_en": "Casual",
    "pronunciation": "[кэ́жуал]",
    "definition": "Повседневный, неофициальный стиль в одежде.",
    "example": "Он предпочитает стиль кэжуал.",
    "marker": "Мода",
    "period": "новое"
  },
   {
    "term_ru": "МАСТХЭВ",
    "term_en": "Must-have",
    "pronunciation": "[мастхэ́в]",
    "definition": "Вещь, которую обязательно нужно иметь (обычно о модных предметах).",
    "example": "В этом сезоне маленькое черное платье – снова мастхэв.",
    "marker": "Мода, Разг.",
    "period": "новое"
  },
  {
    "term_ru": "ШОППИНГ",
    "term_en": "Shopping",
    "pronunciation": "[шо́пинг]",
    "definition": "Процесс совершения покупок в магазинах.",
    "example": "Поход по магазинам – ее любимый вид шоппинга.",
    "marker": "Торговля, Быт",
    "period": "новое"
  },
   {
    "term_ru": "РИТЕЙЛ",
    "term_en": "Retail",
    "pronunciation": "[ритэ́йл]",
    "definition": "Розничная торговля.",
    "example": "Он работает в сфере продуктового ритейла.",
    "marker": "Торговля, Экономика",
    "period": "новое"
  },
  {
    "term_ru": "ДЕТОКС",
    "term_en": "Detox",
    "pronunciation": "[дэто́кс]",
    "definition": "Очищение организма от токсинов (часто с помощью диеты, специальных процедур).",
    "example": "Она решила пройти курс детокс-программы.",
    "marker": "Здоровье",
    "period": "новое"
  },
  {
    "term_ru": "СМУЗИ",
    "term_en": "Smoothie",
    "pronunciation": "[сму́зи]",
    "definition": "Густой напиток из смешанных в блендере фруктов, ягод, овощей с добавлением молока, йогурта или сока.",
    "example": "На завтрак она выпила полезный смузи.",
    "marker": "Еда",
    "period": "новое"
  },
  {
    "term_ru": "ФАСТФУД",
    "term_en": "Fast food",
    "pronunciation": "[фастфу́д]",
    "definition": "Еда быстрого приготовления и обслуживания (гамбургеры, картофель фри и т.п.).",
    "example": "Иногда можно перекусить фастфудом, но не часто.",
    "marker": "Еда",
    "period": "новое"
  },
   {
    "term_ru": "ЛАНЧ",
    "term_en": "Lunch",
    "pronunciation": "[ланч]",
    "definition": "Второй завтрак или обед (обычно легкий, в середине дня).",
    "example": "В кафе предлагают бизнес-ланчи.",
    "marker": "Еда, Быт",
    "period": "новое"
  },
  {
    "term_ru": "ВОРКАУТ",
    "term_en": "Workout",
    "pronunciation": "[ворка́ут]",
    "definition": "Уличная гимнастика, тренировка на открытом воздухе с использованием турников, брусьев и т.п.",
    "example": "Молодежь занимается воркаутом на спортивной площадке.",
    "marker": "Спорт",
    "period": "новое"
  },
  {
    "term_ru": "КРОССФИТ",
    "term_en": "CrossFit",
    "pronunciation": "[кроссфи́т]",
    "definition": "Система круговых высокоинтенсивных тренировок, включающая элементы из разных видов спорта.",
    "example": "Кроссфит требует хорошей физической подготовки.",
    "marker": "Спорт",
    "period": "новое"
  },
  {
    "term_ru": "ФИТНЕС",
    "term_en": "Fitness",
    "pronunciation": "[фи́тнэс]",
    "definition": "Система физических упражнений для поддержания хорошей физической формы.",
    "example": "Она ходит в фитнес-клуб три раза в неделю.",
    "marker": "Спорт, Здоровье",
    "period": "новое"
  },
   {
    "term_ru": "БОДИБИЛДИНГ",
    "term_en": "Bodybuilding",
    "pronunciation": "[бодиби́лдинг]",
    "definition": "Система физических упражнений с тяжестями для развития мускулатуры.",
    "example": "Он серьезно занимается бодибилдингом.",
    "marker": "Спорт",
    "period": "новое"
  },
   {
    "term_ru": "ДАЙВИНГ",
    "term_en": "Diving",
    "pronunciation": "[да́йвинг]",
    "definition": "Подводное плавание со специальным снаряжением (аквалангом).",
    "example": "Дайвинг в Красном море очень популярен.",
    "marker": "Спорт, Отдых",
    "period": "новое"
  },
   {
    "term_ru": "СЕРФИНГ",
    "term_en": "Surfing",
    "pronunciation": "[сё́рфинг]",
    "definition": "Катание на специальной доске по гребню волны.",
    "example": "На Бали отличные условия для серфинга.",
    "marker": "Спорт, Отдых",
    "period": "новое"
  },
   {
    "term_ru": "СНОУБОРД",
    "term_en": "Snowboard",
    "pronunciation": "[сноубо́рд]",
    "definition": "Спортивный снаряд в виде доски для спуска с заснеженных склонов; вид спорта.",
    "example": "Он предпочитает сноуборд горным лыжам.",
    "marker": "Спорт",
    "period": "новое"
  },
  {
    "term_ru": "ЧЕЛЛЕНДЖ",
    "term_en": "Challenge",
    "pronunciation": "[чэ́ллендж]",
    "definition": "Вызов; трудная задача; популярное в интернете задание, которое нужно выполнить и передать другим.",
    "example": "Она приняла участие в танцевальном челлендже.",
    "marker": "Общеупотр., Медиа, Спорт",
    "period": "новое"
  },
  {
    "term_ru": "ИЗИ",
    "term_en": "Easy",
    "pronunciation": "[и́зи]",
    "definition": "Легко, просто.",
    "example": "Экзамен был просто изи!",
    "marker": "Жарг.",
    "period": "новое"
  },
  {
    "term_ru": "КРИНЖ",
    "term_en": "Cringe",
    "pronunciation": "[кринж]",
    "definition": "Чувство неловкости, стыда за чужие действия; что-то нелепое, вызывающее это чувство.",
    "example": "Его выступление – это был полный кринж.",
    "marker": "Жарг.",
    "period": "новое"
  },
  {
    "term_ru": "РОФЛ",
    "term_en": "ROFL (Rolling On the Floor Laughing)",
    "pronunciation": "[рофл]",
    "definition": "Шуткa, прикол; громкий смех (изначально – аббревиатура 'катаюсь по полу от смеха').",
    "example": "Это не серьезно, это просто рофл.",
    "marker": "Жарг.",
    "period": "новое"
  },
  {
    "term_ru": "ФЛЕКСИТЬ",
    "term_en": "Flex",
    "pronunciation": "[фле́ксить]",
    "definition": "Хвастаться, выставлять что-либо напоказ (дорогие вещи, достижения); танцевать определенным образом.",
    "example": "Хватит флексить своим новым телефоном!",
    "marker": "Жарг.",
    "period": "новое"
  },
  {
    "term_ru": "ХЕЙТЕР",
    "term_en": "Hater",
    "pronunciation": "[хэ́йтэр]",
    "definition": "Человек, который испытывает ненависть, неприязнь к кому-либо или чему-либо и часто выражает это публично (особенно в интернете).",
    "example": "У популярного блогера всегда много хейтеров.",
    "marker": "Медиа, IT, Разг.",
    "period": "новое"
  },
   {
    "term_ru": "ХЕЙТИТЬ",
    "term_en": "Hate",
    "pronunciation": "[хэ́йтить]",
    "definition": "Испытывать или выражать ненависть, неприязнь, критиковать (особенно в интернете).",
    "example": "Зачем хейтить человека, если можно просто пройти мимо?",
    "marker": "Медиа, IT, Разг.",
    "period": "новое"
  },
  {
    "term_ru": "ЧИЛИТЬ",
    "term_en": "Chill",
    "pronunciation": "[чи́лить]",
    "definition": "Отдыхать, расслабляться, ничего не делать.",
    "example": "В выходные будем просто чилить дома.",
    "marker": "Жарг.",
    "period": "новое"
  },
  {
    "term_ru": "ВАЙБ",
    "term_en": "Vibe",
    "pronunciation": "[вайб]",
    "definition": "Атмосфера, настроение, энергетика (места, человека, события).",
    "example": "У этой кофейни очень приятный вайб.",
    "marker": "Разг., Жарг.",
    "period": "новое"
  },
   {
    "term_ru": "КРАШ",
    "term_en": "Crush",
    "pronunciation": "[краш]",
    "definition": "Человек, который очень нравится, в которого тайно влюблены.",
    "example": "Он мой главный краш в этом классе.",
    "marker": "Жарг.",
    "period": "новое"
  },
   {
    "term_ru": "ПРУФ",
    "term_en": "Proof",
    "pronunciation": "[пруф]",
    "definition": "Доказательство (особенно в интернет-спорах).",
    "example": "Где пруфы, что это правда?",
    "marker": "IT, Разг., Жарг.",
    "period": "новое"
  },
   {
    "term_ru": "СКИЛЛ",
    "term_en": "Skill",
    "pronunciation": "[скилл]",
    "definition": "Навык, умение.",
    "example": "Нужно прокачать свои скиллы в программировании.",
    "marker": "IT, Работа, Разг.",
    "period": "новое"
  },
   {
    "term_ru": "ТОКСИЧНЫЙ",
    "term_en": "Toxic",
    "pronunciation": "[токси́чный]",
    "definition": "1. Ядовитый. 2. (перен.) Негативно влияющий на психику, отравляющий отношения, общение.",
    "example": "Он старается избегать общения с токсичными людьми.",
    "marker": "Общеупотр., Психология, Разг.",
    "period": "новое"
  },
   {
    "term_ru": "АБУЗЕР",
    "term_en": "Abuser",
    "pronunciation": "[абью́зер]",
    "definition": "Человек, совершающий насилие (физическое, психологическое, экономическое) над близкими.",
    "example": "Она смогла уйти от абьюзера.",
    "marker": "Психология, Общество",
    "period": "новое"
  },
  {
    "term_ru": "КЕЙС",
    "term_en": "Case",
    "pronunciation": "[кэйс]",
    "definition": "1. Конкретный случай, ситуация (особенно в бизнесе, обучении). 2. Портфель, чемоданчик.",
    "example": "На семинаре разбирали интересный бизнес-кейс.",
    "marker": "Бизнес, Обучение",
    "period": "новое"
  },
   {
    "term_ru": "ФОЛЛОВЕР",
    "term_en": "Follower",
    "pronunciation": "[фоло́вэр]",
    "definition": "Подписчик (в социальных сетях).",
    "example": "У этого аккаунта миллион фолловеров.",
    "marker": "IT, Медиа",
    "period": "новое"
  },
   {
    "term_ru": "КОПИРАЙТЕР",
    "term_en": "Copywriter",
    "pronunciation": "[копира́йтер]",
    "definition": "Специалист по написанию рекламных и презентационных текстов.",
    "example": "Копирайтер написал текст для главной страницы сайта.",
    "marker": "Работа, Маркетинг, Медиа",
    "period": "новое"
  },
   {
    "term_ru": "КРЕАТИВНЫЙ",
    "term_en": "Creative",
    "pronunciation": "[креати́вный]",
    "definition": "Творческий, нестандартный.",
    "example": "Нам нужен креативный подход к решению этой задачи.",
    "marker": "Общеупотр.",
    "period": "новое"
  },
   {
    "term_ru": "ГЛАМУРНЫЙ",
    "term_en": "Glamorous",
    "pronunciation": "[гламу́рный]",
    "definition": "Очаровательный, эффектный, роскошный, связанный с миром моды и светской жизни.",
    "example": "Она всегда выглядит очень гламурно.",
    "marker": "Мода, Разг.",
    "period": "новое"
  },
   {
    "term_ru": "ИМИДЖ",
    "term_en": "Image",
    "pronunciation": "[и́мидж]",
    "definition": "Образ, репутация (человека, компании).",
    "example": "Компания заботится о своем имидже на рынке.",
    "marker": "Общеупотр., Бизнес, Политика",
    "period": "новое"
  },
   {
    "term_ru": "КЛИНИНГ",
    "term_en": "Cleaning",
    "pronunciation": "[кли́нинг]",
    "definition": "Профессиональная уборка помещений.",
    "example": "Мы заказали клининг квартиры после ремонта.",
    "marker": "Быт, Бизнес",
    "period": "новое"
  },
   {
    "term_ru": "КОУЧИНГ",
    "term_en": "Coaching",
    "pronunciation": "[ко́учинг]",
    "definition": "Метод консультирования и тренинга, при котором специалист (коуч) помогает человеку достичь определённой цели.",
    "example": "Коучинг помог ей повысить личную эффективность.",
    "marker": "Бизнес, Психология",
    "period": "новое"
  },
   {
    "term_ru": "МЕРЧАНДАЙЗИНГ",
    "term_en": "Merchandising",
    "pronunciation": "[мерчанда́йзинг]",
    "definition": "Часть процесса маркетинга, направленная на продвижение товара в точках розничной продажи (выкладка, оформление).",
    "example": "Правильный мерчандайзинг увеличивает продажи.",
    "marker": "Торговля, Маркетинг",
    "period": "новое"
  },
   {
    "term_ru": "МОНИТОРИНГ",
    "term_en": "Monitoring",
    "pronunciation": "[монито́ринг]",
    "definition": "Систематическое наблюдение, отслеживание какого-либо процесса или явления.",
    "example": "Необходим постоянный мониторинг экологической ситуации.",
    "marker": "Общеупотр., Наука, Бизнес",
    "period": "новое"
  },
   {
    "term_ru": "ТЮНИНГ",
    "term_en": "Tuning",
    "pronunciation": "[тю́нинг]",
    "definition": "Доработка, усовершенствование автомобиля или другой техники для улучшения характеристик или внешнего вида.",
    "example": "Он увлекается тюнингом своей машины.",
    "marker": "Техника, Авто",
    "period": "новое"
  },
   {
    "term_ru": "ФРАНШИЗА",
    "term_en": "Franchise",
    "pronunciation": "[франши́за]",
    "definition": "Право на использование бренда, бизнес-модели и технологий другой компании.",
    "example": "Он открыл кофейню по франшизе известной сети.",
    "marker": "Бизнес, Экономика",
    "period": "новое"
  },
   {
    "term_ru": "ХОСТИНГ",
    "term_en": "Hosting",
    "pronunciation": "[хо́стинг]",
    "definition": "Услуга по предоставлению дискового пространства и ресурсов для размещения сайта в интернете.",
    "example": "Нужно выбрать надежный хостинг для нового сайта.",
    "marker": "IT",
    "period": "новое"
  },
   {
    "term_ru": "СПАМ",
    "term_en": "Spam",
    "pronunciation": "[спам]",
    "definition": "Массовая рассылка нежелательных сообщений (обычно рекламных) по электронной почте или в мессенджерах.",
    "example": "Мой почтовый ящик завален спамом.",
    "marker": "IT",
    "period": "новое"
  },
   {
    "term_ru": "ТРАФИК",
    "term_en": "Traffic",
    "pronunciation": "[тра́фик]",
    "definition": "1. Движение транспорта. 2. Объем данных, передаваемых по сети; посещаемость сайта.",
    "example": "Нужно увеличить трафик на наш сайт.",
    "marker": "Транспорт, IT",
    "period": "новое"
  },
    {
    "term_ru": "КЭШ",
    "term_en": "Cache / Cash",
    "pronunciation": "[кэш]",
    "definition": "1. (Cache) Временное хранилище данных для ускорения доступа. 2. (Cash) Наличные деньги.",
    "example": "Нужно почистить кэш браузера. / Лучше платить кэшем?",
    "marker": "IT / Экономика, Разг.",
    "period": "новое"
  },
  {
    "term_ru": "ОФШОР",
    "term_en": "Offshore",
    "pronunciation": "[офшо́р]",
    "definition": "Территория или страна с льготными налоговыми условиями для иностранных компаний.",
    "example": "Компания зарегистрирована в офшоре.",
    "marker": "Экономика, Бизнес",
    "period": "новое"
  },
  {
    "term_ru": "ТЕНДЕР",
    "term_en": "Tender",
    "pronunciation": "[тэ́ндер]",
    "definition": "Конкурсная форма размещения заказа на поставку товаров, оказание услуг или выполнение работ.",
    "example": "Компания выиграла тендер на строительство моста.",
    "marker": "Экономика, Бизнес",
    "period": "новое"
  },
  {
    "term_ru": "РЕЙТИНГ",
    "term_en": "Rating",
    "pronunciation": "[рэ́йтинг]",
    "definition": "Числовой или порядковый показатель оценки, популярности, уровня чего-либо или кого-либо.",
    "example": "Рейтинг этой телепередачи очень высок.",
    "marker": "Общеупотр., Медиа, Политика",
    "period": "новое"
  },
  {
    "term_ru": "ПРОМОУТЕР",
    "term_en": "Promoter",
    "pronunciation": "[промо́утер]",
    "definition": "Лицо или организация, занимающиеся продвижением товара, услуги, мероприятия или артиста.",
    "example": "Промоутеры раздавали листовки у входа в магазин.",
    "marker": "Маркетинг, Реклама, Работа",
    "period": "новое"
  },
  {
    "term_ru": "МЕССЕНДЖЕР",
    "term_en": "Messenger",
    "pronunciation": "[мэ́ссенджер]",
    "definition": "Программа или приложение для обмена мгновенными сообщениями через интернет.",
    "example": "Напиши мне в мессенджер, когда освободишься.",
    "marker": "IT",
    "period": "новое"
  },
  {
    "term_ru": "СКРИНШОТ",
    "term_en": "Screenshot",
    "pronunciation": "[скриншо́т]",
    "definition": "Снимок экрана компьютера или мобильного устройства.",
    "example": "Пришли мне скриншот с ошибкой.",
    "marker": "IT",
    "period": "новое"
  },
   {
    "term_ru": "ЮЗАБИЛИТИ",
    "term_en": "Usability",
    "pronunciation": "[юзаби́лити]",
    "definition": "Удобство и простота использования (обычно сайта, приложения, устройства).",
    "example": "Нужно улучшить юзабилити нашего сайта.",
    "marker": "IT, Дизайн",
    "period": "новое"
  },
   {
    "term_ru": "ИНТЕРФЕЙС",
    "term_en": "Interface",
    "pronunciation": "[интерфе́йс]",
    "definition": "Средства взаимодействия пользователя с программой или устройством; внешний вид программы.",
    "example": "У этого приложения интуитивно понятный интерфейс.",
    "marker": "IT",
    "period": "новое"
  }
]; // Сохраняем загруженные данные
	if(loadingMessage) loadingMessage.remove(); // Удаляем сообщение о загрузке
	renderDictionary(dictionaryData); // Отображаем полный словарь
	
	
    searchInput.addEventListener('input', filterDictionary);

}); // Конец DOMContentLoaded