import React, { useState, useContext, useEffect, memo } from 'react';
import { UserContext } from '../e-insta/context/usercontext';
import { DataGrid } from '@mui/x-data-grid';

const DisplayResponse = () => {
  //State to store table Column name
  const { tableRows, values, filetype } = useContext(UserContext);
  //State to store the values
  useEffect(() => {
    console.log("table Rows in display ", tableRows)
  }, [tableRows])

  // function NewlineText() {
  //   // const text = values;
  //   // return <div>{text}</div>;
  //   const text = values[0].replace(/,/g, ' ');
  //   const newText = text.split('\n').map(str => <p>{str}</p>);
  //   return newText;
  // }

  return (
    <>
      {
        <div style={{ height: '100%', width: '100%' }}>

          {tableRows.length !== 0 && filetype === "text/csv" ? (
            <>
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
                    console.log('values for csv', values)
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
          ) : (console.log())

          }

          {
            values.length !== 0 && filetype === "application/json" ? (
              <div>
                {values}
              </div>
            ) : (console.log())
          }

          {tableRows.length !== 0 && filetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
            <>
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
          ) : (console.log())

          }

          {tableRows.length !== 0 && filetype === "text/xml" && (
            <>
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
          )}
        </div>
      }

    </>
  )
}

export default memo(DisplayResponse)