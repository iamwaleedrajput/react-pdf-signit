import React from "react";
import { memo, useEffect, useState } from "react";
import { Box } from "./Box";
// import { width } from "@mui/system";
// import { height } from "@mui/system";
export const BoxDragPreview = memo(function BoxDragPreview({
  image,
  item,
  boxes,
}) {
  const styles = {
    display: "inline-block",
    width: boxes[item.id]["width"],
    height: boxes[item.id]["height"],
  };
  // console.log(" boxes[item.id]", styles);
  const [tickTock, setTickTock] = useState(false);
  useEffect(
    function subscribeToIntervalTick() {
      const interval = setInterval(() => setTickTock(!tickTock), 500);
      return () => clearInterval(interval);
    },
    [tickTock]
  );
  return (
    <div
      style={{
        ...styles,
      }}
    >
      <Box image={image} yellow={tickTock} preview />
    </div>
  );
});
