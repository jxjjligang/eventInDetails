let draggedElem;
body.addEventListener('mousemove', onBodyMousemove);

body.onmousedown = function (event) {
    event.preventDefault();
    if (!event.target.classList.contains('draggable') || !event.target)
        return;

    if (!draggedElem || (draggedElem.target !== event.target)) {
        let rect = event.target.getBoundingClientRect();
        draggedElem = {
            target: event.target,
            shiftX: event.clientX - rect.x,
            shiftY: event.clientY - rect.y
        }
        console.log(draggedElem);
    }
}

function onBodyMousemove(event) {
    if (!draggedElem || event.target !== draggedElem.target)
        return;

    if (event.clientY < 0 || event.clientY > window.innerHeight)
        console.log(`mousemove clientY:${event.clientY}`);

    draggedElem.target.style.position = 'absolute';
    draggedElem.target.style.left = (event.clientX - draggedElem.shiftX + window.pageXOffset) + 'px';

    let yScrollBy = 0;
    let newTop = event.clientY - draggedElem.shiftY;
    if (newTop < 0) {
        console.log(`newTop:${newTop}, elementTop:${window.pageYOffset}px`);
        newTop = 0;
        yScrollBy = -10;
    }
    else if (newTop + event.target.offsetHeight > (window.innerHeight)) {
        newTop = window.innerHeight - event.target.offsetHeight;
        yScrollBy = 10;
    }

    draggedElem.target.style.top = (newTop + window.pageYOffset) + 'px';
    if (yScrollBy !== 0)
        window.scrollBy(0, yScrollBy);
}

body.onmouseup = function (event) {
    draggedElem = undefined;
}

body.onmouseout = function (event) {
    if (event.target !== body)
        return;

    if (!event.target.contains(event.relatedTarget)) {
        draggedElem = null;
        // console.log(event);
    }
}