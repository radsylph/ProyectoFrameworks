import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { TableContext } from "../context/TableContext";
import { Btn } from "../button/Btn";

import "./inputContainer.css";

export function InputContainer({ inputRef }) {
  const [inputs, setInputs] = useState([]);
  const [values, setValues] = useState([]);
  const [fk, setFk] = useState([]);

  const getInputInfo = () => {
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

  const { selectedTable, setData, data, tables } = useContext(TableContext);

  useEffect(() => {
    setData({});
    setInputs([]);
    let array = [];
    selectedTable.columns.forEach((c) => {
      array[c.column_name] = "";
    });
    setValues(array);
    fkHandler();
    console.log(selectedTable.columns);
  }, [selectedTable]);

  const fkHandler = (e) => {
    let arr = [];
    selectedTable.columns.forEach((c) => {
      if (c.is_foreign_key) {
        tables.forEach((table) => {
          table.columns.forEach((column) => {
            if (c.column_name === column.column_name && column.is_primary_key) {
              let fks = [];
              table.data.forEach((row) => {
                fks.push(row[c.column_name]);
              });
              arr.push({ name: c.column_name, data: fks });
            }
          });
        });
      }
    });
    setFk(arr);
  };

  return (
    <>
      <div ref={inputRef} className="input-grid-container ">
        {selectedTable.columns ? (
          selectedTable.columns.map((c, idx) => (
            <div key={idx} className="input-container">
              <label>{c.column_name}</label>
              <div className="input-grid-item ">
                {c.is_foreign_key ? (
                  <select
                    name={c.column_name}
                    value={values[c.column_name]}
                    onChange={handler}
                  >
                    <option value="DEFAULT">Seleccione una valor</option>
                    {fk.map((fkCol) => {
                      if (fkCol.name === c.column_name) {
                        return fkCol.data.map((row, rowIdx) => (
                          <option value={row} key={rowIdx}>
                            {row}
                          </option>
                        ));
                      }
                      return null;
                    })}
                  </select>
                ) : null}
                {c.data_type === "text" && !c.is_foreign_key && (
                  <input
                    type="text"
                    id={idx}
                    name={c.column_name}
                    value={values[c.column_name]}
                    onChange={handler}
                  />
                )}
                {(c.data_type === "integer" || c.data_type === "numeric") &&
                  !c.is_foreign_key && (
                    <input
                      type="number"
                      id={idx}
                      name={c.column_name}
                      value={values[c.column_name]}
                      onChange={handler}
                    />
                  )}
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
