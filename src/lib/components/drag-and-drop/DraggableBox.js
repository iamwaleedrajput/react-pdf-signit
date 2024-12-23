import React from "react";
import { memo, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Box } from "./Box";
import { ItemTypes } from "./ItemTypes";
function getStyles(left, top, isDragging) {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    transform,
    // WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : "",
  };
}
export const DraggableBox = memo(function DraggableBox(props) {
  const { fId, id, image, left, top, height, width, boxes, setBoxes } = props;

  let newTop = top;
  if (top < 0) {
    newTop = 0;
  }
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top: newTop, image },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, image]
  );
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);
  return (
    <div
      ref={drag}
      style={getStyles(left, top, isDragging)}
      role="DraggableBox"
    >
      <Box
        image={image}
        height={height}
        width={width}
        id={id}
        fId={fId}
        boxes={boxes}
        setBoxes={setBoxes}
      />
    </div>
  );
});
