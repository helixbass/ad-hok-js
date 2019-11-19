"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _usePrevious = _interopRequireDefault(require("./usePrevious"));

var _helpers = require("./helpers");

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useMemoized = function useMemoized(compute, dependencies) {
  var memoizedValueRef = (0, _react.useRef)();
  var prevDependencies = (0, _usePrevious["default"])(dependencies);

  if (!(0, _helpers.shallowEqualArray)(prevDependencies, dependencies)) {
    memoizedValueRef.current = compute();
  }

  return memoizedValueRef.current;
};

var _default = useMemoized;
exports["default"] = _default;