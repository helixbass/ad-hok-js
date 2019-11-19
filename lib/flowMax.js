"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _addPropTypes = require("./addPropTypes");

var _renderNothing = require("./renderNothing");

var _returns = require("./returns");

var _addWrapper = require("./addWrapper");

var _addWrapperHOC = require("./addWrapperHOC");

var _branchAvoidCircularDependency = require("./branch-avoid-circular-dependency");

var _addDisplayName = require("./addDisplayName");

var _helpers = require("./util/helpers");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getArgumentsPropertyName = '__ad-hok-flowMax-getArguments';

var isFlowMax = function isFlowMax(func) {
  return func[getArgumentsPropertyName];
};

var flowMax = function flowMax() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  var getPrecedingFuncs = function getPrecedingFuncs(index) {
    return index === 0 ? [] : funcs.slice(0, index);
  };

  var getFollowingFuncs = function getFollowingFuncs(index) {
    return funcs.slice(index + 1);
  };

  var flowLength = funcs && funcs.length || 0;
  var displayName = null;

  var wrapExistingDisplayName = function wrapExistingDisplayName(wrapperStr) {
    return "".concat(wrapperStr, "(").concat(displayName != null ? displayName : '', ")");
  };

  if (flowLength) {
    for (var funcIndex = 0; funcIndex < funcs.length; funcIndex++) {
      var func = funcs[funcIndex];
      var getNestedFlowMaxArguments = isFlowMax(func);
      if (getNestedFlowMaxArguments) return flowMax.apply(void 0, _toConsumableArray(getPrecedingFuncs(funcIndex)).concat(_toConsumableArray(getNestedFlowMaxArguments()), _toConsumableArray(getFollowingFuncs(funcIndex))));

      if ((0, _addPropTypes.isAddPropTypes)(func) || (0, _addWrapper.isAddWrapper)(func) || (0, _addWrapperHOC.isAddWrapperHOC)(func) || (0, _branchAvoidCircularDependency.isBranch)(func)) {
        var newFollowingFlowMax = flowMax.apply(void 0, _toConsumableArray(getFollowingFuncs(funcIndex)));
        if (newFollowingFlowMax.displayName == null || newFollowingFlowMax.displayName === 'ret') newFollowingFlowMax.displayName = (0, _addPropTypes.isAddPropTypes)(func) ? wrapExistingDisplayName('addPropTypes') : (0, _addWrapper.isAddWrapper)(func) ? wrapExistingDisplayName('addWrapper') : (0, _addWrapperHOC.isAddWrapperHOC)(func) ? wrapExistingDisplayName('addWrapperHOC') : undefined;
        var newFlowMax = flowMax.apply(void 0, _toConsumableArray(getPrecedingFuncs(funcIndex)).concat([func(newFollowingFlowMax)])); // Expose original arguments if we're nested

        newFlowMax[getArgumentsPropertyName] = function () {
          return funcs;
        };

        return newFlowMax;
      }

      var addedDisplayName = (0, _addDisplayName.isAddDisplayName)(func);
      if (addedDisplayName) displayName = addedDisplayName[0];
      if (!(0, _helpers.isFunction)(func)) throw new TypeError('Expected a function');
    }
  }

  var ret = function ret() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (!(funcs && funcs.length)) return args[0];
    var index = 0;
    var props = null;

    while (index < flowLength) {
      var _func = funcs[index];
      var currentArgs = index === 0 ? args : [props];
      props = _func.apply(void 0, currentArgs);
      if ((0, _renderNothing.isRenderNothing)(props)) return null;
      var returnsVal = (0, _returns.isReturns)(props);
      if (returnsVal) return returnsVal[0];
      index++;
    }

    return props;
  };

  if (displayName != null) ret.displayName = displayName;

  ret[getArgumentsPropertyName] = function () {
    return funcs;
  };

  return ret;
};

var _default = flowMax;
exports["default"] = _default;