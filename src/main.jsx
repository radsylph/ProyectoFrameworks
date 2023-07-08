import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    {/* quitar esto cuando valla a hacer los imports dinamicos de la info de la base de datos */}
    <App />
  </>
  // </React.StrictMode>
);
