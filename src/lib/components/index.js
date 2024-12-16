import React, { Fragment, useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { PDFDocument } from "pdf-lib";
import { pdfjs } from "react-pdf";
import PDFViewer from "./PDFViewer";
import {
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

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;
// 3.11.174" does not match the Worker version "3.4.120".', name: 'UnknownErrorException'}

export default function ReactPDFSignIn({ fileUrl, loading, setLoading }) {
  const [signatureImage, setSignatureImage] = useState("");
  const [dragAndDrop, setDragAndDrop] = useState(false);
  const [boxes, setBoxes] = useState([
    // { width: 150, height: 100, top: 20, left: 80, title: signatureImage },
    // { width: 300, height: 200, top: 20, left: 80, title: signatureImage },
  ]);

  const addAnother = () => {
    let newBoxes = boxes;
    const fId = newBoxes.at(-1).fId + 1;

    setBoxes([
      ...boxes,
      {
        fId,
        width: 150,
        height: 100,
        top: 20,
        left: 80,
        title: signatureImage,
      },
    ]);
  };
  useEffect(() => {
    if (signatureImage) {
      if (boxes.length) {
        setBoxes(boxes.map((i) => ({ ...i, title: signatureImage })));
      } else {
        setBoxes([
          {
            fId: Date.now(),
            width: 150,
            height: 100,
            top: 20,
            left: 80,
            title: signatureImage,
          },
        ]);
      }
    }
  }, [signatureImage]);
  return (
    <Fragment>
      <Container maxWidth="xl">
        <Grid2 container>
          <Grid2 item size={{ xl: 2, lg: 3, md: 3 }}>
            <List>
              <CreateSignatureModal
                setDragAndDrop={setDragAndDrop}
                setSignatureImage={setSignatureImage}
              />
              {boxes.length ? (
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
              {signatureImage && (
                <SubmitSignature
                  fileUrl={fileUrl}
                  boxes={boxes}
                  loading={loading}
                  setLoading={setLoading}
                />
              )}
            </List>
          </Grid2>
          <Grid2 item size={{ xl: 8, lg: 8, md: 8 }}>
            <PDFViewer
              fileUrl={fileUrl}
              signatureImage={signatureImage}
              dragAndDrop={dragAndDrop}
              boxes={boxes}
              setBoxes={setBoxes}
            />
          </Grid2>
        </Grid2>
      </Container>
    </Fragment>
  );
}
