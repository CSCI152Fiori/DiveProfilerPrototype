QUnit.test('Dive Table Look Up', function(assert) {
  var d = new NauiDiveTable();
  assert.strictEqual(d.depthTableLookUp(50, 25), 3, 'First Test');
});

QUnit.test('Minimum Depth in Meters', function(assert){
  var d = new NauiDiveTable();
  assert.strictEqual(d.minimumMeterDepth(0), 12, 'Maintain minumum depth');
  assert.strictEqual(d.minimumMeterDepth(30), 30, 'depth exceeds minimum');
});

QUnit.test('Depth Row Look Up', function(assert) {
  var d = new NauiDiveTable();
  assert.strictEqual(d.depthRowLookUp(0), 0,  'Below Minimum Depth');
  assert.strictEqual(d.depthRowLookUp(40), 0,  'Minimum Depth');
  assert.strictEqual(d.depthRowLookUp(130), 9,  'Maximum Depth');
  assert.strictEqual(d.depthRowLookUp(160), 9,  'Over Maximum Depth');
});


QUnit.test('Create dive table function', function(assert) {
  var d = new NauiDiveTable();

  assert.ok( d.Name === "Naui", "That's my name!");

});

