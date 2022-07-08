import React, { useState } from 'react';
import Papa from "papaparse";

const useResponse = (initialState) => {
    const [value, setValue] = useState(initialState)
    // State to store parsed data
    const [parsedData, setParsedData] = useState([]);

    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);

    //State to store the values
    const [values, setValues] = useState([]);

    const displayresponse = (props) => {
        Papa.parse(props.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.log("results: ",results.data)
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
    return [value,displayresponse,parsedData,tableRows,values]

}

export default useResponse 