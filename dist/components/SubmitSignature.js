"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SubmitSignature;
require("core-js/modules/es.promise.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _html2canvas = _interopRequireDefault(require("html2canvas"));
var _pdfLib = require("pdf-lib");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function SubmitSignature(_ref) {
  let {
    boxes,
    fileUrl,
    loading,
    setLoading
  } = _ref;
  const createSignatureImage = async allPages => {
    console.log("all", allPages);
    console.log("boxes", boxes);
    const {
      height,
      width
    } = allPages[0].getSize();
    let arr = [];
    for (let i in allPages) {
      // ** height limits
      const fromHeigth = height * i;
      const toHeight = width * (i + 1);

      // ** filter boxes with given height limits
      const filteredBoxes = boxes.filter(item => item.top >= fromHeigth && item.top <= toHeight);

      // ** create div/element
      const elem = document.createElement("div");
      elem.id = "my-div";
      elem.style.height = "".concat(height, "px");
      elem.style.width = "".concat(width, "px");
      elem.style.background = "transparent";
      elem.style.position = "relative ";
      for (let j of filteredBoxes) {
        const top = j.top - fromHeigth;
        const img = document.createElement("img");
        img.src = j["title"]; // Replace with your image URL
        img.alt = "Custom Image";
        img.style.width = j["width"] + "px";
        img.style.height = j["height"] + "px";
        img.style.position = "absolute";
        img.style.zIndex = "99";
        img.style.top = top + "px";
        img.style.left = j["left"] + "px";
        elem.appendChild(img);
      }
      document.body.appendChild(elem);
      const divElement = document.getElementById("my-div");
      const canvas = await (0, _html2canvas.default)(divElement, {
        backgroundColor: null // Ensure transparency
      });
      const dataURL = canvas.toDataURL();
      arr.push(dataURL);
      document.body.removeChild(divElement);
    }
    return arr;
  };
  const createSignedPDF = async () => {
    setLoading && setLoading(true);
    const pdfBytes = await fetch(fileUrl).then(res => res.arrayBuffer());
    // Convert the canvas to a Data URI

    // console.log("signatureBytes", signatureBytes);
    // Load the PDF document
    const pdfDoc = await _pdfLib.PDFDocument.load(pdfBytes);
    // Embed the signature image into the PDF document
    // const signatureImage = await pdfDoc.embedPng(signatureBytes); // or embedJpg if it's a JPG

    // Get the first page of the PDF (you can select other pages if needed)
    const pages = pdfDoc.getPages(); // You can use `getPages()[pageIndex]` for other pages
    const images = await createSignatureImage(pages);
    console.log("images(pages)", images);
    for (let i in images) {
      //   console.log("i data", i);
      const signatureBytes = images[i];
      const signatureImage = await pdfDoc.embedPng(signatureBytes);
      pages[i].drawImage(signatureImage);
    }
    // // Save the modified PDF
    const pdfBytesModified = await pdfDoc.save();
    // // Optionally, you can trigger a download or do something with the modified PDF
    const blob = new Blob([pdfBytesModified], {
      type: "application/pdf"
    });
    const link = URL.createObjectURL(blob);
    console.log("link", blob);
    fetch(link).then(response => response.blob()).then(blob => {
      const file = new File([blob], "signed_agreement.pdf", {
        type: blob.type
      });
    });
    // window.open(link);
  };
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.ListItem, null, /*#__PURE__*/_react.default.createElement(_material.ListItemButton, {
    disabled: loading,
    onClick: () => createSignedPDF()
  }, /*#__PURE__*/_react.default.createElement(_material.ListItemIcon, null, /*#__PURE__*/_react.default.createElement(_iconsMaterial.Publish, null)), /*#__PURE__*/_react.default.createElement(_material.ListItemText, {
    primary: "Submit"
  }), loading && /*#__PURE__*/_react.default.createElement(_material.ListItemIcon, null, /*#__PURE__*/_react.default.createElement(_material.CircularProgress, {
    size: 17
  })))));
}