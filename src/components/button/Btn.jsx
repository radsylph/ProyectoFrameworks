import { useEffect, useState } from "react";
import "./Btn.css";
export function Btn() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("Btn");
  }, []);

  const BtnCreate = () => {
    // pasar los parametro para crear el insert a la tabla
    console.log("Create nose");
  };

  const BtnRead = () => {
    // hacer la query en general
    console.log("Read nose ");
  };

  const BtnUpdate = () => {
    // pasar los parametro para crear el update a la tabla
    console.log("Update nose ");
  };

  const BtnDelete = () => {
    // pasar los parametro para crear el delete a la tabla
    console.log("Delete nose");
  };

  const handleBtnFunction = (e) => {
    switch (e.target.textContent) {
      case "Create":
        BtnCreate();
        break;
      case "Read":
        BtnRead();
        break;
      case "Update":
        BtnUpdate();
        break;
      case "Delete":
        BtnDelete();
        break;
      default:
        break;
    }
  };

  return (
    <div className="test">
      <div className="container">
        <button className="Btn" onClick={handleBtnFunction}>
          Create
        </button>
        <button className="Btn" onClick={handleBtnFunction}>
          Read
        </button>
        <button className="Btn" onClick={handleBtnFunction}>
          Update
        </button>
        <button className="Btn" onClick={handleBtnFunction}>
          Delete
        </button>
      </div>
    </div>
  );
}
