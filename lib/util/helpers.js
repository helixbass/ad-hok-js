"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shallowEqualArray = exports.get = exports.mapWithKey = exports.mapValues = exports.isFunction = exports.isArray = void 0;
var toString = Object.prototype.toString;

var isArray = Array.isArray || function (obj) {
  return toString.call(obj) === '[object Array]';
};

exports.isArray = isArray;

var isFunction = function isFunction(obj) {
  return toString.call(obj) === '[object Function]';
};

exports.isFunction = isFunction;

var mapValues = function mapValues(callback) {
  return function (obj) {
    var ret = {};

    for (var key in obj) {
      var val = obj[key];
      ret[key] = callback(val);
    }

    return ret;
  };
};

exports.mapValues = mapValues;

var mapWithKey = function mapWithKey(callback) {
  return function (obj) {
    var ret = [];

    for (var key in obj) {
      var val = obj[key];
      ret.push(callback(val, key));
    }

    return ret;
  };
};

exports.mapWithKey = mapWithKey;

var get = function get(path) {
  var pathParts = path.split('.');
  return function (obj) {
    var val = obj;

    for (var i = 0; i < pathParts.length; i++) {
      var pathPart = pathParts[i];
      if (val == null) return;
      val = val[pathPart];
    }

    return val;
  };
};

exports.get = get;

var shallowEqualArray = function shallowEqualArray(a, b) {
  if (!(a && a.length != null && b && b.length != null)) return false;
  if (!(a.length === b.length)) return false;

  for (var index = 0; index < a.length; index++) {
    if (!(a[index] === b[index])) return false;
  }

  return true;
};

exports.shallowEqualArray = shallowEqualArray;