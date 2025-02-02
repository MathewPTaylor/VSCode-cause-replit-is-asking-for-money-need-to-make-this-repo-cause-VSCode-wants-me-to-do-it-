// module aliases
var Engine = Matter.Engine;
var Render = Matter.Render;
var Runner = Matter.Runner;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

const cWidth = 600;
const cHeight = 500;

// create a renderer
var render = Render.create({
    element: document.getElementById("canvasWrapper"),
    canvas: document.getElementById("canvas1"),
    engine: engine,
    options: {
        width: cWidth,
        height: cHeight,
        wireframes: false
    }
});

// create two boxes and a ground
var boxA = Bodies.rectangle(10, 10, 20, 20);
// var boxB = Bodies.rectangle(20, 20, 20, 20);
var ground = Bodies.rectangle(cWidth / 2, cHeight - 10, cWidth, 10, {isStatic: true});

// add all of the bodies to the world
Composite.add(engine.world, [boxA, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

class Peg {
    constructor(_boardX, _boardY, _x, _y, radius) {
        this.boardX = _boardX;
        this.boardY = _boardY;
        this.x = _x;
        this.y = _y;
        this.body;


        // make the body for the engine
        this.body = Bodies.circle(this.x, this.y, radius, {isStatic: true, render: {fillStyle: "white"}});

        // add the body to the world
        Composite.add(engine.world, this.body);
    }
}

class Board {
    static offset = {
        top: 50,
        right: 35,
        left: 35,
        bottom: 70
    }

    constructor(w, h) {
        this.board = [];
        this.width = w;
        this.height = h;
    }

    addLayers(noLayers, pegsInFirstLayer=3) {
        let temp;
        let gapX = (this.width - Board.offset.left - Board.offset.right) / (noLayers + pegsInFirstLayer - 2);
        let gapY = (this.height - Board.offset.bottom) / noLayers;
        console.log("GAPS", gapX, gapY);

        for (let i = 0; i < noLayers; i++) {
            temp = [];
            let indentX = Board.offset.left + (noLayers - (i + 1)) / 2 * gapX;
            let indentY = Board.offset.top;

            for (let c = 0; c < i + pegsInFirstLayer; c++) {
                let x = indentX + (c * gapX)
                let y = indentY +  i * gapY

                temp.push(new Peg(i, c, x, y, 5));
            }
            this.board.push(temp);
        }
    }

    test() {
        this.board[-1].forEach(peg => {
            console.log(peg);
        });
    }

    printBoard() {
        
    }
}




$(document).ready(function () {
    Runner.run(runner, engine);

    var gameBoard = new Board(cWidth, cHeight);
    gameBoard.addLayers(10, 3);
    // gameBoard.test();

    console.log(gameBoard.board);

    var x = cWidth / 2;
    var y = Board.offset.top / 4;


    $("canvas").click((e) => {
        console.log(e);
        // x = e.offsetX;
        y = e.offsetY;
    });

    $("#squareBtn").click(function() {
        // make a new square
        let newBox = Bodies.rectangle(x, y, 20, 20, {render: {fillStyle: "white"}});

        Composite.add(engine.world, newBox);
        // add the square to the world
    });

    $("#circleBtn").click(function() {
        let randRange = 4;
        let dx = Math.random() * randRange - (randRange / 2);
        let newCircle = Bodies.circle(x + dx, y, 10, {restitution: 0.5, render: {fillStyle: "red"}});

        Composite.add(engine.world, newCircle);
    });
});

