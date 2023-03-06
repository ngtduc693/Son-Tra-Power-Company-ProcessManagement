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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertTimestampToDate, convertDateTimeToString , convertDateTimeStringToVnTime } from "../../components/utils.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import MDBox from "components/MDBox";
import { db } from "../../layouts/authentication/components/firebase.js";
const updateData = async (docId, newData) => {
  try {
    const docRef = doc(db, "Documents", docId);

    const data = newData;

    await setDoc(docRef, data)
      .then((docRef) => {
        toast.success("Lưu dữ liệu thành công", {
          autoClose: 3000,
          closeOnClick: true,
          position: "bottom-right",
        });
      })
      .catch((error) => {
        toast.error("Lỗi " + error, {
          autoClose: 3000,
          closeOnClick: true,
          position: "bottom-right",
        });
      });
  } catch (error) {
    console.log(error);
  }
};
const FullRecordsDateStep = ({
  open,
  handleClose,
  currentStep,
  documentId,
  documentData,
  refresh,
}) => {

  const handleSave = async () => {
    console.log(document.getElementById("date-picker-dialog").value);
    await updateData(documentId, {
      ...documentData,
      NgayNopHoSoDayDu: convertDateTimeStringToVnTime(document.getElementById("date-picker-dialog").value
      ),
    });
    await refresh();
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

export default FullRecordsDateStep;
