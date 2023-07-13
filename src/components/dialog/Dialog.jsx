import { useEffect, useState, useRef, useContext } from "react";
import "./Dialog.css";

import { Table } from "../table/Table";
import { Input } from "../input/Input";
import { Select } from "../select/Select";
import axios from "axios";
import { TableContext } from "../context/TableContext";

export default function Dialog() {
  useEffect(() => {
    import_tables();
    console.log("Dialog");
  }, []);

  const { selectedTable, setSelectedTable, tables, setTables } =
    useContext(TableContext);

  const inputContainer = useRef(null);

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
    }
  };

  const table_columns = (tableName) => {
    console.log("table_columns");
    axios
      .get(`http://localhost:4000/getInfo/${tableName}`)
      .then((response) => {
        const tableColumns = response.data;
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

  const handler = (e) => {
    let table = tables.filter((t) => {
      return t.name == e.target.value;
    });
    console.log(table[0]);
    setSelectedTable(table[0]);
  };

  return (
    <div className="components-container">
      <Select handler={handler} />
      <h1>{selectedTable.name}</h1>
      <div>
        <Input inputRef={inputContainer} />
        <Table />
      </div>
    </div>
  );
}
