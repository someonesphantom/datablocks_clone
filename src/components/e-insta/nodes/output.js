import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { Handle } from 'react-flow-renderer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import files from '../../resources/apiMapping.json';
import { UserContext, UserContextProvider } from '../context/usercontext';
import useResponse from '../../response/response';
import { FlowContext } from '../context/flowcontext';
import CardHeader from '@mui/material/CardHeader';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';




const DestinationNode = ({ data }) => {
    if (data.color === "") {
        data.color = "333154"
    }
    const [value, displayresponse, parsedData, tablerows, Values] = useResponse(null)

    const { tableRows, setTableRows, values, setValues, filetype, setFileType, File, name } = useContext(UserContext)
    useEffect(() => {
        console.log("Table Rows ", tablerows)
        setTableRows(tablerows)
    }, [tablerows])
    useEffect(() => {
        console.log("values  ", Values)

        setValues(Values)
    }, [Values])
    useEffect(() => {
        console.log("fileType", filetype)

    }, [filetype])

    const {
        token, settoken,
        flowsvalue, setflowsvalue,
        email, setemail,
        fname, setfname,
        lname, setlname,
        currflow, setcurrflow
    } = useContext(FlowContext);

    const download = () => {

        const blob = new Blob([File])
        const url = URL.createObjectURL(blob)
        console.log(url);
        const a = document.createElement("a");
        a.href = url;
        const Ext_name = File.name.split(".")[1]
        const flow_namer = document.getElementById("flow_namer")?.textContent
        console.log(document.getElementById("flow_namer"));
        a.download = flowsvalue[currflow].flowname + "." + new Date().toISOString() + "." + File.name;

        a.click()

    }


    return (
        <>
            <UserContextProvider >
                <Box className="boxf1" sx={{ borderColor: "#" + data.color }}>
                    <Card variant="outlined" className='cardf1' style={{ width: "200px" }} >
                        <CardHeader className='cd' style={{ backgroundColor: "#" + data.color, border: 1, borderColor: "#" + data.color, borderRadius: 2 }} />
                        <React.Fragment>
                            <CardContent>
                                <left>
                                    <DragIndicatorIcon sx={{ fontSize: "30px", position: "absolute", left: "5px", top: "5px", color: "white" }} />
                                    <Typography fontSize="15px" position="absolute" left="30px" top="8px" color="white">
                                        Output
                                    </Typography>
                                    <Button onClick={download}>Save File</Button>
                                </left>

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
                    type="target"
                    position="left"
                    id="a"
                    className='handleleft'
                    isConnectable={true}
                />
            </UserContextProvider>
        </>
    )
}

export default DestinationNode;