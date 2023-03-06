import React, {useState} from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  TextField,
} from '@material-ui/core';
import MDInput from '../MDInput';
import MDButton from '../MDButton';
import MDBox from 'components/MDBox';
import {collection, doc, setDoc, getDocs, query, where} from 'firebase/firestore';
import {
  convertTimestampToDate,
  convertDateTimeToString,
  convertDateTimeStringToVnTime,
} from '../utils.js';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {db} from '../../layouts/authentication/components/firebase.js';
import UploadFileDialog from 'components/Dialog/UploadFileDialog';
import {COLUMNS, HIDE_COLUMNS} from 'layouts/hoso/components/columns';

const updateData = async (docId, newData) => {
  try {
    const docRef = doc(db, 'Documents', docId);

    const data = newData;

    await setDoc(docRef, data)
      .then((docRef) => {
        console.log('Entire Document has been updated successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
const UpdateDataModal = ({open, handleClose, documentId, documentData, refresh}) => {
  const [dataNeededUpdate, setDataNeededUpdate] = useState(documentData);
  const handleOnChange = (e) => {
    setDataNeededUpdate({...dataNeededUpdate, [e.target.name]: e.target.value});
  };
  const handleSubmit = async () => {
    await updateData(documentId, dataNeededUpdate);
    await refresh();
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} styles={{width: '300px'}} fullWidth>
      <DialogTitle>Sửa thông tin</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense" id="formData">
          {Object.keys(documentData)
            .sort()
            .filter((item) => {
              let isTrue = true;
              HIDE_COLUMNS.forEach((col) => {
                if (item.startsWith(col)) isTrue = false;
              });
              return isTrue;
            })
            .map((item, index) => {
              return (
                <MDBox mb={2}>
                  <MDInput
                    id={item}
                    key={item}
                    name={item}
                    type="text"
                    label={COLUMNS.filter((x) => x.accessor === item)[0] && COLUMNS.filter((x) => x.accessor === item)[0].Header}
                    value={dataNeededUpdate[item]}
                    variant="outlined"
                    fullWidth
                    onInput={handleOnChange}
                    InputLabelProps={{shrink: true}}
                  />
                </MDBox>
              );
            })}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <MDButton onClick={handleClose} color="primary">
          Huỷ bỏ
        </MDButton>
        <MDButton color="success" onClick={() => handleSubmit()}>
          Xác nhận
        </MDButton>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDataModal;
