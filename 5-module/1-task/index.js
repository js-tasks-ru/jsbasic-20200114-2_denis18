/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  for (let body of table.tBodies) {
    for (let row of body.rows) {
      let age = +row.cells[1].textContent;
      let gender = row.cells[2].textContent;
      let available = row.cells[3].dataset.available;
      
      if (age < 18) {
        row.style = 'text-decoration: line-through';
      }

      if (gender === 'm') {
        row.classList.add('male');
      } else if (gender === 'f') {
        row.classList.add('female');
      }
      
      if (available === undefined) {
        row.hidden = true;
      } else if (available === 'true') {
        row.classList.add('available');
      } else if (available === 'false') {
        row.classList.add('unavailable');
      }
    }
  }
}
