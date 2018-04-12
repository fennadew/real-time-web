const app = {
    init() {
        domElements.init();
        drawEvents.init();
        socketIo.init();
    }
};

const domElements = {
    canvas: document.getElementById('drawing-canvas'),
    context: document.getElementById('drawing-canvas').getContext("2d"),
    init() {
        this.canvas.setAttribute('width', window.innerWidth);
        this.canvas.setAttribute('height', window.innerHeight);

        window.addEventListener('resize', () => {
            this.canvas.setAttribute('width', window.innerWidth);
            this.canvas.setAttribute('height', window.innerHeight);
        });
    }
};

const socketIo = {
    socket: io(),
    init() {
        this.socket.on('mouse', function (obj) {
            drawEvents.redraw(obj);
        });
    }
};


// With help of http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/

const drawEvents = {
    painting: false,
    lastEvent: {},
    init() {
        domElements.canvas.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.painting = true;

            this.lastEvent.mouseX = e.pageX - e.target.offsetLeft;
            this.lastEvent.mouseY = e.pageY - e.target.offsetTop;
        });

        domElements.canvas.addEventListener('mousemove', (e) => {
            if (this.painting) {
                const event = {
                    mouseX: e.pageX - e.target.offsetLeft,
                    mouseY: e.pageY - e.target.offsetTop
                };
                var line = {
                    start: {x: this.lastEvent.mouseX, y: this.lastEvent.mouseY},
                    end: {x: event.mouseX, y: event.mouseY},
                }
                this.redraw(line);
                socketIo.socket.emit('mouse', line);

                this.lastEvent.mouseX = event.mouseX;
                this.lastEvent.mouseY = event.mouseY;

            }

            // this.lastEvent.mouseX = event.mouseX;
            // this.lastEvent.mouseY = event.mouseY;


        });

        domElements.canvas.addEventListener('mouseup', (e) => {
            this.painting = false;
        });

        domElements.canvas.addEventListener('mouseleave', (e) => {
            this.painting = false;
        });
    },
    redraw(obj) {
        domElements.context.lineJoin = "round";
        domElements.context.lineWidth = 5;

        domElements.context.beginPath();

            domElements.context.moveTo(obj.start.x, obj.start.y);

        domElements.context.lineTo(obj.end.x, obj.end.y);
        domElements.context.closePath();
        domElements.context.stroke();
    }
    // if (saveDraw.clickDrag[i] && i) {
    //     domElements.context.moveTo(saveDraw.clickX[i - 1], saveDraw.clickY[i - 1]);
    // } else {
    //     domElements.context.moveTo(saveDraw.clickX[i] - 1, saveDraw.clickY[i]);
    // }


};

const saveDraw = {
    computers: {},
    clickX: [],
    clickY: [],
    clickDrag: [],
    addClick(x, y, dragging) {
        const obj = {
            x: x,
            y: y,
            dragging: dragging
        }
        socketIo.socket.emit('mouse', obj);
    },
}


app.init();



