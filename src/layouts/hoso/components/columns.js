export const COLUMNS = [
    {
        Header: 'Mã hồ sơ',
        accessor: 'MaHoSo',
    },
    {
        Header: 'Ngày đề nghị',
        accessor: 'NgayDeNghiDauNoi',
        filterable: true
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
    // {
    //     Header: 'Ngày nhận thoả thuận',
    //     accessor: 'NgayNhanHoSoThoaThuan',
    // },
    {
        Header: 'Tệp đính kèm',
        accessor: 'TepDinhKemLucTaoHoSo',
    },{

        Header: 'Bước tiếp',
        accessor: 'BuocTiep',
    },
];
export const HIDDEN_COLUMNS = ["id"]