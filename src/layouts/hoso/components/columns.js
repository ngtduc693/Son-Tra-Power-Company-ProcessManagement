export const COLUMNS = [
    {
        Header: 'Đơn vị',
        accessor: 'DonVi',
    },
    {
        Header: 'Mã hồ sơ',
        accessor: 'MaHoSo',
    },
    {
        Header: 'Khách hàng',
        accessor: 'TenKhachHang',
    },
    {
        Header: 'CS đề nghị',
        accessor: 'CongSuatDeNghi',
        filterable: true
    },
    {
        Header: 'Ngày đề nghị',
        accessor: 'NgayDeNghiDauNoi',
        filterable: true
    },
    {
        Header: 'Ngày nộp đầy đủ',
        accessor: 'NgayNopHoSoDayDu',
        filterable: true
    },
    {
        Header: 'Ngày HS về PKT',
        accessor: 'NgayChuyenVePKT',
        filterable: true
    },
    {
        Header: 'Ngày thoả thuận',
        accessor: 'NgayChuyenHoSoThoaThuan',
        filterable: true
    },
    {
        Header: 'Ngày nhận thoả thuận',
        accessor: 'NgayNhanHoSoThoaThuan',
    },
    {
        Header: 'Ngày đề nghị nghiệm thu',
        accessor: 'NgayDeNghiNghiemThu',
    },
    {
        Header: 'Ngày hoàn thành nghiệm thu',
        accessor: 'NgayHoanThanhNghiemThu',
    },
    {
        Header: 'Tệp đính kèm',
        accessor: 'TepDinhKemLucTaoHoSo',
    },
    {

        Header: 'Hành động',
        accessor: 'BuocTiep',
    },
];
export const HIDE_COLUMNS = ["Tep", "Ma", "TaoBoi", "NgayTao"]