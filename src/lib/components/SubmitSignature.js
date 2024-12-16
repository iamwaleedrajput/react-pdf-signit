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
  const createSignatureImage = async (allPages) => {
    console.log("all", allPages);
    console.log("boxes", boxes);
    const { height, width } = allPages[0].getSize();
    let arr = [];
    for (let i in allPages) {
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
    setLoading && setLoading(true);
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
    console.log("link", blob);
    fetch(link)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], `signed_agreement.pdf`, {
          type: blob.type,
        });
      });
    // window.open(link);
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
