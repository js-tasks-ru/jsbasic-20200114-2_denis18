/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
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
class ClearedTable {
  constructor(data) {
    this.el = document.createElement('table');
    this.data = data;
    this.columnNames = ['Name', 'Age', 'Salary', 'City', ''];
    this.render();
  }

  render() {
    this.el.classList.add('pure-table');
    
    let innerHtml = '';

    innerHtml += '<thead><tr>';
    for (let columnName of this.columnNames) {
      innerHtml += `<td>${columnName}</td>`;
    }
    innerHtml += '</tr></thead>';

    innerHtml += '<tbody>';
    for (let item of this.data) {
      innerHtml += `<tr data-id="${item.id}">`
        + `<td>${item.name}</td>`
        + `<td>${item.age}</td>`
        + `<td>${item.salary}</td>`
        + `<td>${item.city}</td>`
        + `<td><a href="#delete">X</a></td>`
        + `</tr>`;
    }
    innerHtml += '</tbody>';

    this.el.innerHTML = innerHtml;

    this.el.addEventListener('click', (event) => {
      if (event.target.tagName === 'A' && event.target.getAttribute('href') === '#delete') {
        let tr = event.target.closest('tr');
        let id = +tr.dataset.id;
        
        tr.remove();
        this.onRemoved(id);
      }
    }); 
  }

  /**
   * Метод который выщывается после удалении строки
   * @param {number} id - идентификатор удаляемого пользователя
   */
  onRemoved(id) {}
}

window.ClearedTable = ClearedTable;
