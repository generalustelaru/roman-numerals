/**
 * @fileoverview Contains functions to convert Roman Numerals to decimal values and vice versa.
 */

const utils = require('./utils.js')
const rules = require('./numeralRules.js')

const MAX_DECIMAL_VALUE = utils.getMaxDecimalValue()
const ILLEGAL_ROMAN_NUMERAL_VALUE = utils.getIllegalRomanNumeralValue()
const VALID_ROMAN_NUMERALS = utils.getValidRomanNumerals()
const RANGE_ERROR = utils.getRangeError()
const VALUE_ERROR = utils.getValueError()
const DIGITS = rules.getDigits()
const NUMERALS = rules.getNumerals()

/**
 * Determines the return value of a regular input
 * @param {string} input
 * @example ('XIV') : '14'
 * @example ('14') : 'XIV'
 * @example ('XIVX') : 'Invalid value.'
 */
function getConvertedValue(input) {

    const toDecimalResult = romanToDecimal(input)
    const toRomanResult = decimalToRoman(input)

    if (toDecimalResult !== VALUE_ERROR && toDecimalResult !== RANGE_ERROR) {

        return toDecimalResult
    }

    if (toRomanResult !== VALUE_ERROR && toRomanResult !== RANGE_ERROR) {

        return toRomanResult
    }

    if (toDecimalResult === RANGE_ERROR || toRomanResult === RANGE_ERROR) {

        return RANGE_ERROR
    }

    return VALUE_ERROR
}

/**
 * Converts a Roman Numeral to a number
 * @example ('XIV') : 14
 */
function romanToDecimal(input) {

    romanNumerals = input.toUpperCase()

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
            const result = translateNumeral(numeral, numeralArray[index + 1])
            
            if (result.isSuffixed) {
                shouldSkipNext = true
            }
            accumulator += result.value
        }
    })

    if (decimalToRoman(accumulator) !== romanNumerals) {
        return VALUE_ERROR
    }

    return accumulator
}

/**
 * Converts a number to Roman Numerals
 * 
 * @example (14) : 'XIV'
 */
function decimalToRoman(input) {

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
    
        if(NUMERAL.isPowerOfTen) {
            const frontDigits = Math.floor(reduceable / NUMERAL.value)
            DIGITS.forEach(DIGIT => {

                if (frontDigits === DIGIT.digits) {
                    const repeatedNumeral = repeatNumeral(NUMERAL.numeral, DIGIT.repetitions)

                    if (DIGIT.helperNumeral) {
                        const helperNumeral = NUMERAL.helperNumerals[DIGIT.helperNumeral.type].numeral

                        if (DIGIT.helperNumeral.isBefore) {
                            numeralString += helperNumeral + repeatedNumeral

                        } else {
                            numeralString += repeatedNumeral + helperNumeral
                        }
                    } else {
                        numeralString += repeatedNumeral
                    }
                }
            })
            reduceable -= frontDigits * NUMERAL.value
        }
    })

    return numeralString
}

/**
 * Translates a single numeral to a decimal value and marks if the next numeral numeral should be skipped.
 * @param {string} numeral the numeral to translate
 * @param {string} nextNumeral the subsequent numeral in the array, which might be a helper numeral
 * @example ('I', 'V') : {value: 4, isSuffixed: true}
 */
function translateNumeral (numeral, nextNumeral) {

    const translation = {value: null, isSuffixed: false}

    NUMERALS.forEach(NUMERAL => {

        if (numeral === NUMERAL.numeral) {

            for (const type in NUMERAL.helperNumerals) {

                if (NUMERAL.helperNumerals[type].numeral === nextNumeral) {
                    translation.value = NUMERAL.value * NUMERAL.helperNumerals[type].multiplier
                    translation.isSuffixed = true
                }
            }

            if (!translation.isSuffixed) {
                translation.value = NUMERAL.value
            }
        }
    })

    return translation
}

/**
 * Returns a string of the same repeated numeral
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

module.exports = {
    decimalToRoman: decimalToRoman,
    romanToDecimal: romanToDecimal,
    getConvertedValue: getConvertedValue,
}