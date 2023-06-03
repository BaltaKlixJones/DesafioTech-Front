import React from 'react'
import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from './Pages/Register/Signup';
import Home from './Pages/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Enviar from './Components/EnviarArchivos/Enviar';
import Recibir from './Components/Recibir/Recibir';
import Admin from './Components/Admin/Admin';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import Bann from './Pages/Baneo/Bann';
import axios from "axios";


axios.defaults.baseURL = "http://localhost:3001/";

function App() {
 
  const navigate = useNavigate();
  return (
    <>
    <NavBar/>
   <Routes> 
      <Route path="/signIn" element={<Login/>} />
      <Route path="/signUp" element={<Signup/>} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/send" element={<Enviar/>} />
      <Route path="/recibir" element={<Recibir/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/perfil" element={<ChangePassword/>} />
      <Route path="/deshabilitado" element={<Bann/>} />
   </Routes>
    </>
  )
}

export default App
