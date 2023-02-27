import { useState, useEffect, useMemo } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db, addData } from "../../authentication/components/firebase.js";
import DataTable from "examples/Tables/DataTable";
import {getDayOfTime, convertTimestampToDate} from "../../../components/utils.js"
import MDButton from "components/MDButton";

import MDBox from "components/MDBox";
import { useTable } from "react-table";
import { COLUMNS } from "./columnsReport.js";
function convertDateTimeToString(today) {
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
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

function ReportDocument() {
  const [isCreated, setIsCreated] = useState([]);
  const [data, setData] = useState([]);
  async function fetchData() {
    const docData = await getDocuments();
    setData(
      docData.map((current) => {
        return {
          ...current,
          TepDinhKemLucTaoHoSo: current.TepDinhKemLucTaoHoSo ? (
            <div>
              <a href={current.TepDinhKemLucTaoHoSo} target="_blank">
                Xem tệp lúc tạo hồ sơ
              </a>
              {current.TepDinhKemChuyenVePKT ? (
                <div>
                  <a href={current.TepDinhKemChuyenVePKT} target="_blank">
                    Xem tệp bước về PKT
                  </a>
                </div>
              ) : (
                ""
              )}
              {current.TepDinhKemHoSoThoaThuan ? (
                <div>
                  <a href={current.TepDinhKemHoSoThoaThuan} target="_blank">
                    Xem tệp bước thỏa thuận
                  </a>
                </div>
              ) : (
                ""
              )}
              {current.TepDinhKemNgayNhanThoaThuan ? (
                <div>
                  <a href={current.TepDinhKemNgayNhanThoaThuan} target="_blank">
                    Xem tệp bước nhận thỏa thuận
                  </a>
                </div>
              ) : (
                ""
              )}
              {current.TepDinhKemNgayDeNghiNghiemThu ? (
                <div>
                  <a
                    href={current.TepDinhKemNgayDeNghiNghiemThu}
                    target="_blank"
                  >
                    Xem tệp bước đề nghị nghiệm thu
                  </a>
                </div>
              ) : (
                ""
              )}
              {current.TepDinhKemNgayHoanThanhNghiemThu ? (
                <div>
                  <a
                    href={current.TepDinhKemNgayHoanThanhNghiemThu}
                    target="_blank"
                  >
                    Xem tệp bước hoàn thành nghiệm thu
                  </a>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          ),
          NgayDeNghiDauNoi:
            current.NgayDeNghiDauNoi === undefined ||
            current.NgayDeNghiDauNoi === null
              ? ""
              : convertDateTimeToString(convertTimestampToDate(current.NgayDeNghiDauNoi)),
          NgayChuyenHoSoThoaThuan:
            current.NgayChuyenHoSoThoaThuan === undefined ||
            current.NgayChuyenHoSoThoaThuan === null
              ? ""
              : convertDateTimeToString(convertTimestampToDate(current.NgayChuyenHoSoThoaThuan)),
          NgayChuyenVePKT:
            current.NgayChuyenVePKT === undefined ||
            current.NgayChuyenVePKT === null
              ? (
                ""
              ) : getDayOfTime(convertTimestampToDate(current.NgayChuyenVePKT),convertTimestampToDate(current.NgayNopHoSoDayDu)) > 1 ? (
                <MDButton color="warning">
                  {convertDateTimeToString(
                    convertTimestampToDate(current.NgayChuyenVePKT)
                  )}
                </MDButton>
              ) :  convertDateTimeToString(convertTimestampToDate(current.NgayChuyenVePKT)),
          NgayNopHoSoDayDu:
            current.NgayNopHoSoDayDu === undefined ||
            current.NgayNopHoSoDayDu === null ? (
              ""
            ) : getDayOfTime(convertTimestampToDate(current.NgayNopHoSoDayDu),convertTimestampToDate(current.NgayDeNghiDauNoi)) > 1 ? (
              <MDButton color="warning">
                {convertDateTimeToString(
                  convertTimestampToDate(current.NgayNopHoSoDayDu)
                )}
              </MDButton>
            ) :  convertDateTimeToString(convertTimestampToDate(current.NgayNopHoSoDayDu)),
          NgayNhanHoSoThoaThuan:
            current.NgayNhanHoSoThoaThuan === undefined ||
            current.NgayNhanHoSoThoaThuan === null
              ? (
                ""
              ) : getDayOfTime(convertTimestampToDate(current.NgayNhanHoSoThoaThuan),convertTimestampToDate(current.NgayChuyenHoSoThoaThuan)) > 1 ? (
                <MDButton color="warning">
                  {convertDateTimeToString(
                    convertTimestampToDate(current.NgayNhanHoSoThoaThuan)
                  )}
                </MDButton>
              ) :  convertDateTimeToString(convertTimestampToDate(current.NgayNhanHoSoThoaThuan)),
          NgayDeNghiNghiemThu:
            current.NgayDeNghiNghiemThu === undefined ||
            current.NgayDeNghiNghiemThu === null
              ? (
                ""
              ) : getDayOfTime(convertTimestampToDate(current.NgayDeNghiNghiemThu),convertTimestampToDate(current.NgayNhanHoSoThoaThuan)) > 1 ? (
                <MDButton color="warning">
                  {convertDateTimeToString(
                    convertTimestampToDate(current.NgayDeNghiNghiemThu)
                  )}
                </MDButton>
              ) :  convertDateTimeToString(convertTimestampToDate(current.NgayDeNghiNghiemThu)),
          NgayHoanThanhNghiemThu:
            current.NgayHoanThanhNghiemThu === undefined ||
            current.NgayHoanThanhNghiemThu === null
              ? (
                ""
              ) : getDayOfTime(convertTimestampToDate(current.NgayHoanThanhNghiemThu),convertTimestampToDate(current.NgayDeNghiNghiemThu)) > 1 ? (
                <MDButton color="warning">
                  {convertDateTimeToString(
                    convertTimestampToDate(current.NgayHoanThanhNghiemThu)
                  )}
                </MDButton>
              ) :  convertDateTimeToString(convertTimestampToDate(current.NgayHoanThanhNghiemThu)),
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
