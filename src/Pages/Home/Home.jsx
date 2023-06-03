import React, {useEffect} from "react";
import "./Home.css";
import {BsBluetooth} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const currentuser = JSON.parse(sessionStorage.getItem("currentuser"));

  useEffect(() => {
    if (!currentuser || currentuser.email == "null") {
      navigate("/signIn");
    } else if (currentuser.status === "inactive") {
      navigate("/deshabilitado");
    }
  }, [navigate])
  return (
    <div className="home-container">
      <h1>Bienvenido a la aplicación para enviar y recibir archivos por Bluetooth</h1>
      <p>Comparte archivos de forma rápida y segura con dispositivos cercanos.</p>
      <BsBluetooth size={200} style={{color:"blue"}} className="icono-bt"/>
    </div>
  )
}
  
  export default Home;
