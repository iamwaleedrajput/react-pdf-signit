import { CalendarToday, UploadFile } from "@mui/icons-material";
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
import moment from "moment/moment";
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

export default function AddDateModal({
  setSignatureImage,
  setDragAndDrop,
  boxes,
  setBoxes,
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
    const elem = document.createElement("h3");
    elem.id = "my-date";

    elem.innerHTML = moment().format("MM/DD/YYYY");
    // console.log("elem", elem);
    document.body.appendChild(elem);
    const divElement = document.getElementById("my-date");
    const canvas = await html2canvas(divElement, {
      backgroundColor: null, // Ensure transparency
      // height: 30,
      width: 120,
    });
    const dataURL = canvas.toDataURL();
    // console.log("dataURL", dataURL);
    document.body.removeChild(divElement);
    const lastElement = boxes.at(-1);
    setBoxes([
      ...boxes,
      {
        fId: lastElement ? lastElement.fId + 1 : Date.now(),
        image: dataURL,
        width: 120,
        height: 18.72,
        left: lastElement ? lastElement.left : 20,
        top: lastElement ? lastElement.top : 20,
        type: "date",
      },
    ]);
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
        <ListItemButton onClick={handleConvertToDataUri}>
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          <ListItemText primary="Add Date" />
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
                      <span
                        // className={item.font}
                        style={{ padding: "10px 15px", margin: 0 }}
                        ref={item.divRef}
                      >
                        {moment().format("MM/DD/YYYY")}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: "right" }}>
            {/* <Button onClick={() => sigCanvas.current.clear()}>Clear</Button> */}
            <Button variant="outlined" onClick={() => handleConvertToDataUri()}>
              Save
            </Button>
          </div>

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
