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

const Scatter = ({ data }) => {
     
    const {columns,setColumns,name,setName} = useContext(UserContext)
    const [scatter, setScatter] = useState(null);
    const[url,setUrl]=useState(null)
    const [x,setX]=useState(null)
    const [y,setY]=useState(null)

    const fetchScatterPlot = async () => {
      const response = await fetch(url)
      console.log('response',response)
      const imageBlob = await response.blob()
      const imageObjectURL = URL.createObjectURL(imageBlob);
      console.log('imageurl',imageObjectURL);
      //setScatterplot(scatterplot.data)
      setScatter(imageObjectURL)
      // console.log("colsfetch",columns)
      
    }
useEffect(()=>{
  
     setColumns(columns)
     setScatter(scatter)
     
    console.log("columnsinscatter ",columns)
    console.log('scatter',scatter)
    
},[columns,scatter])

useEffect(()=>{
  
    setUrl('http://127.0.0.1:8000/scatter/'+x+'/y/'+y+'/'+name)
    fetchScatterPlot();
  
  
  
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

  const card = (

    <React.Fragment>

      <CardContent sx={{ borderRadius: "10px !important", width: '100%', height: "100 vh", backgroundColor: "rgb(44,43,73)", padding:"10px 0px 0px 10px", borderpaddingBottom: "10px !important" }}>
      <left>
        <DragIndicatorOutlinedIcon sx={{ fontSize: "15px", position: "absolute", left: "5px", top: "6px", color: "white" }} />
        <Typography fontSize="12px" position="absolute" left="20px" top="6px" color="white">
          Scatterplot
        </Typography>

      </left>
      <right>
        <ClearOutlinedIcon sx={{ fontSize: "15px", position: "absolute", right: "5px", top: "5px",color:"grey" }} />
        
      </right>
      
      <hr style={{borderColor:"#4C497E"}}></hr>
      <Typography align="left" fontFamily='"IBM Plex Sans", system-ui, sans-serif' fontSize={12} minWidth={100} color="white">
          x-axis 
          <select onChange={(event)=>{xaxisChange(event)}} style={{marginLeft:5, paddingRight:24,paddingLeft:6,fontFamily:'inherit' ,width:150,height:30,background:"inherit",color:"inherit" }} >
    <option style={{backgroundColor:"#4c497e"}} value={x} />
    {columns.map((allColumns,index) => {
      return <option style={{backgroundColor:"#4c497e"}} key={index} value={allColumns}>{allColumns}</option>;
    })}
  </select>
  </Typography>
  <br></br>
  <Typography align="left" fontFamily='"IBM Plex Sans", system-ui, sans-serif' fontSize={12} minWidth={100} color="white">
          y-axis 
          <select onChange={(event)=>{yaxisChange(event)}} style={{marginLeft:5, paddingRight:24,paddingLeft:6,fontFamily:'inherit' ,width:150,height:30,background:"inherit",color:"inherit" }} >
    <option style={{backgroundColor:"#4c497e"}} value={y} />
    {columns.map((allColumns,index) => {
      return <option style={{backgroundColor:"#4c497e"}} key={index} value={allColumns}>{allColumns}</option>;
    })}
  </select>
  </Typography>
<img style={{width:'90%',height:'100%',objectfit:'cover',margin:'1rem'}}  onError = {e => e.target.style.display = 'none'} onLoad={e => e.target.style.display = 'revert'}  src={scatter} alt="scatter"/>
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

export default Scatter;