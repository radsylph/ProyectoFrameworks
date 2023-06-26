import { useEffect, useState } from "react";
import "./Dialog.css";
import axios from "axios";
export default function Dialog() {
  const [tables, setTables] = useState([]);

  const table_name = () => {
    axios
      .get("http://localhost:4000/tables")
      .then((response) => {
        const tableNames = response.data.data.map((table) => table.tablename);
        tableNames.forEach((tableName) => {
          table_columns(tableName);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const table_columns = (tableName) => {
    axios
      .get(`http://localhost:4000/columns/${tableName}`)
      .then((response) => {
        const tableColumns = response.data.data[0].columns;
        console.log(tableColumns);
        addTable(tableName, tableColumns); // Llamamos a addTable aquí después de obtener los datos de la API
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTable = (name, columns) => {
    setTables((prevTables) => [
      ...prevTables,
      {
        name: name,
        columns: columns,
      },
    ]);
  };

  const [selectedTable, setSelectedTable] = useState({});

  const handler = (e) => {
    let table = tables.filter((t) => {
      return t.name == e.target.value;
    });
    console.log(table[0]);
    setSelectedTable(table[0]);
  };

  return (
    <>
      <select
        name="table"
        id="table"
        defaultValue={"DEFAULT"}
        onChange={handler}
      >
        <option value="DEFAULT" disabled hidden>
          Seleccione una tabla
        </option>
        {tables.map((t, idx) => (
          <option key={idx}>{t.name}</option>
        ))}
      </select>
      <h1>{selectedTable.name}</h1>
      <div>
        {selectedTable.columns ? (
          selectedTable.columns.map((c, idx) => (
            <div key={idx}>
              <label>{c}</label>
              <input type="text" />
            </div>
          ))
        ) : (
          <></>
        )}
        <table>
          <thead>
            <tr>
              {selectedTable.columns ? (
                selectedTable.columns.map((c, idx) => <th key={idx}>{c}</th>)
              ) : (
                <th></th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              {selectedTable.columns ? (
                selectedTable.columns.map((c, idx) => <td key={idx}></td>)
              ) : (
                <td></td>
              )}
            </tr>
          </tbody>
        </table>

        <button>insertar</button>
        <button>modificar</button>
        <button>eliminar</button>
        <button>actualizar</button>
        <button>salir</button>
      </div>

      <aside>
        <button onClick={table_name}>test</button>
      </aside>
    </>
  );
}
