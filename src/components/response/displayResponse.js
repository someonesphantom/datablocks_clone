import React, { useState, useContext, useEffect, memo } from 'react';
import { UserContext } from '../e-insta/context/usercontext';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';






const DisplayResponse = () => {
  //State to store table Column name
  const { tableRows, values,setValues } = useContext(UserContext);
  const [rows,setRows] = useState([])
  useEffect(() => {
    console.log("table Rows in display ", tableRows)
    setRows(values)
    console.log("rows id", rows)
  }, [tableRows,values])

  const geRowsWithId = (rows) => {

   
      console.log("rows id", rows)
    setRows([...rows, {id: uuidv4().toString(), ...rows}]);
    
    return rows;
    
    }
  return (
    <>
      {
        <div style={{ height: '100%', width: '100%' }}>



          {tableRows.length !== 0 && (
            <>
              {/* <DataGrid
                         
        columns={tableRows}
        rows={rows}
        getRowId={(row)=>row.Month} 
      /> */}
              <table style={{ maxHeight: "30rem", maxWidth: "10%" }}>
                <thead>
                  <tr>
                    {tableRows.map((rows, index) => {

                      return <th key={index}>{rows}</th>;
                    })}

                  </tr>
                </thead>
                <tbody>
                  {values.map((value, index) => {
                    return (
                      <tr key={index}>
                        {value.map((val, i) => {
                          return <td key={i}>{val}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )

          }
        </div>

      }
    </>
  )
}

export default memo(DisplayResponse)