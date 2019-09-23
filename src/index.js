/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn, from = 0, to = array.length) {
    for (let i = from; i < to; ++i) {
        fn(array[i], i, array)
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let arr = [];

    forEach(array, (item, index, array) => {
        arr.push(fn(item, index, array));
    });

    return arr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let prev = initial || array[0],
        index = initial ? 0 : 1;

    forEach(array, (item, index, array) => {
        prev = fn(prev, item, index, array);
    }, index);

    return prev;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let arr = [];

    forEach(Object.keys(obj), item => {
        arr.push(item.toUpperCase());
    });

    return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let arr = [];

    from = from < 0 ? 0 : from;

    if (to > array.length) {
        to = array.length;
    }

    if (to < 0) {
        to += array.length;
    }

    forEach(array, ((item) => {
        arr.push(item);
    }), from, to);

    return arr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set: (obj, prop, value) => {
            if (typeof value === 'number') {
                obj[prop] = Math.pow(value, 2);

                return true;
            }

            return false;
        }
    });

}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};