const body = document.querySelector('body');
document.querySelector('button').addEventListener('click', getInfo);
const link = document.getElementById('w3r');

function getInfo(ev) {
    ev.preventDefault();
    console.log('asd');
    const div = document.createElement('div');
    const pHref = document.createElement('p');
    const pHreflang = document.createElement('p');
    const pRel = document.createElement('p');
    const pTarget = document.createElement('p');
    const pType = document.createElement('p');

    pHref.textContent = `href = ${link.href}`;
    pHreflang.textContent = `hreflang = ${link.hreflang}`;
    pRel.textContent = `rel = ${link.rel}`;
    pTarget.textContent = `target = ${link.target}`;
    pType.textContent = `type = ${link.type}`;

    div.append(pHref, pHreflang, pRel, pTarget, pType);
    body.appendChild(div);
}