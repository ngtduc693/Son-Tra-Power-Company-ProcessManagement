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

import { Link } from "react-router-dom";

import FullRecordsDateStep from "components/DateTimePickerModal/FullRecordsDateStep.js";
import TransferDocumentsToCompany from "components/DateTimePickerModal/TransferDocumentsToCompany.js";
import ElectricalConnectionAgreementStep from "components/DateTimePickerModal/ElectricalConnectionAgreementStep.js";
import ConfirmReceiptOfConnectionAgreementStep from "components/DateTimePickerModal/ConfirmReceiptOfConnectionAgreementStep.js";
import UploadFileDialog from "components/Dialog/UploadFileDialog.js";


import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";


import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";


import BasicLayout from "layouts/authentication/components/BasicLayout";


import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useTable } from "react-table";
import { COLUMNS } from "./columnsReport.js";
import { Opacity } from "@mui/icons-material";
import ProposalForAcceptanceStep from "components/DateTimePickerModal/ProposalForAcceptanceStep.js";
import CompleteTheAcceptanceTestStep from "components/DateTimePickerModal/CompleteTheAcceptanceTestStep.js";
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


function ReportDocument() {
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
                <div>
                  <a href={current.TepDinhKemChuyenVePKT} target="_blank">
                  Xem tệp bước về PKT
                </a>
                </div>
                ):""}
                {(current.TepDinhKemHoSoThoaThuan)?(
                <div>
                  <a href={current.TepDinhKemHoSoThoaThuan} target="_blank">
                  Xem tệp bước thỏa thuận
                </a>
                </div>
                ):""}
                {(current.TepDinhKemNgayNhanThoaThuan)?(
                <div>
                  <a href={current.TepDinhKemNgayNhanThoaThuan} target="_blank">
                  Xem tệp bước nhận thỏa thuận
                </a>
                </div>
                ):""}
                {(current.TepDinhKemNgayDeNghiNghiemThu)?(
                <div>
                  <a href={current.TepDinhKemNgayDeNghiNghiemThu} target="_blank">
                  Xem tệp bước đề nghị nghiệm thu
                </a>
                </div>
                ):""}
                {(current.TepDinhKemNgayHoanThanhNghiemThu)?(
                <div>
                  <a href={current.TepDinhKemNgayHoanThanhNghiemThu} target="_blank">
                  Xem tệp bước hoàn thành nghiệm thu
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
                NgayNhanHoSoThoaThuan:
            current.NgayNhanHoSoThoaThuan === undefined ||
            current.NgayNhanHoSoThoaThuan === null
              ? ""
              : convertDateTimeToString(
                  new Date(
                    current.NgayNhanHoSoThoaThuan.seconds * 1000 +
                      current.NgayNhanHoSoThoaThuan.nanoseconds / 1000000
                  )
                ),
                NgayDeNghiNghiemThu:
            current.NgayDeNghiNghiemThu === undefined ||
            current.NgayDeNghiNghiemThu === null
              ? ""
              : convertDateTimeToString(
                  new Date(
                    current.NgayDeNghiNghiemThu.seconds * 1000 +
                      current.NgayDeNghiNghiemThu.nanoseconds / 1000000
                  )
                ),
                NgayHoanThanhNghiemThu:
            current.NgayHoanThanhNghiemThu === undefined ||
            current.NgayHoanThanhNghiemThu === null
              ? ""
              : convertDateTimeToString(
                  new Date(
                    current.NgayHoanThanhNghiemThu.seconds * 1000 +
                      current.NgayHoanThanhNghiemThu.nanoseconds / 1000000
                  )
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

export default ReportDocument;
