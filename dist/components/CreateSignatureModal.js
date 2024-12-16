"use strict";

require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CreateSignatureModal;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
var _iconsMaterial = require("@mui/icons-material");
var _BorderColor = _interopRequireDefault(require("@mui/icons-material/BorderColor"));
var _CheckCircleOutline = _interopRequireDefault(require("@mui/icons-material/CheckCircleOutline"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _CloudUpload = _interopRequireDefault(require("@mui/icons-material/CloudUpload"));
var _Draw = _interopRequireDefault(require("@mui/icons-material/Draw"));
var _material = require("@mui/material");
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogContentText = _interopRequireDefault(require("@mui/material/DialogContentText"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _Slide = _interopRequireDefault(require("@mui/material/Slide"));
var _Tab = _interopRequireDefault(require("@mui/material/Tab"));
var _Tabs = _interopRequireDefault(require("@mui/material/Tabs"));
var _html2canvas = _interopRequireDefault(require("html2canvas"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactSignatureCanvas = _interopRequireDefault(require("react-signature-canvas"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
const _excluded = ["children", "value", "index"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Transition = /*#__PURE__*/_react.default.forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/_react.default.createElement(_Slide.default, _extends({
    direction: "up",
    ref: ref
  }, props));
});
const VisuallyHiddenInput = (0, _styledComponents.default)("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});
function CustomTabPanel(props) {
  const {
      children,
      value,
      index
    } = props,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    role: "tabpanel",
    hidden: value !== index,
    id: "simple-tabpanel-".concat(index),
    "aria-labelledby": "simple-tab-".concat(index)
  }, other), value === index && /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: {
      p: 3
    }
  }, children));
}
CustomTabPanel.propTypes = {
  children: _propTypes.default.node,
  index: _propTypes.default.number.isRequired,
  value: _propTypes.default.number.isRequired
};
function a11yProps(index) {
  return {
    id: "simple-tab-".concat(index),
    "aria-controls": "simple-tabpanel-".concat(index)
  };
}
function CreateSignatureModal(_ref) {
  let {
    setSignatureImage,
    setDragAndDrop
  } = _ref;
  const sigCanvas = (0, _react.useRef)(null);
  const divRef1 = (0, _react.useRef)(null); // C
  const divRef2 = (0, _react.useRef)(null); // C
  const divRef3 = (0, _react.useRef)(null); // C
  const divRef4 = (0, _react.useRef)(null); // C
  const divRef5 = (0, _react.useRef)(null); // C
  const divRef6 = (0, _react.useRef)(null); // C
  const divRef7 = (0, _react.useRef)(null); // C
  const divRef8 = (0, _react.useRef)(null); // C
  const divRef9 = (0, _react.useRef)(null); // C
  const divRef10 = (0, _react.useRef)(null); // C
  const divRef11 = (0, _react.useRef)(null); // C
  const divRef12 = (0, _react.useRef)(null); // C
  const divRef13 = (0, _react.useRef)(null); // C

  const [open, setOpen] = _react.default.useState(false);
  const [value, setValue] = _react.default.useState(0);
  const [values, setValues] = _react.default.useState("");
  const [selected, setSelected] = _react.default.useState("");
  const penColor = "#000";
  const handleChangeText = prop => e => {
    const val = e.target.value.split(" ");
    let inital = "";
    if (val.length > 1) {
      inital = val[0][0] + (val[1][0] ? val[1][0] : "");
    } else {
      inital = val[0][0];
    }
    setValues(_objectSpread(_objectSpread({}, values), {}, {
      [prop]: e.target.value,
      inital
    }));
  };
  const handleClickOpen = () => {
    setDragAndDrop(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleConvertToDataUri = async refer => {
    const innerRef = refer ? refer : selected;
    if (innerRef.current) {
      try {
        // Use html2canvas to render the div to a canvas
        const canvas = await (0, _html2canvas.default)(innerRef.current, {
          backgroundColor: null // Ensure the canvas background is transparent
        });

        // Convert the canvas to a Data URI
        const dataUri = canvas.toDataURL("image/png");
        console.log("Data URI:", dataUri);
        setSignatureImage(dataUri);
        setOpen(false);
        setDragAndDrop(true);

        // Optional: Open the Data URI in a new tab
        // const newWindow = window.open();
        // newWindow.document.write(`<img src="${dataUri}" alt="Div as Image"/>`);
      } catch (error) {
        console.error("Error converting div to Data URI:", error);
      }
    }
  };
  const handleSave = async () => {
    const dataURL = sigCanvas.current.toDataURL(); // Get the base64 image of the drawn area
    console.log(dataURL); // This is the image data in base64 format
    // You can now use this base64 string (e.g., display or save it)
    setSignatureImage(dataURL);
    setOpen(false);
    setDragAndDrop(true);
  };
  const addFile = files => {
    // signed_upload_img
    if (files) {
      const doc = document.getElementById("signed_upload_img");
      doc.innerHTML = "";
      const img = document.createElement("img");
      img.src = URL.createObjectURL(files[0]);
      img.style.width = "500px";
      img.style.height = "200px";
      img.style.objectFit = "contain";
      doc.appendChild(img);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.ListItem, null, /*#__PURE__*/_react.default.createElement(_material.ListItemButton, {
    onClick: handleClickOpen
  }, /*#__PURE__*/_react.default.createElement(_material.ListItemIcon, null, /*#__PURE__*/_react.default.createElement(_BorderColor.default, null)), /*#__PURE__*/_react.default.createElement(_material.ListItemText, {
    primary: "Add Signature"
  }))), /*#__PURE__*/_react.default.createElement(_Dialog.default, {
    fullWidth: true,
    open: open,
    TransitionComponent: Transition,
    keepMounted: true,
    onClose: handleClose,
    "aria-describedby": "alert-dialog-slide-description"
  }, /*#__PURE__*/_react.default.createElement(_DialogTitle.default, {
    justifyContent: "space-between",
    display: "flex"
  }, "Add Signature", /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    onClick: handleClose
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null))), /*#__PURE__*/_react.default.createElement(_DialogContent.default, null, /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: {
      borderBottom: 1,
      borderColor: "divider"
    }
  }, /*#__PURE__*/_react.default.createElement(_Tabs.default, {
    value: value,
    onChange: handleChange,
    "aria-label": "basic tabs example"
  }, /*#__PURE__*/_react.default.createElement(_Tab.default, _extends({
    icon: /*#__PURE__*/_react.default.createElement(_CheckCircleOutline.default, null),
    iconPosition: "start",
    label: "Select Style"
  }, a11yProps(0), {
    sx: {
      minHeight: "50px"
    }
  })), /*#__PURE__*/_react.default.createElement(_Tab.default, _extends({
    icon: /*#__PURE__*/_react.default.createElement(_Draw.default, null),
    iconPosition: "start",
    label: "Draw"
  }, a11yProps(1), {
    sx: {
      minHeight: "50px"
    }
  })), /*#__PURE__*/_react.default.createElement(_Tab.default, _extends({
    sx: {
      minHeight: "50px"
    },
    icon: /*#__PURE__*/_react.default.createElement(_CloudUpload.default, null),
    iconPosition: "start",
    label: "Upload"
  }, a11yProps(2))))), /*#__PURE__*/_react.default.createElement(CustomTabPanel, {
    value: value,
    index: 0
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    fullWidth: true,
    size: "small",
    label: "Name",
    value: values.name,
    onChange: handleChangeText("name"),
    sx: {
      mb: 2
    }
  }), (values.name || values.initial) && /*#__PURE__*/_react.default.createElement(_react.Fragment, null, [{
    font: "homemade-apple-regular",
    divRef: divRef1,
    initialRef: divRef7
  }, {
    font: "allura-regular",
    divRef: divRef2,
    initialRef: divRef8
  }, {
    font: "satisfy-regular",
    divRef: divRef3,
    initialRef: divRef9
  }, {
    font: "great-vibes-regular",
    divRef: divRef4,
    initialRef: divRef10
  }, {
    font: "handlee-regular",
    divRef: divRef5,
    initialRef: divRef11
  }, {
    font: "dancing-script",
    divRef: divRef6,
    initialRef: divRef12
  }].map((item, index) => /*#__PURE__*/_react.default.createElement(_material.Grid2, {
    key: index,
    container: true,
    spacing: 2,
    sx: {
      background: index % 2 ? "#fafafa" : "#fff"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid2, {
    item: true,
    size: 8
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Radio, {
    checked: selected === item.divRef,
    onChange: () => setSelected(item.divRef)
  }), /*#__PURE__*/_react.default.createElement("h1", {
    className: item.font,
    style: {
      padding: " 0 15px",
      margin: 0
    },
    ref: item.divRef
  }, values.name))), /*#__PURE__*/_react.default.createElement(_material.Grid2, {
    item: true,
    size: 4
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Radio, {
    checked: selected === item.initialRef,
    onChange: () => setSelected(item.initialRef)
  }), /*#__PURE__*/_react.default.createElement("h1", {
    className: item.font,
    style: {
      padding: " 0 15px",
      margin: 0
    },
    ref: item.initialRef
  }, values.inital)))))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    onClick: () => handleConvertToDataUri()
  }, "Save"))), /*#__PURE__*/_react.default.createElement(CustomTabPanel, {
    value: value,
    index: 1
  }, /*#__PURE__*/_react.default.createElement(_reactSignatureCanvas.default, {
    ref: sigCanvas,
    penColor: penColor,
    canvasProps: {
      width: 500,
      height: 200,
      className: "sigCanvas"
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: () => sigCanvas.current.clear()
  }, "Clear"), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    onClick: handleSave
  }, "Save"))), /*#__PURE__*/_react.default.createElement(CustomTabPanel, {
    value: value,
    index: 2
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "signed_upload_img",
    ref: divRef13
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    component: "label",
    role: undefined,
    variant: "text",
    tabIndex: -1,
    startIcon: /*#__PURE__*/_react.default.createElement(_iconsMaterial.UploadFile, null)
  }, "Upload files", /*#__PURE__*/_react.default.createElement(VisuallyHiddenInput, {
    accept: "image/png",
    type: "file",
    onChange: event => addFile(event.target.files)
    // multiple
  })), /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    onClick: () => handleConvertToDataUri(divRef13)
  }, "Save"))), /*#__PURE__*/_react.default.createElement(_DialogContentText.default, {
    id: "alert-dialog-slide-description"
  }))));
}