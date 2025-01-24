import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.js"; // Aquí importamos el componente App
import "./css/style.css"; // Archivo de estilos

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
