import React, { useState } from 'react';
import Papa from "papaparse";
import apiMapping from '../resources/apiMapping.json';
import ApiLinks from "../resources/apiMapping.json";
import axios from 'axios';


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
      const formData = new FormData()
      formData.append("file",props.target.files[0])

      axios.post(ApiLinks.userData.UploadJson,formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res)=>{
      const data = res.data
      console.log("response",res);
            setTableRows(data)
            setValues(data) 
      })
    }
    if(props.target.files[0].type === 'text/xml'){
      const formData = new FormData()
      formData.append("file",props.target.files[0])

      axios.post(ApiLinks.userData.uploadXmlFile,formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res)=>{
        const xml_data = res.data.data
        console.log(xml_data); 
        console.log(JSON.parse(xml_data));
        const data = JSON.parse(xml_data)
        setTableRows(data.columns)
        setValues(data.data) 
      })
    }
    if (props.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      const formData = new FormData()
      formData.append("file", props.target.files[0])

      axios.post(apiMapping.userData.uploadXlsxFile, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        const xlsx_data = res.data.data
        console.log(xlsx_data);
        console.log(JSON.parse(xlsx_data));
        const data = JSON.parse(xlsx_data)
        setTableRows(data.columns)
        setValues(data.data)
      })
    }
  }
  return [value, displayresponse, parsedData, tableRows, values]

}

export default useResponse 