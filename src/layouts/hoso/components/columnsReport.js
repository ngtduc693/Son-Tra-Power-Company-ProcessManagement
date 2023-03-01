import { Link } from "react-router-dom";
import { AgGridColumn } from "ag-grid-react";
function HyperlinkRenderer({ value }) {
  return <a href={`${value}`}>{value}</a>;
}
export const COLUMNS = [
  {
    headerName: "Mã hồ sơ",
    accessor: "MaHoSo",
    field: "MaHoSo",
    filter: true,
  },
  {
    headerName: "Khách hàng",
    accessor: "TenKhachHang",
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
  },
  {
    headerName: "Ngày nộp đầy đủ",
    field: "NgayNopHoSoDayDu",
    filter: true,
  },
  {
    headerName: "Ngày HS về PKT",
    field: "NgayChuyenVePKT",
    filter: true,
  },
  {
    headerName: "Ngày thoả thuận",
    field: "NgayChuyenHoSoThoaThuan",
    filter: true,
  },
  {
    headerName: "Ngày nhận thoả thuận",
    field: "NgayNhanHoSoThoaThuan",
    filter: true,
  },
  {
    headerName: "Ngày đề nghị nghiệm thu",
    field: "NgayDeNghiNghiemThu",
    filter: true,
  },
  {
    headerName: "Ngày hoàn thành nghiệm thu",
    field: "NgayHoanThanhNghiemThu",
    filter: true,
  },
  {
    headerName: "Tệp đính kèm",
    field: "TepDinhKemLucTaoHoSo",
    filter: true,
    cellRendererFramework: HyperlinkRenderer,
  },
];

export const HIDDEN_COLUMNS = ["id"];
