import * as utils from './utils.js'
import { getConvertedValue } from './numeralService.js'

import readline from 'readline'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const ESCAPE_INPUTS = utils.ESCAPE_INPUTS
const HELP_INPUTS = utils.HELP_INPUTS
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
            console.info(`${utils.styleInput(input)} -> ${utils.styleOutput(output)}`)
        }
        requestInput(false)
    })
}

requestInput()