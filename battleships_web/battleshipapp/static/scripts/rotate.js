class BattleShip {
    constructor() {
        this.gameStart = false;
        this.currentSelect = null;
        this.board = [];
        this.cellSize = 0;
    }

    getCellSize() {
        let sqr = document.querySelector(".grid-sqr");
        this.cellSize = sqr.getBoundingClientRect().height;
        console.log(this.cellSize);
    }
}

class Ship {
    static ships = [];

    constructor(id, pos, length, symbol) {
        this.id = id;
        this.pos = pos;
        this.rotation = 0;
        this.bbox = [];
        this.shipLength = length;
        this.symbol = symbol;

        Ship.ships.push(this);
    }

    resetDimensions(size) {
        let shipDOM = document.getElementById(this.id);
        shipDOM.style.width = size * this.shipLength + "px";
        shipDOM.style.height = size + "px";
    }

    rotateShip() {

    }

    #checkNorth() {

    }

    #checkEast() {

    }

    #checkSouth() {

    }

    #checkWest() {

    }

    static getInstance(id) {
        // console.log(Ship.ships, id);
        for (let i=0; i<Ship.ships.length; i++) {
            if (Ship.ships[i].id == id) {
                return Ship.ships[i];
            }
        }
        return null;
    }
}



document.addEventListener("DOMContentLoaded", function() {
    console.log("LOADED!");
    const GAME = new BattleShip();
    const AircraftCarrier = new Ship("ship1", null, 5, "AC");
    const Battleship = new Ship("ship2", null, 4, "BS");
    const Cruiser1 = new Ship("ship3", null, 3, "C1");
    const Cruiser2 = new Ship("ship4", null, 3, "C2");
    const Destroyer = new Ship("ship5", null, 2, "DR");
    var dropped = false;
    var parentalAdvice = null;
    var zIndexCounter = 1;



    /////////////////////
    // BOARD FUNCTIONS //
    /////////////////////

    function addGridSquares() {
        let board = document.getElementById("mainBoard");
        console.log(document, board);
        let templateSqr = document.getElementById("templateSqr");
        templateSqr.classList.add("grid-sqr");

        let tempArr;

        for (let i=1; i<11; i++) {
            tempArr = [];
            for (let c=1; c<11; c++) {
                tempArr.push("");
                
                let sqr = templateSqr.cloneNode();
                sqr.id = `${i}${c}`;
                sqr.style.gridArea = `${i+1} / ${c+1} / ${i+2} / ${c+2}`;
                sqr.style.width = templateSqr.getBoundingClientRect().width;
                sqr.style.height = templateSqr.getBoundingClientRect().height;
                sqr.setAttribute("droppable", true);
                sqr.setAttribute("i", i-1);
                sqr.setAttribute("c", c-1);
                
                ///////////////////////////////////////////////
                
                sqr.addEventListener("dragover", function(e) {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                    console.log("AC130 ABOVE!!!!");
                });
                
                sqr.addEventListener("drop", function(e) {
                    e.preventDefault();                    
                    // get coordinate of ship drop
                    icoord = parseInt(this.getAttribute("i"));
                    ccoord = parseInt(this.getAttribute("c"));
                    // getting the corresponding ship object instance to use later in this event handler
                    let shipObj = Ship.getInstance(GAME.currentSelect.id);
                    // check if any of the squares that the ship is about to be on, is occupied or not.
                    // this is where we will add the code to consider the rotation, rn we just dropping east-ward
                    let available = true;
                    for (let i = 0; i < shipObj.shipLength; i++) {
                        if (ccoord + i < 10) {
                            if (GAME.board[icoord][ccoord + i] != "") {
                                available = false;
                            }
                        } else {
                            available = false;
                        }
                    }
                    if (!available) { // if occupied, exit handler
                        return
                    }
                    dropped = true;

                    // adding the new position to the ship object
                    shipObj.pos = [icoord, ccoord];
                    shipObj.bbox= [];
                    // adding the ship to the game logic board
                    for (let c = 0; c < shipObj.shipLength; c++) {
                        GAME.board[icoord][ccoord + c] = GAME.currentSelect.id;
                        shipObj.bbox.push([icoord, ccoord + c]);
                    }
                    console.log(GAME.board);
                    console.log(shipObj);
                    // resizing the ship to fit the square it is inside of
                    // changing the grid-column-end of the grid cell to the length of the ship
                    GAME.currentSelect.style.width = "100%";
                    GAME.currentSelect.style.height = "85%";
                    this.style.gridColumnEnd = parseInt(this.style.gridColumnEnd) + shipObj.shipLength - 1;
                    this.style.zIndex = zIndexCounter;
                    zIndexCounter++;
                    this.appendChild(GAME.currentSelect);
                });
                board.appendChild(sqr);
            }
            GAME.board.push(tempArr);
        }

        console.log(GAME.board);
    }

    ////////////////////
    // SHIP FUNCTIONS //
    ////////////////////

    function openShipPorts() {
        let ports = document.querySelectorAll(".shipPort");

        ports.forEach(port=> {
            port.addEventListener("dragover", function(e) {
                e.stopPropagation();
                e.preventDefault();

                e.dataTransfer.dropEffect = "move";
            });

            port.addEventListener("drop", function(e) {
                e.preventDefault();
                dropped = true;
                let shipObj = Ship.getInstance(GAME.currentSelect.id);
                shipObj.bbox = [];
                shipObj.pos = [];

                if (this.getAttribute("ship-key") == GAME.currentSelect.id) {
                    shipObj.resetDimensions(GAME.cellSize);
                    this.appendChild(GAME.currentSelect);
                }
            });
        });
    }

    function addShips() {
        console.log(Ship.ships);
        Ship.ships.forEach(ship => {
            let shipDOM = document.getElementById(ship.id);
            console.log(shipDOM);
            shipDOM.setAttribute("draggable", true); 
            shipDOM.style.width = `${GAME.cellSize * ship.shipLength}px`;
            shipDOM.style.height = `${GAME.cellSize}px`;
            shipDOM.style.transformOrigin = `${GAME.cellSize / 2}px`;

            shipDOM.addEventListener("click", function(e) {
                GAME.currentSelect = this;
                console.log(this.id);
            });

            shipDOM.addEventListener("dragstart", function(e) {
                // logically selecting the shipDOM
                GAME.currentSelect = this;
                dropped = false;
                
                
                // removing ship from logic board
                let shipObj = Ship.getInstance(GAME.currentSelect.id);
                for (pos of shipObj.bbox) {
                    GAME.board[pos[0]][pos[1]] = ""; 
                }
                // setting the drag effect to move the selected ship, not copy
                e.dataTransfer.effectAllowed = "move";
                
                let parent = GAME.currentSelect.parentElement; 
                parentalAdvice = parent;

                // e.dataTransfer.setData("text", parent.getAttribute("ship-key"));
                // console.log(e.dataTransfer.getData("text"));
                this.classList.add("dragging");
            });

            shipDOM.addEventListener("drag", function(e) {

                // resetting grid square to normal if ship is on the board at dragstart
                if (!parentalAdvice.getAttribute("ship-key")) { // ship is on the board
                    let parent = document.getElementById(parentalAdvice.id);
                    parent.style.gridColumnEnd = parseInt(parent.style.gridColumnStart) + 1;
                    parent.style.gridRowEnd = parseInt(parent.style.gridRowStart) + 1;
                } 
            });

            shipDOM.addEventListener("dragend", function(e) {
                this.classList.remove("dragging");
                console.log("DRAGEND", GAME.board); 

                if (!dropped) {
                    let shipObj = Ship.getInstance(GAME.currentSelect.id);

                    if (!parentalAdvice.getAttribute("ship-key")) { // ship is on the board
                        alert("yo");
                        let parent = document.getElementById(parentalAdvice.id);
                        parent.style.gridColumnEnd = parseInt(parent.style.gridColumnStart) + 1;
                        parent.style.gridRowEnd = parseInt(parent.style.gridRowStart) + 1;
                    }
                    
                    console.log(shipObj);
                    for (pos of shipObj.bbox) {
                        GAME.board[pos[0]][pos[1]] = shipObj.id; 
                    }
                }
            });
        });
    }

    
    addGridSquares();
    GAME.getCellSize();
    openShipPorts();
    addShips();


    document.querySelector(".clicky").addEventListener("click", e=>{console.log(GAME.currentSelect)});

    let rotateBtn = document.querySelector(".rotateBtn");
    rotateBtn.addEventListener("click", function(e) {
        shipObj = Ship.getInstance(GAME.currentSelect.id);
        curDeg = shipObj.rotation;
        newDeg = curDeg + 90;
        shipObj.rotation = newDeg;
        GAME.currentSelect.style.transform = `rotate(${newDeg}deg)`;
    });
});