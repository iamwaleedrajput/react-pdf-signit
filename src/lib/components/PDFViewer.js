import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
// import '@react-pdf-viewer/core/lib/styles/index.css';
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import { PDFDocument } from "pdf-lib";
import React, { Fragment, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { pdfjs } from "react-pdf";
import { Container } from "./drag-and-drop/Container";
import { CustomDragLayer } from "./drag-and-drop/CustomDragLayer";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;
// 3.11.174" does not match the Worker version "3.4.120".', name: 'UnknownErrorException'}

export default function PDFViewer({
  fileUrl,
  signatureImage,
  dragAndDrop,
  boxes,
  setBoxes,
  setDimension,
}) {
  const handlePdfLoading = async (agreementId) => {
    const existingPdfBytes = await fetch(`${fileUrl}`).then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    // Create a new PDF document
    const pages = await pdfDoc.getPages();
    const { height, width } = pages[0].getSize();
    // console.log("heightheight", height);
    // console.log(width);
    setDimension({ height: `${height}px`, width: `${width}px` });
    // setCanvasLoaded(true);
    // setClearing(false);
  };

  return (
    <Fragment>
      {/* <div style={{ ...dimension }}> */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <DndProvider backend={HTML5Backend}>
          <Container
            signatureImage={signatureImage}
            boxes={boxes}
            setBoxes={setBoxes}
          >
            <Viewer
              onDocumentLoad={() => handlePdfLoading()}
              fileUrl={fileUrl}
              // plugins={[zoomPluginInstance]}
              defaultScale={1}
            />
          </Container>
          <CustomDragLayer boxes={boxes} />
        </DndProvider>
      </Worker>
      {/* </div> */}
    </Fragment>
  );
}
