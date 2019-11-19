"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _fp = require("lodash/fp");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Comp = (0, _fp.flow)((0, _.addState)('x', 'setX', 'abcd'), function (_ref) {
  var x = _ref.x,
      setX = _ref.setX;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    "data-testid": "a"
  }, x), _react["default"].createElement("button", {
    onClick: function onClick() {
      setX('efg');
    }
  }, "update"));
});
var Comp2 = (0, _fp.flow)((0, _.addState)('x', 'setX', function (_ref2) {
  var initial = _ref2.initial;
  return initial;
}), function (_ref3) {
  var x = _ref3.x;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    "data-testid": "b"
  }, x));
});
describe('addState', function () {
  test('initial state', function () {
    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, null)),
        getByTestId = _render.getByTestId;

    expect(getByTestId('a')).toHaveTextContent('abcd');
  });
  test('setter', function () {
    var _render2 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, null)),
        getByText = _render2.getByText,
        getByTestId = _render2.getByTestId;

    _reactTestingLibrary.fireEvent.click(getByText(/update/));

    expect(getByTestId('a')).toHaveTextContent('efg');
  });
  test('initial state from props', function () {
    var _render3 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp2, {
      initial: "aaa"
    })),
        getByTestId = _render3.getByTestId;

    expect(getByTestId('b')).toHaveTextContent('aaa');
  });
});