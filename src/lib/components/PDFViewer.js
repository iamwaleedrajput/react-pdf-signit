import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
// import '@react-pdf-viewer/core/lib/styles/index.css';
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import html2canvas from "html2canvas";
import { PDFDocument } from "pdf-lib";
import React, { Fragment, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { pdfjs, Document } from "react-pdf";
import { Container } from "./drag-and-drop/Container";
import { CustomDragLayer } from "./drag-and-drop/CustomDragLayer";
import { zoomPlugin } from "@react-pdf-viewer/zoom";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;
// 3.11.174" does not match the Worker version "3.4.120".', name: 'UnknownErrorException'}

export default function PDFViewer({
  fileUrl,
  signatureImage,
  dragAndDrop,
  boxes,
  setBoxes,
}) {
  const zoomPluginInstance = zoomPlugin();
  const { zoomTo } = zoomPluginInstance;
  useEffect(() => {
    zoomTo(2); // Set custom scale factor to 1.5x zoom
  }, [zoomTo]);
  const [pdfBlobs, setPdfBlobs] = useState([]);
  const [dimension, setDimension] = useState("");
  const [dataBlobs, setDataBlobs] = useState([]);
  //   console.log("box", boxes);
  const [pdfUrl, setPdfUrl] = useState("");
  async function convertPageToBlob(blobData, pageIndex) {
    try {
      // Load the original PDF document
      const pdfDoc = await PDFDocument.load(blobData);
      // Create a new PDF document
      const newPdfDoc = await PDFDocument.create();
      // Get the specified page from the original PDF
      const pages = pdfDoc.getPages();
      if (pageIndex < 0 || pageIndex >= pages.length) {
        throw new Error("Page index out of range.");
      }

      const [selectedPage] = await newPdfDoc.copyPages(pdfDoc, [pageIndex]);
      // Add the page to the new PDF
      newPdfDoc.addPage(selectedPage);

      // Serialize the new PDF to bytes
      const newPdfBytes = await newPdfDoc.save();

      // Convert the bytes into a Blob
      const pageBlob = new Blob([newPdfBytes], { type: "application/pdf" });

      // Create a Blob URL for preview or download
      const blobUrl = URL.createObjectURL(pageBlob);
      console.log("blobUrl", blobUrl);
      //   if (pageIndex === 0) {
      //     setPdfUrl(blobUrl);
      //   }
      // setSignatureImages((c) =>
      //   c.concat({ fId: agreement_id + pageIndex, image: "" })
      // );
      setPdfBlobs((c) => c.concat(blobUrl));
      return pageBlob;
    } catch (error) {
      console.error("Error converting page to Blob:", error);
      return null;
    }
  }
  const handlePdfLoading = async (agreementId) => {
    setPdfBlobs([]);
    const existingPdfBytes = await fetch(`${fileUrl}`).then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    // Create a new PDF document
    const pages = await pdfDoc.getPages();
    const { height, width } = pages[0].getSize();
    console.log("heightheight", height);
    console.log(width);
    setDimension({ height: `${height}px`, width: `${width}px` });
    // setCanvasLoaded(true);
    // setClearing(false);
  };

  // useEffect(() => {
  //   handlePdfLoading();
  //   // setPdfUrl(fileUrl);
  // }, []);
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
          <CustomDragLayer />
        </DndProvider>
      </Worker>
      {/* </div> */}
    </Fragment>
  );
}
