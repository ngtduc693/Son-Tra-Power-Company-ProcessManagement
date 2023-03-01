import { Link } from "react-router-dom";
import { AgGridColumn } from "ag-grid-react";
import {getDayOfTime, convertTimestampToDate, convertDateTimeToString} from "../../../components/utils.js"
import "../../../assets/theme/styles.css"
function TimestampRenderer({ value }) {
    debugger;
  return value=== undefined ||
          value === null
            ? ""
            : convertDateTimeToString(
                convertTimestampToDate(value)
  )
}
function HyperlinkMultiValueRenderer({ value }) {
  return (<div>
  <a href={value[0].link}>value[0].name</a>
  <br></br>
  <a href={value[1].link}>value[1].name</a>
</div>);
}
export const COLUMNS = [
  {
    headerName: "Mã hồ sơ",
    field: "MaHoSo",
    filter: true,
  },
  {
    headerName: "Khách hàng",
    field: "TenKhachHang",
    filter: true,
  },
  {
    headerName: "CS đề nghị",
    field: "CongSuatDeNghi",
    filter: true,
  },
  {
    headerName: "Ngày đề nghị",
    field: "NgayDeNghiDauNoi",
    filter: true,
    cellRendererFramework: TimestampRenderer
  },
  {
    headerName: "Ngày nộp đầy đủ",
    field: "NgayNopHoSoDayDu",
    filter: true,
    cellClassRules: {
      'highlight-cell': params => { if(params.data.NgayNopHoSoDayDu && params.data.NgayDeNghiDauNoi){
        const ngayNopHoSoDayDu = params.data.NgayNopHoSoDayDu;
        const ngayDeNghiDauNoi = params.data.NgayDeNghiDauNoi;
        return getDayOfTime(convertTimestampToDate(ngayNopHoSoDayDu), convertTimestampToDate(ngayDeNghiDauNoi)) > 1;}
      }
    },
    cellRendererFramework: TimestampRenderer
  },
  {
    headerName: "Ngày HS về PKT",
    field: "NgayChuyenVePKT",
    filter: true,
    cellRendererFramework: TimestampRenderer,

    cellClassRules: {
      'highlight-cell': params => { if(params.data.NgayChuyenVePKT && params.data.NgayNopHoSoDayDu){
        const firstDay = params.data.NgayChuyenVePKT;
        const nextDay = params.data.NgayNopHoSoDayDu;
        return getDayOfTime(convertTimestampToDate(firstDay), convertTimestampToDate(nextDay)) > 1;}
      }
    },
  },
  {
    headerName: "Ngày thoả thuận",
    field: "NgayChuyenHoSoThoaThuan",
    filter: true,
    cellRendererFramework: TimestampRenderer,
    cellClassRules: {
      'highlight-cell': params => { if(params.data.NgayChuyenHoSoThoaThuan && params.data.NgayChuyenVePKT){
        const firstDay = params.data.NgayChuyenHoSoThoaThuan;
        const nextDay = params.data.NgayChuyenVePKT;
        return getDayOfTime(convertTimestampToDate(firstDay), convertTimestampToDate(nextDay)) > 1;}
      }
    },
  },
  {
    headerName: "Ngày nhận thoả thuận",
    field: "NgayNhanHoSoThoaThuan",
    filter: true,
    cellRendererFramework: TimestampRenderer,
    cellClassRules: {
      'highlight-cell': params => { if(params.data.NgayNhanHoSoThoaThuan && params.data.NgayChuyenHoSoThoaThuan){
        const firstDay = params.data.NgayNhanHoSoThoaThuan;
        const nextDay = params.data.NgayChuyenHoSoThoaThuan;
        return getDayOfTime(convertTimestampToDate(firstDay), convertTimestampToDate(nextDay)) > 1;}
      }
    },
  },
  {
    headerName: "Ngày đề nghị nghiệm thu",
    field: "NgayDeNghiNghiemThu",
    filter: true,
    cellRendererFramework: TimestampRenderer,
    cellClassRules: {
      'highlight-cell': params => { if(params.data.NgayDeNghiNghiemThu && params.data.NgayNhanHoSoThoaThuan){
        const firstDay = params.data.NgayDeNghiNghiemThu;
        const nextDay = params.data.NgayNhanHoSoThoaThuan;
        return getDayOfTime(convertTimestampToDate(firstDay), convertTimestampToDate(nextDay)) > 1;}
      }
    },
  },
  {
    headerName: "Ngày hoàn thành nghiệm thu",
    field: "NgayHoanThanhNghiemThu",
    filter: true,
    cellRendererFramework: TimestampRenderer,
    cellClassRules: {
      'highlight-cell': params => { if(params.data.NgayHoanThanhNghiemThu && params.data.NgayDeNghiNghiemThu){
        const firstDay = params.data.NgayHoanThanhNghiemThu;
        const nextDay = params.data.NgayDeNghiNghiemThu;
        return getDayOfTime(convertTimestampToDate(firstDay), convertTimestampToDate(nextDay)) > 1;}
      }
    },
  },
  // {
  //   headerName: "Tệp đính kèm",
  //   field: "TepDinhKemLucTaoHoSo",
  //   filter: true,
  //   cellRendererFramework: HyperlinkMultiValueRenderer,
  // },
];
