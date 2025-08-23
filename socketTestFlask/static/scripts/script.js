$(document).ready(function() {
    var socket = io("https://friendly-space-xylophone-wr7xv6rj75vrc9qr9-5000.app.github.dev", {
        "transports": ["websocket", "polling"]
    });

    // socket.on("connect", ()=>{
    //     console.log("connected to server!");
    // });
});