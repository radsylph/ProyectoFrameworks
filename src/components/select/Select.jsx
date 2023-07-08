import {React , useState, useEffect} from "react"
export function Select({tables , handler}){
// const [tables, setTables] = useState([]);

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