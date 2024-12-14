$(document).ready(function() {
    var dataset = [1, 2, 3, 4, 5];


    console.log(d3.select("body").select("p"), "BEFORE");
    console.log(d3.select("body").selectAll("p"), "AFTER");
    d3.select("body")
    .select("p")
    .data(dataset)
    .enter()
    .append("p")
    .text("yooo multi PPs")
});