"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _fp = require("lodash/fp");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console, react/prop-types */
var Comp = (0, _fp.flow)((0, _.addStateHandlers)({
  x: 2
}, {
  incrementX: function incrementX(_ref) {
    var x = _ref.x;
    return function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$by = _ref2.by,
          amount = _ref2$by === void 0 ? 1 : _ref2$by;

      return {
        x: x + amount
      };
    };
  }
}), function (_ref3) {
  var x = _ref3.x,
      incrementX = _ref3.incrementX;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    "data-testid": "a"
  }, x), _react["default"].createElement("button", {
    onClick: incrementX
  }, "increment"), _react["default"].createElement("button", {
    onClick: function onClick() {
      incrementX({
        by: 2
      });
    }
  }, "two"));
});
var Comp2 = (0, _fp.flow)((0, _.addStateHandlers)({
  x: 12
}, {
  incrementX: function incrementX(_ref4, _ref5) {
    var x = _ref4.x;
    var _ref5$y = _ref5.y,
        y = _ref5$y === void 0 ? 0 : _ref5$y;
    return function () {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref6$by = _ref6.by,
          amount = _ref6$by === void 0 ? 1 : _ref6$by;

      return {
        x: x + amount + y
      };
    };
  }
}), function (_ref7) {
  var x = _ref7.x,
      incrementX = _ref7.incrementX;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    "data-testid": "b"
  }, x), _react["default"].createElement("button", {
    onClick: incrementX
  }, "incremental"), _react["default"].createElement("button", {
    onClick: function onClick() {
      incrementX({
        by: 2
      });
    }
  }, "two more"));
});
var Comp3 = (0, _fp.flow)((0, _.addStateHandlers)(function (_ref8) {
  var initialX = _ref8.initialX;
  return {
    x: initialX
  };
}, {
  incrementX: function incrementX(_ref9) {
    var x = _ref9.x;
    return function () {
      var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref10$by = _ref10.by,
          amount = _ref10$by === void 0 ? 1 : _ref10$by;

      return {
        x: x + amount
      };
    };
  }
}), function (_ref11) {
  var x = _ref11.x,
      incrementX = _ref11.incrementX;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    "data-testid": "c"
  }, x), _react["default"].createElement("button", {
    onClick: incrementX
  }, "increment"), _react["default"].createElement("button", {
    onClick: function onClick() {
      incrementX({
        by: 2
      });
    }
  }, "two"));
});
var EmptyDeps = (0, _fp.flow)((0, _.addStateHandlers)({
  x: 1
}, {
  incrementX: function incrementX(_ref12) {
    var x = _ref12.x;
    return function () {
      return {
        x: x + 1
      };
    };
  }
}, []), function (_ref13) {
  var incrementX = _ref13.incrementX,
      x = _ref13.x,
      testId = _ref13.testId;
  return _react["default"].createElement("div", null, _react["default"].createElement(EmptyPure, {
    onClick: incrementX
  }), _react["default"].createElement("div", {
    "data-testid": testId
  }, x));
});

var EmptyPure = _react["default"].memo(function (_ref14) {
  var onClick = _ref14.onClick,
      _ref14$label = _ref14.label,
      label = _ref14$label === void 0 ? 'empty pure button' : _ref14$label;
  console.log('Pure rerendered');
  return _react["default"].createElement("div", null, _react["default"].createElement("button", {
    onClick: onClick
  }, label));
});

var PropDeps = (0, _fp.flow)((0, _.addStateHandlers)({
  x: 1
}, {
  incrementXByY: function incrementXByY(_ref15, _ref16) {
    var x = _ref15.x;
    var y = _ref16.y;
    return function () {
      return {
        x: x + y
      };
    };
  }
}, ['y', 'user.id']), function (_ref17) {
  var incrementXByY = _ref17.incrementXByY,
      x = _ref17.x,
      testId = _ref17.testId;
  return _react["default"].createElement("div", null, _react["default"].createElement(PropPure, {
    onClick: incrementXByY
  }), _react["default"].createElement("div", {
    "data-testid": testId
  }, x));
});
var CallbackDeps = (0, _fp.flow)((0, _.addStateHandlers)({
  x: 1
}, {
  incrementXByY: function incrementXByY(_ref18, _ref19) {
    var x = _ref18.x;
    var y = _ref19.y;
    return function () {
      return {
        x: x + y
      };
    };
  }
}, function (prevProps, props) {
  return prevProps.y < props.y;
}), function (_ref20) {
  var incrementXByY = _ref20.incrementXByY,
      x = _ref20.x,
      testId = _ref20.testId;
  return _react["default"].createElement("div", null, _react["default"].createElement(PropPure, {
    onClick: incrementXByY,
    label: "prop pure CallbackDeps"
  }), _react["default"].createElement("div", {
    "data-testid": testId
  }, x));
});

var PropPure = _react["default"].memo(function (_ref21) {
  var onClick = _ref21.onClick,
      _ref21$label = _ref21.label,
      label = _ref21$label === void 0 ? 'prop pure button' : _ref21$label;
  console.log('PropPure rerendered');
  return _react["default"].createElement("div", null, _react["default"].createElement("button", {
    onClick: onClick
  }, label));
});

describe('addStateHandlers', function () {
  test('initial state', function () {
    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, null)),
        getByTestId = _render.getByTestId;

    expect(getByTestId('a')).toHaveTextContent('2');
  });
  test('handler', function () {
    var _render2 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, null)),
        getByText = _render2.getByText,
        getByTestId = _render2.getByTestId;

    _reactTestingLibrary.fireEvent.click(getByText(/increment/));

    expect(getByTestId('a')).toHaveTextContent('3');

    _reactTestingLibrary.fireEvent.click(getByText(/two/));

    expect(getByTestId('a')).toHaveTextContent('5');
  });
  test('handler passes props', function () {
    var _render3 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp2, {
      y: 1
    })),
        getByText = _render3.getByText,
        getByTestId = _render3.getByTestId;

    _reactTestingLibrary.fireEvent.click(getByText(/incremental/));

    expect(getByTestId('b')).toHaveTextContent('14');

    _reactTestingLibrary.fireEvent.click(getByText(/two more/));

    expect(getByTestId('b')).toHaveTextContent('17');
  });
  test('initial state based on props', function () {
    var _render4 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp3, {
      initialX: 9
    })),
        getByTestId = _render4.getByTestId;

    expect(getByTestId('c')).toHaveTextContent('9');
  });
  test('allows specifying empty dependencies', function () {
    jest.spyOn(console, 'log').mockImplementation(function () {});
    var testId = 'empty-deps';

    var _render5 = (0, _reactTestingLibrary.render)(_react["default"].createElement(EmptyDeps, {
      randomProp: 1,
      testId: testId
    })),
        rerender = _render5.rerender,
        getByText = _render5.getByText,
        getByTestId = _render5.getByTestId;

    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('1');
    rerender(_react["default"].createElement(EmptyDeps, {
      randomProp: 2,
      testId: testId
    }));
    expect(console.log).not.toHaveBeenCalled();
    console.log.mockClear();

    _reactTestingLibrary.fireEvent.click(getByText(/empty pure button/));

    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('2');
  });
  test('allows specifying prop dependencies', function () {
    jest.spyOn(console, 'log').mockImplementation(function () {});
    var testId = 'prop-deps';

    var _render6 = (0, _reactTestingLibrary.render)(_react["default"].createElement(PropDeps, {
      y: 1,
      testId: testId,
      user: {
        id: 3
      }
    })),
        rerender = _render6.rerender,
        getByText = _render6.getByText,
        getByTestId = _render6.getByTestId;

    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('1');
    rerender(_react["default"].createElement(PropDeps, {
      y: 2,
      testId: testId,
      user: {
        id: 3
      }
    }));
    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    rerender(_react["default"].createElement(PropDeps, {
      y: 2,
      testId: testId,
      user: {
        id: 3
      }
    }));
    expect(console.log).not.toHaveBeenCalled();
    rerender(_react["default"].createElement(PropDeps, {
      y: 2,
      testId: testId,
      user: {
        id: 4
      }
    }));
    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();

    _reactTestingLibrary.fireEvent.click(getByText(/prop pure button/));

    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('3');
  });
  test('allows specifying dependencies as callback', function () {
    jest.spyOn(console, 'log').mockImplementation(function () {});
    var testId = 'callback-deps';

    var _render7 = (0, _reactTestingLibrary.render)(_react["default"].createElement(CallbackDeps, {
      y: 1,
      testId: testId
    })),
        rerender = _render7.rerender,
        getByText = _render7.getByText,
        getByTestId = _render7.getByTestId;

    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('1');
    rerender(_react["default"].createElement(CallbackDeps, {
      y: 1,
      testId: testId
    }));
    expect(console.log).not.toHaveBeenCalled();
    rerender(_react["default"].createElement(CallbackDeps, {
      y: 0,
      testId: testId
    }));
    expect(console.log).not.toHaveBeenCalled();
    rerender(_react["default"].createElement(CallbackDeps, {
      y: 2,
      testId: testId
    }));
    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();

    _reactTestingLibrary.fireEvent.click(getByText(/prop pure CallbackDeps/));

    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('3');
  });
});