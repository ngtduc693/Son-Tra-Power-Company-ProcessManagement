import { useState, useEffect, useMemo } from "react";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  db,
  addData,
  firebaseApp,
  firebaseStorage,
} from "../../authentication/components/firebase.js";
import DataTable from "examples/Tables/DataTable";
// react-router-dom components
import { Link } from "react-router-dom";

import DateTimePickerModalStep1 from "components/DateTimePickerModal/DateTimePickerModalStep1.js";
import DateTimePickerModalStep2 from "components/DateTimePickerModal/DateTimePickerModalStep2.js";
import DateTimePickerModalStep3 from "components/DateTimePickerModal/DateTimePickerModalStep3.js";

import UploadFileDialog from "components/Dialog/UploadFileDialog.js";

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
import { useTable } from "react-table";
import { COLUMNS } from "./columns.js";
import { Opacity } from "@mui/icons-material";
function convertDateTimeToString(today) {
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}
function getCellStyle(rowData, rowIndex, colIndex) {
  console.log(rowData);
  if (rowData[colIndex] != "") {
    if (colIndex === 4) {
      console.log(rowData[colIndex]);
      console.log(rowData[1]);
      console.log(getDayOfTime(rowData[colIndex], rowData[1]));
      if (getDayOfTime(rowData[colIndex], rowData[1]) > 1) {
        return {
          backgroundColor: "yellow",
          color: "white",
        };
      }
    }
  }
}
function GetNextStep({ currentStep, documentId, documentData, refreshData }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  if (currentStep === "Xác nhận đủ HS") {
    return (
      <div>
        <MDButton variant="contained" color="success" onClick={handleOpen}>
          {currentStep}
        </MDButton>
        <DateTimePickerModalStep1
          open={open}
          handleClose={handleClose}
          currentStep={currentStep}
          documentId={documentId}
          documentData={documentData}
          refresh={refreshData}
        />
      </div>
    );
  }
  if (currentStep === "Chuyển về công ty") {
    return (
      <div>
        <MDButton variant="contained" color="success" onClick={handleOpen}>
          {currentStep}
        </MDButton>
        <DateTimePickerModalStep2
          open={open}
          handleClose={handleClose}
          currentStep={currentStep}
          documentId={documentId}
          documentData={documentData}
          refresh={refreshData}
        />
      </div>
    );
  }
  if (currentStep === "Thoả thuận Đấu nối") {
    return (
      <div>
        <MDButton variant="contained" color="success" onClick={handleOpen}>
          {currentStep}
        </MDButton>
        <DateTimePickerModalStep3
          open={open}
          handleClose={handleClose}
          currentStep={currentStep}
          documentId={documentId}
          documentData={documentData}
          refresh={refreshData}
        />
      </div>
    );
  }
  if (currentStep === "Hoàn tất") {
    <div>
      <MDButton variant="contained" color="primary" onClick={handleOpen}>
        {currentStep}
      </MDButton>
    </div>;
  }
  return (
    <div>
      <MDButton variant="contained" color="info">
        Hoàn thành
      </MDButton>
    </div>
  );
}

async function getDocuments() {
  const q = query(collection(db, "Documents"));
  const querySnapshot = await getDocs(q);
  const docData = [];
  querySnapshot.forEach((doc) => {
    docData.push(doc.data());
  });
  return docData;
}
const getDayOfTime = (d1, d2) => {
  let ms1 = d1.getTime();
  let ms2 = d2.getTime();
  return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
};


function CreateDocument() {
  const [isCreated, setIsCreated] = useState([]);
  const [data, setData] = useState([]);
  async function fetchData() {
    const docData = await getDocuments();
    setData(
      docData.map((current) => {
        return {
          ...current,
          TepDinhKemLucTaoHoSo:
          
            (current.TepDinhKemLucTaoHoSo)? (
              <div>
                <a href={current.TepDinhKemLucTaoHoSo} target="_blank">
                  Xem tệp lúc tạo hồ sơ
                </a>
                {(current.TepDinhKemChuyenVePKT)?(
                <div><br />
                  <a href={current.TepDinhKemChuyenVePKT} target="_blank">
                  Xem tệp bước về PKT
                </a>
                </div>
                ):""}
                {(current.TepDinhKemHoSoThoaThuan)?(
                <div><br />
                  <a href={current.TepDinhKemHoSoThoaThuan} target="_blank">
                  Xem tệp bước thỏa thuận
                </a>
                </div>
                ):""}
              </div>
            ) : (
              ""
            ),
          NgayDeNghiDauNoi:
            current.NgayDeNghiDauNoi === undefined ||
            current.NgayDeNghiDauNoi === null
              ? ""
              : convertDateTimeToString(
                  new Date(
                    current.NgayDeNghiDauNoi.seconds * 1000 +
                      current.NgayDeNghiDauNoi.nanoseconds / 1000000
                  )
                ),
          NgayChuyenHoSoThoaThuan:
            current.NgayChuyenHoSoThoaThuan === undefined ||
            current.NgayChuyenHoSoThoaThuan === null
              ? ""
              : convertDateTimeToString(
                  new Date(
                    current.NgayChuyenHoSoThoaThuan.seconds * 1000 +
                      current.NgayChuyenHoSoThoaThuan.nanoseconds / 1000000
                  )
                ),
          NgayChuyenVePKT:
            current.NgayChuyenVePKT === undefined ||
            current.NgayChuyenVePKT === null
              ? ""
              : convertDateTimeToString(
                  new Date(
                    current.NgayChuyenVePKT.seconds * 1000 +
                      current.NgayChuyenVePKT.nanoseconds / 1000000
                  )
                ),
          NgayNopHoSoDayDu:
            current.NgayNopHoSoDayDu === undefined ||
            current.NgayNopHoSoDayDu === null
              ? ""
              : convertDateTimeToString(
                  new Date(
                    current.NgayNopHoSoDayDu.seconds * 1000 +
                      current.NgayNopHoSoDayDu.nanoseconds / 1000000
                  )
                ),
          BuocTiep: (
            <GetNextStep
              refreshData={fetchData}
              documentId={current.MaHoSo}
              documentData={current}
              currentStep={
                current.NgayNopHoSoDayDu == null
                  ? "Xác nhận đủ HS"
                  : current.NgayNopHoSoDayDu != null &&
                    (current.NgayChuyenVePKT === null ||
                      current.NgayChuyenVePKT === undefined)
                  ? "Chuyển về công ty"
                  : current.NgayNopHoSoDayDu != null &&
                    current.NgayChuyenVePKT != null &&
                    (current.NgayChuyenHoSoThoaThuan === undefined ||
                      current.NgayChuyenHoSoThoaThuan === null)
                  ? "Thoả thuận Đấu nối"
                  : "Hoàn tất"
              }
            ></GetNextStep>
          ),
        };
      })
    );
  }
  useEffect(() => {
    fetchData();
  }, []);
  const columns = useMemo(() => COLUMNS, []);
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const HandleSubmit = async (e) => {
    //Prevent page reload
    e.preventDefault();

    const result = await addData("Documents", e.target[0].value, {
      MaHoSo: e.target[0].value,
      NgayDeNghiDauNoi: new Date(Date.parse(e.target[2].value)),
      TenKhachHang: e.target[4].value,
      CongSuatDeNghi: e.target[6].value,
      NgayNopHoSoDayDu:
        e.target[8].value === ""
          ? null
          : new Date(Date.parse(e.target[8].value)),
      TepDinhKemLucTaoHoSo: e.target[10].value,
    });
    if (result.includes("thành công")) {
      fetchData();
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
  };

  return (
    <MDBox mt={3}>
      <MDBox mb={3}>
        <MDBox component="form" role="form" onSubmit={HandleSubmit}>
          <MDBox
            mb={2}
            display="grid"
            gridTemplateColumns="15% 15% 40% 15% 15%"
            style={{ gridGap: "10px", paddingRight: "40px", boxSizing: "border-box" }}

          >
            <MDInput
            style={{ gridColumn: "1 / span 1" }}
              type="text"
              label="Mã hồ sơ"
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <MDInput
            style={{ gridColumn: "2 / span 1" }}
              type="date"
              label="Ngày đề nghị đấu nối"
              required
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <MDInput
            style={{ gridColumn: "3 / span 1" }}
              type="text"
              label="Tên khách hàng"
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <MDInput
            style={{ gridColumn: "4/ span 1" }}
              type="text"
              label="Công suất đề nghị"
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <MDInput
            style={{ gridColumn: "5 / span 1" }}
              type="date"
              label="Ngày nộp đầy đủ hồ sơ"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </MDBox>

          <MDBox
            mb={2}
            display="grid"
            gridTemplateColumns="60% 40%"
            gridgap="10px"
          >
            <UploadFileDialog/>
            <MDButton variant="gradient" color="info" fullWidth type="submit">
              Tạo hồ sơ
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox mb={3}>
        <DataTable
          canSearch={true}
          table={{
            columns: COLUMNS,
            rows: data,
          }}
        />
      </MDBox>
      <ToastContainer position="bottom-right" limit={1} />
    </MDBox>
  );
}

export default CreateDocument;
