import React from "react";
import { memo } from "react";
import ResizableImage from "../ResizableImage";
const styles = {
  border: "2px dashed gray",
  // padding: "0.5rem 1rem",
  cursor: "move",
};
export const Box = memo(function Box({
  image,
  yellow,
  preview,
  height,
  width,
  id,
  boxes,
  setBoxes,
  fId,
}) {
  const backgroundColor = yellow ? "yellow" : "transparent";
  return (
    <div
      style={{ ...styles, backgroundColor }}
      role={preview ? "BoxPreview" : "Box"}
    >
      <ResizableImage
        initialHeight={height}
        initialWidth={width}
        image={image}
        id={id}
        boxes={boxes}
        setBoxes={setBoxes}
        fId={fId}
      />
    </div>
  );
});
