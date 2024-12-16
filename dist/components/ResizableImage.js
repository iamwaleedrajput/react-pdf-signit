"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _iconsMaterial = require("@mui/icons-material");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const ResizableImage = _ref => {
  let {
    initialWidth,
    initialHeight,
    title,
    id,
    fId,
    boxes,
    setBoxes
  } = _ref;
  const [dimensions, setDimensions] = (0, _react.useState)({
    width: initialWidth,
    height: initialHeight
  });
  const [isResizing, setIsResizing] = (0, _react.useState)(false);
  const resizeStart = (0, _react.useRef)({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  const remove = () => {
    setBoxes(boxes.filter(i => i.fId !== fId));
  };
  // Start resizing when mouse is down on the handle
  const onResizeMouseDown = e => {
    setIsResizing(true);
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: dimensions.width,
      height: dimensions.height
    };
    e.preventDefault(); // Prevent text selection
  };

  // Handle mouse movement to resize the image
  const onMouseMove = e => {
    if (isResizing) {
      const dx = e.clientX - resizeStart.current.x;
      const dy = e.clientY - resizeStart.current.y;
      let allBoxes = boxes;
      allBoxes[id] = _objectSpread(_objectSpread({}, allBoxes[id]), {}, {
        width: Math.max(50, resizeStart.current.width + dx),
        // Minimum width is 50px
        height: Math.max(50, resizeStart.current.height + dy)
      });
      setBoxes(allBoxes);
      setDimensions({
        width: Math.max(50, resizeStart.current.width + dx),
        // Minimum width is 50px
        height: Math.max(50, resizeStart.current.height + dy) // Minimum height is 50px
      });
    }
  };

  // Stop resizing when the mouse button is released
  const onMouseUp = () => {
    setIsResizing(false);
  };

  // Attach mouse move and mouse up listeners globally
  (0, _react.useEffect)(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isResizing]);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "relative",
      width: "".concat(dimensions.width, "px"),
      height: "".concat(dimensions.height, "px"),
      // border: "1px solid #ccc",
      overflow: "hidden",
      resize: "none"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    onMouseDown: e => remove(),
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      zIndex: 3,
      // width: "10px",
      // height: "10px",
      borderRadius: "0 0 0 50%",
      backgroundColor: "red",
      cursor: "pointer",
      display: "flex"
    }
  }, /*#__PURE__*/_react.default.createElement(_iconsMaterial.Close, {
    fontSize: "10px"
  })), /*#__PURE__*/_react.default.createElement("img", {
    src: title // Replace with your image source
    ,
    alt: "Resizable",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "contain"
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    onMouseDown: e => onResizeMouseDown(e),
    style: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: "10px",
      height: "10px",
      backgroundColor: "blue",
      cursor: "se-resize"
    }
  }));
};
var _default = exports.default = ResizableImage;