/**
 * There is no 5000 in Roman Numerals, so the maximum value is 3999.
 */
export const MAX_DECIMAL_VALUE = 3999
/**
 * MMMM is the outer (invalid) edge of the Roman Numeral system.
 */
export const ILLEGAL_ROMAN_NUMERAL_VALUE = 'MMMM'
/**
 * Regex containing all valid Roman Numerals.
 * 
 * @example /^[M,D,C,L,X,V,I]+$/g
 */
export const VALID_ROMAN_NUMERALS = new RegExp(/^[M,D,C,L,X,V,I]+$/g)
export const RANGE_ERROR = 'Cannot convert values greater than 3999.'
export const VALUE_ERROR = 'Invalid value.'
export const ESCAPE_INPUTS = ['q', 'Q', 'escape', 'Escape', 'ESCAPE', 'quit', 'Quit', 'QUIT', 'exit', 'Exit', 'EXIT']
export const HELP_INPUTS = ['h', 'H', 'help', 'Help', 'HELP']

/**
 * Array of objects containing the Roman Numeral, its decimal value, and the helper numerals, if any.
 */
export const NUMERALS = [
    {
        numeral: 'M',
        value: 1000,
        isPowerOfTen: true,
        helperNumerals: null
    },
    {
        numeral: 'D',
        value: 500,
        isPowerOfTen: false,
        helperNumerals: null
    },
    {
        numeral: 'C',
        value: 100,
        isPowerOfTen: true,
        helperNumerals:
        {
            five: { numeral: 'D', multiplier: 4 },
            ten: { numeral: 'M', multiplier: 9 }
        }
    },
    {
        numeral: 'L',
        value: 50,
        isPowerOfTen: false,
        helperNumerals: null
    },
    {
        numeral: 'X',
        value: 10,
        isPowerOfTen: true,
        helperNumerals:
        {
            five: { numeral: 'L', multiplier: 4 },
            ten: { numeral: 'C', multiplier: 9 }
        }
    },
    {
        numeral: 'V',
        value: 5,
        isPowerOfTen: false,
        helperNumerals: null
    },
    {
        numeral: 'I',
        value: 1,
        isPowerOfTen: true,
        helperNumerals:
        {
            five: { numeral: 'V', multiplier: 4 },
            ten: { numeral: 'X', multiplier: 9 }
        }
    },
]

/**
 * Array of objects containing the number of units, how many times they're repeated in the Roman Numeral system,
 * their associated helper numeral, and if it's placed before or after the current numeral.
 */
export const DIGITS = [
    {
        digits: 1,
        repetitions: 1,
        helperNumeral: null
    },
    {
        digits: 2,
        repetitions: 2,
        helperNumeral: null
    },
    {
        digits: 3,
        repetitions: 3,
        helperNumeral: null
    },
    {
        digits: 4,
        repetitions: 1,
        helperNumeral: { type: 'five', isBefore: false }
    },
    {
        digits: 5,
        repetitions: 0,
        helperNumeral: { type: 'five', isBefore: true }
    },
    {
        digits: 6,
        repetitions: 1,
        helperNumeral: { type: 'five', isBefore: true }
    },
    {
        digits: 7,
        repetitions: 2,
        helperNumeral: { type: 'five', isBefore: true }
    },
    {
        digits: 8,
        repetitions: 3,
        helperNumeral: { type: 'five', isBefore: true }
    },
    {
        digits: 9,
        repetitions: 1,
        helperNumeral: { type: 'ten', isBefore: false }
    },
]
