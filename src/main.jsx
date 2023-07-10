import React from "react";
import ReactDOMServer from 'react-dom/server' 
import fs from 'fs'
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { TableContextProvider } from "./components/context/TableContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    {/* quitar esto cuando valla a hacer los imports dinamicos de la info de la base de datos */}
    <TableContextProvider>
       <App />
    </TableContextProvider>
  </>
  // </React.StrictMode>
);
