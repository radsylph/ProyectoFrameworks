import { createContext, useState } from "react";



const TableContext = createContext();

const TableContextProvider = (props) => {
    const [tables, setTables] = useState([])
    const [selectedTable, setSelectedTable] = useState({name: "", columns:[]}) 
    const [data, setData] = useState({})
    return (
        <TableContext.Provider 
    value={{
        data, 
        setData,
        tables, 
        setTables,
        selectedTable, 
        setSelectedTable
    }}
    > 
           {props.children}
        </TableContext.Provider>
    )

}

export {TableContext, TableContextProvider}