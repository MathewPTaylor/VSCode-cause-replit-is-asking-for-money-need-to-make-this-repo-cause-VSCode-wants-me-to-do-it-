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
//            alert("not a word");
            notAWord();
            return
        }

        preventInput = true;

        // 'revealing' the status of each letter, basically changing the colour of each square based on the location and value of the letter
        for (let i=0; i<5; i++) {
            setTimeout(function() {
                console.log(guesses, guesses * 5, i);
                let square = document.getElementById("main").children[((guesses) * 5) + i];
                square.classList.add("reveal");
                square.classList.add(color_code[feedback[i]]);
            }, 250 * i);
        }
        
        await sleep(1500);

        // changing the colors of the keys on the visual keyboard that were used on the previous guess
        for (let i=0; i<5; i++) {
            let key = document.getElementById(current_guess[i].toUpperCase());
            key.style.backgroundColor = "var(--" + ["grey", "yellow", "green"][feedback[i] - 1] + ")";
        }
        
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
        // display "you win" message on screen
        displayPopUp("You Win!", 1500);

        // make guessed row jump up and down
        for (let i = 0; i < 5; i++) {
            let square = document.getElementById("main").children[(guesses * 5) + i];
            square.style.animationName = "giddy";
            let duration = 350;
            square.style.animationDuration = duration + "ms";
            square.style.animationDelay = i * (duration / 5) + "ms";
        }
    }

    function loseHandle() {
        displayPopUp("You lost", 2000);
    }

    async function notAWord() {
        for (let i = 0; i < 5; i++) {
            let square = document.getElementById("main").children[(guesses * 5) + i];
            square.classList.add("not-word");
        }

        displayPopUp("Not a word", 1000);
        await sleep(200);

        for (let i = 0; i < 5; i++) {
            let square = document.getElementById("main").children[(guesses * 5) + i];
            square.classList.remove("not-word");
        }
    }

    function displayPopUp(message, duration) {
        let popupWrapper = document.getElementById("popup-wrapper");
        let popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = message

        popupWrapper.appendChild(popup);
        setTimeout(()=>{
            popup.remove();
        }, duration);
    }

    function inputHandle(key) {
        if (preventInput) {
            return
        }

        if (isIn(key, alphabet)) {
            if (cur_column < 5) {
                // visually add the letter that the player has pressed
                let square = document.getElementById("main").children[(guesses * 5) + cur_column];
                square.classList.add("selected-square");
                square.innerHTML = key.toUpperCase();

                // add the letter to the array
                current_guess.push(key.toLowerCase())
                cur_column++;
            }

        } else if (key == "Backspace") {
            if (cur_column > 0) {
                cur_column--;
                // visually remove the letter
                let square = document.getElementById("main").children[(guesses * 5) + cur_column];
                square.classList.remove("selected-square");
                square.innerHTML = "";

                // remove the letter from the array
                current_guess.pop();
            }

        } else if (key == "Enter") {
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
        }
        keypressed = true;
    }

    $(document).on("keydown", e=>{inputHandle(e.key)});

    $(".key").click(function() {
        inputHandle(this.getAttribute("keyval"));
    });
});