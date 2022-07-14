import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FlowContext } from '../context/flowcontext';
import { Link } from "react-router-dom";
import apiMapping from '../../resources/apiMapping.json';
import axios from 'axios';



function getCurrentDate(separator = '/') {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes();
    return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year} ${hours}${':'}${minutes}`
}


const Flows = () => {
    const [edit, setEdit] = React.useState(false);
    const [editid, setEditId] = useState('');
    const navigate = useNavigate();
    const {
        token, settoken,
        flowsvalue, setflowsvalue,
        email, setemail,
        fname, setfname,
        lname, setlname,
        currflow, setcurrflow
    } = useContext(FlowContext);

    const editname = (value, i) => {
        let newArr = [...flowsvalue];
        newArr[i].flowname = value;
        newArr[i].updationinfo = getCurrentDate();
        setflowsvalue(newArr)
    }

    const deleteflow = (i) => {
        axios.delete(apiMapping.userData.deleteflows + flowsvalue[i]._id).then(response => {
        });
        setflowsvalue([
            ...flowsvalue.slice(0, i),
            ...flowsvalue.slice(i + 1, flowsvalue.length)
        ]);
    }

    const postflowsdb = (flowname, creationinfo, updationinfo, payload, newflows) => {
        let payload2 =
        {
            "payload": payload,
            "email": email,
            "flowname": flowname,
            "creationinfo": creationinfo,
            "updationinfo": updationinfo
        }
        axios.post(apiMapping.userData.postflows, payload2).then(response => {
            let temp = [...newflows];
            temp[newflows.length - 1]._id = response.data._id;
            setflowsvalue(temp);
        })
    }

    const putflowsdb = (i) => {
        let newArr = [...flowsvalue];
        let payload2 =
        {
            "payload": newArr[i].payload,
            "updationinfo": newArr[i].updationinfo,
            "flowname": newArr[i].flowname
        }
        axios.put(apiMapping.userData.putflows + newArr[i]._id, payload2).then(response => {
        })
    }

    return (
        <>
            <div>
                <Button
                    type="submit"
                    variant="contained"
                    style={{ textTransform: 'none', marginBottom: "0.8%", marginLeft: "89%", marginTop: "-7.5%" }}
                    onClick={(e) => {
                        e.preventDefault();
                        let newflow = {
                            _id: "",
                            payload: "",
                            email: "",
                            flowname: "untitled flow",
                            creationinfo: getCurrentDate(),
                            updationinfo: getCurrentDate()
                        }
                        postflowsdb(newflow.flowname, newflow.creationinfo, newflow.updationinfo, newflow.payload, [...flowsvalue, newflow]);
                    }}
                    sx={{
                        mt: 0, mb: 0, background: 'rgba(255, 255, 255, 0.08)', ':hover': {
                            bgcolor: '#4c497e',
                            color: 'white',
                        },
                        fontFamily: 'monospace'
                    }}
                >
                    + new flow
                </Button>
                <div style={{ marginTop: "-2%" }}>
                    {
                        flowsvalue.map((currflow, i) => (
                            <>
                                <Button
                                    disableRipple
                                    style={{ textTransform: 'none', whiteSpace: 'nowrap', justifyContent: "left", marginBottom: "-1.3%" }}
                                    sx={{
                                        mt: 0, mb: 0, background: '#333154', ':hover': {
                                            bgcolor: '#4c497e',
                                            color: 'white',
                                        },
                                        fontFamily: 'system-ui',
                                        width: "100%",
                                        minHeight: "90px",
                                        color: "white",
                                        fontWeight: 600,
                                        fontSize: "18px"
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setcurrflow(i);
                                        navigate('/reactapp');
                                    }}
                                >
                                    <div style={{ textAlign: "left", marginLeft: "0.3%" }}>
                                        {
                                            edit == true && editid == i ? (
                                                <div style={{ marginTop: "2%", width: "120px", marginLeft: "-4%" }}>
                                                    <Button
                                                        disableRipple
                                                        sx={{ width: '300%' }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                        }}
                                                    >
                                                        <TextField id="outlined-basic" size='small' sx={{ input: { color: 'white' }, border: '1px solid white', width: '300%' }} value={currflow.flowname} variant="outlined"
                                                            onChange={(e) => { editname(e.target.value, i) }}
                                                        />
                                                    </Button>

                                                    <Button
                                                        style={{ textTransform: 'none', marginTop: "-1px", borderRadius: 0, marginLeft: "-9px" }}
                                                        sx={{
                                                            mt: 0, mb: 0, background: '#434161', ':hover': {
                                                                bgcolor: '#4c497e',
                                                                color: 'white',
                                                            },
                                                            fontFamily: 'monospace',
                                                            minWidth: "40px",
                                                            minHeight: "42px",
                                                            border: 1,
                                                            borderColor: "white"
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            putflowsdb(i);
                                                            setEdit(false);
                                                        }}
                                                        startIcon={<DoneIcon style={{ color: "white", marginRight: "-13px" }} />}
                                                    />
                                                </div>
                                            ) :
                                                (
                                                    <div style={{ textAlign: "left" }}>
                                                        {currflow.flowname}
                                                    </div>
                                                )

                                        }
                                        <div style={{ fontSize: '12px', color: '#9ca8b3', fontWeight: 'normal' }}>
                                            created at: {currflow.creationinfo}
                                            <br />
                                            updated at: {currflow.updationinfo}
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: "25px", position: "absolute", marginLeft: "89%" }}>
                                        <Button
                                            style={{ textTransform: 'none' }}
                                            sx={{
                                                mt: 0, mb: 0, background: '#434161', ':hover': {
                                                    bgcolor: '#4c497e',
                                                    color: 'white',
                                                },
                                                fontFamily: 'monospace',
                                                minWidth: "40px",
                                                minHeight: "30px",
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setEdit(true)
                                                setEditId(i)
                                            }}
                                            startIcon={<EditOutlinedIcon style={{ color: "white", marginRight: "-13px" }} />}
                                        />

                                        <Button
                                            style={{ textTransform: 'none', marginLeft: "10px" }}
                                            sx={{
                                                mt: 0, mb: 0, background: '#434161', ':hover': {
                                                    bgcolor: '#4c497e',
                                                    color: 'white',
                                                },
                                                fontFamily: 'monospace',
                                                minWidth: "40px",
                                                minHeight: "30px",
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                deleteflow(i);
                                            }}
                                            startIcon={<DeleteOutlineOutlinedIcon style={{ color: "white", marginRight: "-13px" }} />}
                                        />
                                    </div>
                                </Button>
                                <br />
                                <br />
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Flows