import {Link} from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout';

// Images
import bgImage from 'assets/images/bg-sign-up-cover.jpeg';

function SignUp() {
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
          <MDBox component="form" role="form">
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
            <label for="donvi">Đơn vị:</label>
            <select id="donvi" name="donvi">
              <option value="PP">Đà Nẵng</option>
              <option value="PP0100">ĐL Hải Châu</option>
              <option value="PP0300">ĐL Sơn Trà</option>
              <option value="PP0500">ĐL Thanh Khê</option>
              <option value="PP0700">ĐL Cẩm Lệ</option>
              <option value="PP0800">ĐL Liên Chiểu</option>
              <option value="PP0900">ĐL Hòa Vang</option>
            </select>
            <MDBox mb={2}>
              <MDInput type="text" label="Username" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
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
                textGradient
              >
                điều khoản
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
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
                  textGradient
                >
                  Đăng nhập
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default SignUp;
