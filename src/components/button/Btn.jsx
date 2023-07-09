import { useCallback, useContext, useEffect, useState } from "react";
import "./Btn.css";
import { TableContext } from "../context/TableContext";
export function Btn({ result }) {

  const {selectedTable} = useContext(TableContext)
  useEffect(() => {
    console.log("Btn");
    console.log(result);
    console.log(selectedTable.name);
    console.log(selectedTable.columns);
  }, []);

  const BtnCreate = () => {
    const values = result //test
      .map((value) => {
        if (isNaN(value)) {
          return `'${value}'`;
        } else {
          return value;
        }
      })
      .join(", ");
    const columns = selectedTable.columns.map((column) => `${column}`).join(", ");
    const query = `INSERT INTO ${selectedTable.name} (${columns}) VALUES (${values});`;
    console.log(columns);
    console.log(query);
  };

  const BtnRead = () => {
    const query = `SELECT * FROM ${selectedTable.name};`;
    console.log(query);
  };

  const BtnUpdate = () => {
    let params = "";
    for (let i = 1; i < selectedTable.columns.length; i++) {
      params += `${selectedTable.columns[i]} = `;
      if (isNaN(result[i])) {
        params += `'${result[i]}'`;
      } else {
        params += `${result[i]}`;
      }
      params += ", ";
    }
    params = params.slice(0, -2);

    const query = `UPDATE ${selectedTable.name} SET ${params} WHERE ${selectedTable.columns[0]} = ${result[0]};`;
    console.log(query);
  };

  const BtnDelete = () => {
    console.log("Delete nose");
    const query = `DELETE FROM ${selectedTable.name} WHERE ${selectedTable.columns[0]} = ${result[0]};`;
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
