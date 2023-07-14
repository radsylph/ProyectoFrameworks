import React, { useContext, useEffect, useState } from "react";
import { TableContext } from "../context/TableContext";
import "./Table.css";
import axios from "axios";

export function Table() {
  const { selectedTable } = useContext(TableContext);

  useEffect(() => {}, [selectedTable]);
  return (
    <div className="table-container flex">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {selectedTable.columns ? (
                selectedTable.columns.map((c, idx) => (
                  <th key={idx}>{c.column_name}</th>
                ))
              ) : (
                <th></th>
              )}
            </tr>
          </thead>
          <tbody>
            {selectedTable.data ? (
              selectedTable.data.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {selectedTable.columns.map((c, colIdx) => (
                    <td key={colIdx}>{row[c.column_name]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
