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
    1 : "#787c7f",
    2 : "#c8b653",
    3 : "#6ca965"
}

$(document).ready(function() {
    var keypressed = false;
    var guesses = 0;
    var cur_column = 0;
    var current_guess = [];

    function checkResultHandle(result) {
        let isWord = result["isAWord"];
        let feedback = result["guessFeedback"];
        let isCorrectWord = result["correctWord"];

        // alert(isWord);
        // alert(JSON.stringify(result));
        if (!isWord) {
            alert("not a word");
            return
        }

        for (let i=0; i<5; i++) {
            setTimeout(function(i) {
                // alert(feedback[i]);
                let square = document.getElementById("main").children[(guesses * 5) + i];
                square.style.backgroundColor = color_code[feedback[i]];

                square.classList.add("reveal");
                // square.style.border = `0.2rem solid ${color_code[feedback[i]]}`;
            }, 500);
            
        }

    }

    function yes(i) {
        // setTimeout(500 * i, );
    }

    $(document).on("keydown", function(e) {
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
            let data = JSON.stringify(current_guess)
            $.ajax({
                method: "POST",
                url: "/check_guess",
                contentType: "application/json",
                dataType: "json",
                data: data,
                success: (result)=>{checkResultHandle(result)}
            });

            alert("ajax fired up");
        }
        keypressed = true;
    });

    
});