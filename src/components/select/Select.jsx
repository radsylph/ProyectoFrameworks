import {React , useState, useEffect, useContext} from "react"
import { TableContext } from "../context/TableContext";
export function Select({handler}){
const {tables} = useContext(TableContext)
    return(
    <div>
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
    </div>
    );
}