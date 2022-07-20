import React, { useState, useRef, useEffect,useCallback,useContext } from 'react';
import  { Handle } from 'react-flow-renderer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import files from '../../resources/apiMapping.json';
import { UserContext, UserContextProvider } from '../context/usercontext';

const Stats = ({ data }) => {
     
    const {columns,setColumns,name,setName} = useContext(UserContext)
    const [stats, setStats] = useState();
    const[url,setUrl]=useState(null)
    const [x,setX]=useState("")
    const [y,setY]=useState("")

    const fetchStatsPlot = async () => {
        const response = await fetch(url)
        const c = await response.json()
        //setc(c.data)
        setStats(c)
      
    }
useEffect(()=>{
  
     setColumns(columns)
     setStats(stats)
     
    console.log("columnsinStats ",columns)
    console.log('Stats',stats)
    
},[columns,stats])

useEffect(()=>{
  setUrl('http://127.0.0.1:8000/stats/'+x+'/types/'+y+'/'+name)
  //setStats(stats)
  fetchStatsPlot();
  
},[x,y,url])

const xaxisChange = event => {
  if (event.target.value) {
     setX(event.target.value);
  }
};
const yaxisChange = event => {
  if (event.target.value) {
     setY(event.target.value);
  }
};
const types=['mean','median','mode']

  const card = (

    <React.Fragment>

      <CardContent sx={{ borderRadius: "10px !important", width: '100%', height: "100 vh", backgroundColor: "rgb(44,43,73)", padding:"10px 0px 0px 10px", borderpaddingBottom: "10px !important" }}>
      <left>
        <DragIndicatorOutlinedIcon sx={{ fontSize: "15px", position: "absolute", left: "5px", top: "6px", color: "white" }} />
        <Typography fontSize="12px" position="absolute" left="20px" top="6px" color="white">
          Stats
        </Typography>

      </left>
      <right>
        <ClearOutlinedIcon sx={{ fontSize: "15px", position: "absolute", right: "5px", top: "5px",color:"grey" }} />
        
      </right>
      
      <hr style={{borderColor:"#4C497E"}}></hr>
      <Typography align="left" fontFamily='"IBM Plex Sans", system-ui, sans-serif' fontSize={12} minWidth={100} color="white">
          Column 
          <select onChange={(event)=>{xaxisChange(event)}} style={{marginLeft:5, paddingRight:24,paddingLeft:6,fontFamily:'inherit' ,width:150,height:30,background:"inherit",color:"inherit" }} >
    <option style={{backgroundColor:"#4c497e"}} value={x} />
    {columns.map((allColumns,index) => {
      return <option style={{backgroundColor:"#4c497e"}} key={index} value={allColumns}>{allColumns}</option>;
    })}
  </select>
  </Typography>
  <br></br>
  <Typography align="left" fontFamily='"IBM Plex Sans", system-ui, sans-serif'  fontSize={12} minWidth={100} color="white">
          Stats 
          <select onChange={(event)=>{yaxisChange(event)}} style={{marginLeft:5, paddingRight:24,paddingLeft:6,fontFamily:'inherit' ,width:150,height:30,background:"inherit",color:"inherit" }} >
    <option style={{backgroundColor:"#4c497e"}} value=""/>
    {types.map((type,index)=>{
        return <option style={{backgroundColor:"#4c497e"}} value={type} key={index}>{type}</option>;
    })}
    
  </select>
  </Typography>
{/* <img style={{width:'90%',height:'100%',objectfit:'cover',margin:'1rem'}} src={Stats} alt="Stats"/> */}
<div>{JSON.stringify(stats)}</div>
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

export default Stats;