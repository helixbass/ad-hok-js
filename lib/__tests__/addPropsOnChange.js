"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _fp = require("lodash/fp");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
var Comp = (0, _fp.flow)((0, _.addPropsOnChange)(['x'], function (_ref) {
  var x = _ref.x;
  console.log('recomputing y');
  return {
    y: x * 2
  };
}), function (_ref2) {
  var y = _ref2.y,
      testId = _ref2.testId;
  return _react["default"].createElement("div", {
    "data-testid": testId
  }, y);
});
var CompCallback = (0, _fp.flow)((0, _.addPropsOnChange)(function (prevProps, props) {
  return prevProps.x[0] !== props.x[0];
}, function (_ref3) {
  var x = _ref3.x;
  console.log('recomputing y');
  return {
    y: x[0] * 2
  };
}), function (_ref4) {
  var y = _ref4.y,
      testId = _ref4.testId;
  return _react["default"].createElement("div", {
    "data-testid": testId
  }, y);
});
describe('addPropsOnChange', function () {
  test('works with dependencies list', function () {
    jest.spyOn(console, 'log').mockImplementation(function () {});
    var testId = 'basic';

    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, {
      x: 2,
      z: 3,
      testId: testId
    })),
        getByTestId = _render.getByTestId,
        rerender = _render.rerender;

    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('4');
    rerender(_react["default"].createElement(Comp, {
      x: 2,
      z: 5,
      testId: testId
    }));
    expect(console.log).not.toHaveBeenCalled();
    console.log.mockClear();
    rerender(_react["default"].createElement(Comp, {
      x: 4,
      z: 5,
      testId: testId
    }));
    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('8');
  });
  test('works with change callback', function () {
    jest.spyOn(console, 'log').mockImplementation(function () {});
    var testId = 'callback';

    var _render2 = (0, _reactTestingLibrary.render)(_react["default"].createElement(CompCallback, {
      x: [2],
      z: 3,
      testId: testId
    })),
        getByTestId = _render2.getByTestId,
        rerender = _render2.rerender;

    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('4');
    rerender(_react["default"].createElement(CompCallback, {
      x: [2],
      z: 5,
      testId: testId
    }));
    expect(console.log).not.toHaveBeenCalled();
    console.log.mockClear();
    rerender(_react["default"].createElement(CompCallback, {
      x: [4],
      z: 5,
      testId: testId
    }));
    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('8');
  });
});