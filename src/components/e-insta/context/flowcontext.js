import React, { useState, useRef, useCallback, useEffect, createContext } from 'react';

export const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
    const [flowsvalue, setflowsvalue] = useState([]);
    const flowdata = {
        flowsvalue,
        setflowsvalue
    };
    return <FlowContext.Provider value={flowdata}>{children}</FlowContext.Provider>
}

// export default FlowContext;