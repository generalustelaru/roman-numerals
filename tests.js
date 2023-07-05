
import * as numeralService from './numeralService.js'
import { RANGE_ERROR, VALUE_ERROR } from './constants.js'

let testCount = 0
let passedCount = 0
let failedCount = 0

const shouldPrintEachTest = true

function test_getConvertedValue() {
    const testCases = [
        { input: '1', expected: 'I' },
        { input: '2', expected: 'II' },
        { input: '3', expected: 'III' },
        { input: '4', expected: 'IV' },
        { input: '5', expected: 'V' },
        { input: '6', expected: 'VI' },
        { input: '7', expected: 'VII' },
        { input: '8', expected: 'VIII' },
        { input: '9', expected: 'IX' },
        { input: '10', expected: 'X' },
        { input: '11', expected: 'XI' },
        { input: '14', expected: 'XIV' },
        { input: '15', expected: 'XV' },
        { input: '16', expected: 'XVI' },
        { input: '17', expected: 'XVII' },
        { input: '19', expected: 'XIX' },
        { input: '100', expected: 'C' },
        { input: '499', expected: 'CDXCIX' },
        { input: '500', expected: 'D' },
        { input: '1000', expected: 'M' },
        { input: '3999', expected: 'MMMCMXCIX' },
        { input: '4000', expected: RANGE_ERROR },
        { input: 'a', expected: VALUE_ERROR },
        { input: 'a', expected: VALUE_ERROR },
        { input: 'I', expected: 1 },
        { input: 'Ii', expected: 2 },
        { input: 'III', expected: 3 },
        { input: 'IV', expected: 4 },
        { input: 'V', expected: 5 },
        { input: 'VI', expected: 6 },
        { input: 'VII', expected: 7 },
        { input: 'VIiI', expected: 8 },
        { input: 'IX', expected: 9 },
        { input: 'X', expected: 10 },
        { input: 'XI', expected: 11 },
        { input: 'XIV', expected: 14 },
        { input: 'XV', expected: 15 },
        { input: 'XvI', expected: 16 },
        { input: 'XVII', expected: 17 },
        { input: 'XX', expected: 20 },
        { input: 'c', expected: 100 },
        { input: 'CDXCIX', expected: 499 },
        { input: 'D', expected: 500 },
        { input: 'M', expected: 1000 },
        { input: 'MMMCMXCIX', expected: 3999 },
        { input: 'MMMMCCVII', expected: RANGE_ERROR },
        { input: 'a', expected: VALUE_ERROR },
        { input: '%', expected: VALUE_ERROR },
        { input: 'IM', expected: VALUE_ERROR },
        { input: 'IC', expected: VALUE_ERROR },
        { input: 'XD', expected: VALUE_ERROR },
    ]
    testCases.forEach(testCase => {
        testCount++
        const result = numeralService.getConvertedValue(testCase.input, true)
        if (result === testCase.expected) {
            passedCount++
            if (shouldPrintEachTest)
                console.log(`\x1b[92mTest Passed:\x1b[0m ${testCase.input} => ${testCase.expected}`)
        } else {
            failedCount++
            if (shouldPrintEachTest)
                console.log(`\x1b[91mTest Failed: ${testCase.input} => ${result} != ${testCase.expected}\x1b[0m`)
        }
    })
}

test_getConvertedValue()

console.log(`\x1b[93m${testCount}\x1b[0m tests run.`)
console.log((failedCount === 0 ? `\x1b[92m${failedCount}\x1b[0m` : `\x1b[91m${failedCount}\x1b[0m`) + ' failed.')
