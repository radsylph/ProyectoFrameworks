import { createContext, useState } from "react";



const TableContext = createContext();

const TableContextProvider = (props) => {
    const [tables, setTables] = useState([])
    const [selectedTable, setSelectedTable] = useState('') 
    return (
        <TableContext.Provider 
    value={{
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