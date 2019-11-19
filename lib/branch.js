"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _flowMax = _interopRequireDefault(require("./flowMax"));

var _branchAvoidCircularDependency = require("./branch-avoid-circular-dependency");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(test, consequent) {
  var alternate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (props) {
    return props;
  };

  var ret = function ret(Component) {
    var ConsequentAsComponent;

    var createConsequent = function createConsequent() {
      var Consequent = (0, _flowMax["default"])(consequent, Component);
      if (Consequent.displayName == null || Consequent.displayName === 'ret') Consequent.displayName = "branch(".concat(Component.displayName != null ? Component.displayName : '', ")");
      return Consequent;
    };

    var AlternateAsComponent;

    var createAlternate = function createAlternate() {
      var Alternate = (0, _flowMax["default"])(alternate, Component);
      if (Alternate.displayName == null || Alternate.displayName === 'ret') Alternate.displayName = "branch(".concat(Component.displayName != null ? Component.displayName : '', ")");
      return Alternate;
    };

    return function (props) {
      if (test(props)) {
        if (ConsequentAsComponent == null) {
          ConsequentAsComponent = createConsequent();
        }

        return _react["default"].createElement(ConsequentAsComponent, props);
      } else {
        if (AlternateAsComponent == null) {
          AlternateAsComponent = createAlternate();
        }

        return _react["default"].createElement(AlternateAsComponent, props);
      }
    };
  };

  ret[_branchAvoidCircularDependency.markerPropertyName] = true;
  return ret;
};

exports["default"] = _default;