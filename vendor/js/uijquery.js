$(document).ready(function () {
	$("#outwater").hide();
	InitChart();
});
	divetable = NauiDiveTable();
	var data = [[0,0, 0, '0']]; //[time, depth]	//decomp, divegroup
    diveTable = new NauiDiveTable();
	diver = new Diver(diveTable);
	//safe ascent rate will be 30 feet per minute
function reset() {	
	data = [[0,0,0,'0']];
    diveTable = new NauiDiveTable();
	diver = new Diver(diveTable);
	InitChart();
	$("#Land").val("");
	$("#inwater").show();
	$("#outwater").hide();	
	$("#Depth").css("border","");
	$("#Time").css("border","");
	$("#Depth").val("");
	$("#Time").val("");
	$("#error-in").text("");
	$("#error-out").text("");
}
	
function adddive() {
	var dep = parseInt($("#Depth").val(), 10);
	var last = data[data.length-1];
	var time = parseInt($("#Time").val(), 10);
	var valid = true;
	if(!$.isNumeric($("#Depth").val())){
		$("#Depth").css("border"," 3px solid red");
		$("#Time").css("border","");		
		$("#error-in").text("Please enter a number");	
		valid = false;
	}	
	if(!$.isNumeric($("#Time").val())){
		$("#Depth").css("border","");
		$("#Time").css("border","3px solid red");		
		$("#error-in").text("Please enter a number");	
		valid = false;
	}
	if(dep > 130){
		$("#Depth").css("border"," 3px solid red");
		$("#Time").css("border","");		
		$("#error-in").text("Depth is over limit(130 ft)");	
		valid = false;
	}
	if(time > 150){
		$("#Depth").css("border","");	
		$("#Time").css("border","3px solid red");
		$("#error-in").text("Time is over limit(150 min)");	
		valid = false;
	}
	if(time == 0){
		$("#Depth").css("border","");	
		$("#Time").css("border","3px solid red");
		$("#error-in").text("Time must be greater than 0");	
		valid = false;
	}
	if(diver.dive(dep,time) && valid){
		var divegroup = diver.currentGroup;
		var todepth = dep - last[1];
		todepth = Math.abs(todepth);
		var totime = last[0] + (todepth/30);
		data.push([totime,dep, 0, divegroup]);
		totime = totime+time;
		data.push([totime, dep, 0, divegroup]);
		var decompTime = diver.decompCheck(dep, time);
		if(decompTime == 0){
			totime=totime+(todepth/30);
			data.push([totime, 0, 0, divegroup]);
			
		}
		else{
			var todepth = dep-15;
			totime=totime+(todepth/30);
			data.push([totime, 15, decompTime, divegroup]);
			totime = totime+decompTime;
			data.push([totime,15, decompTime, divegroup]);
			totime = totime+.5;
			data.push([totime, 0, decompTime, divegroup]);
		}
		InitChart();
		$("#Depth").val("");
		$("#Time").val("");
		$("#inwater").hide();
		$("#outwater").show();
		$("#Depth").css("border","");
		$("#Time").css("border","");
		$("#error-in").text("");		
	}
	else if(valid){
		$("#Depth").css("border"," 3px solid red");
		$("#Time").css("border","3px solid red");
		$("#error-in").text("Dive entered is invalid");
	}
}
	
	function addrest() {
	var valid;
	var time = parseInt($("#Land").val(), 10);	
	if(time == 0){
		$("#Land").css("border","3px solid red");
		$("#error-out").text("Time must be greater than 0");	
		valid = false;
	}
	if(!$.isNumeric($("#Land").val())){
		$("#Land").css("border","3px solid red");		
		$("#error-out").text("Please enter a number");	
		valid = false;
	}	
	var last = data[data.length-1];
	time = last[0] + time;
	diver.surface(time);
	var divegroup = diver.currentGroup;
	data.push([ time, 0, 0, divegroup]);
	$("#Land").val("");
	$("#inwater").show();
	$("#outwater").hide();	
	InitChart();
	}