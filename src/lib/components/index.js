import React, { Fragment, useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { PDFDocument } from "pdf-lib";
import { pdfjs } from "react-pdf";
import PDFViewer from "./PDFViewer";
import {
  Box,
  Container,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { jsPDF } from "jspdf";
import CreateSignatureModal from "./CreateSignatureModal";
import "./style/style.css";
import SubmitSignature from "./SubmitSignature";
import { AddCircleOutline } from "@mui/icons-material";
import AddDateModal from "./AddDateModal";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;
// 3.11.174" does not match the Worker version "3.4.120".', name: 'UnknownErrorException'}

export default function ReactPDFSignIn({
  fileUrl,
  loading,
  setLoading,
  handleSubmit,
}) {
  const [signatureImage, setSignatureImage] = useState("");
  const [dragAndDrop, setDragAndDrop] = useState(false);
  const [dimension, setDimension] = useState("");
  const [boxes, setBoxes] = useState([
    // { width: 150, height: 100, top: 20, left: 80, image: signatureImage },
    // { width: 300, height: 200, top: 20, left: 80, image: signatureImage },
  ]);

  const addAnother = () => {
    let newBoxes = boxes;
    const fId = newBoxes.at(-1).fId + 1;
    const top = newBoxes.at(-1).top;
    const left = newBoxes.at(-1).left;
    setBoxes([
      ...boxes,
      {
        fId,
        width: 150,
        height: 100,
        top: top,
        left: left,
        image: signatureImage,
      },
    ]);
  };
  // console.log("bo", boxes);
  useEffect(() => {
    if (signatureImage) {
      if (boxes.length) {
        const datesBoxes = boxes.filter((i) => i.type === "date");
        const lastElement = boxes.at(-1);
        let signBoxes = boxes
          .filter((i) => i.type !== "date")
          .map((i) => ({ ...i, image: signatureImage }));
        if (!signBoxes.length) {
          signBoxes = [
            ...signBoxes,
            {
              fId: lastElement ? lastElement.fId + 1 : Date.now(),
              image: signatureImage,
              width: 120,
              height: 40,
              left: lastElement ? lastElement.left : 20,
              top: lastElement ? lastElement.top : 20,
            },
          ];
        }
        setBoxes([...datesBoxes, ...signBoxes]);
      } else {
        setBoxes([
          {
            fId: Date.now(),
            width: 150,
            height: 100,
            top: 20,
            left: 20,
            image: signatureImage,
          },
        ]);
      }
    }
  }, [signatureImage]);
  return (
    <Fragment>
      {/* <Box> */}
      <div className="pdf-container">
        <div className="pdf-row" container>
          <div item className="pdf-col-3">
            <List>
              <CreateSignatureModal
                setDragAndDrop={setDragAndDrop}
                setSignatureImage={setSignatureImage}
              />
              {boxes.length && signatureImage ? (
                <ListItem>
                  <ListItemButton onClick={() => addAnother()}>
                    <ListItemIcon>
                      <AddCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary="Add Another" />
                  </ListItemButton>
                </ListItem>
              ) : (
                ""
              )}
              {/* <AddDateModal
                setDragAndDrop={setDragAndDrop}
                setSignatureImage={setSignatureImage}
                boxes={boxes}
                setBoxes={setBoxes}
              /> */}
              {boxes.length ? (
                <SubmitSignature
                  fileUrl={fileUrl}
                  boxes={boxes}
                  loading={loading}
                  setLoading={setLoading}
                  handleSubmit={handleSubmit}
                />
              ) : (
                ""
              )}
            </List>
          </div>
          <div item className="pdf-col-7">
            <PDFViewer
              setDimension={setDimension}
              fileUrl={fileUrl}
              signatureImage={signatureImage}
              dragAndDrop={dragAndDrop}
              boxes={boxes}
              setBoxes={setBoxes}
            />
          </div>
        </div>
      </div>
      {/* </Box> */}
    </Fragment>
  );
}
