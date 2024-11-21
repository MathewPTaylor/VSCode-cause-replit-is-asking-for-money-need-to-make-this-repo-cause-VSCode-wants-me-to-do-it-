class Vector {
    constructor(mag, ang) {
        this.magnitude = mag;
        this.angle = ang;
    }

    // set angle(deg) {
    //     this.angle = deg;
    // }

    // get angle() {
    //     return this.angle;
    // }

    // set magnitude(mag) {
    //     this.magnitude = mag;
    // }

    // get magnitude() {
    //     return this.magnitude;
    // }

    getXComponent() {
        let radians = this.angle / 180 * Math.PI;
        let sign;
        if (Math.cos(radians) == 0) {
            sign = 1;
        } else {
            sign = Math.cos(radians) / Math.abs(Math.cos(radians));
        }
        return Math.cos(radians) * this.magnitude;
    }

    getYComponent() {
        let radians = this.angle / 180 * Math.PI;
        let sign;

        if (Math.sin(radians) == 0) {
            sign = 1;
        } else {
            sign = Math.sin(radians) / Math.abs(Math.sin(radians));
        }

        return Math.sin(radians) * this.magnitude;
    }

    attr() {
        return `(${this.magnitude}, ${this.angle})`;
    }

    comps() {
        return `(${this.getXComponent()}, ${this.getYComponent()})`;
    }
    static getMagnitude(x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

    static getAngleBearing(x, y) {
        let opposite = y;
        let adjacent = x;
        let angleCorrection;

        if (x >= 0) {
            angleCorrection = y >= 0? 0:360;
        } else {
            angleCorrection = y < 0? -180:180;
        }

        if (adjacent == 0) {
            adjacent = 1e-16;
        }

        let angle = Math.atan(Math.abs(opposite) / Math.abs(adjacent));

        let degrees = Math.abs((angle / Math.PI * 180) - angleCorrection);

        return degrees
    }

    static addVector(v1, v2) {
        let xSum = v1.getXComponent() + v2.getXComponent();
        let ySum = v1.getYComponent() + v2.getYComponent();

        let mag = Vector.getMagnitude(xSum, ySum);

        let angle = Vector.getAngleBearing(xSum, ySum)

        alert(`${mag}, ${angle} GGGG`);

        return new Vector(mag, angle);
    }
}

class BodySystem {
    static G = 100;
    constructor() {
        this.timeStep = 0.1;
        this.bodies = [];
    }

    addBody(body) {
        this.bodies.push(body);
    }

    calculateForce(b1, b2) {
        let dist = this.calculateDistance(b1, b2);
        return BodySystem.G * (b1.mass * b2.mass) / Math.pow(dist, 2);
    }

    calculateDistance(b1, b2) {
        let dx = b1.x - b2.x;
        let dy = b1.y - b2.y;
        let dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

        return dist
    }
}

class Body {
    constructor(mass, pos, system, id) {
        this.mass = mass;
        this.x = pos[0];
        this.y = pos[1];
        this.vector = new Vector(0, 0);
        this.id = id;

        document.getElementById(this.id).style.transform = `translate(calc(${this.x}px - 50%), calc(${this.y}px - 50%))`;

        system.addBody(this);
    }



    move() {
        this.x = this.x + this.vector.getXComponent();
        this.y = this.y + this.vector.getYComponent();

        document.getElementById(this.id).style.transform = `translate(calc(${this.x}px - 50%), calc(${this.y}px - 50%))`;
        // document.getElementById(this.id).style.left = `${this.x}px`;
        // document.getElementById(this.id).style.top = `${this.y}px`;
    }
}

function randomNum(max) {
    return Math.floor(Math.random() * max);
}

class BG {
    static makeStars() {
        for (let i = 0; i < 10; i++) {
            let star = document.createElement("div");
            star.innerHTML = '.';
            star.classList.add("star");

            let x = randomNum(200);
            let y = randomNum(200);

            alert(`${x}, ${y}`);

            star.style.left = `${x}px`;
            star.style.top = `${y}px`;

            // alert(`yes ${i}`);
            try {
                let bg = document.getElementById("bgStars");
                // alert(bg);
                bg.appendChild(star);
            } catch (e) {
                alert(e);
            }
        }
    }
}


$(document).ready(function() {
    // BG.makeStars();

    var testVec = new Vector(0, 0);
    var v2 = new Vector(30, 90);

    var system = new BodySystem();
    var sun = new Body(10000, [window.innerWidth / 2, window.innerHeight / 2], system, "sun");
    var earth = new Body(1, [230, 300], system, "earth");

    try {
        for (let i=0; i < 1000; i++) {
            // setTimeout(()=>{
            //     earth.x++;
            //     earth.move();
            // }, 50 * i);
            setTimeout(()=>{
                let force = system.calculateForce(earth, sun);
                let accel = force / earth.mass;
                let dist = accel * Math.pow(BodySystem.timeStep, 2);
                let angle = Vector.getAngleBearing(earth.x, earth.y);
        
                // alert(`${force}, ${accel}, ${dist}, ${angle}`);
        
                let distVector = new Vector(dist, angle);
                earth.vector = Vector.addVector(earth.vector, distVector);

                alert(earth.vector.attr());
    
                earth.move();
            }, 100 * i);
            
        }    
    } catch (e) {
        alert(e);
    }
    
});

