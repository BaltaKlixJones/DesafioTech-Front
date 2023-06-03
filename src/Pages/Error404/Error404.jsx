import React from "react";
import "./Error404.css";
import { Link } from "react-router-dom";
const Error404 = () => {
  return (
    <div className="error404-container">
      <h1>¡Error 404!</h1>
      <h2>La página que estás buscando no existe.</h2>
      <h3>Por favor, verifica la URL o regresa a la página de inicio.</h3>
      <Link to= "/Home">
    <h4>Volver a la página de inicio</h4>
      </Link>
    </div>
  );
};

export default Error404;
