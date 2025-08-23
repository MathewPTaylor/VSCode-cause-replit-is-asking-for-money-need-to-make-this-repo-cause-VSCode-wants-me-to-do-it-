$(document).ready(function() {
    // var socket = io.connect(window.location.href)

    // socket.on("connect", function() {
    //     console.log("")
    // });

    $("#roomForm").submit(function(e) {
        try {
            
            e.preventDefault();
            
            let inputs = document.getElementById("roomForm").querySelectorAll("input");
            console.log(inputs);
            let username = inputs[0].value;
            let json_data = JSON.stringify({"USERNAME": username});
            
            window.sessionStorage.setItem("ROOM_ID", inputs[1].value);
            
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
                inputUnError();
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
            success: (result)=>{successHandle(result)},
        });
    }

    function successHandle(result) {
        let redirect = result.CAN_REDIRECT;
        console.log(redirect);

        if (redirect) {
            console.log();
            let path = "/game/" + window.sessionStorage.getItem("ROOM_ID");
            // let path = "/game";
            window.location.pathname = path;
        } else {    
            setLoadingIcon(true);
            var yes = setInterval(()=>{
                console.log("sent ajax.");
                $.post("/checkPendingRoom").then((resp) => {
                    data = JSON.parse(resp);
                    console.log(`RESPONSE: ${resp}`);   

                    if (data.RESULT) { // room has another player in it, ready to play
                        setLoadingIcon(false);
                        window.location.pathname = "/game/" + window.sessionStorage.getItem("ROOM_ID");  
                        clearInterval(yes);
                        console.log("INTERVAL CLEARED");
                    }
                }).fail((err) => {
                    console.log(`ERROR: ${err}`);
                    clearInterval(yes);
                });
            }, 5000)
        }


        // if successful redirect user to the game page
        // if not, have frontend sending request every few seconds or so.
    }

    function setLoadingIcon(onOff) {
        let loadingCircle = document.getElementById("loadingDiv");
        if (onOff) {
            loadingCircle.style.display = "block";
            loadingCircle.classList.add("loading");
        } else {
            loadingCircle.style.display = "none";
            loadingCircle.classList.remove("loading");
        }
    }

    function inputError() {
        let usernameInput = document.getElementById("roomForm").querySelector("input");
        usernameInput.classList.add("input-error");

        let errormessage = document.getElementById("roomForm").querySelector("small")
        errormessage.style.display = "block";
    }

    function inputUnError() {
        let usernameInput = document.getElementById("roomForm").querySelector("input");
        usernameInput.classList.remove("input-error");

        let errormessage = document.getElementById("roomForm").querySelector("small")
        errormessage.style.display = "none";
    }
});