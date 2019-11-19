"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Comp = (0, _.flowMax)((0, _.branch)(function (_ref) {
  var a = _ref.a;
  return a > 2;
}, (0, _.renderNothing)()), function (_ref2) {
  var a = _ref2.a,
      testId = _ref2.testId;
  return _react["default"].createElement("div", {
    "data-testid": testId
  }, a);
});
describe('renderNothing', function () {
  test('works', function () {
    var testId = 'pass';

    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, {
      a: 3,
      testId: testId
    })),
        queryByTestId = _render.queryByTestId;

    expect(queryByTestId(testId)).toBeNull();
  });
});