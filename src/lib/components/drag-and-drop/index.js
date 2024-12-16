import React from "react";
import { render } from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./Container";
import { CustomDragLayer } from "./CustomDragLayer";

export default function DragAndDrop() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container />
      <CustomDragLayer />
    </DndProvider>
  );
}
