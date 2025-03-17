$(document).ready(function() {
    var socket = io.connect(window.location.href)

    socket.on("connect", function() {
        console.log("")
    });

    $("#roomForm").submit(function(e) {
        e.preventDefault();
        // get username and game id
        let inputs = document.getElementById("roomForm").querySelectorAll("input");
        let username = inputs[0].value;
        let gameID = inputs[1].value;

        let dict = {
            'GAME_ID': gameID
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
});