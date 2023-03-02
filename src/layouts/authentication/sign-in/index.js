import { useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../components/firebase.js";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-profile.jpeg";
import { useSignIn } from "react-auth-kit";
import { useLocation, useNavigate } from "react-router-dom";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const signIn = useSignIn();
  const location = useLocation();
  const navigate = useNavigate();

  const params = location.search || '/quanlyhoso';

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const user = e.target[0].value;
    const password = e.target[2].value;
    const q = query(collection(db, "Auth"), where("user", "==", user), where("password", "==", password));
    const querySnapshot = await getDocs(q);
    let docids = [];
    let data = [];

    querySnapshot.forEach((doc) => {
      docids = [...docids, doc.id];
      data = [...data, doc.data()];
    });
    
    if (docids.length > 0) {
      signIn({
        token: Math.random(),
        expiresIn: 1000000,
        tokenType: 'Bearer',
        authState: {
          user: data[0].user,
          role: data[0].role,
          branch: data[0].branch,
        },
        refreshToken: 'refreshToken',
      })
      navigate(params);
      toast.success("Đăng nhập thành công", {
        autoClose: 3000,
        closeOnClick: true,
        position: "bottom-right",
      });
    } else {
      toast.error("Đăng nhập thất bại", {
        autoClose: 3000,
        closeOnClick: true,
        position: "bottom-right",
      });
    };
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Đăng nhập
          </MDTypography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ mt: 1, mb: 1 }}
          ></Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={HandleSubmit}>
            <MDBox mb={2}>
              <MDInput type="text" label="Tên đăng nhập" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Mật khẩu" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Nhớ mật khẩu
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Đăng nhập
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <ToastContainer position="bottom-right" limit={1} />
    </BasicLayout>
  );
}

export default Basic;
