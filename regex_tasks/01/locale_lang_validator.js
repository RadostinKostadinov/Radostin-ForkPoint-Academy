/* valid inputs: fr, en_US, bg_BG, en_UK, de, de_SW. */

const validInput = 'en_US';
const invalidInput = 'france';

function validateLocLang(string) {
    const pattern = /^(?<lang>[a-z]{2})(?<country>_[A-Z]{2})?$/gm;
    return pattern.test(string);
}

console.log(validateLocLang(validInput));
console.log(validateLocLang(invalidInput));
