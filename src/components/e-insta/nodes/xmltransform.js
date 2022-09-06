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



const Xmltoxlsxconverter = ({ data }) => {
    if (data.color === "") {
        data.color = "333154"
    }

    const { tableRows, uploadedfile, setuploadedfile, conversiontype, setconversiontype, setTableRows, values, setValues, filetype, setFileType, name, setName, ts, setTs, filecontent, setFilecontent } = useContext(UserContext)

    const [flag, setflag] = useState(false)

    const [tempconversion, settempconversion] = useState("")

    const handleChange = (event) => {
        settempconversion(event.target.value);
    };

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
                                        Transform xml
                                    </Typography>
                                </left>

                                <select onChange={(event) => { handleChange(event) }} style={{ marginLeft: 5, paddingRight: 24, paddingLeft: 6, fontFamily: 'inherit', width: 150, height: 30, background: "inherit", color: "inherit" }} >
                                    <option style={{ backgroundColor: "#4c497e" }} value={""} />
                                    <option style={{ backgroundColor: "#4c497e" }} value={"xmltocsv"}>{"csv"}</option>
                                    <option style={{ backgroundColor: "#4c497e" }} value={"xmltojson"}>{"json"}</option>
                                    <option style={{ backgroundColor: "#4c497e" }} value={"xmltoxlsx"}>{"xlsx"}</option>
                                </select>
                                <br />
                                <br />

                                <Button
                                    disableRipple
                                    variant="contained"
                                    sx={{ width: '10%', marginLeft: "30%" }}
                                    style={{ fontSize: '9px' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setconversiontype(tempconversion);
                                        setflag(true)
                                    }}
                                >Convert</Button>

                                {flag ? (
                                    <Typography variant="body2" color="text.secondary" style={{ marginLeft: "39px", marginTop: "5px", marginBottom: "-13px" }}>
                                        Conversion successful!
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
export default Xmltoxlsxconverter