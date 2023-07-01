import { useEffect, useState, useCallback } from "react";
import "./Dialog.css";
import { Btn } from "../button/Btn";
import axios from "axios";
export default function Dialog() {
  useEffect(() => {
    //console.log("Dialog");
  }, []);

  const [tables, setTables] = useState([]);
  const [inputsinfo, setinputsinfo] = useState(false);
  const [inputs, setinputs] = useState([]);

  const getInputInfo = (e) => {
    setinputs("");
    console.log(selectedTable.columns);
    const key = selectedTable.columns.map((c, idx) => idx);
    key.forEach((k) => {
      //test
      const tableinputs = document.getElementById(k);
      const { value } = tableinputs;
      setinputs((prev) => [...prev, value]);
      setinputsinfo(true);
    });
  };

  const import_tables = () => {
    console.log("import_tables");
    axios
      .get("http://localhost:4000/tables")
      .then((response) => {
        const tableNames = response.data.data.map((table) => table.tablename);
        if (tableNames.length === 0) {
          return;
        }

        tableNames.forEach((tableName) => {
          table_columns(tableName);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const table_columns = (tableName) => {
    console.log("table_columns");
    axios
      .get(`http://localhost:4000/columns/${tableName}`)
      .then((response) => {
        const tableColumns = response.data.data[0].columns;
        console.log(tableColumns);

        if (tables.some((t) => t.name === tableName)) {
          return;
        } else {
          addTable(tableName, tableColumns);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTable = (name, columns) => {
    console.log("addTable");
    if (tables.some((t) => t.name === name)) {
      return;
    } else {
      setTables((prevTables) => [
        ...prevTables,
        {
          name: name,
          columns: columns,
        },
      ]);
      setvalues(true);
    }
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
      {/* esto tiene que ser un componente, no se si poner el option dentro del componente select o hacerlo su propio componente tambin pero hay veo */}
      <select
        name="table"
        id="table"
        defaultValue={"DEFAULT"}
        onChange={handler}
      >
        {" "}
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
              <input type="text" id={idx} />
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
      </div>
      <aside className="CBtn">
        {inputsinfo && <Btn result={inputs} table={selectedTable} />}
        <button onClick={import_tables}>importar</button>
        <button onClick={getInputInfo}>input info</button>
      </aside>
    </>
  );
}
