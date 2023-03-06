import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  TextField,
} from "@material-ui/core";
import MDInput from "../MDInput";
import MDButton from "../MDButton";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { convertTimestampToDate, convertDateTimeToString , convertDateTimeStringToVnTime } from "../../components/utils.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../layouts/authentication/components/firebase.js";
import UploadFileDialog from "components/Dialog/UploadFileDialog";
import MDBox from "components/MDBox";
const updateData = async (docId, newData) => {
  try {
    const docRef = doc(db, "Documents", docId);

    const data = newData;

    await setDoc(docRef, data)
      .then((docRef) => {
        console.log("Entire Document has been updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
const TransferDocumentsToCompany = ({
  open,
  handleClose,
  currentStep,
  documentId,
  documentData,
  refresh
}) => {

  

  const handleSave = async () => {
    let getAllUploadFileDialog = document.getElementsByClassName("uploadFileDialog");
    
    await updateData(documentId, {
      ...documentData,
      NgayChuyenVePKT: convertDateTimeStringToVnTime(document.getElementById('date-picker-dialog').value),
      TepDinhKemChuyenVePKT: (getAllUploadFileDialog && getAllUploadFileDialog[getAllUploadFileDialog.length - 1] && getAllUploadFileDialog[getAllUploadFileDialog.length - 1].lastElementChild && getAllUploadFileDialog[getAllUploadFileDialog.length - 1].lastElementChild.firstElementChild)?
      getAllUploadFileDialog[getAllUploadFileDialog.length - 1].lastElementChild.firstElementChild.value:""
    });
    await refresh()
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Chuyển về công ty</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense" >
          <MDInput 
            id="date-picker-dialog"
            type="date"
            label="Ngày chuyển"
            required
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <MDBox mt={2}><UploadFileDialog/></MDBox>
        
      </DialogContent>
      <DialogActions>
        <MDButton onClick={handleClose} color="primary">
          Huỷ bỏ
        </MDButton>
        <MDButton onClick={handleSave} color="success">
          Xác nhận
        </MDButton>
      </DialogActions>
    </Dialog>
  );
};

export default TransferDocumentsToCompany;
