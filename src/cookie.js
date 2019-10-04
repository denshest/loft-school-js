/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

let cookies = [];
let str = '';

function updateCookie() {
    cookies = [];
    if (document.cookie) {
        document.cookie.split(';').forEach(item => {
            cookies.push({
                'name': item.split('=')[0],
                'value': item.split('=')[1],
            });
        });
    }
    updateTable();
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function updateTable() {
    listTable.innerHTML = '';

    let array = filterCookies(str);

    array.forEach(item => {
        let tr = document.createElement('tr'),
            name = document.createElement('td'),
            value = document.createElement('td'),
            removeBtn = document.createElement('button');

        name.innerText = item.name;
        value.innerText = item.value;
        removeBtn.innerText = 'Удалить';

        tr.appendChild(name);
        tr.appendChild(value);
        tr.appendChild(removeBtn);

        listTable.appendChild(tr);
    });
}

function isMatching(full, chunk) {
    return full.toLowerCase().indexOf(chunk.toLowerCase()) >= 0
}

function filterCookies(str) {
    let arr = [];

    cookies.forEach(item => {
        if (isMatching(item.name, str) || isMatching(item.value, str)) {
            arr.push(item);
        }
    });

    return arr;
}

const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

updateCookie();

filterNameInput.addEventListener('keyup', function() {
    str = filterNameInput.value;

    if (str) {
        let arr = filterCookies(str);

        updateTable(arr);
    } else {
        updateTable();
    }
});

addButton.addEventListener('click', () => {
    if (addNameInput.value && addValueInput.value) {
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;
        updateCookie();

        addNameInput.value = '';
        addValueInput.value = '';
    }
});

listTable.addEventListener('click', (e) => {
    let btn = e.target.closest('button');

    if (!btn || !listTable.contains(btn)) {
        return;
    }

    deleteCookie(btn.parentElement.firstChild.innerText);
    updateCookie();
}, false);