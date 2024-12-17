import { UploadFile } from "@mui/icons-material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DrawIcon from "@mui/icons-material/Draw";
import {
  Button,
  Grid as Grid2,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import html2canvas from "html2canvas";
import PropTypes from "prop-types";
import React, { Fragment, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import styled from "styled-components";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CreateSignatureModal({
  setSignatureImage,
  setDragAndDrop,
}) {
  const sigCanvas = useRef(null);
  const divRef1 = useRef(null); // C
  const divRef2 = useRef(null); // C
  const divRef3 = useRef(null); // C
  const divRef4 = useRef(null); // C
  const divRef5 = useRef(null); // C
  const divRef6 = useRef(null); // C
  const divRef7 = useRef(null); // C
  const divRef8 = useRef(null); // C
  const divRef9 = useRef(null); // C
  const divRef10 = useRef(null); // C
  const divRef11 = useRef(null); // C
  const divRef12 = useRef(null); // C
  const divRef13 = useRef(null); // C

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [values, setValues] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const penColor = "#000";

  const handleChangeText = (prop) => (e) => {
    const val = e.target.value.split(" ");
    let inital = "";
    if (val.length > 1) {
      inital = val[0][0] + (val[1][0] ? val[1][0] : "");
    } else {
      inital = val[0][0];
    }
    setValues({ ...values, [prop]: e.target.value, inital });
  };

  const handleClickOpen = () => {
    setDragAndDrop(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleConvertToDataUri = async (refer) => {
    const innerRef = refer ? refer : selected;
    if (innerRef.current) {
      try {
        // Use html2canvas to render the div to a canvas
        const canvas = await html2canvas(innerRef.current, {
          backgroundColor: null, // Ensure the canvas background is transparent
        });

        // Convert the canvas to a Data URI
        const dataUri = canvas.toDataURL("image/png");

        console.log("Data URI:", dataUri);
        setSignatureImage(dataUri);
        setOpen(false);
        setDragAndDrop(true);

        // Optional: Open the Data URI in a new tab
        // const newWindow = window.open();
        // newWindow.document.write(`<img src="${dataUri}" alt="Div as Image"/>`);
      } catch (error) {
        console.error("Error converting div to Data URI:", error);
      }
    }
  };
  const handleSave = async () => {
    const dataURL = sigCanvas.current.toDataURL(); // Get the base64 image of the drawn area
    console.log(dataURL); // This is the image data in base64 format
    // You can now use this base64 string (e.g., display or save it)
    setSignatureImage(dataURL);
    setOpen(false);
    setDragAndDrop(true);
  };

  const addFile = (files) => {
    // signed_upload_img
    if (files) {
      const doc = document.getElementById("signed_upload_img");
      doc.innerHTML = "";
      const img = document.createElement("img");
      img.src = URL.createObjectURL(files[0]);
      img.style.width = "500px";
      img.style.height = "200px";
      img.style.objectFit = "contain";
      doc.appendChild(img);
    }
  };

  return (
    <Fragment>
      <ListItem>
        <ListItemButton onClick={handleClickOpen}>
          <ListItemIcon>
            <BorderColorIcon />
          </ListItemIcon>
          <ListItemText primary="Add Signature" />
        </ListItemButton>
      </ListItem>

      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle justifyContent={"space-between"} display={"flex"}>
          {"Add Signature"}

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                icon={<CheckCircleOutlineIcon />}
                iconPosition="start"
                label="Select Style"
                {...a11yProps(0)}
                sx={{ minHeight: "50px" }}
              />
              <Tab
                icon={<DrawIcon />}
                iconPosition="start"
                label="Draw"
                {...a11yProps(1)}
                sx={{ minHeight: "50px" }}
              />
              <Tab
                sx={{ minHeight: "50px" }}
                icon={<CloudUploadIcon />}
                iconPosition="start"
                label="Upload"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {/* <Grid2 container spacing={2}> */}
            {/* <Grid2 item size={6}> */}
            <TextField
              fullWidth
              size="small"
              label="Name"
              value={values.name}
              onChange={handleChangeText("name")}
              sx={{ mb: 2 }}
            />

            {(values.name || values.initial) && (
              <table style={{ width: "100%" }}>
                <tbody>
                  {[
                    {
                      font: `homemade-apple-regular`,
                      divRef: divRef1,
                      initialRef: divRef7,
                    },
                    {
                      font: `allura-regular`,
                      divRef: divRef2,
                      initialRef: divRef8,
                    },
                    {
                      font: "satisfy-regular",
                      divRef: divRef3,
                      initialRef: divRef9,
                    },
                    {
                      font: `great-vibes-regular`,
                      divRef: divRef4,
                      initialRef: divRef10,
                    },
                    {
                      font: "handlee-regular",
                      divRef: divRef5,
                      initialRef: divRef11,
                    },
                    {
                      font: `dancing-script`,
                      divRef: divRef6,
                      initialRef: divRef12,
                    },
                  ].map((item, index) => (
                    <tr
                      key={index}
                      container
                      columnSpacing={2}
                      style={{ background: index % 2 ? "#fafafa" : "#fff" }}
                    >
                      <td>
                        <div className="d-flex align-items-center">
                          <Radio
                            checked={selected === item.divRef}
                            onChange={() => setSelected(item.divRef)}
                          />
                          <h2
                            className={item.font}
                            style={{ padding: "10px 15px", margin: 0 }}
                            ref={item.divRef}
                          >
                            {values.name}
                          </h2>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Radio
                            checked={selected === item.initialRef}
                            onChange={() => setSelected(item.initialRef)}
                          />
                          <h2
                            className={item.font}
                            style={{ padding: "10px 15px", margin: 0 }}
                            ref={item.initialRef}
                          >
                            {values.inital}
                          </h2>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div style={{ textAlign: "right" }}>
              {/* <Button onClick={() => sigCanvas.current.clear()}>Clear</Button> */}
              <Button
                variant="outlined"
                onClick={() => handleConvertToDataUri()}
              >
                Save
              </Button>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <SignatureCanvas
              ref={sigCanvas}
              penColor={penColor}
              canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
            />
            <div style={{ textAlign: "right" }}>
              <Button onClick={() => sigCanvas.current.clear()}>Clear</Button>
              <Button variant="outlined" onClick={handleSave}>
                Save
              </Button>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div id="signed_upload_img" ref={divRef13}></div>
            <div className="text-center">
              <Button
                component="label"
                role={undefined}
                variant="text"
                tabIndex={-1}
                startIcon={<UploadFile />}
              >
                Upload files
                <VisuallyHiddenInput
                  accept="image/png"
                  type="file"
                  onChange={(event) => addFile(event.target.files)}
                  // multiple
                />
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleConvertToDataUri(divRef13)}
              >
                Save
              </Button>
            </div>
          </CustomTabPanel>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent>

        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </Fragment>
  );
}
