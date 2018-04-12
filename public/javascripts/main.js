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
    id: '',
    computers: [],
    init() {
        this.socket.on('connect', () => {
            this.id = this.socket.id;
            this.socket.emit('id', this.id);
        });
        this.socket.on('id', (id) => {
            this.computers = id;
            console.log(this.computers, this.id)
        });
        this.socket.on('mouse', function (obj) {
            saveDraw.clickX.push(obj.x);
            saveDraw.clickY.push(obj.y);
            saveDraw.id.push(obj.id);
            saveDraw.clickDrag.push(obj.dragging)
            drawEvents.redraw();
        });
    }
};


// With help of http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/

const drawEvents = {
    painting: false,
    init() {
        domElements.canvas.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const mouseX = e.pageX - e.target.offsetLeft;
            const mouseY = e.pageY - e.target.offsetTop;

            this.painting = true;
            saveDraw.addClick(mouseX, mouseY);
        });

        domElements.canvas.addEventListener('mousemove', (e) => {
            if (this.painting) {
                const mouseX = e.pageX - e.target.offsetLeft;
                const mouseY = e.pageY - e.target.offsetTop;

                saveDraw.addClick(mouseX, mouseY, true);
            }
        });

        domElements.canvas.addEventListener('mouseup', (e) => {
            this.painting = false;
        });

        domElements.canvas.addEventListener('mouseleave', (e) => {
            this.painting = false;
        });
    },
    redraw() {
        domElements.context.clearRect(0, 0, domElements.context.canvas.width, domElements.context.canvas.height);
        domElements.context.lineJoin = "round";
        domElements.context.lineWidth = 5;


            for (let i = 0; i < saveDraw.clickX.length; i++) {
                    domElements.context.beginPath();
                    for (let a = 0; a < socketIo.computers.length; a++) {
                        if (socketIo.computers[a] === saveDraw.id[i]) {
                            if (saveDraw.clickDrag[i] && i) {
                                domElements.context.moveTo(saveDraw.clickX[i - 1], saveDraw.clickY[i - 1]);
                            } else {
                                domElements.context.moveTo(saveDraw.clickX[i] - 1, saveDraw.clickY[i]);
                            }
                        }
                    }
                    // if (saveDraw.clickDrag[i] && i) {
                    //     domElements.context.moveTo(saveDraw.clickX[i - 1], saveDraw.clickY[i - 1]);
                    // } else {
                    //     domElements.context.moveTo(saveDraw.clickX[i] - 1, saveDraw.clickY[i]);
                    // }
                    domElements.context.lineTo(saveDraw.clickX[i], saveDraw.clickY[i]);
                    domElements.context.closePath();
                    domElements.context.stroke();
            }
    }

};

const saveDraw = {
    computers: {},
    clickX: [],
    clickY: [],
    clickDrag: [],
    id: [],
    addClick(x, y, dragging) {
        const obj = {
            x: x,
            y: y,
            id: socketIo.id,
            dragging: dragging
        }
        socketIo.socket.emit('mouse', obj);
    },
}


app.init();



