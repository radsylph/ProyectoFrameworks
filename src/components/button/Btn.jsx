import { useContext } from "react";
import "./Btn.css";
import { TableContext } from "../context/TableContext";
import axios from "axios";
export function Btn({ result }) {
  const { selectedTable } = useContext(TableContext);
  const columns = selectedTable.columns.map((column) => column.column_name);

  const AxiosCall = (tableName, method, SendData) => {
    const response = axios
      .post(`http://localhost:4000/query/${tableName}/${method}`, {
        data: SendData,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const BtnCreate = () => {
    const values = result.map((value) => {
      if (isNaN(value)) {
        return `'${value}'`;
      } else {
        return value;
      }
    });
    const params = columns.join(", ");
    let data = {
      parametro: params,
      valores: values,
    };
    AxiosCall(selectedTable.name, "create", data);
  };

  const BtnRead = () => {
    let data = {};
    AxiosCall(selectedTable.name, "read", data);
  };

  const BtnUpdate = () => {
    let params = "";
    const columns_q = selectedTable.columns.length;
    for (let i = 1; i < columns_q; i++) {
      params += `${columns[i]} = `;
      if (isNaN(result[i])) {
        params += `'${result[i]}'`;
      } else {
        params += `${result[i]}`;
      }
      params += ", ";
    }
    params = params.slice(0, -2);
    let data = {
      parametro: params,
      columnas: columns,
      valores: result,
    };
    AxiosCall(selectedTable.name, "update", data);
  };

  const BtnDelete = () => {
    let data = {
      columnas: columns,
      valores: result,
    };
    AxiosCall(selectedTable.name, "delete", data);
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
    <div className="container">
      <div className="btn-container">
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
