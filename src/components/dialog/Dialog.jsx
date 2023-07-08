import { useEffect, useState, useRef } from "react";
import "./Dialog.css";
import { Btn } from "../button/Btn";
import { Table } from "../table/Table";
import { Input } from "../input/Input";
import { Select } from "../select/Select";
import axios from "axios";

export default function Dialog() {
  useEffect(() => {
    console.log("Dialog");
  }, []);

  const inputContainer = useRef(null);
  const [tables, setTables] = useState([]);
  const [inputsinfo, setinputsinfo] = useState(false);
  const [inputs, setinputs] = useState([]);
  const [table, settable] = useState(false);
  const [select, setselect] = useState(false);

  const getInputInfo = (e) => {
    setinputs("");
    console.log(selectedTable.columns);
    const key = selectedTable.columns.map((c, idx) => idx);
    key.forEach((k) => {
      const tableinputs = inputContainer.current.children[k].children[1];
      setinputs((prev) => [...prev, tableinputs.value]);
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
      .get(`http://localhost:4000/tables/${tableName}`)
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
      //setvalues(true);
      // setTable(true);
      setinputs(true);
      setselect(true);
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
      {setselect && <Select tables={tables} handler={handler} />}
      <h1>{selectedTable.name}</h1>
      <div>
        {settable && (
          <Input columns={selectedTable.columns} inputRef={inputContainer} />
        )}
        {settable && <Table selectedTable={selectedTable} />}
      </div>
      <aside className="CBtn">
        {inputsinfo && <Btn result={inputs} table={selectedTable} />}
        <button onClick={import_tables}>importar</button>
        <button onClick={getInputInfo}>input info</button>
      </aside>
    </>
  );
}
