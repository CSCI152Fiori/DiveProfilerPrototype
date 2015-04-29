	$(document).ready(function () {
	$("#outwater").hide();
	InitChart();
	});
	
	var data = [[0,0]];			

	//[time, depth]
	//safe ascent rate will be 30 feet per minute
	function adddive() {
	var dep = parseInt($("#Depth").val(), 10);
	var last = data[data.length-1];
	var time = parseInt($("#Time").val(), 10);
	var todepth = dep - last[1];
	todepth = Math.abs(todepth);
	var totime = last[0] + (todepth/30);
	data.push([totime,dep]);
	time = totime+time;
	data.push([time, dep]);
	totime=time+(todepth/30);
	data.push([totime, 0 ]);
	InitChart();
	$("#Depth").val("");
	$("#Time").val("");
	$("#inwater").hide();
	$("#outwater").show();
	}
	
	function addrest() {
	var time = parseInt($("#Land").val(), 10);	
	var last = data[data.length-1];
	time = last[0] + time;
	data.push([ time, 0]);
	$("#Land").val("");
	$("#inwater").show();
	$("#outwater").hide();	
	InitChart();
	}