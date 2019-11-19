"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var InitialDisplayName = (0, _.flowMax)((0, _.addDisplayName)('Initial'), (0, _.addProps)({
  a: 3
}), function (_ref) {
  var a = _ref.a,
      testId = _ref.testId;
  return _react["default"].createElement("div", {
    "data-testid": testId
  }, a);
});
var NonInitialDisplayName = (0, _.flowMax)((0, _.addProps)({
  a: 4
}), (0, _.addDisplayName)('NonInitial'), function (_ref2) {
  var a = _ref2.a,
      testId = _ref2.testId;
  return _react["default"].createElement("div", {
    "data-testid": testId
  }, a);
});
describe('addDisplayName', function () {
  test('works as initial step', function () {
    expect(InitialDisplayName.displayName).toBe('Initial');
    var testId = 'initial-step';

    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(InitialDisplayName, {
      testId: testId
    })),
        getByTestId = _render.getByTestId;

    expect(getByTestId(testId)).toHaveTextContent('3');
  });
  test('works as non-initial step', function () {
    expect(NonInitialDisplayName.displayName).toBe('NonInitial');
    var testId = 'non-initial-step';

    var _render2 = (0, _reactTestingLibrary.render)(_react["default"].createElement(NonInitialDisplayName, {
      testId: testId
    })),
        getByTestId = _render2.getByTestId;

    expect(getByTestId(testId)).toHaveTextContent('4');
  });
});