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
import FlowContext from './flowcontext';



function getCurrentDate(separator = '/') {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes();
    return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year} ${hours}${':'}${minutes}`
}


const Flows = (props) => {
    const [edit, setEdit] = React.useState(false);
    const [editid, setEditId] = useState('');
    const flowcontext = useContext(FlowContext);
    const [flows, setFlows] = useState(flowcontext.flowname);
    // console.log("in flows.js:", flowcontext);

    const setflowcontext = () => {
        flowcontext.setflowsvalue(flows);
        console.log("called it")
    }
    const editname = (value, i) => {
        let newArr = [...flows];
        newArr[i].flowname = value;
        setFlows(newArr)
        setflowcontext();
    }

    // console.log('the structured data in flows is:', array)
    // console.log("info:",getCurrentDate())
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
                            flowname: 'untitled flow',
                            creationinfo: getCurrentDate(),
                            updationinfo: getCurrentDate(),
                            nodes: [],
                            edges: []
                        }
                        setFlows(currflow => [...currflow, newflow]);
                        setflowcontext();
                    }} y
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
                        flows.map((currflow, i) => (
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
                                        window.location.href = '/reactapp';
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
                                                            let newArr = [...flows];
                                                            newArr[i].updationinfo = getCurrentDate();
                                                            setFlows(newArr);
                                                            setflowcontext();
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
                                                setEdit(true)
                                                setEditId(i)
                                                e.stopPropagation();
                                                e.preventDefault();
                                                let newArr = [...flows];
                                                newArr[i].updationinfo = getCurrentDate();
                                                setFlows(newArr);
                                                setflowcontext();
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
                                                setFlows([
                                                    ...flows.slice(0, i),
                                                    ...flows.slice(i + 1, flows.length)
                                                ]);
                                                setflowcontext();
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