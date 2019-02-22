//setup some containers to put the plots inside\
var rankList = [
    'A+', 'A', 'A-', 'B+', '***', '**', '*', 'S', 'N', 'X', 'B', 'B-', 'C+', 'C',
    'C-', 'D+', 'D', 'D-', 'E+', 'E', 'E-'
];

var artist_rank = {
    "A+": 0,
    "A": 1,
    'A-': 2,
    'B+': 3,
    'B': 4,
    'B-': 4,
    'C': 5,
    'C+': 5,
    'C-': 5,
    'D+': 6,
    'D': 6,
    'D-': 6
}

var rank_artist = [{
        "Sonny Rollins": [],
        "Franco": [],
        "New York Dolls": [],
        "Al Green": [],
        "Bob Dylan": [],
        "Charlie Parker": [],
        "Firesign Theatre": [],
        "Lefty Frizzell": [],
        "Neil Young": [],
        "Sly & the Family Stone": [],
        "Thelonious Monk": []
    },

    {
        "Aretha Franklin": [],
        "Angry Samoans": [],
        "Bonnie Raitt": [],
        "David Bowie": [],
        "Amy Rigby": [],
        "Andy Fairweather Low": [],
        "Archers of Loaf": [],
        "Azealia Banks": [],
        "B-52's": [],
        "Bettye Lavette": [],
        "Bill Withers": [],
        "Bing Crosby": [],
        "Black Uhuru": [],
        "Blind Willie Johnson": [],
        "Bob Dylan": [],
        "Bob Marley & the Wailers": [],
        "Brad Paisley": [],
        "Bruce Springsteen": [],
        "Burial": [],
        "Captain Beefheart and the Magic Band": [],
        "Charlie Parker": [],
        "Chic": [],
        "Cornershop": [],
        "Creedence Clearwater Revival": [],
        "Dawn Oberg": [],
        "De La Soul": [],
        "Delaney & Bonnie": [],
        "Dionne Warwick": [],
    },

    {
        "Al Green": [],
        "Ani DiFranco": [],
        "Amadou & Mariam": [],
        "Amy Rigby": [],
        "Archers of Loaf": [],
        "A Place to Bury Strangers": [],
        "Aaron Neville": [],
        "ABC": [],
        "Aerosmith": [],
        "Aesop Rock": [],
        "Allo Darlin'": [],
        "Arto Lindsay": [],
        "Atmosphere": [],
        "A Flock of Seagulls": [],
        "Abdullah Ibrahim": [],
        "Ab-Soul": [],
        "Aesop Rock & Homeboy Sandman": [],
        "Alanis Morissette": [],
        "Alex Chilton": [],
        "Ali Farka Tour": [],
        "Ali Hussan Kuban": [],
        "Alicia Keys": [],
        "Amy Allison": [],
        "Amy LaVere": [],
        "Ann Peebles": [],
        "Arca": [],
        "Arcade Fire": [],
        "Aretha Franklin": [],
        "Art Brut": [],
        "Ashford & Simpson": [],
        "Asleep at the Wheel": [],
        "Ass Ponys": [],
        "Astor Piazzolla": [],
        "Asylum Street Spankers": [],
    },

    {
        "Aretha Franklin": [],
        "Al Green": [],
        "B.B. King": [],
        "Aerosmith": [],
        "Albert Collins": [],
        "Alex Chilton": [],
        "Bachman-Turner Overdrive": [],
        "Barrence Whitfield and the Savages": [],
        "D Train": [],
        "10cc": [],
        "Action Bronson": [],
        "Albert Griffiths and the Gladiators": [],
        "Angry Samoans": [],
        "Anne Murray": [],
        "Archie Shepp": [],
        "Arlo Guthrie": [],
        "Ashford & Simpson": [],
        "Atmosphere": [],
        "Aztec Camera": [],
        "B-52's": [],
        "Bad Brains": [],
        "Beck": [],
        "Bee Gees": [],
    },

    {
        "Aretha Franklin": [],
        "B.B. King": [],
        "Alice Cooper": [],
        "Anne Murray": [],
        "Arlo Guthrie": [],
        "Al Green": [],
        "1[],000 Maniacs": [],
        "Aerosmith": [],
        "Alan Price": [],
        "Ann Peebles": [],
        "Asleep at the Wheel": [],
        "Augie Meyers": [],
        "Bad Company": [],
        "Barry White": [],
        "10cc": [],
        "AC/DC": [],
        "Afrika Bambaataa and Family": [],
        "Allen Toussaint": [],
        "Alpha Blondy": [],
        "Amazing Rhythm Aces": [],
        "Angst": [],
        "Art of Noise": [],
        "Ashford & Simpson": [],
        "Bachman-Turner Overdrive": [],
        "Bad Religion": [],
        "Badfinger": [],
        "Bananarama": [],
        "Bee Gees": [],
        "Big Daddy Kane": [],
    },

    {
        "Barry Manilow": [],
        "Bette Midler": [],
        "Abba": [],
        "AC/DC": [],
        "Alice Cooper": [],
        "Barry White": [],
        "Bay City Rollers": [],
        "Bill Withers": [],
        "Billy Idol": [],
        "Billy Joel": [],
        "38 Special": [],
        "Aerosmith": [],
        "Andrew Gold": [],
        "Andy Pratt": [],
        "Anne Murray": [],
        "Aretha Franklin": [],
        "Arrested Development": [],
        "Ashford & Simpson": [],
        "Average White Band": [],
        "B.J. Thomas": [],
        "Barbara Mandrell": [],
        "Barbra Streisand": [],
        "Bee Gees": [],
    },

    {
        "Debby Boone": [],
        "Enya": [],
        "John Denver": [],
    }
]

//years array used to create the axes and also used for iteration of the Index.json	
var years = ['1967', '1968', '1969', '1970',
    '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981',
    '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992',
    '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003',
    '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014',
    '2015', '2016', '2017', '2018'
];

var rank_number = rankList.length

//Data Manipulation and draw wedges
// Function to draw a single arc for the wind rose
// Input: Drawing options object containing
//   width: degrees of width to draw (ie 5 or 15)
//   from: integer, inner radius
//   to: function returning the outer radius
// Output: a function that when called, generates SVG paths.
//   It expects to be called via D3 with data objects from totalsToFrequences()
var arc = function (o) {
    return d3.svg.arc()
        .startAngle(function (d) {
            return (d.d - o.width) * Math.PI / 180;
        })
        .endAngle(function (d) {
            return (d.d + o.width) * Math.PI / 180;
        })
        .innerRadius(o.from)
        .outerRadius(function (d) {
            return o.to(d)
        });
};

//** Code for data manipulation **/
var musicdata = [];
var musicdata_soundtrack = [];
var total_songs_normal;
var total_soundtrack;

var ranksnumber = [];
var ranksnumber_soundtrack = [];
var year_rank = {};
var year_rank_st = {};

var probabilityToColorScale;
var probabilityToColorScaleYellow;

// Width of the whole visualization; used for centering        
var visWidth = parent.innerHeight / 4;
console.log(visWidth)

// Various visualization size parameters
var w = visWidth * 2,
    h = visWidth * 2,
    r = Math.min(w, h) / 2, // center; probably broken if not square
    p = visWidth / 10, // padding on outside of major elements
    ip = visWidth / 100 * 20; // padding on inner circle

// Map a wind probability to an outer radius for the chart      
var probabilityToRadiusScale = d3.scale.log().domain([0.001, 0.5]).range([ip, visWidth - p]).clamp(true);

// Options for drawing the complex arc chart
var windroseArcOptions = {
    width: 180 / rank_number,
    from: ip,
    to: probabilityToRadius
}
var zerowindroseArcOptions = {
    width: 180 / rank_number,
    from: ip,
    to: zeroprobabilityToRadius
}
var maxwindroseArcOptions = {
    width: 180 / rank_number,
    from: ip,
    to: maxprobabilityToRadius
}

// The main SVG visualization element
var vis = d3.select("#graph")
    .append("svg")
    .attr("align", "center")
    .attr("id", "windrose")
    .attr("viewBox", "0 0 " + visWidth * 3.8 + " " + visWidth * 2.6)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("align", "center")
    .call(d3.behavior.zoom().on("zoom", zoom))

function zoom() {
    vis.selectAll(".arcs").attr("transform", "rotate(" + d3.event.scale + "," + visWidth + "," + visWidth + ")")
    vis.selectAll(".arcs_f").attr("transform", "rotate(" + d3.event.scale + "," + visWidth + "," + visWidth + ")")
    vis.selectAll(".labels").attr("transform", "rotate(" + d3.event.scale + "," + visWidth + "," + visWidth + ")")
}

function rot(scale) {
    vis.selectAll(".arcs").attr("transform", "rotate(" + scale + "," + visWidth + "," + visWidth + ")")
    vis.selectAll(".arcs_f").attr("transform", "rotate(" + scale + "," + visWidth + "," + visWidth + ")")
    vis.selectAll(".labels").attr("transform", "rotate(" + scale + "," + visWidth + "," + visWidth + ")")
}

function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                    .text(word);
            }
        }
    });
}

// Set up axes: circles whose radius represents probability or speed
var ticks = [0.01, 0.02, 0.04, 0.08, 0.16, 0.32, 0.5];
var tickmarks = [0.01, 0.02, 0.04, 0.08, 0.16, 0.32, 0.5];

var radiusFunction = probabilityToRadiusScale;
var tickLabel = function (d) {
    return "" + (d * 100).toFixed(0) + "%";
}

function readData(callback) {
    rank_number = rankList.length
    total_songs_normal = 0
    total_soundtrack = 0

    for (var j = 0; j < years.length; j++) {
        var ranks = {};
        var rankst = {};
        for (var i = 0; i < rank_number; i++) {
            ranks[rankList[i]] = 0;
            rankst[rankList[i]] = 0;
        }
        year_rank[years[j]] = ranks;
        year_rank_st[years[j]] = rankst;
    }

    for (var i = 0; i < rank_number; i++) {
        ranksnumber.push(0);
        ranksnumber_soundtrack.push(0);
    }

    // force the callback function to wait this to finish
    // OMG this kills me
    d3.csv("rc.csv", function (error, data) {
        return new Promise(r => {
            if (error)
                throw error;

            // format the data
            data.forEach(function (d) {
                var rank = d.Rank;
                var artist = d.Artist;
                var year = d.Year;
                var index = rankList.indexOf(rank);

                if (d.isSoundTrack == "FALSE") {
                    ranksnumber[index] += 1;
                    year_rank[year][rank] += 1;

                    total_songs_normal += 1;

                    if (rank in artist_rank) {
                        var curr = rank_artist[artist_rank[rank]];
                        if (curr.hasOwnProperty(artist)) {
                            var desc = d.Album + " (" + year + ")";
                            curr[artist].push(desc);
                        }
                    }

                } else {
                    ranksnumber_soundtrack[index] += 1;
                    total_soundtrack += 1;
                    if (year.length != 0) {
                        year_rank_st[year][rank] += 1;
                    }
                    // musicdata_soundtrack.push({
                    //     rank: rank,
                    //     album: album,
                    //     artist: artist,
                    //     year: year
                    // })
                }
            })
            callback();
        })
    })
}

// Convert a dictionary of {direction: total} to frequencies
// Output is an array of objects with three parameters:
//   d: wind direction
//   p: probability of the wind being in this direction
//   s: average speed of the wind in this direction

function rollupForRanks(st) { // 0 for normal, 1 for soundtrack
    var res = {}
    res.rankdata = []
    var zero = 0.001;
    var max = 1;

    if (st == 0)
        for (var i = 0; i < ranksnumber.length; i += 1) {
            var direction = i * 360 / rank_number;
            var proportion = ranksnumber[i] / total_songs_normal;
            var rank = rankList[i];
            res.rankdata.push({
                d: direction,
                p: proportion,
                n: rank,
                z: zero,
                m: max
            });
        }
    else
        for (var i = 0; i < ranksnumber_soundtrack.length; i += 1) {
            var direction = i * 360 / rank_number;
            var proportion = ranksnumber_soundtrack[i] / total_soundtrack;
            var rank = rankList[i];
            res.rankdata.push({
                d: direction,
                p: proportion,
                n: rank,
                z: zero,
                m: max
            });
        }
    return res
}

// Code for visualization
/** Code for big visualization **/

// Transformation to place a mark on top of an arc
function probArcTextT(d) {
    var tr = probabilityToRadius(d);
    console.log("probArc");

    return "translate(" + visWidth + "," + (visWidth - tr) + ")" +
        "rotate(" + d.d + ",0," + tr + ")";
};

// Return a string representing the probability of wind coming from this direction
function probabilityText(d) {
    return d.p < 0.02 ? "" : (100 * d.p).toFixed(0);
};

function probabilityToColor(d) {
    return probabilityToColorScale(d.p);
}

function probabilityToColorYellow(d) {
    console.log(probabilityToColorScaleYellow(d.p));
    return probabilityToColorScaleYellow(d.p);
}

function probabilityToRadius(d) {
    return probabilityToRadiusScale(d.p);
}

function zeroprobabilityToRadius(d) {
    return probabilityToRadiusScale(d.z);
}

function maxprobabilityToRadius(d) {
    return probabilityToRadiusScale(d.m);
}

// tooltip - show details for each wedge
// Draw a complete wind rose visualization, including axes and center text
function drawComplexArcs(parent, plotData, colorFunc, arcTextFunc, complexArcOptions, arcTextT) {
    // Draw the main wind rose arcs

    parent.append("svg:g")
        .attr("class", "arcs_f")
        .selectAll("path")
        .data(plotData.rankdata)
        .enter().append("svg:path")
        .attr("transform", "translate(" + visWidth + "," + visWidth + ")")
        .attr("d", arc(maxwindroseArcOptions))
        .style("fill", "white")
        .append("svg:title")
        .text(function (d) {
            return d.n + "  " + (100 * d.p).toFixed(1) + "% "
        });

    parent.append("svg:g")
        .attr("class", "arcs")
        .selectAll("path")
        .data(plotData.rankdata)
        .enter().append("svg:path")
        .attr("transform", "translate(" + visWidth + "," + visWidth + ")")
        .attr("d", arc(zerowindroseArcOptions))
        .style("fill", colorFunc)
        .on('click', (d) => {
            window.location.assign("list.html?rank=" + d.n + "&year=all");
        })
        .transition()
        .attr("d", arc(complexArcOptions))
        .style("fill", colorFunc)
        .duration(1000)

    // Add the calm wind probability in the center
    var cw = parent.append("svg:g").attr("class", "calmwind")
        .selectAll("text")
        .data([plotData.rankdata.p])
        .enter();

    cw.append("svg:text")
        .attr("transform", "translate(" + visWidth + "," + (visWidth + 5) + ")")
        .attr("class", "calmcaption")
        .text("Albums");
}

// Update a specific digram to the newly selected months
// Update drawn arcs, etc to the newly selected months
function updateComplexArcs(parent, plotData, colorFunc, arcTextFunc, complexArcOptions, arcTextT) {
    // Update the arcs' shape and color
    parent.select(".arcs").selectAll("path")
        .data(plotData.rankdata)
        .transition().duration(1000)
        .style("fill", colorFunc)
        .attr("d", arc(complexArcOptions));

    // Update the arcs' title tooltip
    parent.select(".arcs").selectAll("path").select("title")
        .data(plotData.rankdata)
        .text(function (d) {
            return d.n + "  " + (100 * d.p).toFixed(1) + "% "
        })
}

function main() {
    // Map a wind probability to a color                     
    probabilityToColorScale = d3.scale.linear()
        .domain([0, 0.22])
        .range(["rgb(252, 247, 247)", "rgb(147, 62, 62)"])
        .interpolate(d3.interpolateRgb);

    probabilityToColorScaleYellow = d3.scale.linear()
        .domain([0, 0.3])
        .range(["rgb(245, 241, 236)", "rgb(130, 101, 76)"])
        .interpolate(d3.interpolateRgb);

    // data part
    var rollup = rollupForRanks(0);

    // Labels: degree markers
    vis.append("svg:g")
        .attr("class", "labels")
        .selectAll("text")
        .data(rollup.rankdata)
        .enter().append("svg:text")
        .attr("dy", "-4px")
        .attr("transform", function (d) {
            return "translate(" + r + "," + p + ") rotate(" + d.d + ",0," + (r - p) + ")"
        })
        .text(function (dir) {
            return dir.n;
        });

    //core
    drawComplexArcs(vis, rollup, probabilityToColor, probabilityText, windroseArcOptions, probArcTextT);

    // Circles representing chart ticks
    console.log("axes");

    vis.append("svg:g")
        .attr("class", "axes")
        .attr("transform", "translate(" + [0, 0] + ")")
        .selectAll("circle")
        .data(ticks)
        .enter()
        .append("svg:circle")
        .attr("cx", r).attr("cy", r)
        .attr("r", function (d) {
            return radiusFunction(d)
        });

    // Text representing chart tickmarks
    console.log("tickmarks");

    vis.append("svg:g").attr("class", "tickmarks")
        .selectAll("text")
        .data(tickmarks)
        .enter().append("svg:text")
        .text(tickLabel)
        .attr("dy", "3.28px")
        .attr("transform", function (d) {
            var y = visWidth - radiusFunction(d);
            return "translate(" + r + "," + y + ") "
        })

    //caption
    // vis.append("svg:text")
    //     .text("PERCH ROSE")
    //     .attr("class", "caption")
    //     .attr("transform", "translate(" + w / 2 + "," + (h + 20) + ")");


    vis.selectAll("tickmarks").style({
        font: "6px sans-serif"
    })
    vis.selectAll(".arcs").style({
        // stroke: "#000",
        // "stroke-width": "0.5px",
        // "fill-opacity": 0.9
    })
    vis.selectAll(".arcs_f").style({
        stroke: "#000",
        "stroke-width": "0.5px",
        "fill-opacity": 0.9
    })
    vis.selectAll(".caption").style({
        font: "18px sans-serif"
    });
    vis.selectAll(".axes").style({
        stroke: "#aaa",
        "stroke-width": "0.3px",
        fill: "none"
    })
    vis.selectAll("text.labels").style({
        "letter-spacing": "0.1px",
        "fill": "#444",
        font: "10px"
        // "font-size": "2px"
    })
    vis.selectAll("text.arctext").style({
        "font-size": "2px"
    })
    vis.selectAll("text").style({
        font: "8px sans-serif",
        "text-anchor": "middle"
    });

    legend = vis.append("g")
        .attr("class", "legend")
        .attr("id", "legend_pie")
        .attr("transform", "translate(" + (visWidth * 2 + 30) + ",70)")
        .style("font-size", "12px")
        .append("g")
        .call(d3.legend_pie)

    var currState = 0;
    //button event
    d3.select("#button0")
        .on("click", function (d, i) {
            if (currState != 0) {
                vis.select(".calmcaption")
                    .transition()
                    .style("opacity", 0)
                    .duration(500)
                    .transition()
                    .duration(500)
                    .style("opacity", 1)
                    .text("Albums");
                rollup = rollupForRanks(0);
                updateComplexArcs(vis, rollup, probabilityToColor, probabilityText, windroseArcOptions, probArcTextT)
                currState = 0;

                d3.select("#circle0")
                    .transition()
                    .duration(250)
                    .attr("r", "0.9em")
                    .transition()
                    .duration(30)
                    .attr("r", "0.7em")
                    .transition()
                    .duration(40)
                    .attr("r", "0.8em");
                d3.select("#circle1")
                    .transition()
                    .duration(300)
                    .attr("r", "0.3em");
                d3.select("#the")
                    .transition()
                    .duration(500)
                    .style("color", "pink")
                // .attr("style", "color:pink;");
            }
        });

    d3.select("#button1")
        .on("click", function (d, i) {
            if (currState != 1) {
                vis.select(".calmcaption")
                    .transition()
                    .style("opacity", 0)
                    .duration(500)
                    .transition()
                    .duration(500)
                    .style("opacity", 1)
                    .text("Soundtrack");
                rollup = rollupForRanks(1);
                updateComplexArcs(vis, rollup, probabilityToColorYellow, probabilityText, windroseArcOptions, probArcTextT)
                currState = 1;

                d3.select("#circle1")
                    .transition()
                    .duration(250)
                    .attr("r", "0.9em")
                    .transition()
                    .duration(30)
                    .attr("r", "0.7em")
                    .transition()
                    .duration(40)
                    .attr("r", "0.8em");
                d3.select("#circle0")
                    .transition()
                    .duration(300)
                    .attr("r", "0.3em");
                d3.select("#the")
                    .transition()
                    .duration(500)
                    .style("color", "rgb(227, 196, 123)")
                // .attr("style", "color:rgb(227, 196, 123);");
            }
        });

    d3.select("#circle0").attr("r", "0.8em");
}

// readData(main);