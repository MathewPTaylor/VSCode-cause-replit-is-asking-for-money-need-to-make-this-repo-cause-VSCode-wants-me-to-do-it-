const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
function isIn(char, superString) {
    for (let i=0; i<alphabet.length; i++) {
        if (char == alphabet[i]) {
            return true;
        }
    }
    return false
}

$(document).ready(function() {
    var keypressed = false;
    var guesses = 0;
    var cur_column = 0;
    var current_guess = [];
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
            alert(JSON.stringify(current_guess));
            $.ajax({
                type: "POST",
                url: "/check_guess",
                dataType: "text",
                data: JSON.stringify(current_guess),
                success: checkResultHandle(result)
            });
        }
        keypressed = true;
    });
});