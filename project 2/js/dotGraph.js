// HELPERS
function parseData(data) {
    var res = []
    data.forEach(d => {
        var curr = {
            rank: d.rank,
            avgLen: parseFloat(d.lengthAvg),
            Polarity: parseFloat(d.polarity),
            Subjectivity: parseFloat(d.subjectivity)
        }
        res.push(curr);
    });

    return res;
}

function getBounds(d, paddingFactor) {
    // Find min and maxes (for the scales)
    paddingFactor = typeof paddingFactor !== 'undefined' ? paddingFactor : 1;

    var keys = _.keys(d[0]),
        b = {};
    _.each(keys, function (k) {
        b[k] = {};
        _.each(d, function (d) {
            if (isNaN(d[k]))
                return;
            if (b[k].min === undefined || d[k] < b[k].min)
                b[k].min = d[k];
            if (b[k].max === undefined || d[k] > b[k].max)
                b[k].max = d[k];
        });
        b[k].max > 0 ? b[k].max *= paddingFactor : b[k].max /= paddingFactor;
        b[k].min > 0 ? b[k].min /= paddingFactor : b[k].min *= paddingFactor;
    });
    return b;
    // return {
    //     Subjectivity: {
    //         max: 1,
    //         min: -1
    //     },
    //     Polarity: {
    //         max: 1,
    //         min: 0
    //     }
    // }
}

function getElement(data, index) {
    var res = [];
    data.forEach(d => {
        res.push(d[index]);
    });
    return res;
}

function getCorrelation(xArray, yArray) {
    function sum(m, v) {
        return m + v;
    }

    function sumSquares(m, v) {
        return m + v * v;
    }

    function filterNaN(m, v, i) {
        isNaN(v) ? null : m.push(i);
        return m;
    }

    // clean the data (because we know that some values are missing)
    var xNaN = _.reduce(xArray, filterNaN, []);
    var yNaN = _.reduce(yArray, filterNaN, []);
    var include = _.intersection(xNaN, yNaN);
    var fX = _.map(include, function (d) {
        return xArray[d];
    });
    var fY = _.map(include, function (d) {
        return yArray[d];
    });

    var sumX = _.reduce(fX, sum, 0);
    var sumY = _.reduce(fY, sum, 0);
    var sumX2 = _.reduce(fX, sumSquares, 0);
    var sumY2 = _.reduce(fY, sumSquares, 0);
    var sumXY = _.reduce(fX, function (m, v, i) {
        return m + v * fY[i];
    }, 0);

    var n = fX.length;
    var ntor = ((sumXY) - (sumX * sumY / n));
    var dtorX = sumX2 - (sumX * sumX / n);
    var dtorY = sumY2 - (sumY * sumY / n);

    var r = ntor / (Math.sqrt(dtorX * dtorY)); // Pearson ( http://www.stat.wmich.edu/s216/book/node122.html )
    var m = ntor / dtorX; // y = mx + b
    var b = (sumY - m * sumX) / n;

    // console.log(r, m, b);
    return {
        r: r,
        m: m,
        b: b
    };
}

function readSentiment(data, error) {
    if (error) console.log(error);

    var rscale = d3.scaleSqrt()
        .domain([1, 500])
        .range([5, 20])

    var xAxis = 'Subjectivity',
        yAxis = 'Polarity';

    var data = parseData(data);
    var bounds = getBounds(data, 1);

    // SVG AND D3 STUFF
    var svg = d3.select("#dotgraph")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 640);
    var xScale, yScale;

    svg.append('g')
        .classed('chart', true)
        .attr('transform', 'translate(80, -60)');

    // Build menus
    // d3.select('#x-axis-menu')
    //     .selectAll('li')
    //     .data(xAxisOptions)
    //     .enter()
    //     .append('li')
    //     .text(function (d) {
    //         return d;
    //     })
    //     .classed('selected', function (d) {
    //         return d === xAxis;
    //     })
    //     .on('click', function (d) {
    //         xAxis = d;
    //         updateChart();
    //         updateMenus();
    //     });

    // d3.select('#y-axis-menu')
    //   .selectAll('li')
    //   .data(yAxisOptions)
    //   .enter()
    //   .append('li')
    //   .text(function(d) {return d;})
    //   .classed('selected', function(d) {
    //     return d === yAxis;
    //   })
    //   .on('click', function(d) {
    //     yAxis = d;
    //     updateChart();
    //     updateMenus();
    //   });

    // Rank name
    d3.select('svg g.chart')
        .append('text')
        .attr('id', 'rankLabel')
        .attr('x', 0)
        .attr('y', 170)
        .style('font-size', '80px')
        .style('font-weight', 'bold')
        .style('fill', '#ddd')

    // Best fit line (to appear behind points)
    d3.select('svg g.chart')
        .append('line')
        .attr('id', 'bestfit');

    // Axis labels
    d3.select('svg g.chart')
        .append('text')
        .attr('id', 'xLabel')
        .attr('class', 'label')
        .attr('x', 400)
        .attr('y', 670)
        .attr('text-anchor', 'middle')
        .text(xAxis);

    d3.select('svg g.chart')
        .append('text')
        .attr('transform', 'translate(-60, 330)rotate(-90)')
        .attr('id', 'yLabel')
        .attr('class', 'label')
        .attr('text-anchor', 'middle')
        .text('Polarity');

    // Render points
    updateScales();
    // var pointColour = d3.scaleOrdinal(d3.schemeCategory10);

    d3.select('svg g.chart')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function (d) {
            return isNaN(d[xAxis]) ? d3.select(this).attr('cx') : xScale(d[xAxis]);
        })
        .attr('cy', function (d) {
            return isNaN(d[yAxis]) ? d3.select(this).attr('cy') : yScale(d[yAxis]);
        })
        .attr('fill', function (d, i) {
            return colormap[d.rank];
            // return pointColour(i);
        })
        .attr('class', 'dots')
        .attr('id', d => 'dot' + d.rank)
        .style('cursor', 'pointer')
        .style('stroke', function (d, i) {
            var colorStroke = d3.scaleLinear().domain([0, 100])
                .interpolate(d3.interpolateHcl)
                .range([d3.rgb(colormap[d.rank]), d3.rgb('#FFF')]);
            return colorStroke(25);
        })
        .on('mouseover', function (d) {
            d3.select('svg g.chart #rankLabel')
                .text(d.rank)
                .transition()
                .duration(500)
                .style('opacity', 1);
        })
        .on('mouseout', function (d) {
            d3.select('svg g.chart #rankLabel')
                .transition()
                .duration(500)
                .style('opacity', 0);
        })
        .on('click', function (d) {
            let r = rscale(d['avgLen'])

            d3.select('#dot' + d.rank)
                .transition()
                .duration(100)
                .attr('r', r * 1.15)
                .transition()
                .duration(50)
                .attr('r', r * 0.8)
                .transition()
                .duration(40)
                .attr('r', r)

            updateBarChart(d.rank)
        })
        .append("svg:title")
        .text((d) => {
            return "Average length: " + d.avgLen + "\nPolarity: " + d.Polarity + "\nSubjectivity: " +
                d.Subjectivity;
        });

    updateChart(true);
    updateMenus();

    // Render axes
    d3.select('svg g.chart')
        .append("g")
        .attr('transform', 'translate(0, 630)')
        .attr('id', 'xAxis')
        .call(makeXAxis);

    d3.select('svg g.chart')
        .append("g")
        .attr('id', 'yAxis')
        .attr('transform', 'translate(-10, 0)')
        .call(makeYAxis);

    //// RENDERING FUNCTIONS
    function updateChart(init) {
        updateScales();

        d3.select('svg g.chart')
            .selectAll('circle')
            .transition()
            .duration(500)
            // .ease('quad-out')
            .ease(d3.easeQuadOut)
            .attr('cx', function (d) {
                return isNaN(d[xAxis]) ? d3.select(this).attr('cx') : xScale(d[xAxis]);
            })
            .attr('cy', function (d) {
                return isNaN(d[yAxis]) ? d3.select(this).attr('cy') : yScale(d[yAxis]);
            })
            .attr('r', function (d) {
                return rscale(d['avgLen']);
                // return isNaN(d[xAxis]) || isNaN(d[yAxis]) ? 0 : 12;
            })

        // Also update the axes
        d3.select('#xAxis')
            .transition()
            .call(makeXAxis);

        d3.select('#yAxis')
            .transition()
            .call(makeYAxis);

        // Update axis labels
        d3.select('#xLabel')
            .text(xAxis);
        d3.select('#yLabel')
            .text(yAxis);

        // Update correlation
        var xArray = getElement(data, xAxis);
        var yArray = getElement(data, yAxis);
        var c = getCorrelation(xArray, yArray);
        var x1 = xScale.domain()[0],
            y1 = c.m * x1 + c.b;
        var x2 = xScale.domain()[1],
            y2 = c.m * x2 + c.b;

        // Fade in
        d3.select('#bestfit')
            .style('opacity', 0)
            .attr('x1', xScale(x1))
            .attr('y1', yScale(y1))
            .attr('x2', xScale(x2))
            .attr('y2', yScale(y2))
            .transition()
            .duration(1500)
            .style('opacity', 1);
    }

    function updateScales() {
        xScale = d3.scaleLinear()
            .domain([bounds[xAxis].min, bounds[xAxis].max])
            .range([20, 780]);

        yScale = d3.scaleLinear()
            .domain([bounds[yAxis].min, bounds[yAxis].max])
            .range([600, 100]);
    }

    function makeXAxis(s) {
        s.call(d3.axisBottom()
            .scale(xScale));
    }

    function makeYAxis(s) {
        s.call(d3.axisLeft()
            .scale(yScale));
    }

    function updateMenus() {
        d3.select('#x-axis-menu')
            .selectAll('li')
            .classed('selected', function (d) {
                return d === xAxis;
            });
        d3.select('#y-axis-menu')
            .selectAll('li')
            .classed('selected', function (d) {
                return d === yAxis;
            });
    }
}

function main() {
    // draw sentiment graph
    d3.csv("data/sentiment.csv").then(readSentiment);
    updateBarChart("A+");
}

main();