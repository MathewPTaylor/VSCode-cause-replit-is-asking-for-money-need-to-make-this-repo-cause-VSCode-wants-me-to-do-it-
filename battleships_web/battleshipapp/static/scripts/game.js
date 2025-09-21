class BattleShip {
    constructor() {
        this.gameStart = false;
        this.currentSelect = null;
        this.board = [];
        this.cellSize = 0;
        this.currentObj = null;
        this.shipsPlaced = 0;
    }

    getCellSize() {
        let sqr = document.querySelector(".grid-sqr");
        this.cellSize = sqr.getBoundingClientRect().height;
        console.log(this.cellSize);
    }

    initialiseBoard() {
        let tempArr;
        for (let i=0; i<10; i++) {
            tempArr = [];
            for (let c=0; c<10; c++) {
                tempArr.push("");
            }
            this.board.push(tempArr);
        }
    }

    logicRemoveCurrentShip() {
        for (let pos of this.currentObj.bbox) {
            this.board[pos[0]][pos[1]] = "";
        }
        this.currentObj.bbox = [];
    }

    logicAddCurrentShip() {
        for (pos of this.currentObj.bbox) {
            this.board[pos[0]][pos[1]] = this.currentObj.id;
        }
    }
}

class Ship {
    static ships = [];

    constructor(id, pos, length, symbol) {
        this.id = id;
        this.pos = pos;
        this.rotation = 90;
        this.bbox = [];
        this.shipLength = length;
        this.dx = 1;
        this.dy = 0;
        this.touchOffsetX = 0;
        this.touchOffsetY = 0;
        this.placed = false;
        
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

    getDirection() {
        switch (Math.floor(this.rotation / 90)) {
            case 0:
                this.dx = 0;
                this.dy = -1;
                break;
            case 1:
                this.dx = 1;
                this.dy = 0;
                break;
            case 2:
                this.dx = 0;
                this.dy = 1;
                break;
            case 3:
                this.dx = -1;
                this.dy = 0;
                break;
            default:
                console.log("Fourth dimension settings");
        }
    }

    static getDirectionStatic(rotation) {
        switch (Math.floor(rotation / 90)) {
            case 0:
                return [0, -1];
            case 1:
                return [1, 0];
            case 2:
                return [0, 1];
            case 3:
                return [-1, 0];
            default:
                console.log("Fourth dimension settings");
        }
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


$(document).ready(function() {
    console.log("LOADED!");
    const GAME = new BattleShip();
    GAME.initialiseBoard();
    console.log(GAME.board);
    const AircraftCarrier = new Ship("ship1", null, 5, "AC");
    const Battleship = new Ship("ship2", null, 4, "BS");
    const Cruiser1 = new Ship("ship3", null, 3, "C1");
    const Cruiser2 = new Ship("ship4", null, 3, "C2");
    const Destroyer = new Ship("ship5", null, 2, "DR");
    var dropped = false;
    var parentalAdvice = null;
    var zIndexCounter = 1;

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
        oppNameDisp.innerHTML = jsonObj.ENEMY;
    });


    socket.on("GameStart", () => {
        alert("GAME HAS STARTED!!"); 
        GAME.GameStart = true;
    });

    function sendBoard() {
        let data = {
            "BOARD": GAME.board
        }
        socket.emit("ready:gamestart", JSON.stringify(data));
    }


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

    window.onresize = (e) => {
        GAME.getCellSize();
        Ship.ships.forEach(ship => {
            console.log("yoresize");
            let shipDOM = document.getElementById(ship.id);
            shipDOM.style.width = GAME.cellSize * ship.shipLength + "px";
            shipDOM.style.height = GAME.cellSize + "px";
        });

    }

    function addGridSquares(pBoard, droppable=false) {
        let templateSqr = document.getElementById("templateSqr");
        templateSqr.style.gridArea = "1 / 1 / 2 / 2";
        templateSqr.classList.add("grid-sqr");
        for (let i=1; i<11; i++) {
            for (let c=1; c<11; c++) {                
                let sqr = templateSqr.cloneNode();
                sqr.id = `${i}${c}`;
                sqr.style.gridArea = `${i+1} / ${c+1} / ${i+2} / ${c+2}`;
                sqr.style.width = templateSqr.getBoundingClientRect().width;
                sqr.style.height = templateSqr.getBoundingClientRect().height;
                sqr.setAttribute("droppable", true);
                sqr.setAttribute("i", i-1);
                sqr.setAttribute("c", c-1);
                ///////////////////////////////////////////////
                if (droppable) {
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
                        let available = true;
                        for (let i = 0; i < shipObj.shipLength; i++) {
                            if (ccoord + i < 10) {
                                if (GAME.board[icoord + shipObj.dy*i][ccoord + shipObj.dx*i] != "") {
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
                        shipObj.bbox = [];
                        // adding the ship to the game logic board
                        for (let c = 0; c < shipObj.shipLength; c++) {
                            GAME.board[icoord + shipObj.dy*c][ccoord + shipObj.dx*c] = GAME.currentSelect.id;
                            shipObj.bbox.push([icoord + shipObj.dy*c, ccoord + shipObj.dx*c]);
                        }
                        console.log(GAME.board);
                        shipObj.placed = true;
                        // resizing the ship to fit the square it is inside of
                        // changing the grid-column-end of the grid cell to the length of the ship
                        GAME.currentSelect.style.width = GAME.cellSize * shipObj.shipLength;
                        GAME.currentSelect.style.height = GAME.cellSize - 2 + "px";
                        // this.style.gridColumnEnd = parseInt(this.style.gridColumnEnd) + shipObj.shipLength - 1;
                        this.style.zIndex = zIndexCounter;
                        zIndexCounter++;
                        this.appendChild(GAME.currentSelect);
                    });
                }
                pBoard.appendChild(sqr);
            }
        }

        console.log(GAME.board);
    }

    function fillBoardSquares() {
        let boards = document.querySelectorAll(".board");
        boards.forEach((brd, index) => {
            addGridSquares(brd, [true, false][index]);
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

    ////////////////////
    // SHIP FUNCTIONS //
    ////////////////////

    function deselectOthers() {
        let armoury = document.getElementById("shipArmoury");
        for (ship of armoury.children) {
            if (ship.firstChild.id != GAME.currentSelect) {
                ship.firstChild.classList.remove("selected");
            }
        }
    }

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
                    shipObj.placed = false;
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
            shipDOM.style.position = "absolute";

            shipDOM.addEventListener("click", function(e) {
                GAME.currentSelect = this;
                GAME.currentObj = Ship.getInstance(this.id);
                console.log(this.id);
            });

            shipDOM.addEventListener("touchstart", function(e) {
                try {
                    dragStartHandle(e);
                    this.style.position = "relative";
                    GAME.currentObj.touchOffsetX = e.touches[0].clientX;
                    GAME.currentObj.touchOffsetY = e.touches[0].clientY;
                } catch (error) {
                    alert(error);
                }
            });

            shipDOM.addEventListener("touchmove", function(e) {
                e.preventDefault();
                console.log(e);
                try {
                    console.log(GAME.currentObj);
                    console.log((e.touches[0].clientX - GAME.currentObj.touchOffsetX));
                    this.style.left = (e.touches[0].clientX - GAME.currentObj.touchOffsetX) + "px";
                    this.style.top = (e.touches[0].clientY - GAME.currentObj.touchOffsetY) + "px";
                } catch (error) {
                    alert(error);
                }
            });

            shipDOM.addEventListener("dragstart", function(e) {
                dragStartHandle(e);
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
                    for (pos of shipObj.bbox) {
                        GAME.board[pos[0]][pos[1]] = shipObj.id; 
                    }
                }
            });
        });
    }


    ////////////////////
    // EVENT HANDLERS //
    ////////////////////

    function dragStartHandle(e) {
        // alert(e);
        _this = e.target
        // logically selecting the shipDOM
        GAME.currentSelect = _this;
        GAME.currentObj = Ship.getInstance(_this.id);
        dropped = false;
        
        
        // removing ship from logic board
        let shipObj = Ship.getInstance(GAME.currentSelect.id);
        for (pos of shipObj.bbox) {
            GAME.board[pos[0]][pos[1]] = ""; 
        }
        // setting the drag effect to move the selected ship, not copy
        // e.dataTransfer.effectAllowed = "move";
        
        let parent = GAME.currentSelect.parentElement; 
        parentalAdvice = parent;

        // e.dataTransfer.setData("text", parent.getAttribute("ship-key"));
        // console.log(e.dataTransfer.getData("text"));
        _this.classList.add("dragging");
    }


    function rotationHandle() {
        let newRotation = GAME.currentObj.rotation;
        let rotationCounter = 0;
        let freeSpace;
        var dx, dy;
        while (!freeSpace & rotationCounter < 4) {
            freeSpace = true;
            newRotation = (newRotation + 90) % 360;
            console.log("Testing Angle:", newRotation, freeSpace);
            [dx, dy] = Ship.getDirectionStatic(newRotation);
            
            for (let i=1; i<GAME.currentObj.shipLength; i++) {
                let _i = GAME.currentObj.pos[0] + dy*i;
                let _c = GAME.currentObj.pos[1] + dx*i;
                console.log(_i, _c);
                try {
                    if (GAME.board[_i][_c] != "") {
                        freeSpace = false;
                    }
                } catch (error) {
                    console.log(error);
                    freeSpace = false;
                }
            }
            rotationCounter++;
        }
        if (freeSpace) {
            GAME.currentObj.rotation = newRotation;
            GAME.currentObj.dx = dx;
            GAME.currentObj.dy = dy;
            GAME.logicRemoveCurrentShip();
            // logically rotating the ship
            for (let c = 0; c < GAME.currentObj.shipLength; c++) {
                GAME.board[GAME.currentObj.pos[0] + dy*c][GAME.currentObj.pos[1] + dx*c] = GAME.currentSelect.id;
                GAME.currentObj.bbox.push([GAME.currentObj.pos[0] + dy*c, GAME.currentObj.pos[1] + dx*c]);
            }
            // visually rotating the ship
            GAME.currentSelect.style.transform = `rotate(${GAME.currentObj.rotation - 90}deg)`;
        }
        console.log(GAME.board);
    }


    $(".rotateBtn").click(()=>{
        rotationHandle();
    });
    $(".checkBtn").click(function(e) {
        console.log(GAME.shipsPlaced);
    });

    $("#shipConfirmBtn").click(function(e) {
        Ship.ships.forEach(ship => {
            if (!ship.placed) {
                return
            }
        });

        sendBoard();
    });

    ///////////////////////    
    // CALLING FUNCTIONS //
    ///////////////////////

    addCoordinateIndicators();

    fillBoardSquares();

    GAME.getCellSize();

    openShipPorts();

    addShips();
});