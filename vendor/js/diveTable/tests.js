/* Dive Steps

   // Dive Table
   1. Pick a depth to dive to
   2. Pick amount of time to stay at that depth
   3. Calculate current dive group

   // Surface Interval Table
   4. Pick duration of Surface Interval
   5. Calculate new dive group after Surface Interval

   // Repetitive Dive Table
   6. Calculate Residual Nitrogen Time

*/

QUnit.module("Naui Table Tests", {
  beforeEach: function(){
    this.d = new NauiDiveTable();
  }
});
QUnit.test('Dive Table Look Up', function(assert) {
  assert.strictEqual(this.d.diveTableLookUp(50, 25, 0), 3, 'Return Correct Index of Dive Group');
});

QUnit.test('Minimum Depth in Meters', function(assert){
  assert.strictEqual(this.d.minimumMeterDepth(0), 12, 'Maintain minumum depth');
  assert.strictEqual(this.d.minimumMeterDepth(30), 30, 'depth exceeds minimum');
});

QUnit.test('Depth Row Look Up', function(assert) {
  assert.strictEqual(this.d.depthRowLookUp(0), 0,  'Below Minimum Depth');
  assert.strictEqual(this.d.depthRowLookUp(40), 0,  'Minimum Depth');
  assert.strictEqual(this.d.depthRowLookUp(130), 9,  'Maximum Depth');
  assert.strictEqual(this.d.depthRowLookUp(160), 9,  'Over Maximum Depth');
});

QUnit.test('timeColumnLookUp', function(assert){
  assert.strictEqual(this.d.timeColumnLookUp(2, 45, 0), 7);
});

QUnit.test('SurfaceGroupLookUp', function(assert){
  assert.strictEqual(this.d.surfaceTableLookUp(3, 30), 3, 'Same Group');
  assert.strictEqual(this.d.surfaceTableLookUp(3, 10), 3, 'Minimum Rest');
  assert.strictEqual(this.d.surfaceTableLookUp(2, 100), 1, 'Move up one group');
  assert.strictEqual(this.d.surfaceTableLookUp(3, 360), 0, 'Move up two groups');
});


QUnit.module("Diver Tests", {
  beforeEach: function(){
    this.dt = new NauiDiveTable();
    this.diver = new Diver(this.dt);
  }
});

QUnit.test('Dive Test', function(assert) {
  this.diver.dive(50, 25);
  assert.ok( this.diver.currentGroup === "D", "Correct Group!" );
});

QUnit.test('SIT Test', function(assert) {
  this.diver.dive(50, 25);
  this.diver.surface(3, 30);
  assert.ok( this.diver.currentGroup === "D", "Correct Group!" );
});


// Based on example from http://www.scubadiverinfo.com/2_divetables.html
QUnit.test('Dive and Surface', function(assert) {
  this.diver.dive(35, 60);
  this.diver.surface(this.diver.currentGroupIndex, 30);
  assert.ok( this.diver.currentGroup === "G", "Correct Group!" );
});


