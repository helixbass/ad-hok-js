"use strict";

var _react = _interopRequireWildcard(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _fp = require("lodash/fp");

var _ = require("..");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/* eslint-disable no-console */
var Comp = (0, _fp.flow)((0, _.addHandlers)({
  onClick: function onClick(_ref) {
    var _onClick = _ref.onClick;
    return function (num) {
      _onClick(num * 2);
    };
  }
}), function (_ref2) {
  var _onClick2 = _ref2.onClick;
  return _react["default"].createElement("div", null, _react["default"].createElement("button", {
    onClick: function onClick() {
      return _onClick2(3);
    }
  }, "update"));
});

var Outer = function Outer() {
  var inputRef = (0, _react.useRef)();
  return _react["default"].createElement("div", null, _react["default"].createElement("input", {
    "data-testid": "input",
    ref: inputRef
  }), _react["default"].createElement(Comp, {
    onClick: function onClick(val) {
      inputRef.current.value = val;
    }
  }));
};

var Deps = (0, _fp.flow)((0, _.addState)('y', 'setY', 2), (0, _.addHandlers)({
  onClick: function onClick(_ref3) {
    var x = _ref3.x,
        setY = _ref3.setY;
    return function () {
      setY(x + 1);
    };
  }
}, ['x', 'setY', 'user.id']), function (_ref4) {
  var onClick = _ref4.onClick,
      y = _ref4.y,
      testId = _ref4.testId;
  return _react["default"].createElement("div", null, _react["default"].createElement(Pure, {
    onClick: onClick
  }), _react["default"].createElement("div", {
    "data-testid": testId
  }, y));
});
var DepsCallback = (0, _fp.flow)((0, _.addState)('y', 'setY', 2), (0, _.addHandlers)({
  onClick: function onClick(_ref5) {
    var x = _ref5.x,
        setY = _ref5.setY;
    return function () {
      setY(x + 1);
    };
  }
}, function (prevProps, props) {
  return prevProps.x < props.x;
}), function (_ref6) {
  var onClick = _ref6.onClick,
      y = _ref6.y,
      testId = _ref6.testId;
  return _react["default"].createElement("div", null, _react["default"].createElement(Pure, {
    onClick: onClick,
    label: "pure button DepsCallback"
  }), _react["default"].createElement("div", {
    "data-testid": testId
  }, y));
}); // eslint-disable-next-line react/prop-types

var Pure = _react["default"].memo(function (_ref7) {
  var onClick = _ref7.onClick,
      _ref7$label = _ref7.label,
      label = _ref7$label === void 0 ? 'pure button' : _ref7$label;
  console.log('Pure rerendered');
  return _react["default"].createElement("div", null, _react["default"].createElement("button", {
    onClick: onClick
  }, label));
});

describe('addHandlers', function () {
  test('works', function () {
    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(Outer, null)),
        getByText = _render.getByText,
        getByTestId = _render.getByTestId;

    _reactTestingLibrary.fireEvent.click(getByText(/update/));

    expect(getByTestId('input').value).toBe('6');
  });
  test('allows specifying dependencies for stable handler identities across rerenders', function () {
    jest.spyOn(console, 'log').mockImplementation(function () {});
    var testId = 'y';
    var x = 4;

    var _render2 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Deps, {
      x: x,
      testId: testId,
      user: {
        id: 3
      }
    })),
        rerender = _render2.rerender,
        getByText = _render2.getByText,
        getByTestId = _render2.getByTestId;

    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    rerender(_react["default"].createElement(Deps, {
      x: x,
      testId: testId,
      user: {
        id: 3
      }
    }));
    expect(console.log).not.toHaveBeenCalled();
    console.log.mockClear();

    _reactTestingLibrary.fireEvent.click(getByText(/pure button/));

    expect(console.log).not.toHaveBeenCalled();
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('5');
    x = 6;
    rerender(_react["default"].createElement(Deps, {
      x: x,
      testId: testId,
      user: {
        id: 3
      }
    }));
    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();

    _reactTestingLibrary.fireEvent.click(getByText(/pure button/));

    expect(console.log).not.toHaveBeenCalled();
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('7');
    rerender(_react["default"].createElement(Deps, {
      x: x,
      testId: testId,
      user: {
        id: 4
      }
    }));
    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('7');
  });
  test('allows specifying dependencies as callback', function () {
    jest.spyOn(console, 'log').mockImplementation(function () {});
    var testId = 'dependencies-callback';
    var x = 5;

    var _render3 = (0, _reactTestingLibrary.render)(_react["default"].createElement(DepsCallback, {
      x: x,
      testId: testId
    })),
        rerender = _render3.rerender,
        getByText = _render3.getByText,
        getByTestId = _render3.getByTestId;

    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    rerender(_react["default"].createElement(DepsCallback, {
      x: x,
      testId: testId
    }));
    expect(console.log).not.toHaveBeenCalled();
    console.log.mockClear();
    x = 4;
    rerender(_react["default"].createElement(DepsCallback, {
      x: x,
      testId: testId
    }));
    expect(console.log).not.toHaveBeenCalled();
    console.log.mockClear();

    _reactTestingLibrary.fireEvent.click(getByText(/pure button DepsCallback/));

    expect(console.log).not.toHaveBeenCalled();
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('6');
    x = 6;
    rerender(_react["default"].createElement(DepsCallback, {
      x: x,
      testId: testId
    }));
    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();

    _reactTestingLibrary.fireEvent.click(getByText(/pure button DepsCallback/));

    expect(console.log).not.toHaveBeenCalled();
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('7');
  });
});