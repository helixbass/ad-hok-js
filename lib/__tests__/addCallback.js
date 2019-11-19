"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _fp = require("lodash/fp");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Comp = (0, _fp.flow)((0, _.addState)('inputNode', 'setInputNode'), (0, _.addCallback)('inputCallbackRef', function (_ref) {
  var setInputNode = _ref.setInputNode;
  return function (node) {
    setInputNode(node);
  };
}, []), function (_ref2) {
  var inputCallbackRef = _ref2.inputCallbackRef,
      inputNode = _ref2.inputNode;
  return _react["default"].createElement("div", null, _react["default"].createElement("input", {
    "data-testid": "input",
    ref: inputCallbackRef
  }), _react["default"].createElement("button", {
    onClick: function onClick() {
      return inputNode.focus();
    }
  }, "update"));
});
describe('addCallback', function () {
  test('works', function () {
    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, null)),
        getByText = _render.getByText,
        getByTestId = _render.getByTestId;

    _reactTestingLibrary.fireEvent.click(getByText(/update/));

    expect(document.activeElement).toBe(getByTestId('input'));
  });
});