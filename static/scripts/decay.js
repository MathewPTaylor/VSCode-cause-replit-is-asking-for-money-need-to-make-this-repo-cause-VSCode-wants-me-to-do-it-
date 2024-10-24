$(document).ready(function() {
    calculateDecay();
    function calculateDecay() {
        let noNuclei = 1000;
        let chanceOfDecay = 1/6;
        let secondsElapsed = 60;
        let canvasMult = 10;
        let offset = 15;

        let pos = [offset, convertY(noNuclei)];

        for (let i=1; i<secondsElapsed; i++) {
            // noNuclei = noNuclei * chanceOfDecay
            noNuclei = DecayTick(noNuclei, 10)
            let newpos = [(i * canvasMult) + offset, (convertY(noNuclei) - offset) / 2];
            drawLine(pos[0], pos[1], newpos[0], newpos[1]);
            pos = newpos;
            // alert(noNuclei);
        }
    }

    function randomInt(max) {
        return Math.floor(Math.random() * (max + 1))
    }

    function DecayTick(nucleiLeft, decayProb) {
        for (i=0; i<nucleiLeft; i++) {
            if (randomInt(decayProb) <= 0) {
                nucleiLeft -= 1
            }
        }

        return nucleiLeft
    }
    function convertY(y) {
        let height = document.getElementById("canvas1").height;
        return Math.abs(y - height)
    }

    function drawLine(x1, y1, x2, y2) {
        let canvas = document.getElementById("canvas1");
        let ctx = canvas.getContext("2d");
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
});