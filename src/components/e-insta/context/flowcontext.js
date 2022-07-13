import React, { useState, useRef, useCallback, useEffect, createContext } from 'react';

export const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
    const [flowsvalue, setflowsvalue] = useState([]);
    const [token, settoken] = useState("");
    const [email, setemail] = useState("");
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [backendcallstatus, setbackendcallstatus] = useState(false);
    const flowdata = {
        token, settoken,
        flowsvalue, setflowsvalue,
        email, setemail,
        fname, setfname,
        lname, setlname,
        backendcallstatus, setbackendcallstatus
    };
    return <FlowContext.Provider value={flowdata}>{children}</FlowContext.Provider>
}