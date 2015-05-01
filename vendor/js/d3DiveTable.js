function InitChart() {
  d3.selectAll("svg > *").remove()
  var tempColor;
  var tooltip = d3.select('body').append('div')
  .attr('class','tooltip')
  .style('position', 'absolute')
  .style('background', 'white')
  .style('opacity', 0);

  var vis = d3.select("#visualisation"),
  WIDTH = 700,
  HEIGHT = 400,
  MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  },
  xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain(d3.max(data, function(d) {
	var x = 180;
	if(x < d[0]){ x = d[0];}
	return [0, x];
	}));
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
  .data(data)
  .attr('d', lineGen(data))
  .attr('stroke', "green")
  .attr('stroke-width', 2)
  .attr('fill', 'none');

  var xValue = function(d) { return d[0];},					
  xMap = function(d) { return xScale(xValue(d));};
  var yValue = function(d) { return d[1];},					
  yMap = function(d) { return yScale(yValue(d));};

  var adddecomp = function(d){
	if(d[2] > 0){
		return ("Decompression Time: " + d[2]);
	}
	else{
		return "";
	}
  };
  var divevalue = function(d){ return d[3];};
  
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

    tooltip.html("Total Time: " + xValue(d) 
                 + "<br />Total Depth: " + yValue(d) 
				 + "<br />Dive Group: " + divevalue(d)
				 + "<br />" + adddecomp(d))
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
