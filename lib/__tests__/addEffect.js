"use strict";

var _react = _interopRequireWildcard(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _fp = require("lodash/fp");

var _ = require("..");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// eslint-disable-next-line react/prop-types
var DisplayComp = function DisplayComp(_ref) {
  var x = _ref.x;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    "data-testid": "a"
  }, x));
};

var Comp = (0, _fp.flow)((0, _.addState)('x', 'setX', 'aaa'), (0, _.addEffect)(function (_ref2) {
  var setX = _ref2.setX;
  return function () {
    // axios.get.mockResolvedValueOnce data: greeting: 'ddd'
    // {data: {greeting}} = await axios.get 'SOME_URL'
    setX('ddd');
  };
}), (0, _react.createFactory)(DisplayComp));
var Comp2 = (0, _fp.flow)((0, _.addState)('x', 'setX', 0), (0, _.addEffect)(function (_ref3) {
  var x = _ref3.x,
      setX = _ref3.setX;
  return function () {
    setX(x + 1);
  };
}, []), function (_ref4) {
  var x = _ref4.x,
      testId = _ref4.testId;
  return _react["default"].createElement("div", {
    "data-testid": testId
  }, x);
});
var Comp3 = (0, _fp.flow)((0, _.addState)('x', 'setX', 0), (0, _.addEffect)(function (_ref5) {
  var x = _ref5.x,
      setX = _ref5.setX;
  return function () {
    setX(x + 1);
  };
}, ['y']), function (_ref6) {
  var x = _ref6.x,
      testId = _ref6.testId;
  return _react["default"].createElement("div", {
    "data-testid": testId
  }, x);
});
var PathDependency = (0, _fp.flow)((0, _.addState)('x', 'setX', 0), (0, _.addEffect)(function (_ref7) {
  var x = _ref7.x,
      setX = _ref7.setX;
  return function () {
    setX(x + 1);
  };
}, ['y', 'user.id']), function (_ref8) {
  var x = _ref8.x,
      testId = _ref8.testId;
  return _react["default"].createElement("div", {
    "data-testid": testId
  }, x);
});
var Comp4 = (0, _fp.flow)((0, _.addState)('x', 'setX', 0), (0, _.addEffect)(function (_ref9) {
  var x = _ref9.x,
      setX = _ref9.setX;
  return function () {
    setX(x + 1);
  };
}, function (prevProps, props) {
  return prevProps.y < props.y;
}), function (_ref10) {
  var x = _ref10.x,
      testId = _ref10.testId;
  return _react["default"].createElement("div", {
    "data-testid": testId
  }, x);
});
describe('addEffect', function () {
  test('fires',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _render, getByText, rerender, updatedEl;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, null)), getByText = _render.getByText, rerender = _render.rerender;
            rerender(_react["default"].createElement(Comp, null));
            _context.next = 4;
            return (0, _reactTestingLibrary.waitForElement)(function () {
              return getByText('ddd');
            });

          case 4:
            updatedEl = _context.sent;
            expect(updatedEl).toHaveTextContent('ddd');

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('passes changed-props arg to useEffect()', function () {
    var testId = 'comp2';

    var _render2 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp2, {
      testId: testId
    })),
        rerender = _render2.rerender,
        getByTestId = _render2.getByTestId;

    expect(getByTestId(testId)).toHaveTextContent('1');
    rerender(_react["default"].createElement(Comp2, {
      testId: testId
    }));
    expect(getByTestId(testId)).toHaveTextContent('1');
  });
  test('accepts simple dependencies', function () {
    var testId = 'comp3';

    var _render3 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp3, {
      y: 1,
      z: 2,
      testId: testId
    })),
        getByTestId = _render3.getByTestId,
        rerender = _render3.rerender;

    expect(getByTestId(testId)).toHaveTextContent('1');
    rerender(_react["default"].createElement(Comp3, {
      y: 1,
      z: 3,
      testId: testId
    }));
    expect(getByTestId(testId)).toHaveTextContent('1');
    rerender(_react["default"].createElement(Comp3, {
      y: 2,
      z: 3,
      testId: testId
    }));
    expect(getByTestId(testId)).toHaveTextContent('2');
  });
  test('accepts path dependencies', function () {
    var testId = 'path-dependency';

    var _render4 = (0, _reactTestingLibrary.render)(_react["default"].createElement(PathDependency, {
      y: 1,
      z: 2,
      testId: testId,
      user: {
        id: 3
      }
    })),
        getByTestId = _render4.getByTestId,
        rerender = _render4.rerender;

    expect(getByTestId(testId)).toHaveTextContent('1');
    rerender(_react["default"].createElement(PathDependency, {
      y: 1,
      z: 3,
      testId: testId,
      user: {
        id: 3
      }
    }));
    expect(getByTestId(testId)).toHaveTextContent('1');
    rerender(_react["default"].createElement(PathDependency, {
      y: 2,
      z: 3,
      testId: testId,
      user: {
        id: 3
      }
    }));
    expect(getByTestId(testId)).toHaveTextContent('2');
    rerender(_react["default"].createElement(PathDependency, {
      y: 2,
      z: 3,
      testId: testId,
      user: {
        id: 4
      }
    }));
    expect(getByTestId(testId)).toHaveTextContent('3');
  });
  test('accepts callback dependencies argument', function () {
    var testId = 'comp4';

    var _render5 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp4, {
      y: 1,
      z: 2,
      testId: testId
    })),
        getByTestId = _render5.getByTestId,
        rerender = _render5.rerender;

    expect(getByTestId(testId)).toHaveTextContent('1');
    rerender(_react["default"].createElement(Comp4, {
      y: 1,
      z: 3,
      testId: testId
    }));
    expect(getByTestId(testId)).toHaveTextContent('1');
    rerender(_react["default"].createElement(Comp4, {
      y: 0,
      z: 3,
      testId: testId
    }));
    expect(getByTestId(testId)).toHaveTextContent('1');
    rerender(_react["default"].createElement(Comp4, {
      y: 2,
      z: 3,
      testId: testId
    }));
    expect(getByTestId(testId)).toHaveTextContent('2');
  });
});