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

const Train_test = ({ data }) => {
     
    const {columns,setColumns} = useContext(UserContext)
    const [Train_test, setTrain_test] = useState();
    const[url,setUrl]=useState(null)
    

    const fetchTrain_testPlot = async () => {
        const response = await fetch(url)
        const c = await response.json()
        //setc(c.data)
        setTrain_test(c)
      
    }
useEffect(()=>{
  
     setColumns(columns)
     setTrain_test(Train_test)
     
    console.log("columnsinTrain_test ",columns)
    console.log('Train_test',Train_test)
    
},[columns,Train_test])

useEffect(()=>{
  setUrl('http://127.0.0.1:8000/train_test')
  fetchTrain_testPlot();
  
},[url])




  const card = (

    <React.Fragment>

      <CardContent sx={{ borderRadius: "10px !important", width: '100%', height: "100 vh", backgroundColor: "rgb(44,43,73)", padding:"10px 0px 0px 10px", borderpaddingBottom: "10px !important" }}>
      <left>
        <DragIndicatorOutlinedIcon sx={{ fontSize: "15px", position: "absolute", left: "5px", top: "6px", color: "white" }} />
        <Typography fontSize="12px" position="absolute" left="20px" top="6px" color="white">
          Train_test
        </Typography>

      </left>
      <right>
        <ClearOutlinedIcon sx={{ fontSize: "15px", position: "absolute", right: "5px", top: "5px",color:"grey" }} />
        
      </right>
      
      <hr style={{borderColor:"#4C497E"}}></hr>
      <Typography align="left" fontFamily='"IBM Plex Sans", system-ui, sans-serif' fontSize={12} minWidth={100} color="white">
          Train_test 
          
  </Typography>
{/* <img style={{width:'90%',height:'100%',objectfit:'cover',margin:'1rem'}} src={Train_test} alt="Train_test"/> */}
 <div>{Train_test}</div>
 {/* <div>{Train_test[1]}</div>  */}
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

export default Train_test;