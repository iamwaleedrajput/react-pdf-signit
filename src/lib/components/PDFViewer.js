import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import html2canvas from "html2canvas";
import { PDFDocument } from "pdf-lib";
import React, { Fragment, useState } from "react";
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
}) {
  const [pdfBlobs, setPdfBlobs] = useState([]);

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
    const totalPages = pages.length;
    console.log("height, width", height, width);
    // setNumPages(totalPages);
    // setActivePage(0);
    // let arr = [];
    // setCanvasLoaded(false);
    // setPdfBlobs([]);
    // setSignatureImages([]);
    for (let i = 0; i < pages.length; i++) {
      convertPageToBlob(existingPdfBytes, i);
    }
    // setCanvasLoaded(true);
    // setClearing(false);
  };

  const createSignatureImage = async (allPages) => {
    console.log("all", allPages);
    console.log("boxes", boxes);
    const { height, width } = allPages[0].getSize();
    // console.log("height, width", height, width);
    let arr = [];
    // console.log(" allPages.length", allPages.length);
    for (let i in allPages) {
      console.log(i);
      // ** height limits
      const fromHeigth = height * i;
      const toHeight = width * (i + 1);

      // ** filter boxes with given height limits
      const filteredBoxes = boxes.filter(
        (item) => item.top >= fromHeigth && item.top <= toHeight
      );

      // ** create div/element
      const elem = document.createElement("div");
      elem.id = "my-div";
      elem.style.height = `${height}px`;
      elem.style.width = `${width}px`;
      elem.style.background = `transparent`;
      elem.style.position = "relative ";

      for (let j of filteredBoxes) {
        const top = j.top - fromHeigth;
        const img = document.createElement("img");
        img.src = j["title"]; // Replace with your image URL
        img.alt = "Custom Image";
        img.style.width = j["width"] + "px";
        img.style.height = j["height"] + "px";
        img.style.position = "absolute";
        img.style.zIndex = "99";
        img.style.top = top + "px";
        img.style.left = j["left"] + "px";
        elem.appendChild(img);
        console.log(img);
      }
      document.body.appendChild(elem);
      const divElement = document.getElementById("my-div");
      const canvas = await html2canvas(divElement, {
        backgroundColor: null, // Ensure transparency
      });
      const dataURL = canvas.toDataURL();

      arr.push(dataURL);
      document.body.removeChild(divElement);
    }
    return arr;
  };

  const createSignedPDF = async () => {
    const pdfBytes = await fetch(fileUrl).then((res) => res.arrayBuffer());
    // Convert the canvas to a Data URI

    // console.log("signatureBytes", signatureBytes);
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);
    // Embed the signature image into the PDF document
    // const signatureImage = await pdfDoc.embedPng(signatureBytes); // or embedJpg if it's a JPG

    // Get the first page of the PDF (you can select other pages if needed)
    const pages = pdfDoc.getPages(); // You can use `getPages()[pageIndex]` for other pages
    const images = await createSignatureImage(pages);
    console.log("images(pages)", images);
    for (let i in images) {
      //   console.log("i data", i);
      const signatureBytes = images[i];
      const signatureImage = await pdfDoc.embedPng(signatureBytes);
      pages[i].drawImage(signatureImage);
    }
    // // Save the modified PDF
    const pdfBytesModified = await pdfDoc.save();
    // // Optionally, you can trigger a download or do something with the modified PDF
    const blob = new Blob([pdfBytesModified], { type: "application/pdf" });
    const link = URL.createObjectURL(blob);
    console.log("link", link);
    window.open(link);
  };

  // useEffect(() => {
  //   // handlePdfLoading();
  //   setPdfUrl(fileUrl);
  // }, []);
  return (
    <Fragment>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        {/* {dragAndDrop ? ( */}
        <DndProvider backend={HTML5Backend}>
          <Container
            signatureImage={signatureImage}
            boxes={boxes}
            setBoxes={setBoxes}
          >
            <Viewer fileUrl={fileUrl} />
          </Container>
          <CustomDragLayer />
        </DndProvider>
        {/* ) : ( */}
        {/* <Viewer fileUrl={fileUrl} /> */}
        {/* )} */}
      </Worker>
    </Fragment>
  );
}
