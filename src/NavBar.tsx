import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AccountCircle, Calculate } from "@mui/icons-material";
import { theme } from "./components/theme/theme";
import { getRoute, NAVBAR_PAGES } from "./AppRoutes";
import { HEX_BOARD_MIN_WIDTH } from "domains/TrapTheCat/TrapTheCat";
import styled from "@emotion/styled";
import { PATHS } from "shared/helpers/paths";
import { useAuth } from "domains/Auth/useAuth";
import { Stack } from "@mui/material";
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const SettingsIconButton = styled(IconButton)<{}>({
  color: theme.colors.background,
  //backgroundColor: theme.colors.primary,
  ":hover": {},
});

export const NAVBAR_HEIGHT_MOBILE = "64px";
const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Makes hex board width the same as the app bar, in case they're on trap the cat
  const location = useLocation();
  const isPlayingTrapTheCat = location.pathname === "/trapthecat";
  const navigate = useNavigate();

  const { session } = useAuth();

  const showLogin = false;
  const showSettings = false;
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{
        backgroundColor: theme.colors.primary,
        color: theme.colors.background,
        minWidth: isPlayingTrapTheCat ? HEX_BOARD_MIN_WIDTH : undefined,
        flexWrap: "nowrap",
      }}
    >
      <Container maxWidth="xl" disableGutters>
        {/** Mobile toolbar */}
        <Toolbar
          disableGutters
          sx={{
            display: { md: "none", xs: "flex" },
            justifyContent: "space-between",
            width: "100%",
            height: NAVBAR_HEIGHT_MOBILE,
          }}
        >
          <IconButton
            size="large"
            aria-label="navbar"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: "block",
            }}
          >
            {NAVBAR_PAGES.map((page) => {
              if (page.isHidden) return null;
              const route = page.route || getRoute(page.label);
              return (
                <MenuItem key={route} onClick={handleCloseNavMenu}>
                  <Link
                    to={"/" + route}
                    style={{
                      textDecoration: "none",
                      color: theme.colors.textPrimary,
                    }}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </Link>
                </MenuItem>
              );
            })}
          </Menu>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <Calculate />
          </Typography> */}

          <Box>
            <b>solvers</b>
          </Box>

          <IconButton
            size="large"
            aria-label="navbar"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            //onClick={handleOpenNavMenu}
            color="inherit"
          >
            <Calculate />
          </IconButton>
        </Toolbar>
        {/** Desktop toolbar */}
        <Toolbar sx={{ display: { xs: "none", md: "flex" } }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Calculate />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {NAVBAR_PAGES.map((page) => {
              if (page.isHidden) return null;
              const route = page.route || getRoute(page.label);
              return (
                <Link
                  key={route}
                  to={"/" + route}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    key={route}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: theme.colors.background,
                      display: "block",
                    }}
                  >
                    {page.label}
                  </Button>
                </Link>
              );
            })}
          </Box>
          {showLogin && (
            //This is the profile button - not working yet
            <Box sx={{ flexGrow: 0 }}>
              {/* <Tooltip title="Open profile"> */}
              <SettingsIconButton onClick={() => navigate(PATHS.login)}>
                <Stack direction="column">
                  <AccountCircle fontSize="large" />
                  <div style={{ fontSize: "10px" }}>{`${
                    session?.user?.email ? "Logged in!" : "Log in"
                  }`}</div>
                </Stack>
              </SettingsIconButton>
              {/* </Tooltip> */}
            </Box>
          )}
          {/* not showing settings for now */}
          {showSettings && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
