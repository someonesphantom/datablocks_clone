import React, { useState, useContext, useEffect } from 'react';
import FlowContext from '../e-insta/flowcontext';
import { UserContext } from '../e-insta/usercontext';
const DisplayResponse =()=>{
    //State to store table Column name
    const flowcontext = useContext(UserContext);
    //State to store the values
    useEffect(()=>{
        console.log("flowcontext",flowcontext)
    },[flowcontext])
    console.log("flowcontext ",flowcontext)
    // const setflowcontext = () => {
    //     flowcontext.setTableRows([1,2,3,4]);
    //     console.log("called it")
    // }
    return(
       <>
            {
                <div>
                    
                    
                { flowcontext.tableRows!==null && (
                    <>
                        { console.log("hi")}
                   {/* { setflowcontext()} */}
                        <table style={{maxHeight: "30rem",maxWidth:"10%"}}>
                    <thead>
                      <tr>
                        {flowcontext.tablerows.map((rows, index) => {
                            
                          return <th key={index}>{rows}</th>;
                        })}
                    
                      </tr>
                    </thead>
                    <tbody>
                      {flowcontext.values.map((value, index) => {
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
                // (value)=>{
                    
                //     {console.log("table ",value)}
                //     return(
                        
                //     )
                // }
            }
        </>
    )
}

export default DisplayResponse