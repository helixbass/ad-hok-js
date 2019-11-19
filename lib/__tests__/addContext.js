"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _fp = require("lodash/fp");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NumberContext = _react["default"].createContext();

var Comp = (0, _fp.flow)((0, _.addContext)(NumberContext, 'number'), function (_ref) {
  var number = _ref.number;
  return _react["default"].createElement("div", {
    "data-testid": "a"
  }, number);
});
describe('addContext', function () {
  return test('works', function () {
    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(NumberContext.Provider, {
      value: 3
    }, _react["default"].createElement(Comp, null))),
        getByTestId = _render.getByTestId;

    expect(getByTestId('a')).toHaveTextContent('3');
  });
});