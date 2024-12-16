"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DragAndDrop;
var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _reactDnd = require("react-dnd");
var _reactDndHtml5Backend = require("react-dnd-html5-backend");
var _Container = require("./Container");
var _CustomDragLayer = require("./CustomDragLayer");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function DragAndDrop() {
  return /*#__PURE__*/_react.default.createElement(_reactDnd.DndProvider, {
    backend: _reactDndHtml5Backend.HTML5Backend
  }, /*#__PURE__*/_react.default.createElement(_Container.Container, null), /*#__PURE__*/_react.default.createElement(_CustomDragLayer.CustomDragLayer, null));
}