import { useCallback, useContext, useEffect, useState } from "react";
import "./Btn.css";
import { TableContext } from "../context/TableContext";
export function Btn({ result }) {
  const { selectedTable } = useContext(TableContext);
  useEffect(() => {
    console.log("Btn");
    console.log(result);
  }, []);

  const columns = selectedTable.columns.map((column) => column.column_name);

  const BtnCreate = () => {
    const values = result //test
      .map((value) => {
        if (isNaN(value)) {
          return `'${value}'`;
        } else {
          return value;
        }
      });
    const params = columns.join(", ");

    const query = `INSERT INTO ${selectedTable.name} (${params}) VALUES (${values});`;

    console.log(query);
  };

  const BtnRead = () => {
    const query = `SELECT * FROM ${selectedTable.name};`;
    console.log(query);
  };

  const BtnUpdate = () => {
    let params = "";
    for (let i = 1; i < selectedTable.columns.length; i++) {
      params += `${columns[i]} = `;
      if (isNaN(result[i])) {
        params += `'${result[i]}'`;
      } else {
        params += `${result[i]}`;
      }
      params += ", ";
    }
    params = params.slice(0, -2);

    const query = `UPDATE ${selectedTable.name} SET ${params} WHERE ${columns[0]} = ${result[0]};`;
    console.log(query);
  };

  const BtnDelete = () => {
    const query = `DELETE FROM ${selectedTable.name} WHERE ${columns[0]} = ${result[0]};`;
    console.log(query);
  };

  const handleBtnFunction = (e) => {
    switch (e.target.textContent) {
      case "Create":
        BtnCreate();
        break;
      case "Read":
        BtnRead();
        break;
      case "Update":
        BtnUpdate();
        break;
      case "Delete":
        BtnDelete();
        break;
      default:
        break;
    }
  };

  return (
    <div className="test">
      <div className="container">
        <button className="Btn" onClick={handleBtnFunction}>
          Create
        </button>
        <button className="Btn" onClick={handleBtnFunction}>
          Read
        </button>
        <button className="Btn" onClick={handleBtnFunction}>
          Update
        </button>
        <button className="Btn" onClick={handleBtnFunction}>
          Delete
        </button>
      </div>
    </div>
  );
}
