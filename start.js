const utils = require('./utils.js')
const numerals = require('./numerals.js')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const ESCAPE_INPUTS = utils.getEscapeInputs()
const HELP_INPUTS = utils.getHelpInputs()
/**
 * Requests input from the user and prints an ouput.
 */
function requestInput(showIntro = true) {
    readline.question(utils.getPrompt(showIntro), input => {

        if (ESCAPE_INPUTS.includes(input)) {
            readline.close()

            return
        }

        if (HELP_INPUTS.includes(input)) {
            console.info(utils.getHelpText())
        } else {
            const output = numerals.getConvertedValue(input)
            console.info(`${utils.styleInput(input)} -> ${utils.styleOutput(output)}`)
        }
        requestInput(false)
    })
}

requestInput()