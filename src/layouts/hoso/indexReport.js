
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CreateDocument from "./components/create.js"
import MoveDocument from "./components/move.js"
import ContractDocument from "./components/contract.js";
import ReportDocument from "./components/report.js";

function HoSoReport() {
  return (
    <DashboardLayout>
      <DashboardNavbar isMini />
      <ReportDocument/>
      <Footer />
    </DashboardLayout>
  );
}

export default HoSoReport;
