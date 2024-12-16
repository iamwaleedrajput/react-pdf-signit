"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomDragLayer = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _reactDnd = require("react-dnd");
var _BoxDragPreview = require("./BoxDragPreview");
var _ItemTypes = require("./ItemTypes");
var _snapToGrid = require("./snapToGrid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};
function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }
  let {
    x,
    y
  } = currentOffset;
  if (isSnapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = (0, _snapToGrid.snapToGrid)(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }
  const transform = "translate(".concat(x, "px, ").concat(y, "px)");
  return {
    transform,
    WebkitTransform: transform
  };
}
const CustomDragLayer = props => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset
  } = (0, _reactDnd.useDragLayer)(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));
  function renderItem() {
    switch (itemType) {
      case _ItemTypes.ItemTypes.BOX:
        return /*#__PURE__*/_react.default.createElement(_BoxDragPreview.BoxDragPreview, {
          title: item.title
        });
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    style: layerStyles
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: getItemStyles(initialOffset, currentOffset, props.snapToGrid)
  }, renderItem()));
};
exports.CustomDragLayer = CustomDragLayer;