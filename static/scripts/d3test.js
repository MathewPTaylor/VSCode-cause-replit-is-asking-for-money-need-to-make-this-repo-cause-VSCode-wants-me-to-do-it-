class CSV {
    static data = [];
}

$(document).ready(function() {
    var dataYO = [];
    function getCSV(candle) {
        let urlThee;
        if (!candle) {
            urlThee = "/get_csv"
        } else {
            urlThee = "/get_csv_candle"
            alert(urlThee);
        }
        
        try {
            $.ajax({
                url: urlThee,
                method: "post",
                success: (result)=>{ajaxHandle(result)}
            });
        } catch (e) {
            console.log(e);
        }
    }

    function ajaxHandle(result) {
        alert(result);
        CSV.data = result;
        dataYO = result;
        document.getElementById("container").appendChild(svgGraph(CSV.data));
        // svgGraph();
        // document.getElementById("container").appendChild(svgGraph());
        
    }
   
    function svgGraph() {
        const margin = {top: 70, right: 30, bottom: 40, left: 80};
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        // set scales
        const x = d3.scaleUtc()
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

        d3.select("#container").on("mousemove touchmove", function(event) {
            // alert(x.invert(d3.pointer(event, this)[0]));
            // update(x.invert(d3.pointer(event, this)[0]));
            update(x.invert(d3.pointer(event, this)[0]))
            d3.event.preventDefault();
        });

        d3.select("#container").on("mouseleave", function() {
            // alert("yoyoyoyo")
            d3.event.preventDefault();
        });

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
                .ticks(d3.timeYear.every(4))
                .tickFormat(d3.timeFormat("%b %Y")));

            // add y axis
            svg.append("g")
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width)
                .attr("stroke-opacity", 0.1)
            )
            .call(g => g.append("text")
                .attr("x", margin.left / 2)
                .attr("y", -10)
                .attr("fill", "currentColor")
                // .attr("text-anchor", "start")
                .text("↑ Daily close ($)")
            );

            const rule = svg.append("g")
                .append("line")
                .attr("y1", height)
                .attr("y2", 0)
                .attr("stroke", "black")
                .attr("transition", "0.1s ease");

            
            // create line generator
            const line = d3.line()
                .x(d => x(d.date))
                .y(d => y(d.value));

            console.log(d3.line().x);


            // add line to svg
            svg.append("path")
                .datum(CSV.data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1)
                .attr("d", line);


            function update(date) {
                date = d3.utcDay.round(date);
                rule.attr("transform", `translate(${x(date)},0)`);
                svg.property("value", date).dispatch("input"); // for viewof compatibility
            }
            
            // Create the introductory animation. It repeatedly calls the update function for dates ranging
            // from the last to the first date of the x scale.
            d3.transition()
                .ease(d3.easeCubicOut)
                .duration(1500)
                .tween("date", () => {
                const i = d3.interpolateDate(x.domain()[1], x.domain()[0]);
                return t => update(i(t));
            });
            
        } catch (e) {
            console.log(e);
        }
    }

    chart = ()=> {
        // Declare the chart dimensions and margins.
        const width = 928;
        const height = 500;
        const marginTop = 20;
        const marginRight = 30;
        const marginBottom = 30;
        const marginLeft = 40;
      
        // Declare the x (horizontal position) scale.
        const x = d3.scaleUtc(d3.extent(aapl, d => d.Date), [marginLeft, width - marginRight]);
      
        // Declare the y (vertical position) scale.
        const y = d3.scaleLinear([0, d3.max(aapl, d => d.Close)], [height - marginBottom, marginTop]);
      
        // Declare the line generator.
        const line = d3.line()
            .x(d => x(d.Date))
            .y(d => y(d.Close));
      
        // Create the SVG container.
        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
            .attr("style", "max-width: 100%; height: auto; height: intrinsic; font: 10px sans-serif;")
            .style("-webkit-tap-highlight-color", "transparent")
            .style("overflow", "visible")
            .on("pointerenter pointermove", pointermoved)
            .on("pointerleave", pointerleft)
            .on("touchstart", event => event.preventDefault());
      
        // Add the x-axis.
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
      
        // Add the y-axis, remove the domain line, add grid lines and a label.
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).ticks(height / 40))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width - marginLeft - marginRight)
                .attr("stroke-opacity", 0.1))
            .call(g => g.append("text")
                .attr("x", -marginLeft)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("↑ Daily Close ($)"));
      
        // Append a path for the line.
        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line(aapl));
      
        // Create the tooltip container.
        const tooltip = svg.append("g");
      
        function formatValue(value) {
          return value.toLocaleString("en", {
            style: "currency",
            currency: "USD"
          });
        }
        
        function formatDate(date) {
          return date.toLocaleString("en", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC"
          });
        }
        
        // Add the event listeners that show or hide the tooltip.
        const bisect = d3.bisector(d => d.Date).center;
        function pointermoved(event) {
          const i = bisect(aapl, x.invert(d3.pointer(event)[0]));
          tooltip.style("display", null);
          tooltip.attr("transform", `translate(${x(aapl[i].Date)},${y(aapl[i].Close)})`);
      
          const path = tooltip.selectAll("path")
            .data([,])
            .join("path")
              .attr("fill", "white")
              .attr("stroke", "black");
      
          const text = tooltip.selectAll("text")
            .data([,])
            .join("text")
            .call(text => text
              .selectAll("tspan")
              .data([formatDate(aapl[i].Date), formatValue(aapl[i].Close)])
              .join("tspan")
                .attr("x", 0)
                .attr("y", (_, i) => `${i * 1.1}em`)
                .attr("font-weight", (_, i) => i ? null : "bold")
                .text(d => d));
      
          size(text, path);
        }
      
        function pointerleft() {
          tooltip.style("display", "none");
        }
      
        // Wraps the text with a callout path of the correct size, as measured in the page.
        function size(text, path) {
          const {x, y, width: w, height: h} = text.node().getBBox();
          text.attr("transform", `translate(${-w / 2},${15 - y})`);
          path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
        }
      
        return svg.node();
      }


    function svgBOI() {
        width = 600;
        height = 600;

        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("style", "backgrond-color: green;")

        svg.append("line")
            .attr("x", 300)
            .attr("y1", 0)
            .attr("y2", height)

        return svg.node();
    }

    function yo(ticker) {
        // Declare the chart dimensions and margins.
        const width = 928;
        const height = 600;
        const marginTop = 20;
        const marginRight = 30;
        const marginBottom = 30;
        const marginLeft = 40;

        console.log(ticker);
      
        // Declare the positional encodings.
        const x = d3.scaleBand()
            .domain(d3.utcDay
                .range(ticker.at(0).Date, +ticker.at(-1).Date + 1)
                .filter(d => d.getUTCDay() !== 0 && d.getUTCDay() !== 6))
            .range([marginLeft, width - marginRight])
            .padding(0.2);
      
        const y = d3.scaleLog()
            .domain([d3.min(ticker, d => d.Low), d3.max(ticker, d => d.High)])
            .rangeRound([height - marginBottom, marginTop]);
      
        // Create the SVG container.
        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, height]);
      
        // Append the axes.
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x)
              .tickValues(d3.utcMonday
                  .every(width > 720 ? 1 : 2)
                  .range(ticker.at(0).Date, ticker.at(-1).Date))
              .tickFormat(d3.utcFormat("%-m/%-d")))
            .call(g => g.select(".domain").remove());
      
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y)
              .tickFormat(d3.format("$~f"))
              .tickValues(d3.scaleLinear().domain(y.domain()).ticks()))
            .call(g => g.selectAll(".tick line").clone()
              .attr("stroke-opacity", 0.2)
              .attr("x2", width - marginLeft - marginRight))
            .call(g => g.select(".domain").remove());
      
        // Create a group for each day of data, and append two lines to it.
        const g = svg.append("g")
            .attr("stroke-linecap", "round")
            .attr("stroke", "black")
          .selectAll("g")
          .data(ticker)
          .join("g")
            .attr("transform", d => `translate(${console.log(x("25-05-2007"))},0)`);
      
        g.append("line")
            .attr("y1", d => y(d.Low))
            .attr("y2", d => y(d.High));
      
        g.append("line")
            .attr("y1", d => y(d.Open))
            .attr("y2", d => y(d.Close))
            .attr("stroke-width", x.bandwidth())
            .attr("stroke", d => d.Open > d.Close ? d3.schemeSet1[0]
                : d.Close > d.Open ? d3.schemeSet1[2]
                : d3.schemeSet1[8]);
      
        // Append a title (tooltip).
        const formatDate = d3.utcFormat("%B %-d, %Y");
        const formatValue = d3.format(".2f");
        const formatChange = ((f) => (y0, y1) => f((y1 - y0) / y0))(d3.format("+.2%"));
      
        g.append("title")
            .text(d => `${formatDate(d.Date)}
      Open: ${formatValue(d.Open)}
      Close: ${formatValue(d.Close)} (${formatChange(d.Open, d.Close)})
      Low: ${formatValue(d.Low)}
      High: ${formatValue(d.High)}`);
      
        return svg.node();
    }
    getCSV(false);   


    function yee() {
        const width = 500;
        const height = 500;
        x = d3.scaleLinear()
            .domain(10)
            .range()

        y = d3.scaleLinear()
            .domain(10)
            .range()
    }
    // alert(dataYO);
    // document.querySelector("body").appendChild(svgBOI());
    // document.getElementbyId("container").appendChild(yo(CSV.data));


});