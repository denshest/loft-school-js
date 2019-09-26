/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const namespaceURI = 'http://www.w3.org/1999/xhtml';
    let div = document.createElementNS(namespaceURI, 'div');

    div.classList.add('draggable-div');
    div.style.width = `${getRandomInt(200)}px`;
    div.style.height = `${getRandomInt(200)}px`;
    div.style.top = `${getRandomInt(200)}px`;
    div.style.left = `${getRandomInt(200)}px`;
    div.style.backgroundColor = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;

    return div;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
var dragSrcEl = null;

function addListeners(target) {
    function handleDragStart(e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';

        return false;
    }

    function handleDragEnter() {
        this.style.border ='2px dashed #000';
    }

    function handleDragLeave() {
        this.style.border ='none';
        this.style.opacity ='1';
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (dragSrcEl !== this) {
            dragSrcEl.outerHTML = this.outerHTML;
            this.outerHTML = e.dataTransfer.getData('text/html');
        }

        return false;
    }

    function handleDragEnd() {
        homeworkContainer.querySelectorAll('.draggable-div').forEach(item => {
            item.style.border ='none';
        });
    }

    target.draggable = true;

    target.addEventListener('dragstart', handleDragStart, false);
    target.addEventListener('dragenter', handleDragEnter, false);
    target.addEventListener('dragover', handleDragOver, false);
    target.addEventListener('dragleave', handleDragLeave, false);
    target.addEventListener('drop', handleDrop, false);
    target.addEventListener('dragend', handleDragEnd, false);
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
