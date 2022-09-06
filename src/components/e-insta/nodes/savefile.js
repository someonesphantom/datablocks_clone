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



const Filesaver = ({ data }) => {
    if (data.color === "") {
        data.color = "333154"
    }
    const [value, displayresponse, parsedData, tablerows, Values] = useResponse(null)

    const { tableRows, uploadedfile, setuploadedfile, conversiontype, setconversiontype, setTableRows, values, setValues, filetype, setFileType, name, setName, ts, setTs, filecontent, setFilecontent } = useContext(UserContext)

    const [flag, setflag] = useState(false)

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

    const HandleChange = () => {
        const formData = new FormData()
        formData.append("file", uploadedfile)

        if (conversiontype == "xlsxtocsv") {
            axios.post(apiMapping.userData.savefilexlsxtocsv, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("response for savefile", response);
                if (response.data == "success") {
                    setflag(true)
                }
            })
        }

        if (conversiontype == "xlsxtoxml") {
            axios.post(apiMapping.userData.savefilexlsxtoxml, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("response for savefile", response);
                if (response.data == "success") {
                    setflag(true)
                }
            })
        }

        if (conversiontype == "xlsxtojson") {
            axios.post(apiMapping.userData.savefilexlsxtojson, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("response for savefile", response);
                if (response.data == "success") {
                    setflag(true)
                }
            })
        }

        if (conversiontype == "jsontoxml") {
            axios.post(apiMapping.userData.savefilejsontoxml, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("response for savefile", response);
                if (response.data == "success") {
                    setflag(true)
                }
            })
        }

        if (conversiontype == "jsontoxlsx") {
            axios.post(apiMapping.userData.savefilejsontoxlsx, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("response for savefile", response);
                if (response.data == "success") {
                    setflag(true)
                }
            })
        }

        if (conversiontype == "jsontocsv") {
            axios.post(apiMapping.userData.savefilejsontocsv, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("response for savefile", response);
                if (response.data == "success") {
                    setflag(true)
                }
            })
        }

        if (conversiontype == "xmltoxlsx") {
            axios.post(apiMapping.userData.savefilexmltoxlsx, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("response for savefile", response);
                if (response.data == "success") {
                    setflag(true)
                }
            })
        }

        if (conversiontype == "xmltocsv") {
            axios.post(apiMapping.userData.savefilexmltocsv, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("response for savefile", response);
                if (response.data == "success") {
                    setflag(true)
                }
            })
        }

        if (conversiontype == "xmltojson") {
            axios.post(apiMapping.userData.savefilexmltojson, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("response for savefile", response);
                if (response.data == "success") {
                    setflag(true)
                }
            })
        }

        if (conversiontype == "csvtojson") {
            axios.post(apiMapping.userData.savefilecsvtojson, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("response for savefile", response);
                if (response.data == "success") {
                    setflag(true)
                }
            })
        }

        if (conversiontype == "csvtoxml") {
            axios.post(apiMapping.userData.savefilecsvtoxml, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("response for savefile", response);
                if (response.data == "success") {
                    setflag(true)
                }
            })
        }

        if (conversiontype == "csvtoxlsx") {
            axios.post(apiMapping.userData.savefilecsvtoxlsx, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("response for savefile", response);
                if (response.data == "success") {
                    setflag(true)
                }
            })
        }

        // useEffect(() => {
        //     console.log('filecontent', filecontent)
        // }, [filecontent])

    }

    // const getData=()=>{
    //     console.log("called")
    //     fetch('C:/Users/Pradyumn Garg/Downloads/test.json'
    //     ,{
    //       headers : { 
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //        }
    //     }
    //     )
    //       .then(function(response){
    //         console.log("here it is",response)
    //         return response.json();
    //       })
    //       .then(function(myJson) {
    //         console.log("here it is 2",myJson);
    //       });
    //   }
    //   useEffect(()=>{
    //     getData()
    //   },[])

    // const getData = () => {
    //     console.log("here it is", doc);
    //     console.log("second", uploadedfile)
    //     // RNFS.readFile('C:/Users/Pradyumn Garg/Downloads/test.json', 'ascii').then(res => {
    //     // })
    //     // .catch(err => {
    //     //     console.log(err.message, err.code);
    //     // });    
    // }

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
                                    <Typography fontSize="15px" position="absolute" left="30px" top="8px" color="white" width="200px">
                                        Save file to Downloads
                                    </Typography>
                                </left>

                                <Button
                                    disableRipple
                                    variant="contained"
                                    sx={{ width: '10%', marginLeft: "30%" }}
                                    style={{ fontSize: '9px' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        HandleChange();
                                    }}
                                >Save</Button>

                                {flag ? (
                                    <Typography variant="body2" color="text.secondary" style={{ marginLeft: "47px", marginTop: "5px", marginBottom: "-13px" }}>
                                        File saved!
                                    </Typography>
                                ) : (console.log())}

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
export default Filesaver