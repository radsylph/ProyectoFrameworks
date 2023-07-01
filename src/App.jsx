import { useState } from "react";
import Dialog from "./components/dialog/Dialog";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Dialog />
    </>
  );
}

export default App;
