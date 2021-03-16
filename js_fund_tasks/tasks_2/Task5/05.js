document.querySelector('form').addEventListener('submit', calc);
const radius = document.getElementById('radius');
const volume = document.getElementById('volume');

function calc(ev) {
    ev.preventDefault();
    volume.value = 4 / 3 * Math.PI * Math.pow(Number(radius.value), 3);
}