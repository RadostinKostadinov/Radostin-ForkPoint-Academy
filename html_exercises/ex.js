const divEx3 = document.getElementById('ex3');

for (let i = 1; i <= 20; i++) {
    divEx3.innerHTML += `${i}<sup>2</sup> = ${i ** 2} <br>`;
}