
const MAX_DECIMAL_VALUE = 3999
const ILLEGAL_ROMAN_NUMERAL_VALUE = 'MMMM'
const VALID_ROMAN_NUMERALS = new RegExp(/^[M,D,C,L,X,V,I]+$/g)
const RANGE_ERROR = 'Cannot convert values greater than 3999.'
const VALUE_ERROR = 'Invalid value.'
const ESCAPE_INPUTS = ['q', 'Q']
const HELP_INPUTS = ['h', 'H']

function getMaxDecimalValue() {
    return MAX_DECIMAL_VALUE
}

function getIllegalRomanNumeralValue() {
    return ILLEGAL_ROMAN_NUMERAL_VALUE
}

function getValidRomanNumerals() {
    return VALID_ROMAN_NUMERALS
}

function getRangeError() {
    return RANGE_ERROR
}

function getValueError() {
    return VALUE_ERROR
}

function getEscapeInputs() {
    return ESCAPE_INPUTS
}

function getHelpInputs() {
    return HELP_INPUTS
}

function styleInput(input) {

    const number = parseInt(input)

    if (number) {

        return `\x1b[93m${number}\x1b[0m`
    }

    return `\x1b[93m${input.toUpperCase()}\x1b[0m`
}

function styleOutput(output) {

    if (output === RANGE_ERROR || output === VALUE_ERROR) {

        return `\x1b[91m${output}\x1b[0m\n`
    }

    return `\x1b[92m${output}\x1b[0m\n`
}

function getHelpText() {

    const helpText = [
        '\n\x1b[93m1\x1b[0m-\x1b[93m3999\x1b[0m -> Get Roman numeral equivalent\n',
        '\x1b[93mI\x1b[0m-\x1b[93mMMMCMXCIX\x1b[0m -> Get decimal equivalent\n',
        '\x1b[93mq\x1b[0m -> Quit\n',
        '\x1b[93mh\x1b[0m -> Help\n',
    ]

    return helpText.reduce((acc, line) => acc + line)
}

function getPrompt(showIntro = true) {

    const prompt = ': '
    const introText = [
        '\n\x1b[32m ## Roman Numeral Converter ##\x1b[0m\n',
        '     -Functional Edition-\n',
        '\n TIP: type \x1b[93mh\x1b[0m for help.\n',
        `\n${prompt}`
    ]

    if (showIntro) {

        return introText.reduce((acc, line) => acc + line)
    }

    return prompt
}

module.exports = {
    getMaxDecimalValue,
    getIllegalRomanNumeralValue,
    getValidRomanNumerals,
    getRangeError,
    getValueError,
    styleInput,
    styleOutput,
    getHelpText,
    getPrompt,
    getEscapeInputs,
    getHelpInputs,
}