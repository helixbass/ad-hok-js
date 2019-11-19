"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _fp = require("lodash/fp");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Comp = (0, _fp.flow)((0, _.addRef)('inputRef'), function (_ref) {
  var inputRef = _ref.inputRef;
  return _react["default"].createElement("div", null, _react["default"].createElement("input", {
    "data-testid": "input",
    ref: inputRef
  }), _react["default"].createElement("button", {
    onClick: function onClick() {
      return inputRef.current.focus();
    }
  }, "update"));
});
describe('addRef', function () {
  test('works', function () {
    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, null)),
        getByText = _render.getByText,
        getByTestId = _render.getByTestId;

    _reactTestingLibrary.fireEvent.click(getByText(/update/));

    expect(document.activeElement).toBe(getByTestId('input'));
  });
});