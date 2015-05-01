$(document).ready(function () {
  $("#outwater").hide();
  $("#revbutton").hide();
  InitChart();

});
divetable = NauiDiveTable();
var data = [[0,0, 0, '0']]; //[time, depth]	//decomp, divegroup
diveTable = new NauiDiveTable();
diver = new Diver(diveTable);
totaldives = 0;
surfacetime = 0;
divetime = 0;
//safe ascent rate will be 30 feet per minute
function reset() {
  data = [[0,0,0,'0']];
  surfacetime = 0;
  divetime = 0;
  diveTable = new NauiDiveTable();
  diver = new Diver(diveTable);
  totaldives = 0;
  InitChart();
  $("#Land").val("");
  $("#Land").css("border","");
  $("#inwater").show();
  $("#outwater").hide();
  $("#Depth").css("border","");
  $("#Time").css("border","");
  $("#Depth").val("");
  $("#Time").val("");
  $("#error-in").text("");
  $("#error-out").text("");
  $("#infobox").html("");
  $("#revbutton").hide();
}
function revertdive() {
  var d = data.pop();
  if(data[data.length-1][0] == 0){
    reset();
  }
  else if($("#inwater").is(":visible")){
	surfacetime = surfacetime - (d[0] - data[data.length-1][0]);
    $("#outwater").toggle();
    $("#inwater").toggle();
    $("#Depth").css("border","");
    $("#Time").css("border","");
    $("#Depth").val("");
    $("#Time").val("");
    $("#error-in").text("");
    var groupindex = data[data.length-1][3];
    diver.indexFromGroup(groupindex);
    $("#infobox").html("Total Time: " + Math.floor(data[data.length-1][0])
					   + "<br />Total Dive Time: " + Math.floor(divetime) 
					   + "<br />Total Surface Time: " + Math.floor(surfacetime)	
                       + "<br />Current Dive Group: " + data[data.length-1][3]
                       + "<br />Total Dives: " + totaldives);
                       InitChart();
  }
  else{
    while(data[data.length-1][1] != 0){
      divetime = divetime - (d[0] - data[data.length-1][0]);	  
      d = data.pop();
    }
    divetime = divetime - (d[0] - data[data.length-1][0]);	  	
    if(data[data.length-1][0] == 0){
      reset();
    }
    else{
      $("#outwater").toggle();
      $("#inwater").toggle();
      $("#Land").val("");
      $("#error-in").text("");
      $("#error-out").text("");
      totaldives = totaldives - 1;
      var groupindex = data[data.length-1][3];
      diver.indexFromGroup(groupindex);
      $("#infobox").html("Total Time: " + Math.floor(data[data.length-1][0])
						 + "<br />Total Dive Time: " + Math.floor(divetime) 
						 + "<br />Total Surface Time: " + Math.floor(surfacetime)
                         + "<br />Current Dive Group: " + data[data.length-1][3]
                         + "<br />Total Dives: " + totaldives);
                         InitChart();
    }
  }
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
  if(dep < 40){
    $("#Depth").css("border"," 3px solid red");
    $("#Time").css("border","");
    $("#error-in").text("Depth is under minimum(40 ft)");
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
	var baseasc = (dep/30);
	divetime += baseasc;
    data.push([totime,dep, 0, divegroup]);
    totime = totime+time;
	divetime += time;
    data.push([totime, dep, 0, divegroup]);
    var decompTime = diver.decompCheck(dep, time);
    if(decompTime == 0){
      totime=totime+(todepth/30);
      data.push([totime, 0, 0, divegroup]);
	  divetime += baseasc;
    }
    else{
      var todepth = dep-15;
      totime=totime+(todepth/30);
      data.push([totime, 15, decompTime, divegroup]);
      totime = totime+decompTime;
      data.push([totime,15, decompTime, divegroup]);
      totime = totime+.5;
      data.push([totime, 0, decompTime, divegroup]);
	  divetime += baseasc;
	  divetime += decompTime;
    }
    InitChart();
    $("#Depth").val("");
    $("#Time").val("");
    $("#inwater").hide();
    $("#outwater").show();
    $("#revbutton").show();
    $("#Depth").css("border","");
    $("#Time").css("border","");
    $("#error-in").text("");
    totaldives =totaldives + 1;
    $("#infobox").html("Total Time: " + Math.floor(totime)
					   + "<br />Total Dive Time: " + Math.floor(divetime) 
					   + "<br />Total Surface Time: " + Math.floor(surfacetime)	
                       + "<br />Current Dive Group: " + divegroup
                       + "<br />Total Dives: " + totaldives);


  }
  else if(valid){
    $("#Depth").css("border"," 3px solid red");
    $("#Time").css("border","3px solid red");
    $("#error-in").text("Dive entered is invalid");
  }
}

function addrest() {
  var valid = true;
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
  if(valid){
    var last = data[data.length-1];
	surfacetime += time;
    time = last[0] + time;
    diver.surface(time);
    var divegroup = diver.currentGroup;
    data.push([ time, 0, 0, divegroup]);

    $("#Land").val("")
    $("#Land").css("border","");
    $("#error-out").text("");
    $("#inwater").show();
    $("#outwater").hide();
    InitChart();
    $("#infobox").html("Total Time: " + Math.floor(time)
					 + "<br />Total Dive Time: " + Math.floor(divetime) 
					 + "<br />Total Surface Time: " + Math.floor(surfacetime)	
                     + "<br />Current Dive Group: " + divegroup
                     + "<br />Total Dives: " + totaldives);					 
  }
}
