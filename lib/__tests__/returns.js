"use strict";

var _ = require("..");

describe('returns', function () {
  test('works as initial step', function () {
    var ret = (0, _.flowMax)((0, _.returns)(function (val) {
      return val + 2;
    }), function () {
      return 4;
    })(1);
    expect(ret).toBe(3);
  });
  test('works as non-initial step', function () {
    var ret = (0, _.flowMax)(function () {
      return 2;
    }, (0, _.returns)(function (val) {
      return val + 1;
    }), function () {
      return 4;
    })(1);
    expect(ret).toBe(3);
  });
  test('works with branchPure()', function () {
    var returnThreeIfGreaterThanOne = (0, _.flowMax)((0, _.branchPure)(function (x) {
      return x > 1;
    }, (0, _.returns)(function (val) {
      return val + 1;
    })), function () {
      return 4;
    });
    var ret = returnThreeIfGreaterThanOne(2);
    expect(ret).toBe(3);
    ret = returnThreeIfGreaterThanOne(1);
    expect(ret).toBe(4);
  });
});