"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _helpers = require("./helpers");

var _usePrevious = _interopRequireDefault(require("./usePrevious"));

var _useMemoized = _interopRequireDefault(require("./useMemoized"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var useComputedFromDependencies = function useComputedFromDependencies(_ref) {
  var compute = _ref.compute,
      dependencies = _ref.dependencies,
      _ref$additionalResolv = _ref.additionalResolvedDependencies,
      additionalResolvedDependencies = _ref$additionalResolv === void 0 ? [] : _ref$additionalResolv,
      props = _ref.props;
  return dependencies != null ? (0, _helpers.isFunction)(dependencies) ? function () {
    var prevProps = (0, _usePrevious["default"])(props);
    var computedValueRef = (0, _react.useRef)();
    var changed = prevProps == null || dependencies(prevProps, props);
    var value = changed ? compute() : computedValueRef.current;
    computedValueRef.current = value;
    return value;
  }() : (0, _useMemoized["default"])(compute, [].concat(_toConsumableArray(dependencies.map(function (dependencyName) {
    return (0, _helpers.get)(dependencyName)(props);
  })), _toConsumableArray(additionalResolvedDependencies))) : compute();
};

var _default = useComputedFromDependencies;
exports["default"] = _default;