"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _fp = require("lodash/fp");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Comp = (0, _.flowMax)((0, _.branch)(function (_ref) {
  var a = _ref.a;
  return a > 2;
}, function (props) {
  return _objectSpread({}, props, {
    a: 999
  });
}, function (props) {
  return _objectSpread({}, props, {
    a: -888
  });
}), function (_ref2) {
  var a = _ref2.a,
      testId = _ref2.testId;
  return _react["default"].createElement("div", {
    "data-testid": testId
  }, a);
});
var Brancher = (0, _.flowMax)((0, _.addStateHandlers)({
  abort: false
}, {
  toggleAbort: function toggleAbort(_ref3) {
    var abort = _ref3.abort;
    return function () {
      return {
        abort: !abort
      };
    };
  }
}), (0, _.branch)(function (_ref4) {
  var abort = _ref4.abort;
  return abort;
}, (0, _.renderNothing)()), (0, _.addState)('unused', 'setUnused'), function (_ref5) {
  var a = _ref5.a,
      testId = _ref5.testId,
      toggleAbort = _ref5.toggleAbort;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    "data-testid": testId
  }, a), _react["default"].createElement("button", {
    onClick: toggleAbort
  }, "toggle abort"));
});
var Brancher2 = (0, _.flowMax)((0, _.branch)(function (_ref6) {
  var abort = _ref6.abort;
  return abort;
}, (0, _.renderNothing)()), (0, _.addState)('unused', 'setUnused'), function (_ref7) {
  var a = _ref7.a,
      testId = _ref7.testId,
      toggleAbort = _ref7.toggleAbort;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    "data-testid": testId
  }, a), _react["default"].createElement("button", {
    onClick: toggleAbort
  }, "toggle abort"));
});
describe('branch', function () {
  test('works when test passes', function () {
    var testId = 'pass';

    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, {
      a: 3,
      testId: testId
    })),
        getByTestId = _render.getByTestId;

    expect(getByTestId(testId)).toHaveTextContent('999');
  });
  test('works when test fails', function () {
    var testId = 'fail';

    var _render2 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, {
      a: 1,
      testId: testId
    })),
        getByTestId = _render2.getByTestId;

    expect(getByTestId(testId)).toHaveTextContent('-888');
  });
  test('works with renderNothing()', function () {
    var testId = 'renderNothing-branch';

    var _render3 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Brancher, {
      a: 1,
      testId: testId
    })),
        getByTestId = _render3.getByTestId,
        getByText = _render3.getByText,
        queryByTestId = _render3.queryByTestId;

    expect(getByTestId(testId)).toHaveTextContent('1');

    _reactTestingLibrary.fireEvent.click(getByText(/toggle abort/));

    expect(queryByTestId(testId)).toBeNull();
  });
  test('works with renderNothing() when initially rendering nothing', function () {
    var testId = 'renderNothing-branch-initial-abort';
    var OuterState = (0, _fp.flow)((0, _.addStateHandlers)({
      abort: true
    }, {
      toggleAbort: function toggleAbort(_ref8) {
        var abort = _ref8.abort;
        return function () {
          return {
            abort: !abort
          };
        };
      }
    }), function (_ref9) {
      var abort = _ref9.abort,
          toggleAbort = _ref9.toggleAbort;
      return _react["default"].createElement("div", null, _react["default"].createElement(Brancher2, {
        abort: abort,
        a: 2,
        testId: testId
      }), _react["default"].createElement("button", {
        onClick: toggleAbort
      }, "toggle abort"));
    });

    var _render4 = (0, _reactTestingLibrary.render)(_react["default"].createElement(OuterState, null)),
        getByTestId = _render4.getByTestId,
        getByText = _render4.getByText,
        queryByTestId = _render4.queryByTestId;

    expect(queryByTestId(testId)).toBeNull();

    _reactTestingLibrary.fireEvent.click(getByText(/toggle abort/));

    expect(getByTestId(testId)).toHaveTextContent('2');
  });
});