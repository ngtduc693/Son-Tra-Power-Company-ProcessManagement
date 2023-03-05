import {useEffect} from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Icon from '@mui/material/Icon';
import MDBox from 'components/MDBox';
import Configurator from 'examples/Configurator';
import theme from 'assets/theme';
import themeDark from 'assets/theme-dark';
import routes from 'routes';
import {useMaterialUIController, setOpenConfigurator} from 'context';
import SignIn from 'layouts/authentication/sign-in';
import {useAuthUser, useSignIn, useSignOut} from 'react-auth-kit';
import {rolePermissionRule} from 'layouts/authentication/sign-in/rolePermissionRule';

export default function App() {
  const user = useAuthUser()();
  const signIn = useSignIn();
  const [controller, dispatch] = useMaterialUIController();
  const {direction, layout, openConfigurator, darkMode} = controller;
  const {pathname} = useLocation();
  const signOut = useSignOut();

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    if (user) {
      signIn({
        token: Math.random(),
        expiresIn: 1000000,
        tokenType: 'Bearer',
        authState: {
          ...user,
        },
        refreshToken: 'refreshToken',
      });
    }
  }, []);

  useEffect(() => {
    function checkUserData() {
      const item = localStorage.getItem('_auth_state');
      if (JSON.stringify(user) !== JSON.stringify(item)) signOut();
    }

    window.addEventListener('storage', checkUserData);

    return () => {
      window.removeEventListener('storage', checkUserData);
    };
  }, []);

  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.isPrivate) {
        if (user) {
          if (route.isCheckRole) {
            if (user && !rolePermissionRule(user.role, route.key))
              return <Route path="/dangnhap" element={<SignIn />} />;
          }
          if (route.route) {
            return <Route exact path={route.route} element={route.component} key={route.key} />;
          }
          
          return null;
        }
        return <Route path="/dangnhap" element={<SignIn />} />;
      }
      return <Route exact path={route.route} element={route.component} key={route.key} />;
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
      sx={{cursor: 'pointer'}}
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
      {layout === 'dashboard' && (
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
      {layout === 'vr' && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dangnhap" />} />
      </Routes>
    </ThemeProvider>
  );
}
