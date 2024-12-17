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
  handleSubmit,
}) {
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
        elem.style.background = `transparent`;
        elem.style.position = "relative";

        // ** adding image to div/element
        for (let j of filteredBoxes) {
          const top = j.top - fromHeigth;
          const img = document.createElement("img");
          img.src = j["image"]; // Replace with your image URL
          img.alt = "Custom Image";
          img.style.width = j["width"] + "px";
          img.style.height = j["height"] + "px";
          img.style.position = "absolute";
          img.style.zIndex = "99";
          img.style.top = top + "px";
          img.style.left = j["left"] - ratioWidth + "px";
          img.style.objectFit = "contain";
          // img.style.background = "rgba(255,0,0,0.2)";
          img.style.background = "transparent";
          elem.appendChild(img);
        }

        // ** appending into body to get by ID
        document.body.appendChild(elem);
        const divElement = document.getElementById("my-div");
        const canvas = await html2canvas(divElement, {
          backgroundColor: null, // Ensure transparency
          height,
          width,
        });
        const dataURL = canvas.toDataURL();
        // ** pushing into array
        arr.push(dataURL);
        // ** removing from body as per no need
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

    // ** Load the PDF document
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
        handleSubmit(file);
      })
      .catch(() => {
        setLoading && setLoading(true);
      });
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
