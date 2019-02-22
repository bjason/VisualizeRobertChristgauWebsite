var fillColor;
var colormap = {
	'A+': '#0089A7',
	A: '#33A6B8',
	'A-': '#376B6D',
	'B+': '#5DAC81',
	'***': '#616138',
	'**': '#838A2D',
	'*': '#ADA142',
	S: '#86473F',
	B: '#227D51',
	'B-': '#00896C',
	'C+': '#8A6BBE',
	C: '#6A4C9C',
	'C-': '#77428D',
	'D+': '#A8497A',
	D: '#66327C',
	'D-': '#622954',
	'E+': '#DB4D6D',
	E: '#E87A90',
	'E-': '#B5495B',
	X: '#64363C'
}

function updateBarChart(rank) {
	fillColor = colormap[rank];
	document.getElementById("topwordsCaption").innerHTML = "Most mentioned words in " + rank + " albums"

	// read data
	d3.csv("data/" + rank.replace('*', 'Star') + '-modified.csv').then(drawBarChart)
}

function drawBarChart(data, error) {
	if (error) console.log(error);

	data.reverse();
	// set the dimensions and margins of the graph
	var margin = {
			top: 20,
			right: 20,
			bottom: 30,
			left: 40
		},
		width = window.innerWidth * 0.9 - margin.left - margin.right,
		height = window.innerHeight * 1.5 - margin.top - margin.bottom;

	// set the ranges
	var y = d3.scaleBand()
		.range([height, 0])
		.padding(0.1);

	var x = d3.scaleLinear()
		.range([0, width - window.innerWidth * 0.13]);

	// remove previous graph
	d3.select("#bargraph").select("svg").remove()

	// append the svg object to the body of the page
	// append a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var svg = d3.select("#bargraph")
		// .remove("svg")
		.append("svg")
		.attr("width", width)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + (margin.left + window.innerWidth * 0.05) + "," + margin.top + ")");

	// format the data
	data.forEach(function (d) {
		d.frequency = +d.frequency;
	});

	// Scale the range of the data in the domains
	x.domain([0, d3.max(data, function (d) {
		return d.frequency;
	})])
	y.domain(data.map(function (d) {
		return d.word;
	}));
	//y.domain([0, d3.max(data, function(d) { return d.sales; })]);

	// append the rectangles for the bar chart
	var bars = svg.selectAll(".bar")
		.data(data)
		.enter()
		.append("g")
	bars.append("rect")
		.attr("class", "bar")
		//.attr("x", function(d) { return x(d.sales); })
		.attr("width", function (d) {
			return x(d.frequency);
		})
		.attr("y", function (d) {
			return y(d.word);
		})
		.attr("height", y.bandwidth())
		.style("fill", fillColor)
	bars.append("text") //add a value label to the right of each bar
		.attr("class", "label")
		//y position of the label is halfway down the bar
		// .attr("transform", function (d) {
		// 	return "translate(" + x(d.frequency) + 3 + "," + y(d.word) + y.bandwidth() / 2 + 4 + ")"
		// })
		.attr("y", function (d) {
			return y(d.word) + y.bandwidth() / 2 + 4;
		})
		// //x position is 3 pixels to the right of the bar
		.attr("x", function (d) {
			return x(d.frequency) + 3;
		})
		.style("font-size", "13px")
		.style("color", "black")
		.text(function (d) {
			return d.frequency;
		});

	// add the x Axis
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	// add the y Axis
	svg.append("g")
		.style("font-size", "14px")
		// .tickSize(200)
		.call(d3.axisLeft(y).tickSize(0));
}