import React from "react";


export function Table({ selectedTable }) {
  return (
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
  );
}
