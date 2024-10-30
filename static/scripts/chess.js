
class Chess {
    static boardID = "board";
    static squareCol = {
        0 : "#238834",
        1 : "#e5e5cc"
    }

    constructor() {
    }

    static calculateSquareColour(x, y) {
        let colIndex;
        if (y % 2 == 0) {
            if (x % 2 == 0) {
                colIndex = 1;
            } else {
                colIndex = 0;
            }
        } else {
            if (x % 2 == 0) {
                colIndex = 0;
            } else {
                colIndex = 1;
            }
        }

        return Chess.squareCol[colIndex];
        // if y is even
            // if x is even
                // light
            // if x is odd
                // dark
        // if y is odd
            // if x is even
                // dark
            // if x is odd
                // light
    }

    static makeVisualBoard() {
        let board = document.getElementById(Chess.boardID);
        for (let y=0; y<8; y++) {
            for (let x=0; x<8; x++) {
                let square = document.createElement("div");
                square.classList.add("board-square");
                square.style.backgroundColor = Chess.calculateSquareColour(x, y);
                board.appendChild(square);
            }
            // board.innerHTML += "<br>";
        }
    }    
}

$(document).ready(function () {
    Chess.makeVisualBoard();
});