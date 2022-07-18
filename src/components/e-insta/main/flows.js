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
require('./flows.scss')


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
        axios.delete(apiMapping.userData.deleteflow + flowsvalue[i]._id).then(response => {
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
                    className='btn'
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
                    
                >
                    + new flow
                </Button>
                <div className='a'>
                    {
                        flowsvalue.map((currflow, i) => (
                            <>
                                <Button
                                    disableRipple
                                    className='btn1'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setcurrflow(i);
                                        navigate('/reactapp');
                                    }}
                                >
                                    <div className='b'>
                                        {
                                            edit == true && editid == i ? (
                                                <div className='c'>
                                                    <Button
                                                        disableRipple
                                                        className='btn2'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                        }}
                                                    >
                                                        <TextField className="text1" size='small'  value={currflow.flowname} variant="outlined"
                                                            onChange={(e) => { editname(e.target.value, i) }}
                                                        />
                                                    </Button>

                                                    <Button
                                                        className='btn3'
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
                                                    <div className='d'>
                                                        {currflow.flowname}
                                                    </div>
                                                )

                                        }
                                        <div className='e'>
                                            created at: {currflow.creationinfo}
                                            <br />
                                            updated at: {currflow.updationinfo}
                                        </div>
                                    </div>
                                    <div className='f'>
                                        <Button
                                            className='btn4'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setEdit(true)
                                                setEditId(i)
                                            }}
                                            startIcon={<EditOutlinedIcon className='icon' />}
                                        />

                                        <Button
                                            className='btn5'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                deleteflow(i);
                                            }}
                                            startIcon={<DeleteOutlineOutlinedIcon className='icon' />}
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
