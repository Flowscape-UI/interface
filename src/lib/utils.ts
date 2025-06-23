import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeTrailingZeros(num: number, precision = 0) {
  if (typeof num !== 'number') {
      throw new TypeError('Input must be a number');
  }

  if (precision < 0) {
      throw new RangeError('Precision must be a non-negative integer');
  }

  // Convert the number to a string
  const numStr = num.toString();

  // For integer numbers, remove trailing zeros and return as integer if precision is 0
  if (Number.isInteger(num) && precision === 0) {
      return parseInt(numStr, 10);
  } else {
      // Handle floating point numbers with specific precision
      // eslint-disable-next-line prefer-const
      let [integerPart, decimalPart] = numStr.split('.');

      if (decimalPart) {
          // Limit decimal places based on precision
          decimalPart = decimalPart.slice(0, precision);
          if (decimalPart.length === 0) {
              // If there's no decimal part left after slicing, return the integer part
              return parseInt(integerPart, 10);
          }
          return parseFloat(`${integerPart}.${decimalPart}`);
      }

      // If no decimal part, return the integer
      return parseInt(numStr, 10);
  }
}