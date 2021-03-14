const body = document.querySelector('body');

[...document.querySelectorAll('span')].forEach(span => {
    span.addEventListener('mouseenter', addHighlight);
    span.addEventListener('mouseleave', removeHighlight);
});

function addHighlight(ev) {
    this.style.textDecoration = 'underline';
    this.style.fontSize = '2rem';
}
function removeHighlight(ev) {
    this.style.textDecoration = 'none';
    this.style.fontSize = '1rem';
}
