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
import { Link, useLocation } from "react-router-dom";
import { Calculate } from "@mui/icons-material";
import { theme } from "./components/theme/theme";
import { getRoute, NAVBAR_PAGES } from "./AppRoutes";
import { HEX_BOARD_MIN_WIDTH } from "domains/TrapTheCat/TrapTheCat";
const settings = ["Profile", "Account", "Dashboard", "Logout"];

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

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{
        backgroundColor: theme.colors.primary,
        color: theme.colors.background,
        minWidth: isPlayingTrapTheCat ? HEX_BOARD_MIN_WIDTH : undefined,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Calculate />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
                display: { xs: "block", md: "none" },
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
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
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
          {/* not showing settings for now */}
          {false && (
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
