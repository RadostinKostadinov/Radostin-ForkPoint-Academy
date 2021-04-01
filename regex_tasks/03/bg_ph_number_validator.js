/* 
3.	Напишете регулярен израз, който да валидира телефонен номер. 
Валидни телефони трябва да започват или със код +359 или 0, а телефонът да има поне 6 цифри и максимум 9. 

+359888123456	029881234	+35982502010   0878136033 
*/

const validInput = '+359888123456';
const invalidInput = '+000000000';

function validateBGphNumber(string) {
    const pattern = /^(\+359|0){1}\d{6,9}$/gm;
    return pattern.test(string);
}

console.log(validateBGphNumber(validInput));
console.log(validateBGphNumber(invalidInput));