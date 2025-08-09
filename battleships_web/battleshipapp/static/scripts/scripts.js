$(document).ready(function() {
    // var socket = io.connect(window.location.href)

    // socket.on("connect", function() {
    //     console.log("")
    // });

    $("#roomForm").submit(function(e) {
        try {
            
            e.preventDefault();
            
            let username = document.getElementById("roomForm").querySelectorAll("input")[0].value;
            let json_data = JSON.stringify({"USERNAME": username});
            
            $.ajax({
                url: "/checkNameAvailability",
                method: "post",
                data: json_data,
                dataType: "json",
                contentType: "application/json",
                success: (result) => {nameResultHandle(result)},
                failure: (result) => {nameFailureHandle(result)}
            });
        } catch (error) {
            alert(error);
        }
        });

    $("#roomorm").submit(function(e) {
        e.preventDefault();
        // get username and game id
        let inputs = document.getElementById("roomForm").querySelectorAll("input");
        let username = inputs[0].value;
        let roomID = inputs[1].value;

        let dict = {
            'ROOM_ID': roomID
        }

        $.ajax({
            method: "POST",
            url: "/checkGame",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(dict),
            // success: (data)=>{successHandle()},
        });
        // alert("sent that bitch");

        // gonna check if room id exists
        // socket.emit("checkGame", JSON.stringify(dict));
        // if exist join the room
        // if not add room to db and run set interval requests
    });

    function nameResultHandle(resultObj) {
        try {
            let result = resultObj.RETURN;
            if (result) { // name is unique
                  checkGame();
            } else { // name is not unique
                inputError();   
            }
            // alert("SUCCESS NAME IS UNIQUE");
        } catch (error) {
            alert(error);
        }
    }

    function checkGame() {
        let inputs = document.getElementById("roomForm").querySelectorAll("input");
        let username = inputs[0].value;
        let roomID = inputs[1].value;

        let dict = {
            'ROOM_ID': roomID,
            "USERNAME": username
        }

        $.ajax({
            method: "POST",
            url: "/checkGame",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(dict),
            // success: (data)=>{successHandle()},
        });
    }

    function inputError() {
        let usernameInput = document.getElementById("roomForm").querySelector("input");
        usernameInput.classList.add("input-error");

        let errormessage = document.getElementById("roomForm").querySelector("small")
        errormessage.style.display = "block";
    }

    function inputGood() {
        let usernameInput = document.getElementById("roomForm").querySelector("input");
        usernameInput.classList.remove("input-error");

        let errormessage = document.getElementById("roomForm").querySelector("small")
        errormessage.style.display = "none";
    }
});