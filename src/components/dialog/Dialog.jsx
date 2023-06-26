import { useEffect, useState } from "react"
import './Dialog.css'
export default function Dialog(){

    const [tables, setTables] = useState ( [
        {
        name: "empleado",
        columns: [
            {
                name: "id",
                type: "string",
                FK: false
            }, 
        "descric"] 

    },
    {
        name: "cliente",
        columns: ["id", "descric", "id_cargo"]
    },
    {
        name: "factura",
        columns: ["id", "descric", "fecha"]
    },
    {
        name: "cargo",
        columns: ["id", "descric"]
    }
])
const [selectedTable, setSelectedTable] = useState({})
const handler = (e) => {
    let table = tables.filter(t =>{
        return t.name == e.target.value
    })
    console.log(table[0])
    setSelectedTable(table[0])
}


return(
    <>
        <select name="table" id="table" defaultValue={"DEFAULT"} onChange={handler}>
            <option value="DEFAULT" disabled  hidden >Seleccione una tabla</option>
            {
                tables.map((t,idx) => <option key={idx}>{t.name}</option>)
            }
        </select>
            <h1>{selectedTable.name}</h1>
            <div>
            {selectedTable.columns?selectedTable.columns.map((c,idx) => 
                <div key={idx}>
                <label>{c}</label> 
                <input type="text" />              
                </div>
                ):<></>}
            <table>
                
                <thead>
                <tr>
                {selectedTable.columns?selectedTable.columns.map((c,idx) => 
                <th key={idx}>{c}</th> 
                ):<th></th>}
                </tr>       
                </thead>
                <tbody>
                 <tr>
                 {selectedTable.columns?selectedTable.columns.map((c,idx) => 
                <td key={idx}></td> 
                ):<td></td>}
                </tr>
                 
                </tbody>
                
            </table>

            <button>insertar</button>
            <button>modificar</button>
            <button>eliminar</button>
            <button>actualizar</button>
            <button>salir</button>

            </div>
    </>
)
}