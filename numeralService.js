/**
 * @fileoverview Contains functions to convert Roman Numerals to decimal values and vice versa.
 */

import {
    DIGITS,
    NUMERALS,
    MAX_DECIMAL_VALUE,
    ILLEGAL_ROMAN_NUMERAL_VALUE,
    VALID_ROMAN_NUMERALS,
    RANGE_ERROR,
    VALUE_ERROR 
    } from './constants.js'

/**
 * Determines the numbering system (roman or decimal) and returns the converted value.
 * 
 * @param {string} input
 * @example ('XIV') : '14'
 * @example ('14') : 'XIV'
 * @example ('XIVX') : 'Invalid value.'
 */
export function processValue(input) {

    const toDecimalResult = romanToDecimal(input)
    const toRomanResult = decimalToRoman(input)

    if (toRomanResult !== VALUE_ERROR && toRomanResult !== RANGE_ERROR) {

        return toRomanResult
    }

    if (toDecimalResult !== VALUE_ERROR && toDecimalResult !== RANGE_ERROR) {

        return toDecimalResult
    }

    if (toDecimalResult === RANGE_ERROR || toRomanResult === RANGE_ERROR) {

        return RANGE_ERROR
    }

    return VALUE_ERROR
}

/**
 * Converts a Roman Numeral number to a decimal number
 * 
 * @example ('XIV') : 14
 */
export function romanToDecimal(input) {

    const romanNumerals = input.toUpperCase()

    if (!romanNumerals.match(VALID_ROMAN_NUMERALS)) {

        return VALUE_ERROR
    }

    if (romanNumerals.match(ILLEGAL_ROMAN_NUMERAL_VALUE)) {

        return RANGE_ERROR
    }

    /**
     * @type {string[]}
     * @example ['X', 'I', 'V']
     */
    const numeralArray = romanNumerals.split('')

    let accumulator = 0
    let shouldSkipNext = false
    numeralArray.forEach((numeral, index) => {
        
        if (shouldSkipNext) {
            shouldSkipNext = false    
        } else {
            const RESULT = translateNumeral(numeral, numeralArray[index + 1])
            
            if (RESULT.isSuffixed) {
                shouldSkipNext = true
            }
            accumulator += RESULT.value
        }
    })

    if (decimalToRoman(accumulator) !== romanNumerals) {
        return VALUE_ERROR
    }

    return accumulator
}

/**
 * Converts a decimal number to Roman Numeral number
 * 
 * @example (14) : 'XIV'
 */
export function decimalToRoman(input) {

    const decimalNumber = parseInt(input)

    if (!decimalNumber) {

        return VALUE_ERROR
    }

    if (decimalNumber > MAX_DECIMAL_VALUE) {

        return RANGE_ERROR
    }

    let reduceable = decimalNumber
    let numeralString = ''
    NUMERALS.forEach(NUMERAL => {
    
        if (NUMERAL.isPowerOfTen) {
            const frontDigit = Math.floor(reduceable / NUMERAL.value)
            const TRANSLATION = translateDigit(frontDigit, NUMERAL)
            reduceable -= TRANSLATION.value
            numeralString += TRANSLATION.numerals
        }
    })

    return numeralString
}

/**
 * Translates a single digit to a Roman Numeral and marks if the next numeral should be skipped.
 * 
 * @param {number} digit
 * @param {object} NUMERAL
 * @returns {object}
 * @example (0, { numeral: 'M', value: 1000, isPowerOfTen: true, helperNumerals: null }) : { numerals: '', value: 0 }
 * @example (4, { numeral: 'C', value: 100, isPowerOfTen: true, helperNumerals: {...} }) : { numerals: 'CD', value: 400 }
 */
function translateDigit (digit, NUMERAL) {

    const TRANSLATION = { numerals: '', value: 0 }
    DIGITS.forEach(DIGIT => {

        if (digit === DIGIT.digits) {
            const repeatedNumeral = repeatNumeral(NUMERAL.numeral, DIGIT.repetitions)
            TRANSLATION.numerals = addHelperNumeral(NUMERAL, repeatedNumeral, DIGIT)
        }
    })
    TRANSLATION.value = digit * NUMERAL.value

    return TRANSLATION
}

/**
 * Adds a helper numeral to the numeral string if needed.
 * 
 * @param {object} NUMERAL { numeral: 'C', value: 100, isPowerOfTen: true, helperNumerals: {...} }
 * @param {string} repeatedNumeral
 * @param {object} DIGIT { digits: 4, repetitions: 1, helperNumeral: { type: 'five', isBefore: true } }
 * @example (NUMERAL, 'C', DIGIT) : 'CD'
 */
function addHelperNumeral (NUMERAL, repeatedNumeral, DIGIT) {

    let composedNumerals = ''

    if (DIGIT.helperNumeral) {
        const soughtType = DIGIT.helperNumeral.type
        const validNumerals = NUMERAL.helperNumerals
        const helperNumeral = validNumerals[soughtType].numeral

        if (DIGIT.helperNumeral.isBefore) {
            composedNumerals += helperNumeral + repeatedNumeral

        } else {
            composedNumerals += repeatedNumeral + helperNumeral
        }
    } else {
        composedNumerals += repeatedNumeral
    }

    return composedNumerals
}

/**
 * Translates a single numeral to a decimal value and marks if the next numeral numeral should be skipped.
 * 
 * @param {string} numeral the numeral to translate
 * @param {string} nextNumeral the subsequent numeral in the array, which might be a helper numeral
 * @example ('I', 'V') : {value: 4, isSuffixed: true}
 */
function translateNumeral (numeral, nextNumeral) {

    const TRANSLATION = {value: null, isSuffixed: false}

    NUMERALS.forEach(NUMERAL => {

        if (numeral === NUMERAL.numeral) {

            for (const type in NUMERAL.helperNumerals) {

                if (NUMERAL.helperNumerals[type].numeral === nextNumeral) {
                    TRANSLATION.value = NUMERAL.value * NUMERAL.helperNumerals[type].multiplier
                    TRANSLATION.isSuffixed = true
                }
            }

            if (!TRANSLATION.isSuffixed) {
                TRANSLATION.value = NUMERAL.value
            }
        }
    })

    return TRANSLATION
}

/**
 * Returns a string of the same repeated numeral
 * 
 * @param {string} numeral 
 * @param {number} repetitions 
 * @returns {string}
 * @example ('X', 3) : 'XXX'
 */
function repeatNumeral (numeral, repetitions) {
    let numerals = ''
    for (let i = 0; i < repetitions; i++) {
        numerals += numeral
    }

    return numerals
}
