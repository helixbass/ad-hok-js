"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helpers = require("./util/helpers");

var _usePrevious = _interopRequireDefault(require("./util/usePrevious"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isSimpleDependenciesArray = function isSimpleDependenciesArray(dependencies) {
  if (!(0, _helpers.isArray)(dependencies)) return false;

  for (var i = 0; i < dependencies.length; i++) {
    var element = dependencies[i];
    if (element.indexOf('.') > -1) return false;
  }

  return true;
};

var createEffectAdder = function createEffectAdder(effectHook) {
  return function (callback, dependencies) {
    var isDependenciesNullish = dependencies == null;
    var isDependenciesSimpleArray = !isDependenciesNullish && isSimpleDependenciesArray(dependencies);
    var isDependenciesArray = !isDependenciesNullish && (isDependenciesSimpleArray || (0, _helpers.isArray)(dependencies));
    return function (props) {
      isDependenciesNullish ? effectHook(callback(props)) : isDependenciesSimpleArray ? // TODO: throw nice error if changeProps isn't array/iterable or any changeProp isn't a string?
      effectHook(callback(props), dependencies.map(function (dependencyPropName) {
        return props[dependencyPropName];
      })) : function () {
        var prevProps = (0, _usePrevious["default"])(props);

        if (isDependenciesArray) {
          effectHook(function () {
            if (prevProps != null && (0, _helpers.shallowEqualArray)(dependencies.map(function (dependencyPropName) {
              return (0, _helpers.get)(dependencyPropName)(prevProps);
            }), dependencies.map(function (dependencyPropName) {
              return (0, _helpers.get)(dependencyPropName)(props);
            }))) return;
            callback(props)();
          });
        } else {
          effectHook(function () {
            if (prevProps != null && !dependencies(prevProps, props)) return;
            callback(props)();
          });
        }
      }();
      return props;
    };
  };
};

var _default = createEffectAdder;
exports["default"] = _default;