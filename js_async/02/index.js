const box = document.getElementById('box');
const leftLine = document.querySelector('.line-left');
const rightLine = document.querySelector('.line-right');
const topLine = document.querySelector('.line-top');

document.body.addEventListener('mousedown', startMoving);

let movingInterval;

//-----SETTINGS---------
const monitorRefreshRate = 60;
const speed = 3;
const boxSize = 101; //Minimum 100
//-----SETTINGS ^-------

let isLeftReached = () => {
    return (box.offsetLeft <= leftLine.offsetLeft && leftLine.offsetLeft <= box.offsetLeft + box.offsetWidth) &&
        ((box.offsetTop < leftLine.offsetTop && box.offsetTop + box.offsetHeight >= leftLine.offsetTop) ||
            (box.offsetTop <= leftLine.offsetTop + leftLine.offsetHeight && box.offsetTop + box.offsetHeight > leftLine.offsetTop + leftLine.offsetHeight));
};
let isRightReached = () => {
    return (box.offsetLeft <= rightLine.offsetLeft && rightLine.offsetLeft <= box.offsetLeft + box.offsetWidth) &&
        ((box.offsetTop < rightLine.offsetTop && box.offsetTop + box.offsetHeight >= rightLine.offsetTop) ||
            (box.offsetTop <= rightLine.offsetTop + rightLine.offsetHeight && box.offsetTop + box.offsetHeight > rightLine.offsetTop + rightLine.offsetHeight));
};
let isTopReached = () => {
    return (box.offsetTop <= topLine.offsetTop && box.offsetTop + box.offsetHeight >= topLine.offsetTop) &&
        ((box.offsetLeft <= topLine.offsetLeft + topLine.offsetWidth && box.offsetLeft + box.offsetWidth >= topLine.offsetLeft + topLine.offsetWidth) ||
            (box.offsetLeft <= topLine.offsetLeft && box.offsetLeft + box.offsetWidth >= topLine.offsetLeft));
};



function start() {
    if (isLeftReached() || isRightReached() || isTopReached()) {
        clearInterval(movingInterval);
        clearInterval(myGameLoop);
        document.body.removeEventListener('mousedown', startMoving);



        let reached;
        if (isLeftReached()) {
            reached = 'left';
        }
        if (isRightReached()) {
            reached = 'right';
        }
        if (isTopReached()) {
            reached = 'top';
        }



        const customEv = new CustomEvent('onEnd', {
            detail: {
                reached
            }
        });

        box.addEventListener('onEnd', (ev) => {
            alert(ev.detail.reached);
        });

        box.dispatchEvent(customEv);



    }
}
const myGameLoop = setInterval(start, 1000 / monitorRefreshRate);




function startMoving(ev) {
    if (ev.target.className.includes('arrow-left')) {
        clearInterval(movingInterval);
        movingInterval = setInterval(moveBoxLeft, 1000 / monitorRefreshRate);
    }
    if (ev.target.className.includes('arrow-right')) {
        clearInterval(movingInterval);
        movingInterval = setInterval(moveBoxRight, 1000 / monitorRefreshRate);
    }
    if (ev.target.className.includes('arrow-up')) {
        clearInterval(movingInterval);
        movingInterval = setInterval(moveBoxUp, 1000 / monitorRefreshRate);
    }
    if (ev.target.className.includes('arrow-down')) {
        clearInterval(movingInterval);
        movingInterval = setInterval(moveBoxDw, 1000 / monitorRefreshRate);
    }
}

function moveBoxLeft() {
    box.style.left = `${box.offsetLeft - speed}px`;
}
function moveBoxRight() {
    box.style.left = `${box.offsetLeft + speed}px`;
}
function moveBoxUp() {
    box.style.top = `${box.offsetTop - speed}px`;
}
function moveBoxDw() {
    box.style.top = `${box.offsetTop + speed}px`;
}

//----EXTRAS---
box.style.width = boxSize + 'px';
box.style.height = boxSize + 'px';
box.style.top = `${window.innerHeight / 2 - boxSize / 2}px`;
box.style.right = `${window.innerWidth / 2 - boxSize / 2}px`;
