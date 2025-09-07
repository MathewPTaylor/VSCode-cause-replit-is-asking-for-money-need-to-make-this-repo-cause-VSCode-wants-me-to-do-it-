class BattleShip {
    constructor () {
        this.GameStart = false;
        this.cellSize = "";
        this.currentSelect = null;
        this.board = [];
    }

    getCellSize() {
        let cell = document.querySelector(".grid-sqr");
        console.log("CELL:", cell, cell.clientHeight);
        this.cellSize = cell.clientHeight;
    }
}

class Ships {
    shipArr = [];

    constructor (id, pos=null, length) {
        this.id = id;
        this.centerOfRotation = pos; 
        this.rotation = 0; // using bearing system
        this.bbox = []; // will contain coords that ship will take up
        this.length = length;
        Ships.shipArr.push(this);
    }
}


$(document).ready(function() {
    var GAME = new BattleShip();


    //////////////////
    // SOCKET STUFF //
    //////////////////

    var socket = io("https://friendly-space-xylophone-wr7xv6rj75vrc9qr9-3001.app.github.dev", {
        // "transports": ["websocket", "polling"]
    });

    socket.on("connect", ()=>{
        console.log("connected to server!");
        socket.send("Connected mf.");
        socket.emit("join", {}); // sending join emit to join socket room
    });


    socket.on("message", (msg)=>{
        let msgDOM = document.createElement("p");
        msgDOM.innerHTML = msg;
        msgDOM.style.backgroundColor = "green";
        
        document.getElementById("message").appendChild(msgDOM);
    });


    socket.on("namesData", (json) => {
        // parse json
        console.log(`RECEIVED: ${Date.now()}`);
        jsonObj = JSON.parse(json);

        // display self name
        let selfNameDisp = document.getElementById("selfNameDisp");
        selfNameDisp.innerHTML = jsonObj.SELF;

        // display enemy name
        let oppNameDisp = document.getElementById("opponentNameDisp");
        oppNameDisp.innerHTML = jsonObj.ENEMY
    });


    socket.on("GameStart", () => {
        alert("GAME HAS STARTED!!"); 
        GAME.GameStart = true;
    });


    ///////////////////
    // BOARD RELATED //
    ///////////////////

    var visible = true

    $("#toggle").click(()=>{
        let collapseDOM = document.getElementById("collapsible");
        if (visible) {
            collapseDOM.style.display = "none";
        } else {
            collapseDOM.style.display = "block";
        }
        visible = !visible;
    });


    function fillBoardSquares() {
        let boards = document.querySelectorAll(".board");
        let gridSqr = document.createElement("div");
        gridSqr.classList.add("grid-sqr");

        console.log(gridSqr);

        boards.forEach((brd) => {
            for (let i = 0; i < 10; i++) {
                for (let c = 0; c < 10  ; c++) {
                    let sqrGrid = gridSqr.cloneNode();
                    sqrGrid.id = `${i}${c}`;
                    sqrGrid.style.gridArea = `${i+2} / ${c+2} / ${i+3} / ${c+3}`;
                    brd.appendChild(sqrGrid);
                    console.log("APPENDED!");
                }
            }
        });
    }


    function addCoordinateIndicators() {
        let coordCell = document.createElement("div");
        coordCell.classList.add("coords");

        let boards = document.querySelectorAll(".board");
        let yo = "ABCDEFGHIJ";

        console.log(boards);

        boards.forEach(board => {
            // column coordinate indicators
            for (let i = 1; i < 11; i++) {
                let cloneCell = coordCell.cloneNode();
                cloneCell.style.gridArea = `1 / ${i + 1} / 2 / ${i + 2}`;
                cloneCell.innerHTML = i;
                board.appendChild(cloneCell);
            }
            
            // row coordinate indicators
            for (let j = 1; j < 11; j++) {
                let cloneCell = coordCell.cloneNode();
                cloneCell.style.gridArea = `${j + 1}/ 1 / ${j + 2} / 2`;
                cloneCell.innerHTML = yo[j - 1];
                board.appendChild(cloneCell);
            }
        });

    }

    //////////////////
    // SHIP RELATED //
    //////////////////

    function deselectOthers() {
        let armoury = document.getElementById("shipArmoury");
        for (ship of armoury.children) {
            if (ship.firstChild.id != GAME.currentSelect) {
                ship.firstChild.classList.remove("selected");
            }
        }
    }


    function makeShips() {
        let template = document.createElement("div");
        template.style.width = "40px";
        template.style.height = "40px";
        template.style.backgroundColor = "red";

        let armoury = document.getElementById("shipArmoury");
        let child;

        for (let i = 0; i < 5; i++) {
            child = armoury.children[i];    

            let c = template.cloneNode();
            c.id = "ship" + (i + 1);
            
            c.addEventListener("click", (e)=>{
                // changing what ship is currently selected, logic wise
                GAME.currentSelect = GAME.currentSelect == e.target.id? null: e.target.id;

                // adding the selected class to the selected ship. This will darken the ship to appear selected;
                e.target.classList.add("selected");

                // removing the selected class from other ships
                deselectOthers();

                console.log(GAME.currentSelect);
            });

            // c.addEventListener("")

            child.appendChild(c);
        }
    }
    
    addCoordinateIndicators();

    fillBoardSquares();

    GAME.getCellSize();

    makeShips();
});