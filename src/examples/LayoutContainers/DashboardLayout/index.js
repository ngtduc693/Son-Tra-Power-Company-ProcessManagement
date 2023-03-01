import { useEffect } from "react";

import { useLocation } from "react-router-dom";

import PropTypes from "prop-types";

import MDBox from "components/MDBox";

import { useMaterialUIController, setLayout } from "context";
import bgImage from "../../../assets/images/bg-profile.jpeg";

function DashboardLayout({ children }) {
  const [controller, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
    >
      <MDBox
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          p: 3,
          position: "relative",
          zIndex: 0,
          [breakpoints.up("xl")]: {
            marginLeft: 5,
            marginRight: 5,
            transition: transitions.create(["margin-left", "margin-right"], {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.standard,
            }),
          },
        })}
      >
        {children}
      </MDBox>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
