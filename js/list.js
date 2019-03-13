var musicdata = [];
var rankList = [
    'A+', 'A', 'A-', 'B+', '***', '**', '*', 'S', 'N', 'X', 'B', 'B-', 'C+', 'C',
    'C-', 'D+', 'D', 'D-', 'E+', 'E', 'E-'
];
var rankColor = ['green', 'green', 'green', 'green', 'blue', 'blue', 'blue', 'blue',
    'blue', 'blue', 'blue', 'blue',
    'orange', 'orange', 'orange', 'orange', 'orange', 'red', 'red', 'red', 'red'
];
var years = ['1967', '1968', '1969', '1970',
    '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981',
    '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992',
    '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003',
    '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014',
    '2015', '2016', '2017', '2018'
];

var spinner;
var currIndex;
var mostLoadNum = 5;

var currRank;
var currYear;
var currData;
var prevData;

function readMusicData(data, error) {
    if (error) console.log(error);

    var id = 0

    data.forEach(d => {
        var rank = d.rank;
        var artist = d.artist;
        var year = d.year;
        var album = d.album;
        var pol = parseFloat(d.polarity);
        var subj = parseFloat(d.subjectivity);

        musicdata.push({
            isSoundTrack: d.isSoundTrack,
            id: id,
            rank: rank,
            album: album,
            artist: artist,
            year: year,
            pol: pol,
            subj: subj
        })
        id += 1
    })
}

function main() { // loader settings
    currIndex = 0;

    var thisURL = document.URL;
    var argUrl = thisURL.split('?');

    if (argUrl.length > 1) {
        var arg = argUrl[1].split("&");
        var rank = arg[0].split("=")[1];
        var year = arg[1].split("=")[1];

        d3.csv("data/rc.csv").then(readMusicData).then(() => filterData([rank], [year]));
    } else
        // trigger loader
        // var target = document.getElementById('spinner_sec');
        // spinner = new Spinner(opts).spin(target);

        d3.csv("data/rc.csv").then(readMusicData).then(() => filterData('all', 'all'));
}

main();

function getSrc(d) {
    if (d.isSoundTrack == 'FALSE')
        return 'css/album.jpg';
    else
        return 'css/soundtrack.jpg';
}

function loadList(data) {
    var list = d3.select('#albumlist');

    var listdiv = list.selectAll('.listitem')
        .data(data)
        .enter().append('div')
        .attr('class', 'text')
        .attr('class', 'listdiv')
        .style('overflow', 'auto')
        .style('margin', '5%')
        .style('margin-left', '0%')
    var g = listdiv.append('svg')
        .attr('height', 120)
        .attr('width', 60)
        .style('float', 'left')
        .append('g')
    g.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', 120)
        .attr('width', 60)
        .attr('fill', d => rankColor[rankList.indexOf(d.rank)])
    g.append('text')
        .attr('class', 'text')
        .attr('fill', 'white')
        .attr('x', 20)
        .attr('y', 63)
        .text(d => d.rank)

    var imgd = []
    listdiv.append('img')
        .attr('src', d => getSrc(d))
        .attr('height', 120)
        .attr('width', 120)
        .style('margin-left', '3%')
        .style('margin-right', '3%')
        .style('float', 'left')
        .attr('id', d => 'img' + d.id)
        .attr('alt', d => {
            imgd.push(d)
            return 'cover image'
        })

    var ld = listdiv.append('div')
        // .style('margin-left', '5%')
        .attr('class', 'text')
        .style('display', 'inline-block')
        .style('cursor', 'pointer')
        .on('click', function (d) {
            var coverUrl = encodeURI(d3.select('#img' + d.id).attr('src'));
            var url = "album.html?artist=" + d.artist.replace(/&/g, 'AndSign') + "&album=" + d.album.replace(/&/g, 'AndSign') + "&rank=" + d.rank + "&cover=" + coverUrl;
            window.location.href = url;
        })
    ld.append('h3')
        .text(d => {
            if (d.isSoundTrack == 'TRUE') return d.album + ' (' + d.year + ')' + ' [Soundtrack]';
            else return d.album + ' (' + d.year + ')';
        })
    ld.append('p')
        .append('i')
        .text(d => d.artist)
        .style('font-size', '120%')

    var colorPol = d3.scaleLinear()
        .domain([0, 1])
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb('#FEDFE1'), d3.rgb('#CB1B45')]);

    var colorSubj = d3.scaleLinear()
        .domain([0, 1])
        .interpolate(d3.interpolateHcl)
        .range([d3.rgb('#81C7D4'), d3.rgb('#0F2540')]);

    var g = listdiv.append('svg')
        .attr('height', 60)
        .attr('width', 120)
        .style('float', 'right')
        .style('margin-right', '17%')
        .append('g')
    g.append('circle')
        .attr('cx', 30)
        .attr('cy', 30)
        .attr('height', 60)
        .attr('width', 60)
        .attr('fill', (d, i) => {
            return colorPol(d.pol)
        })
        .attr('r', (d, i) => {
            return d.pol > 0.5 ? 0.5 : d.pol * 60;
        })
        .append("svg:title")
        .text((d) => {
            return "Polarity: " + d.pol;
        })
        // .attr('r', 0)
        // .transition()
        // .duration(500)
    g.append('circle')
        .attr('cx', 90)
        .attr('cy', 30)
        .attr('height', 60)
        .attr('width', 60)
        .attr('fill', (d, i) => {
            return colorSubj(d.subj)
        })
        .attr('r', (d, i) => {
            return d.subj > 0.5 ? 0.5 : d.subj * 60;
        })
        .append("svg:title")
        .text((d) => {
            return "Subjectivity: " + d.subj;
        })
    imgd.forEach(d => {
        var id = d.id
        $.get(
            "//ws.audioscrobbler.com/2.0/", {
                method: 'album.getinfo',
                api_key: 'e0981426c1bea500a1c4b35b14164a2f',
                artist: d.artist,
                album: d.album,
                format: 'json'
            },
            function (data) {
                if (!("error" in data)) {
                    res = data["album"]["image"][2]["#text"];
                    if (res.length != 0) {
                        d3.select('#img' + id).attr('src', res)
                        return;
                    }
                }
                d3.select('#img' + id).attr('src', getSrc(d))
            }
        )
    })
}

function appendList() {
    // newly loaded data
    var data = currData.slice(currIndex, currIndex + mostLoadNum);
    currIndex += mostLoadNum;

    if (data.length == 0 && currIndex > 0) {
        d3.select('#error_info').text('-End of the list-')
    } else {
        loadList(data);
    }
}

function filterData(rank, year) {
    currRank = rank;
    currYear = year;

    // set hyperlink
    d3.select("#rank_all")
        .on('click', () => {
            var y;
            if (year.length == 1) y = year
            else y = "all"

            // self.location.href = "list.html?rank=all&year=" + y;
            window.location.href = "list.html?rank=all&year=" + y;
        })

    d3.select("#year_all")
        .on('click', () => {
            var r;
            if (rank.length == 1) r = rank
            else r = "all"

            // self.location.href = "list.html?rank=" + r + "&year=all";
            window.location.href = "list.html?rank=" + r + "&year=all";
        })

    d3.select('.list__ul').selectAll('.text')
        .data(rankList)
        .enter().append('li')
        .attr('class', 'text')
        .on('click', function (d, i) {
            var y;
            if (year.length == 1) y = year
            else y = "all"

            if (d == rank) d = "all"
            // window.location.href("list.html?rank=" + d + "&year=" + y)
            self.location.href = "list.html?rank=" + d + "&year=" + y;
        })
        .append('a')
        .text(d => d)
        .filter(d => d == rank)
        .attr('id', 'curr')

    d3.select('.list__ul_year').selectAll('.text')
        .data(years)
        .enter().append('li')
        .attr('class', 'text')
        .on('click', function (d, i) {
            var r;
            if (rank.length == 1) r = rank
            else r = "all"

            if (d == year) d = "all"

            // window.location.href("list.html?rank=" + r + "&year=" + d, '_self')
            self.location.href = "list.html?rank=" + r + "&year=" + d;
        })
        .append('a')
        .text(d => d)
        .filter(d => d == year)
        .attr('id', 'curr')

    if (year == "all") {
        d3.select('#year_all').attr('class', 'curr')
        year = years
    }
    if (rank == "all") {
        d3.select('#rank_all').attr('class', 'curr')
        rank = rankList
    }

    // done hyperlink setting
    // remove old content
    d3.select('#albumlist').selectAll('.listdiv').remove();

    // get current selected data
    currData = musicdata.filter(d => rank.includes(d.rank)).filter(d => year.includes(d.year));
    if (currData.length == 0) {
        d3.select('#error_info').text('Oops! No album released in ' + year + ' ranked as ' + rank)
    } else {
        appendList();
    }
}

var searchLen = 0;

function searchList() {
    window.scrollTo(0, 0);
    currIndex = 0;

    var input, filter;
    input = document.getElementById('searchContent');
    filter = input.value.toUpperCase();

    if (searchLen == 0) {
        prevData = currData;
    }

    // remove navigation highlight
    // d3.selectAll('.curr').attr('class', '')
    // d3.selectAll('#curr').attr('id', '')

    if (searchLen > filter.length) { // deleting words
        currData = prevData;
        // remove old content
        if (filter.length == 0) {
            d3.select('#albumlist').selectAll('.listdiv').remove();
            appendList();
        }
    }
    if (filter.length > 1) {
        // remove old content
        d3.select('#albumlist').selectAll('.listdiv').remove();

        // get all matched data
        currData = currData.filter(d => d.artist.toUpperCase().includes(filter) || d.album.toUpperCase().includes(filter));

        if (currData.length == 0) // no matched data
            d3.select('#error_info').text('No result.')
        else {
            appendList();
        }
    }
    searchLen = filter.length;
}