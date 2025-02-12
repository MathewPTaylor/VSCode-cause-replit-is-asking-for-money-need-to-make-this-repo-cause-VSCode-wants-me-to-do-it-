// module aliases
var Engine = Matter.Engine;
var Render = Matter.Render;
var Runner = Matter.Runner;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;

// create an engine
var engine = Engine.create();


// create a renderer
var render = Render.create({
    element: document.getElementById("canvasWrapper"),
    canvas: document.getElementById("canvas1"),
    engine: engine,
    options: {
        // width: cWidth,
        // height: cHeight,
        wireframes: false
    }
});

document.getElementById("canvas1").style.margin = "0";

const cWidth = render.options.width;
const cHeight = render.options.height;


// create two boxes and a ground
var boxA = Bodies.rectangle(10, 10, 20, 20);
// var boxB = Bodies.rectangle(20, 20, 20, 20);
var ground = Bodies.rectangle(cWidth / 2, cHeight, cWidth, 10, {isStatic: true});

// var test = Bodies.rectangle(cWidth / 2, cHeight - (75 / 2), cWidth, 10)
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
        right: 100,
        bottom: 75,
        left: 100
    }

    static mults = [99, 14, 1.5, 0.5, 0.5, 0.2, 0.5, 0.5, 1.5, 14, 99]

    constructor(w, h) {
        this.board = [];
        this.bodies = [];
        this.width = w;
        this.height = h;
        this.layers = 0;
        this.noBalls = 0;
    }

    addLayers(noLayers, pegsInFirstLayer=3) {
        this.layers = noLayers;
        let temp;
        let gapX = (this.width - Board.offset.left - Board.offset.right) / (noLayers + pegsInFirstLayer - 2);
        this.gapX = gapX;
        let gapY = (this.height - Board.offset.bottom) / noLayers;

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

    addMultiplierBoxes() {
        let boxes = 13;
        let indent = Board.offset.left + this.gapX / 2;
        let multCols = ["#f10", "redorange", "#f40", "#f60", "#f60", "#fb0", "#fe0", "#fb0", "#f60", "#f60", "#f40", "redorange", "#f10"];
        let bWidth = 37.5;
        this.upperBoundBox = cHeight - 37.5 - bWidth / 2
        try {
            for (let i=0; i<boxes; i++) {
                let x = indent + i * this.gapX;
                let y = cHeight - 37.5 //(Board.offset.bottom / 2);
                let box = Bodies.rectangle(x, y, this.gapX - 5, bWidth, {isStatic: true, render: {fillStyle: multCols[i]}});
                Composite.add(engine.world, box);
                let c = document.getElementById("canvas1");
                let ctx = c.getContext("2d");
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.fillText("test", 30, 30);
    
            }    
        } catch (e) {
            alert(e);
        }
        
    }
}

class MultBox {
    constructor(mult) {
        this.multiplier = mult;
    }
}




$(document).ready(function () {
    Runner.run(runner, engine);
    
    var gameBoard = new Board(cWidth, cHeight);
    gameBoard.addLayers(12, 3);
    gameBoard.addMultiplierBoxes();
    // gameBoard.test();

    var balance = 500;
    var ballPrice = 1;
    var x = cWidth / 2;
    var y = Board.offset.top / 4;
    var fx = 1;

    updateBalance();

    var yesArray = [];

    function findMult(_x, _y) {
        let indent = Board.offset.left + gameBoard.gapX / 2;
        let effectiveX = _x; // - indent;
        let index = Math.floor(effectiveX / gameBoard.gapX);
        yesArray.push([index, _x]);
        if (index >= 0 && index < Board.mults.length) {
            let mult = Board.mults[index];
            return mult
        } else {
            return 0
        }
        
    }

    function myFilter(body) {
        let newArray = [];
        gameBoard.bodies.forEach(item=> {
            if (item.id != body.id) {
                newArray.push(item);
            }
        });

        return newArray
    }

    function ajaxShit(thelist) {
        $.ajax({
            method: "post",
            url: "/getArray",
            contentType: "application/json",
            data: JSON.stringify(thelist),
            success: () => {console.log("")}
        }   
        )
    }

    $("#sendBtn").click(function() {
        ajaxShit(yesArray);
        alert("Sent it!!!");
    })

    setInterval(function() {
        let bounds = Matter.Bounds.create([
            {x: 0, y: gameBoard.upperBoundBox},
            {x: cWidth, y: gameBoard.upperBoundBox},
            {x: 0, y: cHeight},
            {x: cWidth, y: cHeight}
        ]);

        let intersected = Matter.Query.region(gameBoard.bodies, bounds);
        
        console.log(gameBoard.bodies);
        if (intersected) {
            intersected.forEach(body => {
                // find multiplier
                let bx = body.position.x;
                // alert(`X: ${bx} ID: ${body.id}`);
                let mult = findMult(body.position.x);
                
                // add money back in
                let moneyBack = ballPrice * mult
                balance = balance + moneyBack;
                if (isNaN(balance)) {
                    alert(`${balance}, x${mult}, ${moneyBack}, ${bx}`);
                }
                updateBalance();
    
                // remove ball from world and array
                Composite.remove(engine.world, body)
                gameBoard.bodies = myFilter(body);
            });
        }
        
    }, 50);


    $("#squareBtn").click(function() {
        // make a new square
        let newBox = Bodies.rectangle(x, y, 20, 20, {render: {fillStyle: "white"}});

        Composite.add(engine.world, newBox);
        // add the square to the world
    });

    $("#circleBtn").click(function() {
        if (balance < 1) {
            return
        }

        let randRange = 50;
        let dx = Math.random() * randRange - (randRange / 2);
        let newCircle = Bodies.circle(x + dx, y, 9, {id: gameBoard.noBalls, collisionFilter: {group: -1}, restitution: 0.3, render: {fillStyle: "red"}});

        gameBoard.noBalls++;
        fx++;
        Composite.add(engine.world, newCircle);
        gameBoard.bodies.push(newCircle);
        balance -= ballPrice
        updateBalance();
    });

    $("#ballPriceInput").on("focusin", function(e) {
        e.target.value = ballPrice;
    });

    $("#ballPriceInput").on("input", function (e){
        ballPrice = e.target.value;
    });

    $("#ballPriceInput").on("focusout", function(e) {
        if (isNaN(parseInt(e.target.value))) {
            // alert("BOMBOCLAAT");
            ballPrice = 1;
        }
        if (e.target.value > balance) {
            ballPrice = parseFloat(balance);
        }
        e.target.value = `$${ballPrice}`;
    });


    function updateBalance() {
        document.getElementById("balanceDisp").innerHTML = `Balance: $${Math.round(balance * 1000) / 1000}`;
    }
});

