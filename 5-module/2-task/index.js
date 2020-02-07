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
  this.items = items;

  function render() {
    this.el.innerHTML = '<thead><tr><td>Name</td><td>Age</td><td>Salary</td><td>City</td></tr></thead>';

    this.el.innerHTML += '<tbody>';
    for (let item of this.items) {
      this.el.innerHTML += `<tr><td>${item.name}</td><td>${item.age}</td><td>${item.salary}</td><td>${item.city}</td></tr>`;
    }
    this.el.innerHTML += '</tbody>';
  }

  /**
   * Метод выполняет сортировку таблицы
   * @param {number} column - номер колонки, по которой
   * нужно выполнить сортировку (отсчет начинается от 0)
   * @param {boolean} desc - признак того, что сортировка должна идти в обратном порядке
   */
  this.sort = (column, desc = false) => {
    this.items.sort( (a, b) => {
      if( )
    });
  };

  render();  
}
