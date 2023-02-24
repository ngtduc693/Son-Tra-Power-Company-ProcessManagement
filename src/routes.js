import HoSo from "layouts/hoso";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import SignIn from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";
import { ChuyenHoSoSangDienLuc } from "layouts/hoso";
import { Thoa } from "layouts/hoso";
import { ThoaThuanDauNoi } from "layouts/hoso";

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
    name: "Chuyển hồ sơ",
    key: "chuyenhoso",
    icon: <Icon fontSize="small">content_paste_go</Icon>,
    route: "/chuyenhoso",
    component: <ChuyenHoSoSangDienLuc />
  },
  {
    type: "collapse",
    name: "Thoả thuận đấu nối",
    key: "thoathuandaunoi",
    icon: <Icon fontSize="small">gavel</Icon>,
    route: "/thoathuandaunoi",
    component: <ThoaThuanDauNoi />,
  },
  {
    type: "collapse",
    name: "Kiểm tra hồ sơ",
    key: "kiemtrahoso",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/kiemtrahoso",
    component: <Billing />,
  },
];

export default routes;
