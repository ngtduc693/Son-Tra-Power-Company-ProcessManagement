import {Link} from 'react-router-dom';
import {useState, useEffect, useMemo} from 'react';
// @mui material components
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Select from 'react-select';
// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

import { collection, getDocs, query } from "firebase/firestore";
import { db, addData } from "../../authentication/components/firebase.js";
// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Images
import bgImage from 'assets/images/bg-sign-up-cover.jpeg';

function SignUp() {
  const donvi = [
    {value: 'PP', label: 'Đà Nẵng'},
    {value: 'PP0100', label: 'Hải Châu'},
    {value: 'PP0300', label: 'Sơn Trà'},
    {value: 'PP0500', label: 'Thanh Khê'},
    {value: 'PP0700', label: 'Cẩm Lệ'},
    {value: 'PP0800', label: 'Liên Chiểu'},
    {value: 'PP0900', label: 'Hòa Vang'},
  ];
  const quyenhan = [
    {value: 'qtht', label: 'Quản trị'},
    {value: 'donvi', label: 'Đơn vị'},
    {value: 'dienluc', label: 'Điện lực'},
    {value: 'pkd', label: 'Phòng Kinh Doanh'},
    {value: 'pkt', label: 'Phòng Kỹ thuật'}
  ];
  const [selectedDonVi, setSelectedDonVi] = useState(donvi[0]);
  const [selectedQuyenHan, setSelectedQuyenHan] = useState(quyenhan[0]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleDonViChange = (selectedDonVi) => {
    setSelectedDonVi(selectedDonVi);
  };
  const handleQuyenHanChange = (selectedQuyenHan) => {
    setSelectedQuyenHan(selectedQuyenHan);
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const customTypography = {
    fontSize: "0.82rem",
      fontFamily: "'Roboto','Helvetica','Arial','sans-serif'",
      lineHeight: "1.5",
      color: "#7b809a"
  }
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "29.13px",
      fontSize: "14px",
      fontFamily: "'Roboto','Helvetica','Arial','sans-serif'",
      backgroundColor: 'white', 
      
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      fontFamily: "'Roboto','Helvetica','Arial','sans-serif'"
    }),
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
      const result = await addData("Auth", userName, {
      branch: selectedDonVi.value,
      role: selectedQuyenHan.value,
      user: userName,
      password: password
    });
    if (result.includes("thành công")) {
      toast.success(result, {
        autoClose: 3000,
        closeOnClick: true,
        position: "bottom-right",
      });
    } else {
      toast.error(result, {
        autoClose: 3000,
        closeOnClick: true,
        position: "bottom-right",
      });
    }
  }
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Đăng ký
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Nhập thông tin để đăng ký tài khoản
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={HandleSubmit}>
            <MDBox mb={2}>
            <MDTypography style={customTypography}>Đơn vị</MDTypography>
              <Select
                value={selectedDonVi}
                onChange={handleDonViChange}
                options={donvi}
                placeholder="-- Chọn đơn vị --"
                styles={selectStyles}
              />
            </MDBox>
            <MDBox mb={2}>
            <MDTypography style={customTypography}>Quyền hạn</MDTypography>
              <Select
                value={selectedQuyenHan}
                onChange={handleQuyenHanChange}
                options={quyenhan}
                placeholder="-- Chọn quyền --"
                styles={selectStyles}
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput type="text" label="Tên truy cập" variant="standard" fullWidth required onChange={handleUserName} value={userName}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Mật khẩu" variant="standard" fullWidth required onChange={handlePassword} value={password}/>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox required/>
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{cursor: 'pointer', userSelect: 'none', ml: -1}}
              >
                &nbsp;&nbsp;Tôi đồng ý&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                
              >
                điều khoản
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Đăng ký
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Bạn đã có tài khoản?{' '}
                <MDTypography
                  component={Link}
                  to="/dangnhap"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                >
                  Đăng nhập
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <ToastContainer position="bottom-right" limit={1} />
    </CoverLayout>
  );
}

export default SignUp;
