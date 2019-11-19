"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isRenderNothing = void 0;
var nonce = {};

var isRenderNothing = function isRenderNothing(val) {
  return val === nonce;
};

exports.isRenderNothing = isRenderNothing;

var _default = function _default() {
  return function () {
    return nonce;
  };
};

exports["default"] = _default;