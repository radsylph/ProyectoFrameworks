import React, { useContext } from "react";
import { useEffect } from "react";
import { TableContext } from "../context/TableContext";



export function Input({inputRef }) {
  useEffect(() => {
    console.log("Input");
  }, []);
  
const {selectedTable} = useContext(TableContext)

  return (
    <div ref={inputRef}>
      {selectedTable.columns ? (
        selectedTable.columns.map((c, idx) => (
          <div key={idx}>
            <label>{c}</label>
            <input type="text" id={idx} />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
