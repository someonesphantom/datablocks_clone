import { createContext, useState, useEffect } from 'react';
export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);
  const [columns, setColumns] = useState([]);
  const [name, setName] = useState('');
  const [ts, setTs] = useState([]);
  const [filetype, setFileType] = useState([]);
  const [firstrow, setfirstrow] = useState(0);
  const [lastrow, setlastrow] = useState(0);
  const [slice, setslice] = useState('0');
  const [filecontent, setFilecontent] = useState({});
  const [uploadedfile, setuploadedfile] = useState();
  const [conversiontype, setconversiontype] = useState('');

  useEffect(
    () => {
      console.log("tablerows ", tableRows)
      setTableRows(tableRows)
    }, [tableRows]
  )
  const value = {
    tableRows,
    setTableRows,
    values,
    setValues,
    filetype,
    setFileType,
    columns,
    setColumns,
    name,
    setName,
    ts,
    setTs,
    firstrow,
    setfirstrow,
    lastrow,
    setlastrow,
    slice,
    setslice,
    uploadedfile, setuploadedfile,
    conversiontype, setconversiontype
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}