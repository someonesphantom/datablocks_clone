import { createContext, useState, useEffect } from 'react';
export const UserContext = createContext(null);

export function UserContextProvider({children}){
    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);

    //State to store the values
    const [values, setValues] = useState([]);
    useEffect(
        ()=>{
          console.log("tablerows ",tableRows)
          setTableRows(tableRows)
        },[tableRows]
      )
    const value={
        tableRows,
        setTableRows,
        values,
         setValues
    }
     
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}