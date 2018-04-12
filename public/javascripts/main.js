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
        this.socket.on('chat message', function (msg) {
            // const item = document.createElement('li');
            // const text = document.createTextNode(msg);
            // item.appendChild(text);
            // document.getElementById('messages').appendChild(item);
        });

        this.socket.on('chatHistory', function(data) {
            // data.forEach(function(element) {
            //     console.log(element);
            // });
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
            this.redraw();
        });

        domElements.canvas.addEventListener('mousemove', (e) => {
            if (this.painting){
                const mouseX = e.pageX - e.target.offsetLeft;
                const mouseY = e.pageY - e.target.offsetTop;

                saveDraw.addClick(mouseX, mouseY, true);
                this.redraw();
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
        domElements.context.strokeStyle = "#df4b26";
        domElements.context.lineJoin = "round";
        domElements.context.lineWidth = 5;

        for (let i = 0; i < saveDraw.clickX.length; i++) {
            domElements.context.beginPath();
            if (saveDraw.clickDrag[i] && i){
                domElements.context.moveTo(saveDraw.clickX[i-1], saveDraw.clickY[i-1]);
            } else {
                domElements.context.moveTo(saveDraw.clickX[i]-1, saveDraw.clickY[i]);
            }
            domElements.context.lineTo(saveDraw.clickX[i], saveDraw.clickY[i]);
            domElements.context.closePath();
            domElements.context.stroke();
        }
    }

};

const saveDraw = {
    clickX: [],
    clickY: [],
    clickDrag: [],
    addClick(x, y, dragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging)
        socketIo.socket.emit('chat message', "hallo1", "hallo2");

    },
}


app.init();



