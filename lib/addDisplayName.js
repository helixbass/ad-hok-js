"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isAddDisplayName = void 0;
var markerPropertyName = '__ad-hok-addDisplayName';

var isAddDisplayName = function isAddDisplayName(func) {
  return func[markerPropertyName];
};

exports.isAddDisplayName = isAddDisplayName;

var _default = function _default(displayName) {
  var ret = function ret(props) {
    return props;
  };

  ret[markerPropertyName] = [displayName];
  return ret;
};

exports["default"] = _default;