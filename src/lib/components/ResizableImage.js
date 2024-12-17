import { Close } from "@mui/icons-material";
import React, { useState, useRef, useEffect } from "react";

const ResizableImage = ({
  initialWidth,
  initialHeight,
  image,
  id,
  fId,
  boxes,
  setBoxes,
}) => {
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const [isResizing, setIsResizing] = useState(false);
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const remove = () => {
    setBoxes(boxes.filter((i) => i.fId !== fId));
  };
  // Start resizing when mouse is down on the handle
  const onResizeMouseDown = (e) => {
    setIsResizing(true);
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: dimensions.width,
      height: dimensions.height,
    };
    e.preventDefault(); // Prevent text selection
  };

  // Handle mouse movement to resize the image
  const onMouseMove = (e) => {
    if (isResizing) {
      const dx = e.clientX - resizeStart.current.x;
      const dy = e.clientY - resizeStart.current.y;
      let allBoxes = boxes;
      allBoxes[id] = {
        ...allBoxes[id],
        width: Math.max(50, resizeStart.current.width + dx), // Minimum width is 50px
        height: Math.max(50, resizeStart.current.height + dy),
      };
      setBoxes(allBoxes);
      setDimensions({
        width: Math.max(50, resizeStart.current.width + dx), // Minimum width is 50px
        height: Math.max(50, resizeStart.current.height + dy), // Minimum height is 50px
      });
    }
  };

  // Stop resizing when the mouse button is released
  const onMouseUp = () => {
    setIsResizing(false);
  };

  // Attach mouse move and mouse up listeners globally
  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isResizing]);

  return (
    <div
      style={{
        position: "relative",
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        // border: "1px solid #ccc",
        overflow: "hidden",
        resize: "none",
      }}
    >
      <div
        onMouseDown={(e) => remove()}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 3,
          // width: "10px",
          // height: "10px",
          borderRadius: "0 0 0 50%",
          backgroundColor: "red",
          cursor: "pointer",
          display: "flex",
        }}
      >
        <Close fontSize="10px" />
      </div>
      <img
        src={image} // Replace with your image source
        alt="Resizable"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      {/* Resize Handle */}
      <div
        onMouseDown={(e) => onResizeMouseDown(e)}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "10px",
          height: "10px",
          backgroundColor: "blue",
          cursor: "se-resize",
        }}
      ></div>
    </div>
  );
};

export default ResizableImage;
