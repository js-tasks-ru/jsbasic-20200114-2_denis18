/**
 * Power
 * @param {number} m base
 * @param {number} n index
 * @returns {number}
 */
function pow(m, n) {
  if (Number.isInteger(n) && n > 0) {
    let result = m;
    for (let i = 1; i < n; i++) {
      result *= m;
    }
    return result;
  }
}