import React, { useEffect } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, signUpUser } from "../../redux/Actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    dispatch(getAllUsers());
    sessionStorage.clear();
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const password = event.target.elements.password.value;
    // const repeatPassword = event.target.elements["repeat-password"].value;

    

    const userData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };

    try {
      const response = await axios.post("/signup", userData);
      const user = response.data;
      dispatch(signUpUser(userData));
      setIsLoggedIn(true);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario registrado correctamente",
        text: "Por favor, inicie sesión para continuar",
        showConfirmButton: true,
        timer: 0,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      navigate(`/signIn`);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al registrarse",
        showConfirmButton: false,
        timer: 1800,
      });
      navigate("/signUp");
    }
  };

  return (
    <div>
      <form className ="form" onSubmit={handleSubmit}>
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <label>
          <input required placeholder="" name="email" id="email" type="email" className="input" />
          <span>Email</span>
        </label>

        <label>
          <input
            required
            placeholder=""
            name="password"
            id="password"
            type="password"
            className="input"
          />
          <span>Password</span>
        </label>
        <label>
          <input
            required
            placeholder=""
            type="password"
            name="repeat-password"
            id="repeat-password"
            className="input"
          />
          <span>Confirm password</span>
        </label>
        <button type="submit" className="submit">Submit</button>
        <p className="signin">
          Already have an acount ?<Link to="/signIn">{" "}Signin</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
