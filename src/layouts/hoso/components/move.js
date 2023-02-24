

import { useState, useEffect } from "react";
import { collection, doc, setDoc , getDocs, query, where} from "firebase/firestore"; 
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {db} from '../../authentication/components/firebase.js';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";


// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function MoveDocument() {
  const [isCreated, setIsCreated] = useState([]);
const HandleSubmit = async(e) => {
  //Prevent page reload
  e.preventDefault();
  const email = e.target[0].value ;
  const password = e.target[2].value ;
  const q = query(collection(db,'Auth'),where('Email', '==', email));
  const querySnapshot = await getDocs(q);
  let docids = [];
  let data = [];
  
  querySnapshot.forEach((doc) => {
    docids = [...docids, doc.id];
    data = [...data,doc.data()]
  });
  if (docids.length > 0){
    setIsCreated(true);
  }
  else{
    setIsCreated(false);
  }
  
};
let message = null;
if (isCreated){
  message = toast.success("Tạo hồ sơ thành công",{
    autoClose: 3000, 
    closeOnClick: true, 
    position: "bottom-right" 
  });
}
if (isCreated == false){
  message = toast.error("Không tạo được hồ sơ",{
    autoClose: 3000, 
    closeOnClick: true, 
    position: "bottom-right" 
  });
}

  return (
      <MDBox mt={3}>
 
        <MDBox mb = {3}>
          <MDBox component="form" role="form" onSubmit = {HandleSubmit}>
            <MDBox mb={2}>
              <MDInput type="text" label="Mã hồ sơ" required fullWidth variant="outlined" InputLabelProps={{ shrink: true }}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="date" label="Ngày chuyển về phòng kỹ thuật" required variant="outlined" fullWidth  InputLabelProps={{ shrink: true }}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Đường dẫn tệp" fullWidth disabled variant="outlined" InputLabelProps={{ shrink: true }}/>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Tạo hồ sơ
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        
      
      <ToastContainer position="bottom-right" limit={1}/>
      </MDBox>
  );
}

export default MoveDocument;
