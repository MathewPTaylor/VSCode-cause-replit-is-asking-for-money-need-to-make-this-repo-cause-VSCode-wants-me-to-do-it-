const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
function isIn(char, superString) {
    for (let i=0; i<alphabet.length; i++) {
        if (char == alphabet[i]) {
            return true;
        }
    }
    return false
}
const color_code = {
    1 : "absent",
    2 : "present",
    3 : "correct"
}


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

$(document).ready(function() {
    var keypressed = false;
    var guesses = 0;
    var cur_column = 0;
    var current_guess = [];
    var preventInput = false;

    async function checkResultHandle(result) {
        let isWord = result["isAWord"];
        let feedback = result["guessFeedback"];
        let isCorrectWord = result["correctWord"];

        if (!isWord) {
            alert("not a word");
            notAWord();
            return
        }

        preventInput = true;

        // 'revealing' the status of each letter, basically changing the colour of each square based on the location and value of the letter
        for (let i=0; i<5; i++) {
            // let square = document.getElementById("main").children[((guesses) * 5) + i];
            // square.style.animationDelay = 390 * i + "ms"
            // square.classList.add("reveal"); 
            // setTimeout(()=>{
            //     square.classList.add(color_code[feedback[i]]);
            //     console.log("COLOUR")
            // }, 400 * i);

            setTimeout(function() {
                console.log(guesses, guesses * 5, i);
                let square = document.getElementById("main").children[((guesses) * 5) + i];
                square.classList.add("reveal");
                square.classList.add(color_code[feedback[i]]);
            }, 250 * i);
        }

        
        await sleep(1250);
        
        // check if the player has guessed correctly
        if (isCorrectWord) {
            winHandle();
        } else {
            // increment the number of guesses
            guesses++;
            // reset current column
            cur_column = 0;
            // reset current_guess array
            current_guess = [];
            if (guesses >= 6) { // check if player has run out of guesses
                loseHandle();
            }
        }

        preventInput = false;
    }

    async function winHandle() {
        alert("YOU WIN!!!");
        // make guessed row jump up and down
        for (let i = 0; i < 5; i++) {   
            console.log("WINNNNNNNN", i);
            let square = document.getElementById("main").children[(guesses * 5) + i];
            square.style.transform = "translateY(25%)";
            await sleep(50);
            // square.style.transform = "translateY(0%)";
            
        }
    }

    function loseHandle() {
        alert("YOU LOST!!!");
    }

    async function notAWord() {

        for (let i = 0; i < 5; i++) {
            let square = document.getElementById("main").children[(guesses * 5) + i];
            square.classList.add("not-word");
        }

        // document.getElementById("main").children[(guesses * 5) + 0].classList.add("not-word");
        // document.getElementById("main").children[(guesses * 5) + 1].classList.add("not-word");
        // document.getElementById("main").children[(guesses * 5) + 2].classList.add("not-word");
        // document.getElementById("main").children[(guesses * 5) + 3].classList.add("not-word");
        // document.getElementById("main").children[(guesses * 5) + 4].classList.add("not-word");

        await sleep(200);

        // document.getElementById("main").children[(guesses * 5) + 0].classList.remove("not-word");
        // document.getElementById("main").children[(guesses * 5) + 1].classList.remove("not-word");
        // document.getElementById("main").children[(guesses * 5) + 2].classList.remove("not-word");
        // document.getElementById("main").children[(guesses * 5) + 3].classList.remove("not-word");
        // document.getElementById("main").children[(guesses * 5) + 4].classList.remove("not-word");

        for (let i = 0; i < 5; i++) {
            let square = document.getElementById("main").children[(guesses * 5) + i];
            square.classList.remove("not-word");
        }
    }

    $(document).on("keydown", function(e) {
        if (preventInput) {
            return
        }

        // alert(e.key);
        if (isIn(e.key, alphabet)) {
            if (cur_column < 5) {
                // visually add the letter that the player has pressed
                let square = document.getElementById("main").children[(guesses * 5) + cur_column];
                square.classList.add("selected-square");
                square.innerHTML = e.key.toUpperCase();

                // add the letter to the array
                current_guess.push(e.key.toLowerCase())
                cur_column++;
            }
            
        } else if (e.key == "Backspace") {
            if (cur_column > 0) {
                cur_column--;
                // visually remove the letter
                let square = document.getElementById("main").children[(guesses * 5) + cur_column];
                square.classList.remove("selected-square");
                square.innerHTML = "";

                // remove the letter from the array
                current_guess.pop();
            }
                
        } else if (e.key == "Enter") {
            // alert(JSON.stringify(current_guess));
            if (current_guess.length >= 5) {
                let data = JSON.stringify(current_guess);
                console.log(data);
                $.ajax({
                    method: "POST",
                    url: "/check_guess",
                    contentType: "application/json",
                    dataType: "json",
                    data: data,
                    success: (result)=>{checkResultHandle(result)}
                });
                
            }
            // alert("ajax fired up");
        }
        keypressed = true;
    });

    
});