import React, { useState } from 'react';
import Papa from "papaparse";
// import * as XLSX from "xlsx";


const useResponse = (initialState) => {
  const [value, setValue] = useState(initialState)
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const displayresponse = (props) => {
    
    
      if (props.target.files[0].type === 'text/csv') {
        Papa.parse(props.target.files[0], {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            const rowsArray = [];
            const valuesArray = [];

            // Iterating data to get column name and their values
            results.data.map((d) => {
              rowsArray.push(Object.keys(d));
              valuesArray.push(Object.values(d));
            });

            // Parsed Data Response in array format
            setParsedData(results.data);

            // Filtered Column Names
            setTableRows(rowsArray[0]);

            // Filtered Values
            setValues(valuesArray);
          },
        });
      }
      if (props.target.files[0].type === 'application/json') {
        const fileReader = new FileReader();
        fileReader.readAsText(props.target.files[0], "UTF-8");
        fileReader.onload = props => {
          setValues(props.target.result)
        };
      }
      // if (props.type === 'XLSX') {
      //   setValues([props.data]);
      //   setTableRows(["xlsx"]);
      // }
  }
  return [value, displayresponse, parsedData, tableRows, values]

}

export default useResponse 