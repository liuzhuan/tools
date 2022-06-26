/**
 * return normalized currency string
 * @param {number} val raw money number
 * @param {number} precision
 * @returns {string}
 */
export function currency(val, precision = 2) {
  return val.toFixed(precision)
}
