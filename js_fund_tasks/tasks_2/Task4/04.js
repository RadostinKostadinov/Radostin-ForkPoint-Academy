document.querySelector('[type=button]').addEventListener('click', insertRow);
const table = document.querySelector('#sampleTable');

function insertRow(ev) {
    ev.preventDefault();
    const currRows = table.rows.length;

    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = `Row${currRows + 1} cell1`;
    tr.appendChild(td1);
    const td2 = document.createElement('td');
    td2.textContent = `Row${currRows + 1} cell2`;
    tr.appendChild(td2);

    table.appendChild(tr);
}
