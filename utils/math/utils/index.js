import {
  toFixed
} from './number'

/**
 * round a number to the given number of decimals, or to zero if decimals is
 * not provided
 * @param {number} value
 * @param {number} decimals       number of decimals, between 0 and 15 (0 by default)
 * @return {number} roundedValue
 * @private
 */
export function _round (value, decimals) {
  return parseFloat(toFixed(value, decimals))
}

