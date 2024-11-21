import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
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

            // x scale
            xAxis = d3.scaleLinear([0, 100], [0, width]);

            //y scale
            yAxis = d3.scaleLinear([0, 100], [0, height]);

            let graph = document.getElementById("graph-container");
            graph.appendChild(xAxis);
        } catch (e) {
            alert(e);
        }
    }

    addGraph();
});