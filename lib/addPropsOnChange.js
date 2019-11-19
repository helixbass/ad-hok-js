"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _addProps = _interopRequireDefault(require("./addProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addPropsOnChange = function addPropsOnChange(didChange, getProps) {
  return (0, _addProps["default"])(getProps, didChange);
};

var _default = addPropsOnChange;
exports["default"] = _default;