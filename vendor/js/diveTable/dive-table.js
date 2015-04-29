// Naui dive table
function NauiDiveTable(){
  this.Name = "Naui";

  this.depthFeet   = [40, 50, 60, 70, 80, 90, 100, 110, 120, 130];
  this.depthMeters = [12, 15, 18, 21, 24, 27,  30,  33,  36,  40];
  this.letterGroup = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  this.maxDiveTime    = [ 130, 80, 55, 45, 35, 25, 22, 15, 12, 8];
  this.decompMaxTime = [150, 100, 80, 70, 60, 50, 40, 30, 30, 25];

  this.decompTime = [ [[150, 5]],
                       [[100, 5]],
                       [[60, 5], [80, 7]],
                       [[50, 5], [60, 8], [70, 14]],
                       [[40, 5], [50, 10], [60, 17]],
                       [[30, 5], [40, 7], [50, 18]],
                       [[25, 5], [40, 15]],
                       [[20, 5], [30, 7]],
                       [[15, 5], [25, 6], [30, 14]],
                       [[10, 5], [25, 10]]
                    ];  
  
  
  this.timeAtDepth = [ [ 5, 15, 25, 30, 40, 50, 70, 80, 100, 110, 130, 150],
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

this.surfaceIntervalTimes = [ [ 1440, 1440,1440,1440, 1440, 1440, 1440, 1440, 1440, 1440, 1440, 1440],
                              [   -1, 190 , 289, 348,  394,  425,  455,  479,  501,  530,  538,  552],
                              [   -1, -1  , 99 , 158,  204,  158,  265,  289,  312,  340,  348,  362],
                              [   -1, -1  , -1 ,  69,  117,  178,  178,  200,  223,  242,  259,  275],
                              [   -1, -1  , -1 ,  -1,   54,  119,  119,  143,  164,  184,  201,  216],
                              [   -1, -1  , -1 ,  -1,   -1,   45,   75,  101,  122,  140,  158,  173],
                              [   -1, -1  , -1 ,  -1,   -1,   -1,   40,   66,   89,  107,  123,  139],
                              [   -1, -1  , -1 ,  -1,   -1,   -1,   -1,   36,   59,   79,   95,  109],
                              [   -1, -1  , -1 ,  -1,   -1,   -1,   -1,   -1,   33,   54,   71,   85],
                              [   -1, -1  , -1 ,  -1,   -1,   -1,   -1,   -1,   -1,   31,   49,   64],
                              [   -1, -1  , -1 ,  -1,   -1,   -1,   -1,   -1,   -1,   -1,   28,   45],
                              [   -1, -1  , -1 ,  -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   26]
                            ];

  this.residualNitrogenTable = [ [  7,  6,  5,   4,  4,  3,  3,  3,  3,  3 ],
                                 [ 17,  13, 11,  9,  8,  7,  7,  6,  6,  6 ],
                                 [ 25,  21, 17, 15, 13, 11, 10, 10,  9,  8 ],
                                 [ 37,  29, 24, 20, 18, 16, 14, 13, 12, 11 ],
                                 [ 49,  38, 30, 26, 23, 20, 18, 16, 15, 13 ],
                                 [ 61,  47, 36, 31, 28, 24, 22, 20, 18, 16 ],
                                 [ 73,  56, 44, 37, 32, 29, 26, 24, 21, 19 ],
                                 [ 87,  66, 52, 43, 38, 33, 30, 27, 25, 22 ],
                                 [101,  76, 61, 50, 43, 38, 34, 31, 28, 25 ],
                                 [116,  87, 70, 57, 48, 43, 38, -1, -1, -1 ],
                                 [138,  99, 79, 64, 54, 47, -1, -1, -1, -1 ],
                                 [161, 111, 88, 72, 61, 54, -1, -1, -1, -1 ]
                               ];

							   
							   
  //Prototype function CANNOT be used to plan real dives.
  this.minimumMeterDepth = function(depth) {
    if (depth < 12) {
      return 12;
    }
    else {
      return depth;
    }
  };

  //Prototype function CANNOT be used to plan real dives.
  this.minimumFootDepth = function(depth) {
    if (depth < 40) {
      return 40;
    }
    else {
      return depth;
    }
  };

  //Prototype function CANNOT be used to plan real dives.
  this.depthRowLookUp = function(depth) {
    depth = this.minimumFootDepth(depth);
    for (var i = 0; i < 10; i++){
      if (i === (this.depthFeet.length - 1)){
        return i;
      }
      if (depth < this.depthFeet[i + 1]) {
        return i;
      }
    }
  };

  //Prototype function CANNOT be used to plan real dives.
  this.timeColumnLookUp = function(depthRow, time, residualTime){
    time += residualTime;
    for (var i = 0; i < 12; i++){
      if (time <= this.timeAtDepth[depthRow][i + 1]) {
        return i+1;
      }
    }
  };

  //Prototype function CANNOT be used to plan real dives.
  this.diveTableLookUp = function(depth, time, residualTime){
    var depthRow   = this.depthRowLookUp(depth);
    var timeColumn = this.timeColumnLookUp(depthRow, time, residualTime);
    return timeColumn;
  };

  //Prototype function CANNOT be used to plan real dives.
  this.surfaceTableLookUp = function(diveGroup, surfaceRestLength){
    for (var i = 0; i < 11; i++){
      if (surfaceRestLength >= this.surfaceIntervalTimes[i+1][diveGroup]){
          return i;
      }
    }
	return 11;
  };
}

function Diver(diveTable){
  this.letterGroup = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  this.diveTable            = diveTable;
  this.currentGroupIndex    = -1;
  this.currentGroup         = '0';
  this.residualNitrogenTime = 0;
  this.maxDiveTime          = 150;

  this.maxDiveTime    = [ 130, 80, 55, 45, 35, 25, 22, 15, 12, 8];

  //Prototype function CANNOT be used to plan real dives.
  this.dive = function(depth, time){
    var tempGroupIndex = this.diveTable.depthRowLookUp(depth);
    if (time + this.residualNitrogenTime > this.diveTable.maxDiveTime[tempGroupIndex]){
      return false;
    }

    this.currentGroupIndex = this.diveTable.diveTableLookUp(depth, time, this.residualNitrogenTime);
    this.currentGroup = this.letterGroup[this.currentGroupIndex];
	return true;
  };

  //Prototype function CANNOT be used to plan real dives.
  this.surface = function(time){
    this.currentGroupIndex = this.diveTable.surfaceTableLookUp(this.currentGroupIndex, time);
    this.currentGroup = this.letterGroup[this.currentGroupIndex];
  };
}
