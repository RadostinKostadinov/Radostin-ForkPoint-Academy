/* 2.	
Напишете регулярен израз, който да валидира парола. 
Паролата може да съдържа малки, големи букви, цифри, специални символи и шпация и да е между 8 и 64 символа.
Бонус условие: Да се провери и че в паролата има поне една малка буква, поне една голяма буква и поне една цифра.
*/

const validInput = 'aaAA11#$ ';
const invalidInput = 'aa11#$';

function validatePassword(string) {
    const pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([\w\W]){8,16}$/gm;
    return pattern.test(string);
}

console.log(validatePassword(validInput));
console.log(validatePassword(invalidInput));