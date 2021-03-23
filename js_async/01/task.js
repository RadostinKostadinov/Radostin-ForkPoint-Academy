const validInputArr = ['banana', 'orange', 'apple', 'kiwi'];
const invalidInputArr = ['banana', 'orange', 'apple', 'kiwi', 123];

function capitalize(arr) {
    return new Promise((resolve, reject) => {
        const capitalized = arr.map(el => {
            if (typeof el == 'string') {
                return el = el[0].toUpperCase() + el.slice(1);
            } else {
                reject(new Error('Invalid element type...(only strings allowed).'));
            }
        });
        resolve(capitalized);
    });
}

function sortWords(arr) {
    return new Promise(resolve => {
        arr.sort((a, b) => a.localeCompare(b));
        resolve(arr);
    });
}

async function go() {
    try {
        const capitalizedArr = await capitalize(invalidInputArr);
        const sortedArr = await sortWords(capitalizedArr);
        console.log(sortedArr);
    } catch (err) {
        console.log(err.message);
    }
}

go();