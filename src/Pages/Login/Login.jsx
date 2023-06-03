import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { signInUser, getAllUsers } from "../../redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import bcrypt from "bcryptjs";
import useAuth from "../../hooks/auth";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const users = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
    sessionStorage.clear();
  }, [dispatch]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
      status: "active",
    };
    dispatch(signInUser(userData))
      .then(async () => {
        const user = users.find((user) => user.email === userData.email);
        const passwordMatch = await bcrypt.compare(
          userData.password,
          user.password
        );
        if (passwordMatch) {
          sessionStorage.setItem("isAuthenticated", true);
          sessionStorage.setItem("currentuser", JSON.stringify(user));
          isAuthenticated;
          Swal.fire({
            position: "center",
            icon: "info",
            title: "Iniciando sesión...",
            html: "<i class='fas fa-lock'></i>",
            showConfirmButton: false,
            timer: 2000,
          })
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Benvendio!",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .then(() => {
              isAuthenticated ? navigate("/Home") : navigate("/signIn");
            });
        } else {
          if (
            user.status === "inactive" ||
            user.password !== userData.password
          ) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Contraseña incorrecta o usuario no encontrado",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/signIn");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Contraseña incorrecta o usuario no encontrado",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="container-form">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Inicia Sesión</p>
        <div className="input-container">
          <input
            required
            id="email"
            type="email"
            name="email"
            placeholder="Email"
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            required
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
          />
        </div>
        <button className="submit">
          Iniciar sesion 
        </button>

        <p className="signup-link">
          No tienes cuenta ?<Link to="/signUp"> Registrarse</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
