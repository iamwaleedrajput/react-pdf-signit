"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ReactPDFSignIn;
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _core = require("@react-pdf-viewer/core");
require("@react-pdf-viewer/core/lib/styles/index.css");
var _pdfLib = require("pdf-lib");
var _reactPdf = require("react-pdf");
var _PDFViewer = _interopRequireDefault(require("./PDFViewer"));
var _material = require("@mui/material");
var _jspdf = require("jspdf");
var _CreateSignatureModal = _interopRequireDefault(require("./CreateSignatureModal"));
require("./style/style.css");
var _SubmitSignature = _interopRequireDefault(require("./SubmitSignature"));
var _iconsMaterial = require("@mui/icons-material");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
_reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js";
// 3.11.174" does not match the Worker version "3.4.120".', name: 'UnknownErrorException'}

function ReactPDFSignIn(_ref) {
  let {
    fileUrl,
    loading,
    setLoading
  } = _ref;
  const [signatureImage, setSignatureImage] = (0, _react.useState)("");
  const [dragAndDrop, setDragAndDrop] = (0, _react.useState)(false);
  const [boxes, setBoxes] = (0, _react.useState)([
    // { width: 150, height: 100, top: 20, left: 80, title: signatureImage },
    // { width: 300, height: 200, top: 20, left: 80, title: signatureImage },
  ]);
  const addAnother = () => {
    let newBoxes = boxes;
    const fId = newBoxes.at(-1).fId + 1;
    setBoxes([...boxes, {
      fId,
      width: 150,
      height: 100,
      top: 20,
      left: 80,
      title: signatureImage
    }]);
  };
  (0, _react.useEffect)(() => {
    if (signatureImage) {
      if (boxes.length) {
        setBoxes(boxes.map(i => _objectSpread(_objectSpread({}, i), {}, {
          title: signatureImage
        })));
      } else {
        setBoxes([{
          fId: Date.now(),
          width: 150,
          height: 100,
          top: 20,
          left: 80,
          title: signatureImage
        }]);
      }
    }
  }, [signatureImage]);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Container, {
    maxWidth: "xl"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid2, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_material.Grid2, {
    item: true,
    size: {
      xl: 2,
      lg: 3,
      md: 3
    }
  }, /*#__PURE__*/_react.default.createElement(_material.List, null, /*#__PURE__*/_react.default.createElement(_CreateSignatureModal.default, {
    setDragAndDrop: setDragAndDrop,
    setSignatureImage: setSignatureImage
  }), boxes.length ? /*#__PURE__*/_react.default.createElement(_material.ListItem, null, /*#__PURE__*/_react.default.createElement(_material.ListItemButton, {
    onClick: () => addAnother()
  }, /*#__PURE__*/_react.default.createElement(_material.ListItemIcon, null, /*#__PURE__*/_react.default.createElement(_iconsMaterial.AddCircleOutline, null)), /*#__PURE__*/_react.default.createElement(_material.ListItemText, {
    primary: "Add Another"
  }))) : "", signatureImage && /*#__PURE__*/_react.default.createElement(_SubmitSignature.default, {
    fileUrl: fileUrl,
    boxes: boxes,
    loading: loading,
    setLoading: setLoading
  }))), /*#__PURE__*/_react.default.createElement(_material.Grid2, {
    item: true,
    size: {
      xl: 8,
      lg: 8,
      md: 8
    }
  }, /*#__PURE__*/_react.default.createElement(_PDFViewer.default, {
    fileUrl: fileUrl,
    signatureImage: signatureImage,
    dragAndDrop: dragAndDrop,
    boxes: boxes,
    setBoxes: setBoxes
  })))));
}