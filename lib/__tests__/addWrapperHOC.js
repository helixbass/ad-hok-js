"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var hoc = function hoc(Component) {
  return function (props) {
    return _react["default"].createElement("div", null, _react["default"].createElement("span", {
      "data-testid": "hoc-passed-x"
    }, props.x), _react["default"].createElement(Component, _extends({}, props, {
      z: 3
    })));
  };
};

var Comp = (0, _.flowMax)((0, _.addWrapperHOC)(hoc), function (_ref) {
  var y = _ref.y,
      z = _ref.z;
  return _react["default"].createElement("div", null, _react["default"].createElement("span", {
    "data-testid": "child-y"
  }, y), _react["default"].createElement("span", {
    "data-testid": "child-z"
  }, z));
});
describe('addWrapperHOC', function () {
  test('works', function () {
    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, {
      x: "2",
      y: "4"
    })),
        getByTestId = _render.getByTestId;

    expect(getByTestId('hoc-passed-x')).toHaveTextContent('2');
    expect(getByTestId('child-y')).toHaveTextContent('4');
    expect(getByTestId('child-z')).toHaveTextContent('3');
  });
});