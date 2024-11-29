// import * as d3 from "https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js";

$(document).ready(function() {
    $("#input-form").click((e)=>{
        // prepare ajax request
        // get return per annum
        try {
            let returnPA = parseInt(document.getElementById("returnPA").value);
            let investmentPA = parseInt(document.getElementById("perYear").value);
            let noYears = parseInt(document.getElementById("noYears").value);

            if (isNaN(returnPA) || isNaN(investmentPA) || isNaN(noYears)) {
                return
            }

            serverData = {
                "ReturnPA": returnPA,
                "InputPA": investmentPA,
                "NoYears": noYears
            }
            $.ajax({
                url: "/calculate",
                type: 'post',
                contentType: "application/json",
                context: "json",
                data: JSON.stringify(serverData),
                success: (result)=>{ajaxHandle(result)},
                failure: (r)=>{alert("Failed request")}
            });
            // alert(`${returnPA}, ${investmentPA}`);
            
            return false;
        } catch (e) {
            alert(e);
        }
    });

    function ajaxHandle(result) {
        _result = JSON.parse(result)
        try {
            let disp = document.getElementById("earningsDisp");
            let splitted = String(_result.Amount.toFixed(2)).split('.');
            let wholeNum = addCommas(splitted[0]);
            disp.innerHTML = `Earnings: $${wholeNum}.${splitted[1]}`;
        } catch (e) {
            alert(e);
        }   
    }

    function addCommas(string) {
        let newString = "";
        
        for (let i=0; i<string.length; i++) {
            if ((i) % 3 == 0 && i > 0) {
                newString = ',' + newString;
            }
            newString = string[string.length - i - 1] + newString  
        }
        return newString;
    }

    function addGraph() {
        try {
            let width = 400;
            let height = 400;
            let marginBottom = 50;

            // x scale
            xAxis = d3.scaleLinear([0, 100], [30, width]);

            //y scale
            yAxis = d3.scaleLinear([0, 100], [30, height]);

            // make line
            line = d3.line()
            line.x(xAxis)
            line.y(yAxis);

            // svg
            svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewbox", [0, 0, width*1.5, height*1.5]);

            // add x axis
            svg.append("g").call(d3.axisBottom(xAxis)).style("transform", `translate(0, ${height-marginBottom}px)`);

            // add y axis
            svg.append("g").call(d3.axisLeft(yAxis)).style('transform', `translate(20px, 0)`);
            
            // append path for line
            svg.append("path").attr("stroke", "lightblue").attr("stroke-width", "1.5");


            alert("YOOOO");
            return svg.node();
        } catch (e) {
            alert(e);
        }
    }

    let graph = document.getElementById("graph-container");
    graph.appendChild(addGraph());
});