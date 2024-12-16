"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxDragPreview = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _Box = require("./Box");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import { width } from "@mui/system";
// import { height } from "@mui/system";
const styles = {
  // display: "block",
  height: 200,
  width: 300
  // objectFit: "cover",
  // transform: "rotate(-7deg)",
  // WebkitTransform: "rotate(-7deg)",
};
const BoxDragPreview = exports.BoxDragPreview = /*#__PURE__*/(0, _react.memo)(function BoxDragPreview(_ref) {
  let {
    title
  } = _ref;
  const [tickTock, setTickTock] = (0, _react.useState)(false);
  (0, _react.useEffect)(function subscribeToIntervalTick() {
    const interval = setInterval(() => setTickTock(!tickTock), 500);
    return () => clearInterval(interval);
  }, [tickTock]);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: styles
  }, /*#__PURE__*/_react.default.createElement(_Box.Box, {
    title: title,
    yellow: tickTock,
    preview: true
  }));
});