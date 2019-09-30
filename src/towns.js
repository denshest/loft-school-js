/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import { loadAndSortTowns } from './index';

const homeworkContainer = document.querySelector('#homework-container'),
    errorBlock = document.createElement('div'),
    errorMessage = document.createElement('p'),
    repeatButton = document.createElement('button');

errorBlock.style.display = 'none';
errorMessage.id = 'error-message';
errorMessage.innerText = 'Не удалось загрузить города';
repeatButton.id = 'error-btn';
repeatButton.innerText = 'Повторить';
errorBlock.appendChild(errorMessage);
errorBlock.appendChild(repeatButton);

repeatButton.addEventListener('click', () => {
    errorBlock.style.display = 'none';
    loadTowns()
        .then((resp) => {
            citiesArray = resp;
            filterBlock.style.display = 'block';
        })
        .catch(() => {
            errorBlock.style.display = 'block';
        })
        .finally(() => {
            loadingBlock.style.display = 'none';
        });
}, false);

homeworkContainer.appendChild(errorBlock);

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return loadAndSortTowns()
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().indexOf(chunk.toLowerCase()) >= 0
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let citiesArray = [];

loadTowns()
    .then((resp) => {
        citiesArray = resp;
        filterBlock.style.display = 'block';
    })
    .catch(() => {
        errorBlock.style.display = 'block';
    })
    .finally(() => {
        loadingBlock.style.display = 'none';
    });

filterInput.addEventListener('keyup', function() {
    let str = filterInput.value;

    filterResult.innerHTML = '';

    if (str) {
        citiesArray.forEach(item => {
            let child = document.createElement('P');

            if (isMatching(item.name, str)) {
                child.innerText = item.name;
                filterResult.appendChild(child);
            }
        });
    }

});

export {
    loadTowns,
    isMatching
};
