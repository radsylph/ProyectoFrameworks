import { useEffect, useState, useRef, useContext } from "react";
import "./Dialog.css";
import { Btn } from "../button/Btn";
import { Table } from "../table/Table";
import { Input } from "../input/Input";
import { Select } from "../select/Select";
import axios from "axios";
import { TableContext } from "../context/TableContext";

export default function Dialog() {
  useEffect(() => {
    import_tables()
    console.log("Dialog");
  }, []);

const {
  selectedTable,
  setSelectedTable,
  tables,
  setTables
} = useContext(TableContext)

  const inputContainer = useRef(null);
  const [inputsinfo, setInputsinfo] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [table, setTable] = useState(false);
  const [select, setSelect] = useState(false);

  const getInputInfo = (e) => {
    setInputs([]);
    console.log(selectedTable.columns);
    const key = selectedTable.columns.map((c, idx) => idx);
    key.forEach((k) => {
      console.log(inputContainer.current)
      const tableinputs = inputContainer.current.children[k].children[1];
      setInputs((prev) => [...prev, tableinputs.value]);
      setInputsinfo(true);
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
    //  setSelect(true);
    }
  };


  const handler = (e) => {
    let table = tables.filter((t) => {
      return t.name == e.target.value;
    });
    console.log(table[0]);
    setSelectedTable(table[0]);
  };

  return (
    <>
      <Select tables={tables} handler={handler} />
      <h1>{selectedTable.name}</h1>
      <div>
       
        <Input inputRef={inputContainer}/>
       
        <Table/>
      </div>
      <aside className="CBtn">
        {inputsinfo && <Btn result={inputs}/>}
        <button onClick={getInputInfo}>input info</button>
      </aside>
    </>
  );
}
