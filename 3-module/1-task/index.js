/**
 * showSalary
 * @param {Array} data - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(data, age) {
  let salaryInfo = "";
  
  for (let user of data) {
    if (user.age <= age) {
      if (salaryInfo !== "") {
        salaryInfo += "\n";
      }
      salaryInfo += `${user.name}, ${user.balance}`;
    }
  }

  return salaryInfo;
}