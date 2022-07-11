import React, { useState, useRef, useCallback, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link2 from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../../resources/logo.png';
import apiMapping from '../../resources/apiMapping.json';
import axios from 'axios';
import { Link } from "react-router-dom";
import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';



const theme = createTheme();

export default function Login() {

  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [errorflag, seterrorflag] = useState(false);
  const navigate = useNavigate();


  const errorbox = () => {
    if (errorflag) {
      return (
        <Box noValidate bgcolor="#ff0072" fontFamily='sans-serif' fontSize='12px' sx={{ mt: 1, marginLeft: '0.1%', fontWeight: 700, height: "40px" }} color='#f8f8f2'>
          <div style={{ marginLeft: "14px", marginTop: "10px", position: "absolute" }}>
            Error: Incorrect "Email" or "Password"
          </div>
        </Box>
      )
    }
  }

  const signin = () => {
    let payload =
    {
      "email": email,
      "password": pass
    }
    axios.post(apiMapping.userData.postlogin, payload).then(response => {
      seterrorflag(false);
      if (response.data.email == undefined) {
        seterrorflag(true);
      }
      else {
        navigate('/home');
      }
    })
      .catch((error) => {
        if (error.code == "ERR_BAD_RESPONSE") {
          seterrorflag(true);
        }
        // console.log("the error: ", error)
      })
  }

  return (
    <div style={{ background: '#1A202C', height: '100vh' }}>
      <AppBar position="static" style={{ background: '#1A192B', height: "45px" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={logo} alt="My logo" width="40" height="50" style={{ marginTop: "-15px", marginLeft: "-15px" }} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: '10vw', hright: '10vh' }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'sans-serif',
                fontWeight: 550,
                fontSize: "14px",
                letterSpacing: '.0rem',
                color: 'rgb(238, 240, 242)',
                textDecoration: 'none',
                marginTop: "-15px"
              }}
            >
              datablocks
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

            </Typography>

            <Button color="inherit" sx={{ fontSize: "11px", marginTop: "-15px", marginRight: "-10px" }} onClick={(e) => { navigate('/') }}>LOGIN</Button>
            <Button color="inherit" sx={{ fontSize: "11px", marginTop: "-15px", marginRight: "-10px" }} onClick={(e) => { navigate('/signup') }}>SIGN UP</Button>


          </Toolbar>
        </Container>
      </AppBar>
      <ThemeProvider theme={theme} style={{ height: "60%" }}>
        <Container component="main" style={{ width: "50%" }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Typography component="h1" variant="h5" fontFamily='monospace' color='#f8f8f2' sx={{ fontWeight: 550, marginLeft: "-60%" }}>
              Login to datablocks
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1, marginLeft: '0.4%' }} color='#f8f8f2'>
              {errorbox()}
              <TextField
                margin="normal"
                fullWidth
                size='small'
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{
                  style: { color: '#4A5568' },
                }}
                sx={{ border: '1px solid #4A5568', borderRadius: "6px" }}
                inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
                onChange={(e) => { setemail(e.target.value) }}
              />
              <TextField
                margin="normal"
                fullWidth
                size='small'
                name="password"
                label="Password"
                type="password"
                id="password"
                InputLabelProps={{
                  style: { color: '#4A5568' },
                }}
                inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
                sx={{ border: '1px solid #4A5568', borderRadius: "6px" }}
                autoComplete="current-password"
                onChange={(e) => { setpass(e.target.value) }}
              />

              <Typography component="h1" variant="h5" fontFamily='monospace' color='#f8f8f2' sx={{ fontWeight: 550, marginLeft: "-60%" }}>
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ textTransform: 'none' }}
                sx={{
                  mt: 0, mb: 0, background: 'rgba(255, 255, 255, 0.08)', ':hover': {
                    bgcolor: '#4c497e',
                    color: 'white',
                  },
                  fontFamily: 'monospace'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  signin();
                }}
              >
                Login
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ textTransform: 'none' }}
                sx={{
                  mt: 1, mb: 0, background: 'rgba(255, 255, 255, 0.08)', ':hover': {
                    bgcolor: '#4c497e',
                    color: 'white',
                  },
                  fontFamily: 'monospace'
                }}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <span>Login with Github</span>
              </Button>
              <Grid container>
                <Grid item xs={12}>
                  <Link2 href="#" variant="body2" style={{ textDecoration: 'none' }} sx={{
                    color: '#f8f8f2', ':hover': {
                      color: '#53606C',
                    }
                  }}>
                    Forgot your password → <span style={{ fontWeight: 'bold' }}>Password reset</span>
                  </Link2>
                </Grid>
                <Grid item xs={12}>
                  <Link2 href="/signup" variant="body2" style={{ textDecoration: 'none' }} sx={{
                    color: '#f8f8f2', ':hover': {
                      color: '#53606C',
                    }
                  }}>
                    No account yet → <span style={{ fontWeight: 'bold' }}>Sign up</span>
                  </Link2>
                </Grid>
                <Grid item xs={12}>
                  <Link2 href="#" variant="body2" style={{ textDecoration: 'none' }} sx={{
                    color: '#f8f8f2', ':hover': {
                      color: '#53606C',
                    }
                  }}>
                    New to datablocks? → <span style={{ fontWeight: 'bold' }}>Try the demo</span>
                  </Link2>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}