import React from "react";
import "./Home.css";
import {BsBluetooth} from "react-icons/bs";
const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a la aplicación para enviar y recibir archivos por Bluetooth</h1>
      <p>Comparte archivos de forma rápida y segura con dispositivos cercanos.</p>
      <BsBluetooth size={200} style={{color:"blue"}} className="icono-bt"/>
    </div>
  )
}
  
  export default Home;
