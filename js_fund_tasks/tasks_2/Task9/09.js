let page = document.getElementById('title').firstChild;

// ●	Retrieve the value of a node using nodeValue.
console.log(page.nodeValue);

// ●	Change the value of a node using nodeValue.
page.nodeValue = 'Changed with nodeValue method';


page = page.parentNode;
// ●	Retrieve the value of a node attribute.
console.log(page.getAttributeNode('id').value);

// ●	Change the value of a node attribute.
page.getAttributeNode('id').value = 'changed';


