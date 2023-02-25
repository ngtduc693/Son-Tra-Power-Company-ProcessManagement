import React, { useState } from "react";
import MDInput from "../MDInput";
import MDBox from "components/MDBox";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "firebase/storage";
import {
  db,
  addData,
  firebaseApp,
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
        ); // update progress
        setFileUrl(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setFileUrl(url);
        });
      }
    );
  };
  return (
    <MDBox display="grid" gridTemplateColumns="1fr 1fr" gridgap="5px">
      <MDInput
        type="text"
        label="Đường dẫn tệp"
        fullWidth
        disabled
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={fileUrl}
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
        <label htmlFor="fileInput" style={{ fontSize: "1.05rem" }}>
          Chọn tệp...
        </label>
      </MDBox>
    </MDBox>
  );
};

export default UploadFileDialog;
