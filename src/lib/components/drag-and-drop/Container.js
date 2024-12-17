import React from "react";
import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableBox } from "./DraggableBox";
import { ItemTypes } from "./ItemTypes";
import { snapToGrid as doSnapToGrid } from "./snapToGrid";
const styles = {
  width: "100%",
  minHeight: "792px",
  // border: "1px solid black",
  position: "relative",
  overflowY: "hidden",
  // height: "100%",
};
export const Container = ({
  snapToGrid,
  children,
  boxes,
  setBoxes,
  signatureImage,
}) => {
  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [boxes]
  );
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        if (snapToGrid) {
          [left, top] = doSnapToGrid(left, top);
        }
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );
  return (
    <div ref={drop} style={styles}>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          width: "100%",
          background: "red",
          display: boxes.length ? "" : "none",
        }}
        id="sign_container"
      >
        {boxes.map((key, index) => (
          <DraggableBox
            key={index}
            id={index}
            {...key}
            boxes={boxes}
            setBoxes={setBoxes}
          />
        ))}
      </div>
      {children}
    </div>
  );
};
