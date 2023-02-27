import HoSo from "layouts/hoso";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import SignIn from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";
import { ChuyenHoSoSangDienLuc } from "layouts/hoso";
import { Thoa } from "layouts/hoso";
import { ThoaThuanDauNoi } from "layouts/hoso";
import HoSoReport from "layouts/hoso/indexReport";

const routes = [
  {
    type: "collapse",
    name: "Quản lý hồ sơ",
    title: "Quản lý hồ sơ",
    key: "quanlyhoso",
    icon: <Icon fontSize="small">post_add</Icon>,
    route: "/quanlyhoso",
    component: <HoSo />
  },
  {
    type: "collapse",
    name: "Báo cáo hồ sơ",
    key: "baocaohoso",
    icon: <Icon fontSize="small">content_paste_go</Icon>,
    route: "/baocaohoso",
    component: <HoSoReport />
  }
];

export default routes;
