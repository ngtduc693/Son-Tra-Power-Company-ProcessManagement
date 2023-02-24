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
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../layouts/authentication/components/firebase.js";
const updateData = async (docId, newData) => {
  try {
    const docRef = doc(db, "Documents", docId);

    const data = newData;

    setDoc(docRef, data)
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
const DateTimePickerModalStep1 = ({
  open,
  handleClose,
  currentStep,
  documentId,
  documentData,
}) => {

  

  const handleSave = async () => {
    console.log(document.getElementById('date-picker-dialog').value);
    await updateData(documentId, {
      ...documentData,
      NgayNopHoSoDayDu: new Date(Date.parse(document.getElementById('date-picker-dialog').value)),
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Xác nhận ngày đầy đủ hồ sơ</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <MDInput
            id="date-picker-dialog"
            type="date"
            label="Ngày đầy đủ hồ sơ"
            required
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
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

export default DateTimePickerModalStep1;
