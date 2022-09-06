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


const Xlsxinputnode = ({ data }) => {
    if (data.color === "") {
        data.color = "333154"
    }
    const [value, displayresponse, parsedData, tablerows, Values] = useResponse(null)

    const { tableRows, uploadedfile, setuploadedfile, setTableRows, values, setValues, filetype, setFileType, name, setName, ts, setTs, filecontent, setFilecontent } = useContext(UserContext)

    // useEffect(() => {
    //     console.log("Table Rows ", tablerows)
    //     setTableRows(tablerows)
    // }, [tablerows])

    // useEffect(() => {
    //     console.log("values  ", Values)
    //     setValues(Values)
    // }, [Values])

    // useEffect(() => {
    //     console.log("fileType", filetype)
    // }, [filetype])

    // useEffect(() => {
    //     console.log("name", name)
    // }, [name])

    const HandleChange = (event) => {
        // console.log(event.target.files)
        setFileType(event.target.files[0].type)
        // let newDate = new Date()
        // let date = newDate.getDate();
        // let month = newDate.getMonth() + 1;
        // let year = newDate.getFullYear();
        // let hours = newDate.getHours()
        // let minutes = newDate.getMinutes();
        // let seconds = newDate.getSeconds();
        // let a = date.toString() + '-' + month.toString() + '-' + year.toString() + '_' + hours.toString() + '-' + minutes.toString() + '-' + seconds.toString() + '_'
        // setTs(a)

        // const n = event.target.files[0].name
        // setName(a + n)

        const formData = new FormData()
        formData.append("file", event.target.files[0])

        axios.post(apiMapping.userData.uploadxlsx, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            // console.log("response for xlsx", response);
            // console.log("response.data.filename",response.data.filename)
            setName(response.data.filename)
            let recievedpayload = JSON.parse(response.data.data);
            // console.log("recievedpayload.columns",recievedpayload.columns);
            setTableRows(recievedpayload.columns)
            // console.log("recievedpayload.data",recievedpayload.data);
            // console.log("name",name)
            setValues(recievedpayload.data)
        })

        // useEffect(() => {
        //     console.log('filecontent', filecontent)
        // }, [filecontent])

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
                                        Upload XLSX File
                                    </Typography>

                                </left>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={(event) => {
                                        setuploadedfile(event.target.files[0]);
                                        displayresponse(event);
                                        HandleChange(event);
                                        console.log("name here", name)
                                        { console.log("event", event) }
                                        setfilename(event.target.files[0].name)
                                        setflag(true)
                                    }}
                                    accept=".xlsx"
                                    className='inpf1'
                                />
                                {flag ? (
                                    <Typography variant="body2" color="text.secondary" style={{ marginLeft: "0px", marginTop: "5px", marginBottom: "-13px" }}>
                                        {filename} uploaded
                                    </Typography>
                                ) : (console.log())}

                                <Typography className='tyf1' color="white" gutterBottom>
                                    {data.value}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">

                                </Typography>

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
export default Xlsxinputnode