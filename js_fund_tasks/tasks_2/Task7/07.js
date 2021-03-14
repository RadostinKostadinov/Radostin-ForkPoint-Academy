const h = document.getElementById('height');
const w = document.getElementById('width');
window.addEventListener('load', getSize);
window.addEventListener('resize', getSize);

function getSize() {
    h.textContent = window.innerHeight;
    w.textContent = window.innerWidth;
}
