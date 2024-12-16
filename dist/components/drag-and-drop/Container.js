"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Container = void 0;
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _immutabilityHelper = _interopRequireDefault(
  require("immutability-helper")
);
var _reactDnd = require("react-dnd");
var _DraggableBox = require("./DraggableBox");
var _ItemTypes = require("./ItemTypes");
var _snapToGrid = require("./snapToGrid");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || ("object" != typeof e && "function" != typeof e))
    return { default: e };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = { __proto__: null },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e)
    if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
      var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
      i && (i.get || i.set) ? Object.defineProperty(n, u, i) : (n[u] = e[u]);
    }
  return (n.default = e), t && t.set(e, n), n;
}
function _extends() {
  return (
    (_extends = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
          }
          return n;
        }),
    _extends.apply(null, arguments)
  );
}
const styles = {
  width: "100%",
  minHeight: "792px",
  border: "1px solid black",
  position: "relative",
  overflowY: "hidden",
  // height: "100%",
};
const Container = (_ref) => {
  let { snapToGrid, children, boxes, setBoxes, signatureImage } = _ref;
  const moveBox = (0, _react.useCallback)(
    (id, left, top) => {
      setBoxes(
        (0, _immutabilityHelper.default)(boxes, {
          [id]: {
            $merge: {
              left,
              top,
            },
          },
        })
      );
    },
    [boxes]
  );
  const [, drop] = (0, _reactDnd.useDrop)(
    () => ({
      accept: _ItemTypes.ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        if (snapToGrid) {
          [left, top] = (0, _snapToGrid.snapToGrid)(left, top);
        }
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );
  return /*#__PURE__*/ _react.default.createElement(
    "div",
    {
      ref: drop,
      style: styles,
    },
    /*#__PURE__*/ _react.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          zIndex: 2,
          width: "100%",
          background: "red",
          display: signatureImage ? "" : "none",
        },
      },
      boxes.map((key, index) =>
        /*#__PURE__*/ _react.default.createElement(
          _DraggableBox.DraggableBox,
          _extends(
            {
              key: index,
              id: index,
            },
            key,
            {
              boxes: boxes,
              setBoxes: setBoxes,
            }
          )
        )
      )
    ),
    children
  );
};
exports.Container = Container;
