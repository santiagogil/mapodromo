var d3 = require('d3'),
    topojson = require('topojson'),
    width = 800,
    height = 600
    svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);
    path = d3.geo.path()
      .projection(d3.geo.mercator().scale(400).translate([800, 100]))

d3.json("arg.json", function(error, arg) {
  if (error) return console.error(error);
//svg.append('path')
//  .datum(topojson.feature(arg, arg.objects.subunits))
//  .attr('d', path)
  svg.selectAll('.subunit')
    .data(topojson.feature(arg, arg.objects.subunits).features)
    .enter().append('path')
    .attr('class', function (d) {return 'subunit ' + d.id})
    .attr('text', function (d) {return d.properties.name})
    .attr('d', path)
    .style('stroke', '#fff')
  svg.selectAll(".subunit-label")
    .data(topojson.feature(arg, arg.objects.subunits).features)
    .enter().append("text")
    .attr("class", function(d) { return "subunit-label " + d.id; })
    .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .text(function(d) { return d.properties.name; });
});
