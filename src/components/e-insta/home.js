import React, { useState, useRef, useCallback, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Flows from './flows';
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
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import logo from '../resources/logo.png'
import { useNavigate } from "react-router-dom";
import FlowContext from './flowcontext';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{ fontColor: "white" }}
    >
      {value === index && (
        <Box sx={{ p: 3, color: 'rgba(0, 0, 0, 0.85)', }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function Home() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [flowsvalue, setflowsvalue] = useState([]);
  const flowdata = {
    flowname: flowsvalue,
    setflowsvalue
  };

  return (
    <FlowContext.Provider value={flowdata}>
      <Box style={{ backgroundColor: "#1A202C", height: '100%', minHeight: "100vh" }}>
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

              <Button
                color="inherit" sx={{ fontSize: "11px", marginTop: "-15px", marginRight: "-10px" }}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/';
                }}
              >LOGOUT</Button>

            </Toolbar>
          </Container>
        </AppBar>
        <Box sx={{
          width: '80%',
          marginLeft: '9%',
          marginTop: '2%'
        }}>
          <Box sx={{ color: "white", borderBottom: 1, borderColor: 'divider', marginLeft: '1.1%' }}>
            <Tabs textColor="white" value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{ style: { backgroundColor: "white", width: "60px", marginLeft: "1.25%" } }}>
              <Tab label="Flows" {...a11yProps(0)} style={{ maxWidth: "2%" }} />
              <Tab label="Account" {...a11yProps(1)} style={{ maxWidth: "2%" }} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} style={{ marginTop: "-1.5%" }}>
            <Flows />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box
              sx={{
                marginTop: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5" color="white" sx={{ fontSize: '15px', fontWeight: 700, marginLeft: "-88.3%", marginTop: "-6%" }} >
                Change Password
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1, color: "white", fontWeight: 300, fontSize: '10px', marginLeft: "-29%" }}>
                &nbsp;Old Password*
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label=""
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size='small'
                  InputLabelProps={{ style: { color: '#4A5568' } }}
                  sx={{ border: '1px solid #4A5568', borderRadius: "6px" }}
                  inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
                  style={{ marginTop: "8px" }}
                />
                &nbsp;New Password*
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label=""
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size='small'
                  InputLabelProps={{ style: { color: '#4A5568' } }}
                  sx={{ border: '1px solid #4A5568', borderRadius: "6px" }}
                  inputProps={{ style: { fontFamily: 'nunito', color: 'white' } }}
                  style={{ marginTop: "8px" }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{ textTransform: 'none', height: "40px", width: "160px" }}
                  sx={{
                    mt: 0, mb: 0, background: 'rgba(255, 255, 255, 0.08)', ':hover': {
                      bgcolor: '#6866AC',
                      color: 'white',
                    },
                    fontWeight: 700,
                    fontFamily: 'Polaris'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/home';
                  }}
                >
                  Change Password
                </Button>
              </Box>
            </Box>
            <Box component="form" noValidate sx={{ mt: 1, color: "white", fontWeight: 700, fontSize: '15px', position: "relative", marginTop: "25px", marginLeft: "-0.5%" }}>
              Delete User
            </Box>
            <Box component="form" noValidate sx={{ mt: 1, color: "white", fontWeight: 300, fontSize: '10px', position: "relative", marginTop: "7px", marginLeft: "-0.5%" }}>
              When you delete your user all connected data will be removed from our servers.
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ textTransform: 'none', height: "40px", width: "160px", marginTop: "10px", marginLeft: "-0.5%" }}
              sx={{
                mt: 0, mb: 0, background: 'rgba(255, 255, 255, 0.08)', ':hover': {
                  bgcolor: '#6866AC',
                  color: 'white',
                },
                fontWeight: 700,
                fontFamily: 'Polaris'
              }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/home';
              }}
            >
              Delete my user data
            </Button>
          </TabPanel>

        </Box>
      </Box>
    </FlowContext.Provider>

  );
}