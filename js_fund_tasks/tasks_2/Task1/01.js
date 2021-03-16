//get elements
const body = document.querySelector('body');
const spans = [...document.querySelectorAll('span')];

// ●	Change the body style so it has a font-family of "Arial, sans-serif".
body.style.fontFamily = 'Arial, sans-serif';

// ●	Replace each of the spans (nickname, favorites, hometown) with your own information.
spans[0].textContent = 'Radostin';
spans[1].textContent = 'Eating, Sleeping and Repeating';
spans[2].textContent = 'Byala';

// ●	Iterate through each li and change the class to "listitem".
for (const span of spans) {
    span.parentNode.setAttribute('class', 'listitem');
}

// ●	Create a new img element and set its src attribute to a picture of you. Append that element to the page.
const photoOfMe = document.createElement('img');
photoOfMe.src = 'https://www.bostonherald.com/wp-content/uploads/2020/05/GettyImages-824860820.jpg?w=863';
body.appendChild(photoOfMe);
