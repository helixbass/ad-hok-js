"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBranch = exports.markerPropertyName = void 0;
var markerPropertyName = '__ad-hok-branch';
exports.markerPropertyName = markerPropertyName;

var isBranch = function isBranch(func) {
  return func[markerPropertyName];
};

exports.isBranch = isBranch;