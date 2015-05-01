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

QUnit.test('A diver should not begin the first dive in a group', function(assert) {
  assert.ok( this.diver.currentGroup === "0");
  assert.ok( this.diver.currentGroupIndex === -1);
});

QUnit.test('A valid dive returns the correct group', function(assert) {
  this.diver.dive(50, 25);
  assert.ok( this.diver.currentGroup === "D", "Correct Group!" );
});

QUnit.module("Surface Interval Tests", {
  beforeEach: function(){
    this.dt = new NauiDiveTable();
    this.diver = new Diver(this.dt);
  }
});

QUnit.test('Surface Interval Times that are too short do not affect the group', function(assert) {
  this.diver.dive(50, 25);
  this.diver.surface(30);
  assert.ok( this.diver.currentGroup === "D", "Correct Group!" );
});

QUnit.test('Surface Intervals Times can change the group', function(assert) {
  this.diver.dive(50, 25);
  this.diver.surface(120);
  assert.ok( this.diver.currentGroup === "C", "Correct Group!" );
});

// Based on example from http://www.scubadiverinfo.com/2_divetables.html
QUnit.test('A surface interval >= 1440 minutes (one day) remove the diver from all dive groups', function(assert) {
  this.diver.dive(40, 60);
  this.diver.surface(1440);
  assert.ok( this.diver.currentGroup === "0", "Correct Group!" );
});

QUnit.module("Nitrogen tests", {
  beforeEach: function(){
    this.dt = new NauiDiveTable();
    this.diver = new Diver(this.dt);
  }
});

QUnit.test('Residual Nitrogen Time should be 0 before the first dive of the day', function(assert){
  this.diver.dive(40, 60);
  assert.ok(this.diver.residualNitrogenTime === 0);
});

QUnit.test('Residual Nitrogen Time should be > 0 during repetitive dives in the same day', function(assert){
  this.diver.dive(40, 60);
  this.diver.surface(120);
  this.diver.dive(40, 60);
  assert.ok(this.diver.residualNitrogenTime === 37);
});

QUnit.test('Residual Nitrogen Time should be 0 after a day of surface interval time', function(assert){
  this.diver.dive(40, 60);
  this.diver.surface(120);
  this.diver.dive(40, 60);
  this.diver.surface(1440);
  assert.ok(this.diver.residualNitrogenTime === 0);
});

QUnit.test('If RNT is too high invalid dives are rejected', function(assert){
  this.diver.dive(70, 45);
  this.diver.surface(10);
  assert.ok(this.diver.dive(40, 50) === false);
});

QUnit.module("Decompression Stops", {
  beforeEach: function(){
    this.dt = new NauiDiveTable();
    this.diver = new Diver(this.dt);
  }
});

QUnit.test('No decompression stop needed for dives <= maximum dive time', function(assert){
  this.diver.dive(40, 60);
  assert.ok(this.diver.decompCheck(40, 60) === 0);
});

QUnit.test('A decompression stop is added to the ascent of the first dive'
           + ' when the nitrogen accumulated during the dive is too high', function(assert){
  this.diver.dive(70, 60);
  assert.ok(this.diver.decompCheck(70, 60) === 8);
});

QUnit.test('A decompression stop is added during a repetitive dive when Total Nitrogen Time is too high', function(assert){
  this.diver.dive(40, 60);
  this.diver.surface(60);
  this.diver.dive(70, 20);
  assert.ok(this.diver.decompCheck(70, 20) === 8);
});
