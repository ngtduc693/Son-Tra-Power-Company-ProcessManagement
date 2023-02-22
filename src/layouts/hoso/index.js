
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


function HoSo() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      
      <Footer />
    </DashboardLayout>
  );
}

export default HoSo;
