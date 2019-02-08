(function () {
    d3.legend_pie = function (g) {
        var vis = d3.select(g.property("nearestViewportElement")),
            legendPadding = g.attr("data-style-padding") || 5,
            lb = g.selectAll(".legend-box").data([true]),
            li = g.selectAll(".legend-items").data([true])
        var items = {
            'Albums': {
                pos: 10,
                color: "pink"
            },
            'Soundtrack': {
                pos: 10,
                color: "rgb(227, 196, 123)"
            }
        }

        lb.enter().append("rect").classed("legend-box", true)
        li.enter().append("g").classed("legend-items", true)

        items = d3.entries(items).sort(function (a, b) {
            return a.value.pos - b.value.pos
        })

        li.selectAll("text")
            .data(items, function (d) {
                return d.key
            })
            .call(function (d) {
                d.enter().append("text")
            })
            .call(function (d) {
                d.exit().remove()
            })
            .attr("x", function (d, i) {
                return (i * 7 + 1) + "em"
            })
            .attr("y", "1em")
            .text(function (d) {
                return d.key
            })
            .attr("style", "text-decoration: underline;")
            .attr("id", function (d, i) {
                return "button" + i;
            })

        li.selectAll("circle")
            .data(items, function (d) {
                return d.key
            })
            .call(function (d) {
                d.enter().append("circle")
            })
            .call(function (d) {
                d.exit().remove()
            })
            .attr("cx", function (d, i) {
                return i * 7 + "em"
            })
            .attr("cy", 8)
            .attr("r", "0.3em")
            .style("fill", function (d) {
                // console.log(d.value.color);
                return d.value.color
            })
            .attr("id", function (d, i) {
                return "circle" + i;
            })

        // Reposition and resize the box
        // var lbbox = li[0][0].getBBox()
        lb.attr("x", (50 - legendPadding))
            .attr("y", (20 - legendPadding))
            .attr("height", (50 + 2 * legendPadding))
            .attr("width", (50 + 2 * legendPadding))
        // lb.attr("x", (lbbox.x - legendPadding))
        //     .attr("y", (lbbox.y - legendPadding))
        //     .attr("height", (lbbox.height + 2 * legendPadding))
        //     .attr("width", (lbbox.width + 2 * legendPadding))

        return g
    }
})()