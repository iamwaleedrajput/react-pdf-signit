import { Publish } from "@mui/icons-material";
import {
  CircularProgress,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import html2canvas from "html2canvas";
import { PDFDocument } from "pdf-lib";
import React, { Fragment } from "react";

export default function SubmitSignature({
  boxes,
  fileUrl,
  loading,
  setLoading,
}) {
  console.log("moved, boxes", boxes);
  const createSignatureImage = async (allPages) => {
    try {
      const sign_container = document.getElementById("sign_container");
      console.log("sign_container", sign_container.offsetWidth);
      const { height, width } = allPages[0].getSize();
      const newWidth = sign_container.offsetWidth - width;
      const ratioWidth = newWidth / 2;
      console.log("newWidth", newWidth);
      let arr = [];

      for (let i in allPages) {
        // ** height limits
        const fromHeigth = height * i;
        const toHeight = height * (i + 1);

        // ** filter boxes with given height limits
        let filteredBoxes = boxes.filter(
          (item) => item.top >= fromHeigth && item.top <= toHeight
        );

        if (parseInt(i) === 0) {
          const negativeCoor = boxes.filter((item) => item.top < 0);
          filteredBoxes = [...filteredBoxes, ...negativeCoor];
        }

        // ** create div/element
        const elem = document.createElement("div");
        elem.id = "my-div";
        elem.style.height = `${height}px`;
        elem.style.width = `${width}px`;
        elem.style.background = "rgba(0,255,0,0.2)";
        // elem.style.background = `transparent`;
        elem.style.position = "relative";
        console.log("filteredBoxes boxes", filteredBoxes);
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
          img.style.left = j["left"] - ratioWidth + "px";
          img.style.objectFit = "cover";
          img.style.background = "rgba(255,0,0,0.2)";
          elem.appendChild(img);
        }
        document.body.appendChild(elem);
        const divElement = document.getElementById("my-div");
        const canvas = await html2canvas(divElement, {
          backgroundColor: null, // Ensure transparency
          height,
          width,
        });
        const dataURL = canvas.toDataURL();
        arr.push(dataURL);
        document.body.removeChild(divElement);
      }
      return arr;
    } catch (e) {
      console.log("e", e);
    }
  };

  const createSignedPDF = async () => {
    setLoading && setLoading(true);
    const pdfBytes = await fetch(fileUrl).then((res) => res.arrayBuffer());
    // Convert the canvas to a Data URI
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);
    // Embed the signature image into the PDF document
    // const signatureImage = await pdfDoc.embedPng(signatureBytes); // or embedJpg if it's a JPG

    // Get the first page of the PDF (you can select other pages if needed)
    const pages = pdfDoc.getPages(); // You can use `getPages()[pageIndex]` for other pages
    const images = await createSignatureImage(pages);
    for (let i in images) {
      const signatureBytes = images[i];

      const signatureImage = await pdfDoc.embedPng(signatureBytes);
      pages[i].drawImage(signatureImage, {
        width: pages[i].getWidth(), // Match page width
        height: pages[i].getHeight(), // Match page height
      });
    }
    // ** Save the modified PDF
    const pdfBytesModified = await pdfDoc.save();
    // ** Optionally, you can trigger a download or do something with the modified PDF
    const blob = new Blob([pdfBytesModified], { type: "application/pdf" });
    const link = URL.createObjectURL(blob);
    fetch(link)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], `signed_agreement.pdf`, {
          type: blob.type,
        });
      });
    window.open(link);
  };
  return (
    <Fragment>
      <ListItem>
        <ListItemButton disabled={loading} onClick={() => createSignedPDF()}>
          <ListItemIcon>
            <Publish />
          </ListItemIcon>
          <ListItemText primary="Submit" />
          {loading && (
            <ListItemIcon>
              <CircularProgress size={17} />
            </ListItemIcon>
          )}
        </ListItemButton>
      </ListItem>
    </Fragment>
  );
}
