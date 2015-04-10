QUnit.test('Dive Table Look Up', function(assert) {
  assert.strictEqual(depthTableLookUp(50, 25), 3, 'First Test');
});

QUnit.test('Minimum Depth in Meters', function(assert){
  var d = new DiveTable();
  assert.strictEqual(minimumMeterDepth(0), 12, 'Maintain minumum depth');
  assert.strictEqual(minimumMeterDepth(30), 30, 'depth exceeds minimum');
});

QUnit.test('Depth Row Look Up', function(assert) {
  assert.strictEqual(depthRowLookUp(0), 0,  'Below Minimum Depth');
  assert.strictEqual(depthRowLookUp(40), 0,  'Minimum Depth');
  assert.strictEqual(depthRowLookUp(130), 9,  'Maximum Depth');
  assert.strictEqual(depthRowLookUp(160), 9,  'Over Maximum Depth');
});


QUnit.test('Create dive table function', function(assert) {
  var d = new DiveTable();

  assert.ok( d.Name === "Naui", "That's my name!");

});
