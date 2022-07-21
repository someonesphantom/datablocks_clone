import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { Handle } from 'react-flow-renderer';
import { UserContext, UserContextProvider } from '../context/usercontext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import files from '../../resources/apiMapping.json';
import useResponse from '../../response/response';
import CardHeader from '@mui/material/CardHeader';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import axios, { post } from 'axios';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import TextField from '@mui/material/TextField';


const Exports = ({ data }) => {
  if (data.color === "") {
    data.color = "333154"
  }
  
  const[projectName,setProjectName]=useState('')

  const { filecontent,setFilecontent } = useContext(UserContext)
  
  

  const generateProject=()=>{
    
    let zip = new JSZip();
    zip.file(projectName+".csv",filecontent)
    downloadZip(projectName,zip)
}

const downloadZip = (name,zip) => {
    return zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, name + ".zip");
    });
};
  


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
        <Box className="boxf1" sx={{ borderColor: "#" + data.color }}>
          <Card variant="outlined" className='cardf1' >
            <CardHeader className='cd' style={{ backgroundColor: "#" + data.color, border: 1, borderColor: "#" + data.color, borderRadius: 2 }} />
            <React.Fragment>
              <CardContent>
                <left>
                  <DragIndicatorIcon sx={{ fontSize: "30px", position: "absolute", left: "5px", top: "5px", color: "white" }} />
                  <Typography fontSize="15px" position="absolute" left="30px" top="8px" color="white">
                    File
                  </Typography>

                </left>
                <div>
                    <TextField id="outlined-basic" label="Project Name" value={projectName} onChange={(e) => { setProjectName(e.target.value) }} variant="outlined" />
                </div>
                <div>
                    <Button variant="contained" onClick={generateProject}>Generate Project</Button>
                </div>
                <Typography className='tyf1' color="white" gutterBottom>
                  {data.value}
                </Typography>

                <Typography variant="body2" color="text.secondary">

                </Typography>

              </CardContent>

            </React.Fragment>
          </Card>
        </Box>
        
      </UserContextProvider>
    </>
  )
}
export default Exports