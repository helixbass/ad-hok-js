"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(test, consequent) {
  var alternate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (props) {
    return props;
  };
  return function (props) {
    return test(props) ? consequent(props) : alternate(props);
  };
};

exports["default"] = _default;