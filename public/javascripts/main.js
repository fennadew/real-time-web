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
    colorPicker: document.getElementById('colorChoice'),
    init() {
        this.canvas.setAttribute('width', window.innerWidth / 2);
        this.canvas.setAttribute('height', window.innerHeight / 2);

        window.addEventListener('resize', () => {
            this.canvas.setAttribute('width', window.innerWidth / 2);
            this.canvas.setAttribute('height', window.innerHeight / 2);
        });
    }
};

const socketIo = {
    socket: io(),
    init() {
        this.socket.on('mouse', function (drawing) {
            drawEvents.redraw(drawing);
        });
    }
};


// With help of http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/

const drawEvents = {
    painting: false,
    color: domElements.colorPicker.value,
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
                const drawing = {
                    start: {
                        x: this.lastEvent.mouseX,
                        y: this.lastEvent.mouseY
                    },
                    end: {
                        x: event.mouseX,
                        y: event.mouseY
                    },
                    color: this.color
                };
                this.redraw(drawing);
                socketIo.socket.emit('mouse', drawing);

                this.lastEvent.mouseX = event.mouseX;
                this.lastEvent.mouseY = event.mouseY;

            }

        });

        domElements.canvas.addEventListener('mouseup', (e) => {
            this.painting = false;
        });

        domElements.canvas.addEventListener('mouseleave', (e) => {
            this.painting = false;
        });

        domElements.colorPicker.addEventListener('change', (e) => {
            this.color = domElements.colorPicker.value
        });
    },
    redraw(obj) {
        // With help from http://drawwithme.herokuapp.com/ (did the sockets myself! The only thing that didnt work was drawing at the same time. I used this example for fixing it.)
        domElements.context.lineJoin = "round";
        domElements.context.strokeStyle = this.color;
        domElements.context.lineWidth = 5;

        domElements.context.beginPath();

        domElements.context.moveTo(obj.start.x, obj.start.y);

        domElements.context.lineTo(obj.end.x, obj.end.y);
        domElements.context.closePath();
        domElements.context.stroke();
    }
};


app.init();



