import React, { useState, useEffect } from "react";
import MDInput from "../MDInput";
import MDBox from "components/MDBox";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "firebase/storage";
import {
  firebaseStorage,
} from "../../../src/layouts/authentication/components/firebase.js";
const UploadFileDialog = () => {
  const [fileUrl, setFileUrl] = useState("");
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const storageRef = ref(firebaseStorage, `/files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); 
        setFileUrl(percent + "%");
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFileUrl(url);
        });
      }
    );
  };
  useEffect(() => {

    let getAllUploadFileDialog = document.getElementsByClassName("uploadFileDialog");
    if (getAllUploadFileDialog && getAllUploadFileDialog[getAllUploadFileDialog.length - 1] && getAllUploadFileDialog[getAllUploadFileDialog.length - 1].lastElementChild && getAllUploadFileDialog[getAllUploadFileDialog.length - 1].lastElementChild.firstElementChild)
    getAllUploadFileDialog[getAllUploadFileDialog.length - 1].lastElementChild.firstElementChild.value =  fileUrl
  }, [fileUrl]);
  return (
    <MDBox display="grid" gridTemplateColumns="1fr 1fr" gridgap="5px">
      <MDInput
        type="text"
        label="Đường dẫn tệp"
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        InputProps={{readOnly: true}}
        className = "uploadFileDialog"

      />
      <input
        id="fileInput"
        type="file"
        onChange={handleFileUpload}
        style={{
          position: "absolute",
          width: "0",
          height: "0",
          opacity: "0",
          overflow: "hidden",
        }}
      />
      <MDBox
        style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}
      >
        <label htmlFor="fileInput" style={{ fontSize: "0.9rem" }}>
          Chọn tệp...
        </label>
      </MDBox>
    </MDBox>
  );
};

export default UploadFileDialog;
