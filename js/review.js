var albumdata = [];
var rankdata = [];
var totalwords = [];

function readTotalData(data, error) {
    if (error) console.log(error);

    data.forEach(d => {
        totalwords.push({
            text: d.word,
            size: d.frequency * d.frequency * 2 / 3,
            prop: d.property
        })
    });

    // var album = d.album;
    // if (album.length == 0) {
    //     var rank = d.rank;
    //     var word = d.word;
    //     var frequency = d.frequency;

    //     rankdata.push({
    //         rank: rank,
    //         text: word,
    //         size: frequency * 10
    //     })
    // } else {
    //     var artist = d.artist;
    //     var polarity = d.polarity;
    //     var subjectivity = d.subjectivity;

    //     albumdata.push({
    //         album: album,
    //         artist: artist,
    //         polarity: polarity,
    //         subjectivity: subjectivity
    //     })
    // }
}

var propToColor = {
    artist: '#F596AA',
    genre: '#572A3F',
    album: '#EB7A77',
    production: '#CC543A',
    default: '#563F2E'
}

function drawCloud() {
    // console.log(totalwords);
    let wid = window.innerWidth * 0.95;
    let height = window.innerHeight;

    var layout = d3.layout.cloud()
        .size([wid, height])
        .words(totalwords)
        .padding(5)
        .rotate(function () {
            return ~~(Math.random() * 2) * 90;
        })
        .font("Impact")
        .fontSize(function (d) {
            return d.size;
        })
        .on("end", (words) => {
            let vis = d3.select("#vis").append("svg")
                .attr("width", layout.size()[0])
                .attr("height", layout.size()[1])
            vis.append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function (d) {
                    return d.size + "px";
                })
                .style("font-family", "Impact")
                .style("fill", function (d) {
                    return propToColor[d.prop]
                })
                .attr('class', d => d.prop)
                .attr("text-anchor", "middle")
                .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function (d) {
                    return d.text;
                })
        });
    layout.start();
}

function main() {
    // draw cloud text
    d3.csv("data/total-modified.csv")
        .then(readTotalData)
        .then(drawCloud)
}

var hidden = {
    artist: 0,
    genre: 0,
    album: 0,
    production: 0,
    default: 0
}

function legendClick(prop) {
    if (hidden[prop] == 0) {
        hidden[prop] = 1;
        // hide all text in cloud
        d3.selectAll('.' + prop)
            .transition()
            .duration(500)
            .style('opacity', 0)
    } else {
        // show all text in cloud
        d3.selectAll('.' + prop)
            .transition()
            .duration(500)
            .style('opacity', 1)
        hidden[prop] = 0;
    }
}

main();