"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isReturns = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var key = '__ad-hok-returns';

var isReturns = function isReturns(val) {
  try {
    if (!(key in val)) return false;
    return [val[key]];
  } catch (e) {
    return false;
  }
};

exports.isReturns = isReturns;

var _default = function _default(callback) {
  return function (props) {
    return _defineProperty({}, key, callback(props));
  };
};

exports["default"] = _default;