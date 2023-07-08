import React from "react";
import { useEffect } from "react";
export function Input({ columns, inputRef }) {
  useEffect(() => {
    console.log("Input");
  }, []);

  return (
    <div ref={inputRef}>
      {columns ? (
        columns.map((c, idx) => (
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
