$(document).ready(function() {
    alert("hello world");

    $("#value-slider").on("input", function() {
        // change border-radius of box
        let box = document.getElementById("box");
        box.style.borderRadius = (box.offsetWidth / 200) * this.value + "px";


        // change display value
        let slider_val_disp = document.querySelector(".display");
        slider_val_disp.innerHTML = `${this.value}`; 
    });

    $("#tilt-slider").on("input", function() {
        // change border-radius of box
        let platform = document.getElementById("platform");
        platform.style.transform = `rotate(${((this.value - 50)/100) * 180}deg)`
        


        // change display value
        let slider_val_disp = document.getElementById("angle_disp");
        slider_val_disp.innerHTML = `${this.value}`; 
    });

    // setInterval(listenSlider, 10);
});