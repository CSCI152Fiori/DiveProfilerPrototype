// Naui dive table
var depthFeet   = [40, 50, 60, 70, 80, 90, 100, 110, 120, 130];
var depthMeters = [12, 15, 18, 21, 24, 27,  30,  33,  36,  40];
var letterGroup = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

var timeAtDepth = [ [5, 15, 25, 30, 40, 50, 70, 80, 100, 110, 130, 150],
                   [-1, 10, 15, 25, 30, 40, 50, 60,  70,  80,  -1, 100],
                   [-1, 10, 15, 20, 25, 30, 40, 50,  55,  60,  -1,  80],
                   [-1,  5, 10, 15, 20, 30, 35, 40,  45,  50,  60,  70],
                   [-1,  5, 10, 15, 20, 25, 30, 35,  40,  -1,  50,  60],
                   [-1,  5, 10, 12, 15, 20, 25, 30,  -1,  40,  -1,  50],
                   [-1,  5,  7, 10, 15, 20, 22, 25,  -1,  -1,  40,  -1],
                   [-1, -1,  5, 10, 13, 15, 20, -1,  -1,  30,  -1,  -1],
                   [-1, -1,  5, 10, 12, 20, -1, -1,  25,  30,  -1,  -1],
                   [-1, -1,  5,  8, 10, -1, -1, -1,  -1,  25,  -1,  -1]
                  ];


//Prototype function CANNOT be used to plan real dives.
function minimumMeterDepth(depth){
  if (depth < 12) {
    return 12;
  }
  else {
    return depth;
  }
}

//Prototype function CANNOT be used to plan real dives.
function minimumFootDepth(depth) {
  if (depth < 40) {
    return 40;
  }
  else {
    return depth;
  }
}

//Prototype function CANNOT be used to plan real dives.
function depthRowLookUp(depth) {
  depth = minimumFootDepth(depth);
  for (var i = 0; i < 10; i++){
    if (i == depthFeet.length - 1){
      return i;
    }
    if (depth >= depthFeet[i] && depth < depthFeet[i + 1]) {
      return i;
    }
  }
}

//Prototype function CANNOT be used to plan real dives.
function timeColumnLookUp(depthRow, time){
  for (var i = 0; i < 12; i++){
    if (time > timeAtDepth[depthRow][i] && time <= timeAtDepth[depthRow][i + 1]) {
      return i+1;
    }
  }
}

//Prototype function CANNOT be used to plan real dives.
function tableLookUp(depth, time){
  var depthRow   = depthRowLookUp(depth);
  var timeColumn = timeColumnLookUp(depthRow, time);
  return letterGroup[timeColumn];
}

