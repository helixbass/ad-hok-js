"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
var Comp = (0, _.flowMax)((0, _.addPropTypes)({
  a: _propTypes["default"].number.isRequired
}), function (_ref) {
  var a = _ref.a;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    "data-testid": "a"
  }, a));
});
var Comp2 = (0, _.flowMax)((0, _.addProps)({
  b: 3
}), (0, _.addPropTypes)({
  c: _propTypes["default"].number.isRequired
}), function (_ref2) {
  var c = _ref2.c;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    "data-testid": "c"
  }, c));
});
describe('addPropTypes', function () {
  beforeAll(function () {
    jest.spyOn(console, 'error').mockImplementation(function () {});
  });
  afterAll(function () {
    console.error.mockRestore();
  });
  afterEach(function () {
    console.error.mockClear();
  });
  test('non-initial works', function () {
    (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp2, {
      c: 3
    }));
    expect(console.error).not.toHaveBeenCalled();
  });
  test('non-initial works with wrong prop types', function () {
    (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp2, {
      c: true
    }));
    expect(console.error).toHaveBeenCalled();
  });
  test('works', function () {
    (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, {
      a: 3
    }));
    expect(console.error).not.toHaveBeenCalled();
  });
  test('works with wrong prop types', function () {
    (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, {
      a: true
    }));
    expect(console.error).toHaveBeenCalled();
  });
});