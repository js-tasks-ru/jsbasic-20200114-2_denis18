/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let splitStr = str.split('');

  let i = 0;
  while (splitStr[i] !== undefined) {
    if (splitStr[i] === '-') {
      splitStr.splice(i, 1);
      splitStr[i] = splitStr[i].toUpperCase();
    }
    
    i++;
  }
  
  return splitStr.join('');
}
