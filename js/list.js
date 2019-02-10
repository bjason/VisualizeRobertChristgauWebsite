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
var mostLoadNum = 30;

function readMusicData(data, error) {
    if (error) console.log(error);

    var id = 0

    data.forEach(d => {
        var rank = d.Rank;
        var artist = d.Artist;
        var year = d.Year;
        var album = d.Album;

        musicdata.push({
            // isSoundTrack: d.isSoundTrack,
            id: id,
            rank: rank,
            album: album,
            artist: artist,
            year: year
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
        d3.csv("rc.csv").then(readMusicData).then(() => filterData([arg[0].split("=")[1]], [arg[1].split("=")[1]]));
    } else
        // trigger loader
        // var target = document.getElementById('spinner_sec');
        // spinner = new Spinner(opts).spin(target);

        d3.csv("rc.csv").then(readMusicData).then(() => filterData(rankList, years));
}

main();

function filterData(rank, year) {
    d3.select("#rank_all")
        .on('click', () => {
            var y;
            if (year.length == 1) y = year
            else y = "all"

            // self.location.href = "list.html?rank=all&year=" + y;
            window.location.replace("list.html?rank=all&year=" + y)
        })

    d3.select("#year_all")
        .on('click', () => {
            var r;
            if (rank.length == 1) r = rank
            else r = "all"

            // self.location.href = "list.html?rank=" + r + "&year=all";
            window.location.replace("list.html?rank=" + r + "&year=all")
        })

    d3.select('.list__ul').selectAll('.text')
        .data(rankList)
        .enter().append('li')
        .attr('class', 'text')
        .append('a')
        .attr('href', '')
        .text(d => d)
        .on('click', function (d, i) {
            var y;
            if (year.length == 1) y = year
            else y = "all"

            if (d == rank) d = "all"
            window.location.replace("list.html?rank=" + d + "&year=" + y)
            // self.location.href = "list.html?rank=" + d + "&year=" + y;
        })
        .filter(d => d == rank)
        .attr('id', 'curr')

    d3.select('.list__ul_year').selectAll('.text')
        .data(years)
        .enter().append('li')
        .attr('class', 'text')
        .append('a')
        .attr('href', '')
        .text(d => d)
        .on('click', function (d, i) {
            var r;
            if (rank.length == 1) r = rank
            else r = "all"

            if (d == year) d = "all"

            window.location.replace("list.html?rank=" + r + "&year=" + d, '_self')
            // self.location.href = "list.html?rank=" + r + "&year=" + d;
        })
        .filter(d => d == year)
        .attr('id', 'curr')

    var list = d3.select('#albumlist')

    if (year == "all") year = years
    if (rank == "all") rank = rankList

    var data = musicdata.filter(d => rank.includes(d.rank)).filter(d => year.includes(d.year)).slice(0, mostLoadNum);
    if (data.length == 0) {
        d3.select('#error_info').text('Oops! No album released in ' + year + ' ranked as ' + rank)
    }
    currIndex += mostLoadNum;

    list.selectAll('.listdiv').remove()

    var listdiv = list.selectAll('.listitem')
        .data(data)
        .enter().append('div')
        .attr('class', 'text')
        .attr('class', 'listdiv')
        .style('overflow', 'auto')
        .style('margin', '5%')
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
        .attr('src', 'css/album.jpg')
        .attr('height', 120)
        .attr('width', 120)
        .style('margin-left', '5%')
        .style('margin-right', '3%')
        .style('float', 'left')
        .attr('id', d => 'img' + d.id)
        .attr('alt', d => {
            imgd.push(d)
            return 'cover image'
        })

    var ld = listdiv.append('div')
        .style('margin-left', '5%')
        .attr('class', 'text')
    ld.append('h3')
        .text(d => d.album + ' (' + d.year + ')')
    ld.append('p')
        .append('i')
        .text(d => d.artist)
        .style('font-size', '120%')

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
                console.log(data);
                if (!("error" in data)) {
                    res = data["album"]["image"][2]["#text"];
                    d3.select('#img' + id).attr('src', res)
                } else d3.select('#img' + id).attr('src', 'css/album.jpg')
            }
        )
    })
}