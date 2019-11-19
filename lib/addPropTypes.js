"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isAddPropTypes = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var markerPropertyName = '__ad-hok-addPropTypes';

var isAddPropTypes = function isAddPropTypes(func) {
  return func[markerPropertyName];
};

exports.isAddPropTypes = isAddPropTypes;

var _default = function _default(propTypes) {
  var ret = function ret(Component) {
    Component.propTypes = propTypes;
    return function (props) {
      return _react["default"].createElement(Component, props);
    };
  };

  ret[markerPropertyName] = true;
  return ret;
};

exports["default"] = _default;