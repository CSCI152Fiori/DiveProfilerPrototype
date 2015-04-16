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

