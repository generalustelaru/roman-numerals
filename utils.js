
/**
 * Returns the input text, colorized and to uppercase.
 * 
 * @param {*} input 
 * @returns string
 */
export function styleInput(input) {

    const number = parseInt(input)

    if (number) {

        return `\x1b[93m${number}\x1b[0m`
    }

    return `\x1b[93m${input.toUpperCase()}\x1b[0m`
}

export function styleOutput(output, IsError = false) {

    if (IsError) {

        return `\x1b[91m${output}\x1b[0m\n`
    }

    return `\x1b[92m${output}\x1b[0m\n`
}

export function getHelpText() {

    const helpText = [
        '\n\x1b[93m1\x1b[0m-\x1b[93m3999\x1b[0m -> Get Roman numeral equivalent\n',
        '\x1b[93mI\x1b[0m-\x1b[93mMMMCMXCIX\x1b[0m -> Get decimal equivalent\n',
        '\x1b[93mq\x1b[0m -> Quit\n',
        '\x1b[93mh\x1b[0m -> Help\n',
    ]

    return helpText.reduce((acc, line) => acc + line)
}

export function getPrompt(showIntro = true) {

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