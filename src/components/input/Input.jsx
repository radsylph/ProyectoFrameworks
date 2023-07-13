import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { TableContext } from "../context/TableContext";
import { Btn } from "../button/Btn";
import "./input.css";
export function Input({ inputRef }) {
  const [inputs, setInputs] = useState([]);
  const [values, setValues] = useState([]);

  const getInputInfo = (e) => {
    setInputs([]);

    const key = selectedTable.columns.map((c, idx) => idx);
    key.forEach((k) => {
      const tableinputs = inputRef.current.children[k].children[1].children[0];
      setInputs((prev) => [...prev, tableinputs.value]);
    });
  };

  const handler = (e) => {
    let property = e.target.value;
    let name = e.target.name;

    setValues(
      values.map((v, idx) => {
        if (e.target.name === idx) {
          return e.target.value;
        } else {
          return v;
        }
      })
    );
    setData({
      ...data,
      [name]: property,
    });
    getInputInfo();
  };

  const { selectedTable, setData, data } = useContext(TableContext);

  useEffect(() => {
    setData({});
    setInputs([]);
    let array = [];
    selectedTable.columns.forEach((c) => {
      array[c.column_name] = "";
    });
    setValues(array);
  }, [selectedTable]);

  useEffect(() => {
    //console.log(data);
  }, [data]);

  return (
    <>
      <div ref={inputRef} className="input-grid-container ">
        {selectedTable.columns ? (
          selectedTable.columns.map((c, idx) => (
            <div key={idx} className="input-container">
              <label>{c.column_name}</label>
              <div className="input-grid-item ">
                <input
                  type="text"
                  id={idx}
                  name={c.column_name}
                  value={values[c.column_name]}
                  onChange={handler}
                />
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="btncontainer">
      <Btn result={inputs} />
      </div>
    </>
  );
}
