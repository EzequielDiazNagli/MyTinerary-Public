import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import logo from "../assets/logo.png"
import logo2 from "../assets/logo2.png"
import {Link as LinkRouter} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

import userActions from "../redux/actions/userActions";

const pages = [
  {
    name: 'Home',
    to: "/"
  },
  {
    name: 'Cities',
    to: "/Cities"
  }];

const settings = [
  {
    name: 'Log in',
    to: "/LogIn"
  },
  {
    name: 'Sign Up',
    to: "/SignUp"
  }];

  // const profile = [
  //   {
  //     name: "Account",
  //     to: "/"
  //   },
  //   {
  //     name: "Sign Out",
  //     to: "/"
  //   }
  // ]

  
const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch()

  const userState = useSelector(store => store.userReducer.user)
  // console.log(userState)

  function signOutClick() {
    dispatch(userActions.signOut(userState))
}

  return (
    <AppBar position="static" sx={{backgroundColor:"#264653"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            // component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',    
              textDecoration: 'none',
            }}
          >
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src={logo2} alt="Imagen logo" style={{ width: "80px" }} />
          </Box>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton className='btn-mobile'
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <LinkRouter className='navLink'
                to={page.to}
                key={page.name}
                onClick={handleCloseNavMenu}
                >
                <MenuItem>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
                </LinkRouter>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            // component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Box sx={{ display: { xs: 'flex', md: 'none' }}}>
              <img src={logo2} alt="Imagen logo" style={{ width: "80px" }} />
            </Box>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <LinkRouter className='navLink'
                to={page.to}
                key={page.name}
                onClick={handleCloseNavMenu}
              >
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                {page.name}
              </Button>
              </LinkRouter>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userState ?
                <Avatar alt="Remy Sharp" src={userState.photo} />
                :
                <Avatar src="/broken-image.jpg" />
                }
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userState !== null ?
              <Box>
                <MenuItem>
                  <Typography textAlign="center">Account</Typography>
                </MenuItem>
                <LinkRouter className='navLink' 
                to={"/"}
                onClick={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Typography onClick={signOutClick} textAlign="center">Sign Out</Typography>
                  </MenuItem>
                </LinkRouter>
                </Box>
                :
                settings.map((setting) => (
                  <LinkRouter className='navLink'
                  to={setting.to}
                  key={setting.name}
                  onClick={handleCloseUserMenu}>
                  <MenuItem>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                  </LinkRouter>
                ))
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;