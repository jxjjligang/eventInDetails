let draggedElem;

body.onmousedown = function (event) {
    event.preventDefault();
    if (!event.target.classList.contains('draggable') || !event.target)
        return;

    if (!draggedElem || (draggedElem.target !== event.target)) {
        let rect = event.target.getBoundingClientRect();
        draggedElem = {
            target: event.target,
            shiftX: event.clientX + window.pageXOffset - rect.x,
            shiftY: event.clientY + window.pageYOffset - rect.y
        }
    }
}

body.onmousemove = function (event) {
    if (draggedElem) {
        draggedElem.target.style.position = 'absolute';
        draggedElem.target.style.left = (event.clientX - draggedElem.shiftX) + 'px';
        draggedElem.target.style.top = (event.clientY - draggedElem.shiftY) + 'px';
    }
}

body.onmouseup = function (event) {
    draggedElem = undefined;
}