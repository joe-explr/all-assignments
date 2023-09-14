import * as React from 'react';
import {AppBar,Box,Toolbar,IconButton,Typography,Menu,Container,Avatar,Button,Tooltip, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import useStorage from './useStorage';
import axios from 'axios';

const pages = [['Home','/'], ['About Us','/about'], ['Courses','/courses'],['Create Courses','/create']];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {

  const [token,setToken] = useStorage("token")
  const [username,setUsername] = React.useState('')
  let navigate=useNavigate()
  const login= ()=>{
      navigate('/login')
  }

  React.useEffect(()=>{

    let qusr= async () => {
      try {
       let user=await axios.get('http://localhost:3000/admin/me',{
       headers:{
          "Authorization": "Bearer " + token,
       }
    })

    setUsername(user.data)
  }catch(errors){
    console.error(errors);
  }
 }
 if(token!='0'){
  qusr()
 }else{
  navigate('/login')
 }
  },[token])

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
  const theme = createTheme({
    palette: {
      primary:{
        main: "#121212"
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
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
            LOGOS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                <NavLink to={page[1]} > <Typography textAlign="center">{page[0]}</Typography></NavLink> 
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
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
            LOGOS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            {pages.map((page) => (
              <Button
                variant='text'
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2,mx:2, color: 'white', display: 'block' }}
              >
                <NavLink 
                to={page[1]} 
                className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""}
                style={({ isActive, isPending }) => {
                  return {
                    textDecoration: "none",
                    fontWeight: isActive ? "bold" : "",
                    color:"aliceblue"
                  };
                }}>
                  {page[0]}
                </NavLink> 
              </Button>
            ))}
          </Box>
         {!username ?
         <Box sx={{ flexGrow: 0 }}>
          <Button 
          variant='filled'
          onClick={login}>
            LOGIN
          </Button>
          <Button 
          variant='filled'
          onClick={()=>navigate('/register')}>
            SIGN UP
          </Button>
         </Box>:
          <Box sx={{ flexGrow: 0 ,display:"flex"}}>
            <Typography
            variant='h6'
            gutterBottom
            marginRight={"1rem"}>
              {username}
            </Typography>
            <Button 
              variant='filled'
              onClick={()=>{setToken('0');setUsername('')}}>
            LogOut
          </Button>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/image.jpeg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}
export default NavBar;