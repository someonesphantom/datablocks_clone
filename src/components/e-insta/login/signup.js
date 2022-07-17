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
import './login.scss'

const theme = createTheme();

export default function Signup() {

    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [errorflag, seterrorflag] = useState(false);
    const [successflag, setsuccessflag] = useState(false);
    const navigate = useNavigate();


    const errorbox = () => {
        if (errorflag) {
            return (
                <Box noValidate className='dummy' >
                    <div className='dummy1'>
                        Please fill all fields!
                    </div>
                </Box>
            )
        }
    }

    const successbox = () => {
        if (successflag) {
            return (
                <Box noValidate className='dummy2'>
                    <div className='dummy1'>
                        User Successfully Registered! Please Proceed to Login
                    </div>
                </Box>
            )
        }
    }

    const signin = () => {
        if (email !== '' && pass !== '' && fname !== '' && lname !== '') {
            seterrorflag(false);
            let payload =
            {
                "email": email,
                "password": pass,
                "firstname": fname,
                "lastname": lname
            }
            axios.post(apiMapping.userData.postsignup, payload).then(response => {
                setemail('');
                setpass('');
                setfname('');
                setlname('');
                setsuccessflag(true);
            })
        }
        else {
            setsuccessflag(false);
            seterrorflag(true);
        }
    }

    return (
        <div className='dummy4'>
            <AppBar position="static"  className='dummy5' style={{ background: '#1A192B', height: "45px" }}>
                <Container className='cont' maxWidth="xl">
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

                        <Button color="inherit" className='buttons1' sx={{ fontSize: "11px", marginTop: "-15px", marginRight: "-10px" }} onClick={(e) => { navigate('/') }}>LOGIN</Button>
                        <Button color="inherit" className='buttons1' sx={{ fontSize: "11px", marginTop: "-15px", marginRight: "-10px" }} onClick={(e) => { navigate('/signup') }}>SIGN UP</Button>


                    </Toolbar>
                </Container>
            </AppBar>
            <ThemeProvider theme={theme} className="theme">
                <Container component="main" className='contain'>
                    <CssBaseline />
                    <Box
                        className='box1'
                    >

                        <Typography component="h1" variant="h5" className='typo'>
                            Create a datablocks account
                        </Typography>
                        <Box component="form" noValidate className='boxes'>
                            {errorbox()}
                            {successbox()}
                            <TextField
                                className='texts'
                                margin="normal"
                                fullWidth
                                size='small'
                                id="text"
                                label="First Name"
                                name="first name"
                                autoComplete="first name"
                                value={fname}
                                autoFocus
                                InputLabelProps={{
                                    style: { color: '#4A5568' },
                                }}
                                
                                inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
                                onChange={(e) => { setfname(e.target.value) }}
                            />
                            <TextField
                                className='texts'
                                margin="normal"
                                fullWidth
                                size='small'
                                id="text"
                                label="Last Name"
                                name="last name"
                                value={lname}
                                autoComplete="last name"
                                InputLabelProps={{
                                    style: { color: '#4A5568' },
                                }}
                                
                                inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
                                onChange={(e) => { setlname(e.target.value) }}
                            />
                            <TextField
                                className='texts'
                                margin="normal"
                                fullWidth
                                size='small'
                                id="email"
                                label="Email"
                                name="email"
                                value={email}
                                autoComplete="email"
                                InputLabelProps={{
                                    style: { color: '#4A5568' },
                                }}
                                
                                inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
                                onChange={(e) => { setemail(e.target.value) }}
                            />
                            <TextField
                                className='texts'
                                margin="normal"
                                fullWidth
                                size='small'
                                name="password"
                                label="Password"
                                type="password"
                                value={pass}
                                id="password"
                                InputLabelProps={{
                                    style: { color: '#4A5568' },
                                }}
                                inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
                                autoComplete="current-password"
                                onChange={(e) => { setpass(e.target.value) }}
                            />

                            <Typography component="h1" variant="h5" fontFamily='monospace' color='#f8f8f2' sx={{ fontWeight: 550, marginLeft: "-60%" }}>
                            </Typography>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className='buttons'
                                onClick={(e) => {
                                    e.preventDefault();
                                    signin();
                                }}
                            >
                                Sign up
                            </Button>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className='buttons'
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <span>Sign up with Github</span>
                            </Button>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Link2 href="/" variant="body2"  className='links'>
                                        Already have an account → <span style={{ fontWeight: 'bold', fontFamily: "IBM Plex Sans" }}>Login!</span>
                                    </Link2>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link2 href="#" variant="body2"  className='links'>
                                        New to datablocks? → <span style={{ fontWeight: 'bold', fontFamily: "IBM Plex Sans" }}>Try the demo</span>
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