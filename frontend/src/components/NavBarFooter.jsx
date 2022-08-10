import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Link as LinkRouter} from "react-router-dom"

const pages = [
  {
    name: 'Home',
    to: "/"
  },
  {
    name: 'Cities',
    to: "/Cities"
  }];


const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{boxShadow:'none', backgroundColor:"transparent"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            {pages.map((page) => (
              <LinkRouter className='navLink-footer'
                to={page.to}
                key={page.name}
                onClick={handleCloseNavMenu}
              >
              <Button className='navLink-footer' sx={{ my: 0, padding: 0}}>
                {page.name}
              </Button>
              </LinkRouter>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;