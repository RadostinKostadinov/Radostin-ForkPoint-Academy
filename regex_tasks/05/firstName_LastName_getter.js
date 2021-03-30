/* 
5.Напишете регулярен израз, който да извлече собственото и фамилното име и да го изпише във формат "Фамилия, Собствено". Пример:
a.	Иван Петров Димитров - Димитров, Иван
b.	Стоян М. Георгиев - Георгиев, Стоян
c.	Георги Стоянов - Стоянов, Георги
d.	Ана-Мария Димитрова Петкова - Петкова, Ана-Мария 
*/

const validInput = 'Георги Стоянов - Стоянов, Георги';

function fnLnGetter(string) {
    const pattern = /(?<fn>[\p{L}\p{N}_-]+)(?<sn> [\p{L}\p{N}_]+\.?)? (?<fam>[\p{L}\p{N}_]+)/mu;
    const match = string.match(pattern);
    console.log(match[3] + ', ' + match[1]); 
}

fnLnGetter(validInput);
