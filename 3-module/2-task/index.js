/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let seps = [' ', ',', ';', '\n'];
  let numbers = getNumbers(str, seps);

  if (numbers.length > 0) {
    let min = numbers.reduce( 
      (min, current) => current < min ? current : min,
      numbers[0]
    );

    let max = numbers.reduce(
      (max, current) => current > max ? current : max,
      numbers[0]
    );

    return {min, max};
  }
}



/**
 * Извлекает числа из строки
 * @param {string} str - входная строка 
 * @param {Array} seps - массив разделителей
 * @returns {Array} - массив чисел 
 */
function getNumbers(str, seps) {
  let numbers = [];
  let startIndex = 0;

  while (true) {
    let finishIndex = getIndexOfNextSep(str, startIndex, seps);
    let word = str.substring(startIndex, finishIndex);
    let number;

    if (word === '') {
      number = NaN;  
    } else {
      number = +word;
    }

    if (!isNaN(number)) {
      numbers.push(number);
    }

    if (finishIndex === str.length) {
      break;
    } else {
      startIndex = finishIndex + 1;
    }
  }

  return numbers;
}



/**
 * Возвращает индекс следующего разделителя
 * @param {string} str - входная строка
 * @param {number} startIndex - индекс начала поиска 
 * @param {Array} seps - массив разделителей
 * @returns {number} - индекс следующего разделителя
 */
function getIndexOfNextSep(str, startIndex, seps) {
  let index;

  for (let sep of seps) {
    let indexOfCurSep = str.indexOf(sep, startIndex);

    if (indexOfCurSep !== -1 && (index === undefined || index > indexOfCurSep)) {
      index = indexOfCurSep;
    }
  }

  if (index === undefined) {
    index = str.length;
  }

  return index;
}
