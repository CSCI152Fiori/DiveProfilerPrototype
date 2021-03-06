
//This is as prototype Dive graph function 
//and CANNOT be used for real dive
function InitChart() {
  d3.selectAll("svg > *").remove()
  var tempColor;
  var tooltip = d3.select('body').append('div')
  .attr('class','tooltip')
  .style('position', 'absolute')
  .style('background', 'white')
  .style('opacity', 0)
  .style('border', 'solid');

  var vis = d3.select("#visualisation"),
  WIDTH = 700,
  HEIGHT = 400,
  MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  },
  xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 180]),
  yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([150, 0]),
  xAxis = d3.svg.axis()
  .scale(xScale),
  yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left");

  vis.append("svg:g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
  .call(xAxis);
  vis.append("svg:g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + (MARGINS.left) + ",0)")
  .call(yAxis);
  var lineGen = d3.svg.line()
  .x(function(d) {
    return xScale(d[0]);
  })
  .y(function(d) {
    return yScale(d[1]);
  })
  vis.append('svg:path')
  .attr('d', lineGen(data))
  .attr('stroke', 'green')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

  //This is a prototype function and CANNOT be used to plan a Dive
  var xValue = function(d) { return d[0];},					
  xMap = function(d) { return xScale(xValue(d));};
  
  //This is a prototype function and CANNOT be used to plan a dive
  var yValue = function(d) { return d[1];},					
  yMap = function(d) { return yScale(yValue(d));};

  vis.selectAll(".dot")
  .data(data)
  .enter().append("circle")
  .attr("class", "dot")
  .attr("r", 4)
  .attr("cx", xMap)
  .attr("cy", yMap)
  .style("fill", "yellow") 
  .on("mouseover", function(d) {
    tooltip.transition()
    .duration(200)
    .style("opacity", .9);

    tooltip.html("(" + xValue(d) 
                 + ", " + yValue(d) + ")")
                 .style("left", (d3.event.pageX + 5) + "px")
                 .style("top", (d3.event.pageY - 28) + "px");
                 //Insert all variables

  })
  .on("mouseout", function(d) {
    tooltip.transition()
    .duration(500)
    .style("opacity", 0);
  });


}
InitChart();

