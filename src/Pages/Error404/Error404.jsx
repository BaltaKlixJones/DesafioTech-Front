import React from "react";
import "./Error404.css";
import { Link } from "react-router-dom";
const Error404 = () => {
  return (
    <div className="error404-container">
      <h1>¡Error 404!</h1>
      <p>La página que estás buscando no existe.</p>
      <p>Por favor, verifica la URL o regresa a la página de inicio.</p>
      <Link to= "/Home">
    Volver a la página de inicio
      </Link>
    </div>
  );
};

export default Error404;
