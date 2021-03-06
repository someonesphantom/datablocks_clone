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
import CardHeader from '@mui/material/CardHeader';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import useResponse from '../../response/response';


const SourceNode = ({ data }) => {
    if (data.color === "") {
        data.color = "333154"
    }
    const [value, displayresponse, parsedData, tablerows, Values] = useResponse(null)




    const { tableRows, setTableRows, values, setValues, filetype, setFileType, setFile } = useContext(UserContext)
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

    return (
        <>
            <UserContextProvider >
                <Box className="boxf1" sx={{ borderColor: "#" + data.color }}>
                    <Card variant="outlined" className='cardf1' style={{ width: "200px" }}>
                        <CardHeader className='cd' style={{ backgroundColor: "#" + data.color, border: 1, borderColor: "#" + data.color, borderRadius: 2 }} />
                        <React.Fragment>
                            <CardContent>
                                <left>
                                    <DragIndicatorIcon sx={{ fontSize: "30px", position: "absolute", left: "5px", top: "5px", color: "white" }} />
                                    <Typography fontSize="15px" position="absolute" left="30px" top="8px" color="white">
                                        Input
                                    </Typography>

                                </left>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={(event) => {
                                        setFile(event.target.files[0])
                                        displayresponse(event);
                                        { console.log("event", event) }
                                        setFileType(event.target.files[0].type)
                                    }}
                                    accept=".csv, .json, .xml, .xlsx"
                                    className='inpf1'
                                />
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

export default SourceNode;