"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraggableBox = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _reactDnd = require("react-dnd");
var _reactDndHtml5Backend = require("react-dnd-html5-backend");
var _Box = require("./Box");
var _ItemTypes = require("./ItemTypes");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function getStyles(left, top, isDragging) {
  const transform = "translate3d(".concat(left, "px, ").concat(top, "px, 0)");
  return {
    position: "absolute",
    transform,
    // WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : ""
  };
}
const DraggableBox = exports.DraggableBox = /*#__PURE__*/(0, _react.memo)(function DraggableBox(props) {
  const {
    fId,
    id,
    title,
    left,
    top,
    height,
    width,
    boxes,
    setBoxes
  } = props;
  const [{
    isDragging
  }, drag, preview] = (0, _reactDnd.useDrag)(() => ({
    type: _ItemTypes.ItemTypes.BOX,
    item: {
      id,
      left,
      top,
      title
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }), [id, left, top, title]);
  (0, _react.useEffect)(() => {
    preview((0, _reactDndHtml5Backend.getEmptyImage)(), {
      captureDraggingState: true
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: drag,
    style: getStyles(left, top, isDragging),
    role: "DraggableBox"
  }, /*#__PURE__*/_react.default.createElement(_Box.Box, {
    title: title,
    height: height,
    width: width,
    id: id,
    fId: fId,
    boxes: boxes,
    setBoxes: setBoxes
  }));
});