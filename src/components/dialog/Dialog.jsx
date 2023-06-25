import { useEffect, useState } from "react"

export default function Dialog(){

    const [tables, setTables] = useState ( [
        {
        name: "empleado"
    },
    {
        name: "cliente"
    },
    {
        name: "factura"
    },
    {
        name: "cargo"
    }
])
const [selectedTable, setSelectedTable] = useState("")
const handler = (e) => {
    setSelectedTable(e.target.value)
}


return(
    <>
        <select name="table" id="table" onChange={handler}>
            {
                tables.map((t,idx) => <option key={idx}>{t.name}</option>)
            }
        </select>
            <h1>{selectedTable}</h1>
    </>
)
}