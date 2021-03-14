const page = document.getElementById('page');

const myEl1 = document.createElement('p');
myEl1.textContent = 'My paragraph 1';
const myEl2 = document.createElement('p');
myEl2.textContent = 'My paragraph 2';

// ●	Use the appendChild method to add a node.
page.appendChild(myEl1);
// ●	Use the insertBefore method to add a node.
page.insertBefore(myEl2, myEl1);
// ●	Use the removeChild method to remove a node.
page.removeChild(myEl2);
// ●	Use the replaceChild method to replace a node.
page.replaceChild(myEl2, myEl1);
