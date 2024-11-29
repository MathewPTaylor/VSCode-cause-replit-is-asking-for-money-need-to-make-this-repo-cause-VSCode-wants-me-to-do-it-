class CSV {
    static data = [];
}

$(document).ready(function() {
    try {
        $.ajax({
            url: "/get_csv",
            method: "post",
            success: (result)=>{ajaxHandle(result)}
        });
    } catch (e) {
        alert(e);
    }

    function ajaxHandle(result) {
        alert(result);
        CSV.data = result;
        alert(CSV.data.length);
        // set margins and dimensions for chart
        const margin = {top: 70, right: 30, bottom: 40, left: 80};
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        // set scales
        const x = d3.scaleTime()
        .range([0, width]);

        const y = d3.scaleLinear()
        .range([height, 0]);

        // make svg
        const svg = d3.select("#container")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g") // appending a group element
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // make fake data
        // data set needs to have an x and y heading, in the tutorial im following is using 'date' and 'value'
        try {
            const parseDate = d3.timeParse("%Y-%m-%d");
            CSV.data.forEach(d => {
                d.date = parseDate(d.date);
                d.value = +d.value; // the + sign tells d3 that the value is a number
            });
        

            // make domain of x and y
            x.domain(d3.extent(CSV.data, d=> d.date)); // extent() automatically makes the scale for you based on the data 
            y.domain([0, d3.max(CSV.data, d=> d.value)]);


            // add x axis
            svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x)
                .ticks(d3.timeYear.every(5))
                .tickFormat(d3.timeFormat("%b %Y")));

            // add y axis
            svg.append("g")
                .call(d3.axisLeft(y)
            );

            
            // create line generator
            const line = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.value));

            // add line to svg
            svg.append("path")
                .datum(CSV.data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1)
                .attr("d", line);
        } catch (e) {
            alert(e);
        }
    }
});