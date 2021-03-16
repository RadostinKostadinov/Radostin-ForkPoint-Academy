let page = document.getElementById('page');

//    ●	Use the firstChild property to access an element.
let header = page.firstChild;
header = header.nextSibling;

// ●	Use the lastChild property to access an element.
let content = page.lastChild;

// ●	Use the nextSibling property to access an element.
content = header.nextSibling.nextSibling;

// ●	Use the previousSibling property to access an element.
header = content.previousSibling.previousSibling;


// ●	Use the parentNode property to access an element.
page = header.parentNode;
page = content.parentNode;

// ●	Use the childNodes property to access a group of child elements.
[, header, , content] = [...page.childNodes];


console.log('page');
console.log(page);

console.log('header');
console.log(header);

console.log('content');
console.log(content);