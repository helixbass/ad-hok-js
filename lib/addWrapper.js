"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isAddWrapper = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var markerPropertyName = '__ad-hok-addWrapper';

var isAddWrapper = function isAddWrapper(func) {
  return func[markerPropertyName];
};

exports.isAddWrapper = isAddWrapper;

var _default = function _default(callback) {
  var ret = function ret(Component) {
    return function (props) {
      return callback({
        props: props,
        render: function render(additionalProps) {
          return _react["default"].createElement(Component, _extends({}, props, additionalProps));
        }
      });
    };
  };

  ret[markerPropertyName] = true;
  return ret;
};

exports["default"] = _default;