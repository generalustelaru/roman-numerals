import * as utils from './utils.js'
import { ESCAPE_INPUTS, HELP_INPUTS, RANGE_ERROR, VALUE_ERROR } from './constants.js'
import { getConvertedValue } from './numeralService.js'

import readline from 'readline'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/**
 * Requests input from the user and prints an ouput.
 */
function requestInput(showIntro = true) {
    rl.question(utils.getPrompt(showIntro), input => {

        if (ESCAPE_INPUTS.includes(input)) {
            rl.close()

            return
        }

        if (HELP_INPUTS.includes(input)) {

            console.info(utils.getHelpText())
        } else {
            const output = getConvertedValue(input)
            const isError = output === RANGE_ERROR || output === VALUE_ERROR

            console.info(`${utils.styleInput(input)} -> ${utils.styleOutput(output, isError)}`)
        }
        requestInput(false)
    })
}

requestInput()