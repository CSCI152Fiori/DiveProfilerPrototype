import Ember from 'ember';

		Ember.$(document).ready(function () {
		Ember.$("#main").hide();
		});
		
		function startdive() {
			Ember.$("#splash").hide();
			Ember.$("#main").show();
			Ember.$("#outwater").hide();
		}
	
	var data = [[0,0]];			
	//[time, depth]
	//safe ascent rate will be 30 feet per minute
	function adddive() {
	var dep = parseInt(Ember.$("#Depth").val(), 10);
	var last = data[data.length-1];
	var time = parseInt(Ember.$("#Time").val(), 10);
	var todepth = dep - last[1];
	todepth = Math.abs(todepth);
	var totime = last[0] + (todepth/30);
	alert(last[0]);
	alert(totime);
	data.push([totime,dep]);
	time = totime+time;
	data.push([time, dep]);
	totime=time+(todepth/30);
	data.push([totime, 0 ]);
	InitChart();
	Ember.$("#Depth").val("");
	Ember.$("#Time").val("");
	Ember.$("#inwater").hide();
	Ember.$("#outwater").show();
	}
	
	function addrest() {
	var time = parseInt(Ember.$("#Land").val(), 10);	
	var last = data[data.length-1];
	time = last[0] + time;
	data.push([ time, 0]);
	Ember.$("#Land").val("");
	Ember.$("#inwater").show();
	Ember.$("#outwater").hide();	
	}
