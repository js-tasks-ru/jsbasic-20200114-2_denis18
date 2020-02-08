/**
 * Компонент, который реализует сортируемую таблицу
 * @param {Array} items - данные, которые нужно отобразить
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },
 *
 * @constructor
 */
function SortableTable(items) {
  /**
   * @property {Element} - обязательно свойство, которое ссылается на элемент <table>
   */
  this.el = document.createElement('table');
  
  /**
   * @property {Array} - массив данных, по которым строится таблица
   */
  this.items = items;

  /**
   * @property {Array} - имена полей объекта, который предаставляет элемент массива данных
   */
  let _itemKeys = [];

  if (items.length > 0) {
    for (let key in items[0]) {
      _itemKeys.push(key);
    }
  }

  /**
   * @property {Arrya} - массив с заголовками столбцов таблицы
   */
  this.columnNames = ['Age', 'Name', 'Salary', 'City'];

  /**
   * Метод выполняет рендеринг таблицы
   */
  this.render = () => {
    let innerHTML = "";
    
    innerHTML += '<thead><tr>';
    for (let columnName of this.columnNames) {
      innerHTML += `<td>${columnName}</td>`;
    }
    innerHTML += '</thead></tr>';

    innerHTML += '<tbody>';
    for (let item of this.items) {
      innerHTML += `<tr><td>${item.name}</td><td>${item.age}</td><td>${item.salary}</td><td>${item.city}</td></tr>`;
    }
    innerHTML += '</tbody>';

    this.el.innerHTML = innerHTML;
  };

  /**
   * Метод выполняет сортировку таблицы
   * @param {number} column - номер колонки, по которой
   * нужно выполнить сортировку (отсчет начинается от 0)
   * @param {boolean} desc - признак того, что сортировка должна идти в обратном порядке
   */
  this.sort = (column, desc = false) => {
    this.items.sort((a, b) => {
      let key = _itemKeys[column];
      let x = a[key];
      let y = b[key];

      if (!desc) {
        if (x > y) return 1;
        if (x == y) return 0;
        if (x < y) return -1;
      } else {
        if (x < y) return 1;
        if (x == y) return 0;
        if (x > y) return -1;
      }
    });

    this.render();
  };

  this.render();  
}
