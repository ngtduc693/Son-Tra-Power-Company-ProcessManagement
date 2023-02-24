
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CreateDocument from "./components/create.js"
import MoveDocument from "./components/move.js"
import ContractDocument from "./components/contract.js";

function HoSo() {
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <CreateDocument/>
      <Footer />
    </DashboardLayout>
  );
}

function ChuyenHoSo() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MoveDocument/>
      <Footer />
    </DashboardLayout>
  );
}

function ThoaThuan() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ContractDocument/>
      <Footer />
    </DashboardLayout>
  );
}

export const ChuyenHoSoSangDienLuc = ChuyenHoSo;

export const ThoaThuanDauNoi = ThoaThuan;

export default HoSo;
