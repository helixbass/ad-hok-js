"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isAddWrapperHOC = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var markerPropertyName = '__ad-hok-addWrapperHOC';

var isAddWrapperHOC = function isAddWrapperHOC(func) {
  return func[markerPropertyName];
};

exports.isAddWrapperHOC = isAddWrapperHOC;

var _default = function _default(hoc) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$displayName = _ref.displayName,
      displayName = _ref$displayName === void 0 ? 'addWrapperHOC()' : _ref$displayName;

  var ret = function ret(Component) {
    var WrappedComponent = hoc(Component);
    WrappedComponent.displayName = displayName;
    return function (props) {
      return _react["default"].createElement(WrappedComponent, props);
    };
  };

  ret[markerPropertyName] = true;
  return ret;
};

exports["default"] = _default;