/* 
7.	Да се валидира IP адрес. IP адресът се състои от 4 секции от числа от 0 до 255. 

Пример:
a.	0.0.0.0
b.	8.8.8.8
c.	192.168.0.1
d.	255.255.255.255
 */

function validateIP(string){
    const pattern = /^(?<ip>(2[0-5][0-5]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.(2[0-5][0-5]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.(2[0-5][0-5]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.(2[0-5][0-5]|1[0-9][0-9]|[0-9][0-9]|[0-9]))$/m;
    return pattern.test(string);
}

console.log(validateIP('0.0.0.0'));
console.log(validateIP('8.8.8.8'));
console.log(validateIP('192.168.0.1'));
console.log(validateIP('255.255.255.255'));
console.log(validateIP('255.255.255.257'));