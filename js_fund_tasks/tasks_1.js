// 1.	Write a JavaScript program to find the 
// larger number from the two given positive integers, the two numbers are in the range [40;60] inclusive.

function max(numberOne, numberTwo) {
    numberOne = +numberOne;
    numberTwo = +numberTwo;

    if (40 > numberOne || numberOne > 60 ||
        40 > numberTwo || numberTwo > 60) {
        throw Error('Numbers not in range (40-60).');
    }

    return numberOne > numberTwo ? numberOne : numberTwo;
}

// 2.	Write a JavaScript program to compute the sum of three elements of a given array of integers of length 3.

function sumThreeLenghtArr(array) {
    const [...myArr] = array;
    let sum = 0;

    if (myArr.length != 3) {
        throw Error('Invalid array length.');
    }

    myArr.forEach(el => {
        if (typeof el != 'number') {
            throw Error('Array contains invalid element.');
        }
        sum += el;
    });

    return sum;
}

// 3.	Write a JavaScript function that reverse a number.

function reverseNumber(number) {
    if (typeof number == 'number') {
        number += '';
        let reversed = '';
        for (let i = number.length - 1; i >= 0; i--) {
            reversed += number[i];
        }
        return +reversed;
    } else {
        throw Error('Input isn\'t a number.');
    }
}

// 4.	Write a JavaScript function to compute the factors of a positive integer.

function computeFactors(number) {
    const factors = [];
    for (let i = number; i >= -number; i--) {
        if (number % i == 0) {
            factors.push(i);
        }
    }
    return factors.join(',');
}

// 5.	Write a JavaScript program to swap pairs of adjacent digits of a given integer of even length.

function swapAdjacentDigits(number) {
    number += '';
    if (number.length % 2 != 0) {
        throw Error('The integer length isn\'t even.');
    }
    for (let i = 0; i < number.length; i += 2) {
        const a = number[i];
        number = number.slice(0, i) + number[i + 1] + number.slice(i + 1);
        number = number.slice(0, i + 1) + a + number.slice(i + 2);
    }
    return number;
}

// 6.	Write a JavaScript conditional statement to find the largest of five numbers. Display an alert box to show the result.

function findLargest(...numbers) {
    alert(Math.max(...numbers));
    // return Math.max(...numbers);
}

// 7.	Write a simple JavaScript program to join all elements of the following array into a string.

function joinRedefine(array, separator) {
    const [...myArr] = array;
    let str = '';

    for (let i = 0; i < myArr.length; i++) {
        if (i < myArr.length - 1) {
            str += myArr[i] + separator;
        } else {
            str += myArr[i];
        }
    }

    return str;
}

// 8.	Write a JavaScript function to check whether an `input` is an array or not.

function isArrayCheck(input) {
    return Array.isArray(input);
}
// 9.	Write a JavaScript function to get the greatest common divisor (gcd) of two integers.

function gcd(a, b) {
    while (b != 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

// 10.	Write a JavaScript program to list the properties of a JavaScript object.

function showKeys(object) {
    return Object.keys(object).join(',');
}

// 11.	Write a JavaScript function to strip leading and trailing spaces from a string.

function trimRedefine(string) {
    let myStr = string;
    const regexTrim = new RegExp(/^\s*(\S(.*\S)?)\s*$/, 'gm');

    const match = regexTrim.exec(myStr);

    return match[1];

}

// 12.	Write a JavaScript function to remove the first occurrence of a given 'search string' from a string.

function removeFromStr(string, remove) {
    let index = string.indexOf(remove);

    string = string.slice(0, index) + string.slice(index + remove.length);

    return string;
}

// 13.	Write a JavaScript function to find a word within a string.

function isContain(string, word) {
    if (string.indexOf(word) != -1) {
        return true;
    }
    return false;
}

// 14.	Write a JavaScript function to remove HTML/XML tags from string.

function strip_html_tags(string) {
    const myStr = string;

    let myRegEx = new RegExp(/>([\w\s]+)</, 'gm');

    const match = myRegEx.exec(myStr);

    return match[1];
}

// 15.	Write a JavaScript function to test whether a string ends with a specified string.

function isEndsWith(string, end) {
    if (string.endsWith(end)) {
        return true;
    }
    return false;
}

// 16.	Write a JavaScript program to get the length of an JavaScript object.

function lengthOfObject(object) {
    return Object.keys(object).length;
}

// 17.	Write a JavaScript function to get the first element of an array. Passing a parameter 'n' will return the first 'n' elements of the array.

function getEl(array, n) {
    if (n == null) {
        return array[0];
    }
    return array.slice(0, n).join(' ');
}

// 18.	Write a JavaScript program to find the most frequent item of an array.

function mostFrequentItem(array) {
    const [...myArr] = array;

    let last = 0;
    let lastIndex = -1;
    for (let i = 0; i < myArr.length; i++) {
        let current = 0;
        for (let k = 0; k < myArr.length; k++) {
            if (myArr[k] == myArr[i]) {
                current++;
            }
        }
        if (current > last) {
            last = current;
            lastIndex = i;
        }
    }
    console.log(`Most frequent item: ${myArr[lastIndex]} -> ${last} times.`);
}

// 19.	Write a JavaScript program which iterates the integers from 1 to 100. But for divisible numbers of three print "Fizz" instead of the number and for the divisible numbers of five print "Buzz". For divisible numbers of both three and five print "FizzBuzz".

function FizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        let printLn = '';
        if (i % 3 == 0) {
            printLn += 'Fizz';
        }
        if (i % 5 == 0) {
            printLn += 'Buzz';
        }
        if (printLn != '') {
            console.log(printLn);
        }
    }
}

// 20.	Write a JavaScript for loop that will iterate from 0 to 15. For each iteration, it will check if the current number is odd or even, and display a message to the screen.

function oddEven() {
    for (let i = 0; i <= 15; i++) {
        if (i % 2 == 0) {
            console.log(`${i} is even`);
        } else {
            console.log(`${i} is odd`);
        }
    }
}

// 21.	According to Wikipedia a happy number is defined by the following process: "Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers, while those that do not end in 1 are unhappy numbers (or sad numbers)". Write a JavaScript program to find and print the first 5 happy numbers.

function isHappyNumber(number) {
    let max = 30; //maximum times to repeat the loop (preventing infinite loop).
    let currentNumber = +number;
    let isHappyNumber = false;
    for (let i = 0; i < max; i++) {
        currentNumber = getDigits(currentNumber)
            .reduce((acc, curr) => {
                return acc += curr * curr;
            }, 0);
        if (currentNumber == 1) {
            isHappyNumber = true;
            break;
        }
    }

    if (isHappyNumber) {
        console.log(`${number} is Happy number.`);
    } else {
        console.log(`${number} isn't Happy number.`);
    }


    function getDigits(number) {
        number += '';
        const digits = [];
        for (let i = 0; i < number.length; i++) {
            digits.push(Number(number[i]));
        }
        return digits;
    }
}

// 22.	You’re given 2 out of 3 angles in a triangle (in degrees). Write a function that classifies the missing angle as either “acute”, “right” or “obtuse” based on its degrees:
// ●	An acute angle is one smaller than 90 degrees.
// ●	A right angle is one that is exactly 90 degrees.
// ●	An obtuse angle is one greater than 90 degrees (but smaller than 180 degrees).


function findThirdAngleOfTriangle(angleOne, angleTwo) {
    let degrees = 180 - angleOne - angleTwo;
    degrees < 90 ? console.log('acute') : degrees > 90 ? console.log('obtuse') : console.log('right');
}


