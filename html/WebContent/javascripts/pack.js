var width = 500,
    height = 500,
    format = d3.format(",d");

var pack = d3.layout.pack()
    .size([width - 4, height - 4])
    .value(function(d) { return d.size; });

var vis = d3.select("#content").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "pack")
    .append("g")
    .attr("transform", "translate(2, 2)");

d3.json(file, function(json) {
    var node = vis.data([json]).selectAll("g.node")
        .data(pack.nodes)
        .enter().append("g")
        .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("title")
        .text(function(d) { return d.name;});// + (d.children ? "" : ": " + format(d.size)); });

    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .attr("fill", "orange")
        .attr("stroke", "brown")
        .attr("stroke-width", 5)
        .attr("opacity",.25);

    node.filter(function(d) { return !d.children; }).append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3\em")
 ;//       .text(function(d) { return d.name.substring(0, d.r / 3); });
});