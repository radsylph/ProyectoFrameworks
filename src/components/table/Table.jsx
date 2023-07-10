import React, { useContext } from "react";
import { TableContext } from "../context/TableContext";


export function Table() {
  const {selectedTable} = useContext(TableContext)
  return (
    <table>
      <thead>
        <tr>
          {selectedTable.columns ? (
            selectedTable.columns.map((c, idx) => <th key={idx}>{c.column_name}</th>)
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
  );
}
