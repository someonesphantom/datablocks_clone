import React, { useState, useContext, useEffect,memo } from 'react';
import { UserContext } from '../e-insta/usercontext';
const DisplayResponse =()=>{
    //State to store table Column name
    const {tableRows,values} = useContext(UserContext);
    //State to store the values
    useEffect(()=>{
        console.log("table Rows in display ",tableRows)
    },[tableRows])
    
    return(
       <>
            {
                <div>
                    
                    
                { tableRows.length !== 0 && (
                    <>

                        <table style={{maxHeight: "30rem",maxWidth:"10%"}}>
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