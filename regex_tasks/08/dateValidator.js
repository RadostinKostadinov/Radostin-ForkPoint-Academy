/* 
9.	Да се валидира дата. Валидацията трябва да следва формата yyyyMMdd като се взема предвид, 
че януари, март, май и т.н. имат 31 дни, февруари - 29, април, юни и т.н. 30.
Бонус условие: Да се направи валидация и за месец февруари в зависимост от това дали годината е високосна или не. 
*/

function validateDate(number) {
    number = +number;
    if (Number.isNaN(number)) {
        throw Error('Input should be of type "number".');
    }

    const pattern = /^(?<year>\d{4})(?<month>(?:(?=0)(?:0[1-9])|(1[0-2])))(?<day>(?:(?:(?<=....(?:01|03|05|07|08|10|12))(?:(?:0[1-9])|(?:[1-2][0-9])|(?:3[0-1])))|(?:(?<=....(04|06|09|11))((0[1-9])|([1-2][0-9])|(30))))|(?:(?:(?<=02)(?:((?<=(...)(0|2|4|6|8)(..))((0[1-9])|(1[0-9])|(2[0-9])))|(?:(?<=(?:...)(?:1|3|5|7|9)(?:..))(?:(0[1-9])|(?:1[0-9])|(?:2[0-8])))))))$/m;

    let isValid = pattern.test(number);

    const matched = number.toString().match(pattern);
    if (matched == null) {
        return isValid;
    }

    const [year, month, day] = Object.values(matched.groups).map(r => Number(r));

    if (month == 2 && day == 29) {
        isValid = (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
    }

    return isValid;
}

console.log(validateDate(20180229));
