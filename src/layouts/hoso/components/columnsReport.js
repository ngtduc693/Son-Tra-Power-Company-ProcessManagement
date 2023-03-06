import {Link} from 'react-router-dom';
import {AgGridColumn} from 'ag-grid-react';
import {
  getDayOfTime,
  convertTimestampToDate,
  convertDateTimeToString,
  convertVnTimeStringToDate,
} from '../../../components/utils.js';
import '../../../assets/theme/styles.css';

export const COLUMNS = [
  {
    headerName: 'Đơn vị',
    field: 'DonVi',
    filter: true,
  },
  {
    headerName: 'Mã hồ sơ',
    field: 'MaHoSo',
    filter: true,
  },
  {
    headerName: 'Khách hàng',
    field: 'TenKhachHang',
    filter: true,
  },
  {
    headerName: 'CS đề nghị',
    field: 'CongSuatDeNghi',
    filter: true,
  },
  {
    headerName: 'Ngày đề nghị',
    field: 'NgayDeNghiDauNoi',
    filter: true,
  },
  {
    headerName: 'Ngày nộp đầy đủ',
    field: 'NgayNopHoSoDayDu',
    filter: true,
    cellClassRules: {
      'highlight-cell': (params) => {
        if (params.data.NgayNopHoSoDayDu && params.data.NgayDeNghiDauNoi) {
          const ngayNopHoSoDayDu = params.data.NgayNopHoSoDayDu;
          const ngayDeNghiDauNoi = params.data.NgayDeNghiDauNoi;
          return (
            getDayOfTime(
              convertVnTimeStringToDate(ngayNopHoSoDayDu),
              convertVnTimeStringToDate(ngayDeNghiDauNoi)
            ) > 1
          );
        }
      },
    },
  },
  {
    headerName: 'Ngày HS về PKT',
    field: 'NgayChuyenVePKT',
    filter: true,
    cellClassRules: {
      'highlight-cell': (params) => {
        if (params.data.NgayChuyenVePKT && params.data.NgayNopHoSoDayDu) {
          const firstDay = params.data.NgayChuyenVePKT;
          const nextDay = params.data.NgayNopHoSoDayDu;
          return (
            getDayOfTime(convertVnTimeStringToDate(firstDay), convertVnTimeStringToDate(nextDay)) >
            1
          );
        }
      },
    },
  },
  {
    headerName: 'Ngày thoả thuận',
    field: 'NgayChuyenHoSoThoaThuan',
    filter: true,
    cellClassRules: {
      'highlight-cell': (params) => {
        if (params.data.NgayChuyenHoSoThoaThuan && params.data.NgayChuyenVePKT) {
          const firstDay = params.data.NgayChuyenHoSoThoaThuan;
          const nextDay = params.data.NgayChuyenVePKT;
          return (
            getDayOfTime(convertVnTimeStringToDate(firstDay), convertVnTimeStringToDate(nextDay)) >
            1
          );
        }
      },
    },
  },
  {
    headerName: 'Ngày nhận thoả thuận',
    field: 'NgayNhanHoSoThoaThuan',
    filter: true,
    cellClassRules: {
      'highlight-cell': (params) => {
        if (params.data.NgayNhanHoSoThoaThuan && params.data.NgayChuyenHoSoThoaThuan) {
          const firstDay = params.data.NgayNhanHoSoThoaThuan;
          const nextDay = params.data.NgayChuyenHoSoThoaThuan;
          return (
            getDayOfTime(convertVnTimeStringToDate(firstDay), convertVnTimeStringToDate(nextDay)) >
            1
          );
        }
      },
    },
  },
  {
    headerName: 'Ngày đề nghị nghiệm thu',
    field: 'NgayDeNghiNghiemThu',
    filter: true,
  },
  {
    headerName: 'Ngày hoàn thành nghiệm thu',
    field: 'NgayHoanThanhNghiemThu',
    filter: true,
    cellClassRules: {
      'highlight-cell': (params) => {
        if (params.data.NgayHoanThanhNghiemThu && params.data.NgayDeNghiNghiemThu) {
          const firstDay = params.data.NgayHoanThanhNghiemThu;
          const nextDay = params.data.NgayDeNghiNghiemThu;
          return (
            getDayOfTime(convertVnTimeStringToDate(firstDay), convertVnTimeStringToDate(nextDay)) >
            1
          );
        }
      },
    },
  },
];
