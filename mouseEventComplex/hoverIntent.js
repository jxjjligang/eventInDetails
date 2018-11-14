'use strict';

// Here's a brief sketch of the class
// with things that you'll need anyway
class HoverIntent {

    constructor({
    sensitivity = 0.1, // speed less than 0.1px/ms means "hovering over an element"
        interval = 100, // measure mouse speed once per 100ms: calculate the distance between previous and next points
        elem,
        over,
        out
  }) {
        this.sensitivity = sensitivity;
        this.interval = interval;
        this.elem = elem;
        this.over = over;
        this.out = out;

        // make sure "this" is the object in event handlers.
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.isOver = false;
        // assign the handlers
        elem.addEventListener("mouseover", this.onMouseOver);
        elem.addEventListener("mouseout", this.onMouseOut);
        elem.addEventListener("mousemove", this.onMouseMove);
        // continue from this point
        this.lastMouseMove = undefined;
    }

    onMouseOver(event) {
        if (!this.isOver) {
            this.isOver = true;
            console.log(`onMouseOver isOver:${this.isOver}`);
        }
    }

    onMouseOut(event) {
        out();
        if (this.isOver === false)
            return;

        if (event.target !== this.elem)
            return;

        if (this.elem.contains(event.relatedTarget))
            return;

        this.isOver = false;
        console.log(`onMouseOut isOver:${this.isOver}`);
    }

    onMouseMove(event) {
        this.isOver = true;
        if (this.lastMouseMove === undefined) {
            this.lastMouseMove = {
                time: new Date(),
                x: event.clientX,
                y: event.clientY
            }
            return;
        }
        else {
            let differene = new Date() - this.lastMouseMove.time;  // in milliseconDs
            if (differene < 100)
                return;
            else {
                let movedLength = Math.sqrt(Math.pow(this.lastMouseMove.x - event.clientX, 2) + Math.pow(this.lastMouseMove.y - event.clientY, 2));
                let moveSpeed = movedLength / differene;
                (moveSpeed < this.sensitivity) ? this.over() : this.out();
                this.lastMouseMove = {
                    time: new Date(),
                    x: event.clientX,
                    y: event.clientY
                }
            }

        }
        console.log(`onMouseMove isOver:${this.isOver}`);
    }


    destroy() {
        /* your code to "disable" the functionality, remove all handlers */
    };

}