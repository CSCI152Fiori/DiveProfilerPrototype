
QUnit.test('Dive Table Look Up', function(assert) {
  assert.strictEqual(tableLookUp(50, 25), 'D', 'First Test');
});

QUnit.test('Minimum Depth in Meters', function(assert){
  assert.strictEqual(minimumMeterDepth(0), 12, 'Maintain minumum depth');
  assert.strictEqual(minimumMeterDepth(30), 30, 'depth exceeds minimum');
});

QUnit.test('Depth Row Look Up', function(assert) {
  assert.strictEqual(depthRowLookUp(0), 0,  'Below Minimum Depth');
  assert.strictEqual(depthRowLookUp(40), 0,  'Minimum Depth');
  assert.strictEqual(depthRowLookUp(130), 9,  'Maximum Depth');
  assert.strictEqual(depthRowLookUp(160), 9,  'Over Maximum Depth');
});
