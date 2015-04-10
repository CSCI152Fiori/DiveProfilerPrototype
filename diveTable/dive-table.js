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

var surfaceIntervalTimes = [[1430, 1239, 1150, 1091, 1045, 1014, 984, 960, 938, 909, 901, 887],
                            [  -1,  180,  189,  189,  189,  187, 189, 189, 188, 189, 189, 189],
                            [  -1,   -1,   89,   88,   86,   88,  86,  88,  88,  97,  88,  86],
                            [  -1,   -1,   -1,   59,   62,   58,  58,  56,  58,  57,  57,  58],
                            [  -1,   -1,   -1,   -1,   44,   43,  43,  41,  41,  43,  42,  42],
                            [  -1,   -1,   -1,   -1,   -1,   35,  34,  34,  32,  32,  34,  33],
                            [  -1,   -1,   -1,   -1,   -1,   -1,  30,  29,  29,  27,  27,  29],
                            [  -1,   -1,   -1,   -1,   -1,   -1,  -1,  26,  25,  24,  23,  23],
                            [  -1,   -1,   -1,   -1,   -1,   -1,  -1,  -1,  23,  22,  21,  20],
                            [  -1,   -1,   -1,   -1,   -1,   -1,  -1,  -1,  -1,  21,  20,  18],
                            [  -1,   -1,   -1,   -1,   -1,   -1,  -1,  -1,  -1,  -1,  18,  18],
                            [  -1,   -1,   -1,   -1,   -1,   -1,  -1,  -1,  -1,  -1,  -1,  16]
                           ]

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
function depthTableLookUp(depth, time){
  var depthRow   = depthRowLookUp(depth);
  var timeColumn = timeColumnLookUp(depthRow, time);
  return timeColumn
}

//Prototype function CANNOT be used to plan real dives.
function surfaceTableLookUp(diveGroup, surfaceRestLength){
  for (var i = 0; i < 12; i++){
    if (surfaceRestLength > surfaceIntervalTimes[i][diveGroup] && surfaceRestLength <= surfaceIntervalTimes[i+1][diveGroup]) {
      return i;
    }
  }
}


