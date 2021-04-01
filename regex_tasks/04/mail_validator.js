// 4.	Напишете регулярен израз, който да валидира email адрес. 
// Адресът трябва да позволява букви, цифри, долна черта, точка и знакът плюс преди @ и валиден домейн след @. 
// Домейнът задължително трябва да завършва с точка последвана от поне 2 букви: 
// Пример: john_smith@example.info, test001+simple@gmail.com, ivan.petrov@abv.bg, my_unique_mail.01+comment@sub.domain.example.com и т.н.


const validInput = 'my_unique_mail.01+comment@sub.domain.example.com';
const invalidInput = 'myMail@abv';

function validateMail(string){
    const pattern = /^([\w.+]+)@[\w.]+\.\w{2,}$/gm;
    return pattern.test(string);
}   

console.log(validateMail(validInput));
console.log(validateMail(invalidInput));

