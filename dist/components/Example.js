"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Example = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _Container = require("./Container.js");
var _CustomDragLayer = require("./CustomDragLayer.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Example = () => {
  const [snapToGridAfterDrop, setSnapToGridAfterDrop] = (0, _react.useState)(false);
  const [snapToGridWhileDragging, setSnapToGridWhileDragging] = (0, _react.useState)(false);
  const handleSnapToGridAfterDropChange = (0, _react.useCallback)(() => {
    setSnapToGridAfterDrop(!snapToGridAfterDrop);
  }, [snapToGridAfterDrop]);
  const handleSnapToGridWhileDraggingChange = (0, _react.useCallback)(() => {
    setSnapToGridWhileDragging(!snapToGridWhileDragging);
  }, [snapToGridWhileDragging]);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Container.Container, {
    snapToGrid: snapToGridAfterDrop
  }), /*#__PURE__*/_react.default.createElement(_CustomDragLayer.CustomDragLayer, {
    snapToGrid: snapToGridWhileDragging
  }), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "snapToGridWhileDragging"
  }, /*#__PURE__*/_react.default.createElement("input", {
    id: "snapToGridWhileDragging",
    type: "checkbox",
    checked: snapToGridWhileDragging,
    onChange: handleSnapToGridWhileDraggingChange
  }), /*#__PURE__*/_react.default.createElement("small", null, "Snap to grid while dragging")), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "snapToGridAfterDrop"
  }, /*#__PURE__*/_react.default.createElement("input", {
    id: "snapToGridAfterDrop",
    type: "checkbox",
    checked: snapToGridAfterDrop,
    onChange: handleSnapToGridAfterDropChange
  }), /*#__PURE__*/_react.default.createElement("small", null, "Snap to grid after drop"))));
};
exports.Example = Example;