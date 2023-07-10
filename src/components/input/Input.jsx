import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { TableContext } from "../context/TableContext";



export function Input({inputRef }) {
  useEffect(() => {
    console.log("Input");
  }, []);
  const [values, setValues] = useState([])

const handler = (e) =>{
  let property = e.target.value
  let name = e.target.name

  setValues (
    values.map((v, idx) => {
      if (e.target.name === idx) {
        return e.target.value
      } else{
        return v
      }
    })
  )
setData(
  {
    ...data, 
    [name]: property
  }
  
)
}

const {selectedTable, setData, data} = useContext(TableContext)

useEffect(()=>{
  setData({})
  setValues([])
  selectedTable.columns.forEach(c => {
   values[c.column_name] = ""
  });
}, [selectedTable])

useEffect (()=>{console.log(data)}, [data])
  return (
    <div ref={inputRef}>
      {selectedTable.columns ? (
        selectedTable.columns.map((c, idx) => (
          <div key={idx}>
            <label>{c.column_name}</label>
            <input type="text" id={idx} name={c.column_name} value={values[c.column_name]} onChange={handler} />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
