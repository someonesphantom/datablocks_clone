import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { Handle } from 'react-flow-renderer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import TextField from '@mui/material/TextField';
import files from '../../resources/apiMapping.json';
import { UserContext, UserContextProvider } from '../context/usercontext';

const Slice = ({ data }) => {

  const { firstrow, setfirstrow, lastrow, setlastrow, slice, setslice, name, setName } = useContext(UserContext)
  const [url, seturl] = useState(null)
  const [showdata, setShowdata] = useState(false)

  useEffect(() => {
    setfirstrow(firstrow)
    setlastrow(lastrow)
    console.log("firstrowinlastrow ", firstrow)
    console.log('lastrow', lastrow)
    seturl('http://127.0.0.1:8000/slice/' + firstrow + '/lastrow/' + lastrow + '/name/' + name)
    try {
      fetchslice()
    }
    catch (error) {
      console.error(error);
    }
  }, [firstrow, lastrow, url])
  const handleChange = (e) => {
    setfirstrow(e.target.value)

  }
  const handleChange1 = (e) => {
    setlastrow(e.target.value)

  }
  const fetchslice = async () => {
    const response = await fetch(url)
    const c = await response.json()
    //setc(c.data)
    setslice(c)
    // console.log("colsfetch",firstrow)
  }
  const card = (

    <React.Fragment>

      <CardContent sx={{ borderRadius: "10px !important", width: '100%', height: "100 vh", backgroundColor: "rgb(44,43,73)", padding: "10px 0px 0px 10px", borderpaddingBottom: "10px !important" }}>
        <left>
          <DragIndicatorOutlinedIcon sx={{ fontSize: "15px", position: "absolute", left: "5px", top: "6px", color: "white" }} />
          <Typography fontSize="12px" position="absolute" left="20px" top="6px" color="white">
            Slice
          </Typography>

        </left>
        <right>
          <ClearOutlinedIcon sx={{ fontSize: "15px", position: "absolute", right: "5px", top: "5px", color: "grey" }} />

        </right>

        <hr style={{ borderColor: "#4C497E" }}></hr>
        <Typography align="left" fontFamily='"IBM Plex Sans", system-ui, sans-serif' fontSize={12} minWidth={100} color="white">
          From Index:

          <TextField id="outlined-basic" label="Outlined" variant="outlined" value={firstrow} onChange={(event) => { handleChange(event) }} />
        </Typography>
        <br></br>
        <Typography align="left" fontFamily='"IBM Plex Sans", system-ui, sans-serif' fontSize={12} minWidth={100} color="white">
          To Index:

          <TextField style={{ color: 'white' }} id="outlined-basic" label="Outlined" variant="outlined" value={lastrow} onChange={(event) => { handleChange1(event) }} />
        </Typography>
        <Button variant='contained' style={{ color: 'white' }} onClick={() => { if (showdata === true) { setShowdata(false) } else { setShowdata(true) } }} >Show Data</Button>
        {showdata === true ? (<div style={{ color: 'white' }}>{slice}</div>) : (console.log())}
        {console.log('slice', slice)}

      </CardContent>
    </React.Fragment>
  );

  // console.log(data)
  return (
    <>
      <UserContextProvider >
        <Handle
          type="target"
          position="left"
          id="a"
          style={{
            backgroundColor: 'rgb(64, 63, 105)', border: "1px solid #fff",
            borderRadius: "10px 0px 0px 10px",
            height: "100%",
            position: "absolute",
            width: "19px", left: '-20px'
          }}
          isConnectable={true}
        />
        <Box sx={{
          maxwidth: 275,
          fontSize: "60%",
          borderRadius: "10px !important",
          maxHeight: "50%",
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          }
        }}>
          <Card sx={{ borderRadius: "0px 0px 0px 0px !important", width: 200, height: "100 vh", backgroundColor: "rgb(44,43,73)", padding: "10px", borderpaddingBottom: "10px !important" }} variant="outlined">
            {card}
          </Card>


        </Box>

        <Handle
          type="source"
          position="right"
          id="a"
          style={{
            backgroundColor: 'rgb(64, 63, 105)', border: "1px solid #fff",
            borderRadius: "0px 10px 10px 0px",
            height: "100%",
            position: "absolute",
            width: "19px", right: '-20px'
          }}
          isConnectable={true}
        />
      </UserContextProvider>
    </>
  );
}

export default Slice;