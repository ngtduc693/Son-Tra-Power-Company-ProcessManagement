import { useState, useEffect } from "react";

import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import Configurator from "examples/Configurator";

import theme from "assets/theme";

import themeDark from "assets/theme-dark";

import routes from "routes";

import {
  useMaterialUIController,
  setOpenConfigurator,
} from "context";
import SignIn from "layouts/authentication/sign-in";

export default function App() {
  const history = useNavigate();
  const [controller, dispatch] = useMaterialUIController();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      if (window.history.state && window.history.state.idx > 0) {
        history(-1);
      } else {
        history("/quanlyhoso", { replace: true });
      }
    }
  }, [isLoggedIn]);
  const {
    direction,
    layout,
    openConfigurator,
    darkMode,
  } = controller;
  const { pathname } = useLocation();

  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.isPrivate) {
        if (isLoggedIn) {
          if (route.collapse) {
            return getRoutes(route.collapse);
          }

          if (route.route) {
            return (
              <Route
                exact
                path={route.route}
                element={route.component}
                key={route.key}
              />
            );
          }

          return null;
        }
        return (
          <Route
                exact
                path={route.route}
                element={route.component}
                key={route.key}
              />
          // <Route
          //   path="/dangnhap"
          //   element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
          // />
        );
      }
      return (
        <Route
          exact
          path={route.route}
          element={route.component}
          key={route.key}
        />
      );
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          {/* <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="ĐL Sơn Trà"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            width="0%"
          /> */}
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dangnhap" />} />
      </Routes>
    </ThemeProvider>
  );
}
