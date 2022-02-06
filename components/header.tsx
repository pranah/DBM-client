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
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import AccountCircle from "@mui/icons-material/AccountCircle";

const settings = ["Logout"];
const pages = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Publish",
    url: "/publish",
  },
  {
    name: "My Books",
    url: "/my-books",
  },
  {
    name: "Used Books",
    url: "/used-books",
  },
  {
    name: "Rent a Book",
    url: "/rented-books",
  },
];

const Header = () => {
  const router = useRouter();
  const { authenticate, isAuthenticated, logout, user } = useMoralis();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (url) => {
    setAnchorElNav(null);

    if (url) {
      router.push(url);
    }
  };

  const handleNavigation = (url) => {
    if (url) {
      router.push(url);
    }
  };

  const handleCloseUserMenu = (url) => {
    setAnchorElUser(null);
    if (url === "Login") {
      authenticate();
    } else if (url === "Logout") {
      logout();
    }
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        {/* <nav className="border-b p-6">
          <p className="text-4xl font-bold">Metaverse Marketplace</p>
          <div className="flex mt-4">
            <Link href="/">
              <a className="mr-4 text-pink-500">Home</a>
            </Link>
            <Link href="/create-item">
              <a className="mr-6 text-pink-500">Sell Books</a>
            </Link>
            <Link href="/my-assets">
              <a className="mr-6 text-pink-500">My Books</a>
            </Link>
            <Link href="/creator-dashboard">
              <a className="mr-6 text-pink-500">Publishers Dashboard</a>
            </Link>
          </div>
        </nav> */}
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Pranah
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
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={async () => {
                    handleCloseNavMenu(page.url);
                  }}
                  selected={router.pathname === page.url}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ ml: 2, flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={async () => {
                  handleNavigation(page.url);
                }}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  borderRadius: 0,
                  borderBottom:
                    router.pathname === page.url
                      ? "1px solid white"
                      : undefined,
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {!isAuthenticated && (
            <Button onClick={() => authenticate()} color="inherit">
              Login
            </Button>
          )}
          {isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  color="inherit"
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <AccountCircle />
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
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
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
export default Header;
