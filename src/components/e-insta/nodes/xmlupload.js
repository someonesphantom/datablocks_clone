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
import apiMapping from '../../resources/apiMapping.json';


const Xmlinputnode = ({ data }) => {
    if (data.color === "") {
        data.color = "333154"
    }
    const [value, displayresponse, parsedData, tablerows, Values] = useResponse(null)

    const { tableRows, uploadedfile, setuploadedfile, setTableRows, values, setValues, filetype, setFileType, name, setName, ts, setTs, filecontent, setFilecontent } = useContext(UserContext)

    const HandleChange = (event) => {
        // console.log(event.target.files)
        setFileType(event.target.files[0].type)

        const formData = new FormData()
        formData.append("file", event.target.files[0])

        axios.post(apiMapping.userData.uploadxml, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            // console.log("response for xml", response);
            let recievedpayload = JSON.parse(response.data.data);
            setTableRows(recievedpayload.columns)
            setValues(recievedpayload.data)
        })
    }

    const [filename, setfilename] = useState("")
    const [flag, setflag] = useState(false)  

    return (
        <>
            <UserContextProvider >
                <Box className="boxf1" sx={{ borderColor: "#" + data.color }}>
                    <Card variant="outlined" className='cardf1' >
                        <CardHeader className='cd' style={{ backgroundColor: "#" + data.color, border: 1, borderColor: "#" + data.color, borderRadius: 2 }} />
                        <React.Fragment>
                            <CardContent>
                                <left>
                                    <DragIndicatorIcon sx={{ fontSize: "30px", position: "absolute", left: "5px", top: "5px", color: "white" }} />
                                    <Typography fontSize="15px" position="absolute" left="30px" top="8px" color="white">
                                        Upload XML File
                                    </Typography>
                                </left>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={(event) => {
                                        setuploadedfile(event.target.files[0]);
                                        displayresponse(event);
                                        HandleChange(event);
                                        setfilename(event.target.files[0].name)
                                        setflag(true)
                                    }}
                                    accept=".xml"
                                    className='inpf1'
                                />

                                {flag ? (
                                    <Typography variant="body2" color="text.secondary" style={{ marginLeft: "0px", marginTop: "5px", marginBottom: "-13px" }}>
                                        {filename} uploaded
                                    </Typography>
                                ) : (console.log())}

                            </CardContent>
                        </React.Fragment>
                    </Card>
                </Box>
                <Handle
                    type="source"
                    position="right"
                    id="a"
                    className='handleright'
                    isConnectable={true}
                />
            </UserContextProvider>
        </>
    )
}
export default Xmlinputnode