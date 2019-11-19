"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _createEffectAdder = _interopRequireDefault(require("./createEffectAdder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addLayoutEffect = (0, _createEffectAdder["default"])(_react.useLayoutEffect);
var _default = addLayoutEffect;
exports["default"] = _default;