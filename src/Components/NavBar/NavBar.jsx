import React, {useEffect} from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/Actions";
import { BiLogOut } from "react-icons/bi";
import Swal from "sweetalert2";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentuser = JSON.parse(sessionStorage.getItem("currentuser"));

  // useEffect(() => {
  //   if (!currentuser || !currentuser.email ) {
  //     navigate("/signIn");
  //   }
  // }, [navigate])


  const handleLogout = async () => {
    dispatch(logoutUser());
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("currentuser");

    await Swal.fire({
      position: "center",
      icon: "info",
      title: "Cerrando sesión...",
      html: "<i class='fas fa-lock'></i>",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Sesión cerrada!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
    navigate("/signIn");
  };

  return location.pathname === "/Home" ||
    location.pathname === "/send" ||
    location.pathname === "/recibir" ||
    location.pathname === "/admin" ||
    location.pathname === `/perfil` ? (
    <nav className="navbar">
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/Home" style={{ textDecoration: "none" }}>
            <h1>Inicio</h1>
          </Link>
        </li>
      {currentuser &&
            currentuser.email &&
            currentuser.email === "balta98_@hotmail.com" && (
              <li className="nav-item">
                <Link to="/admin" style={{ textDecoration: "none" }}>
                  <h1>Panel de Admin</h1>
                </Link>
              </li>
            )}
        <li className="nav-item">
          <Link to="/send" style={{ textDecoration: "none" }}>
            <h1>Enviar </h1>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/recibir" style={{ textDecoration: "none" }}>
            <h1>Recibir </h1>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={`/perfil`} style={{ textDecoration: "none" }}>
            <h1>Editar Perfil</h1>
          </Link>
        </li>
        <button className="btnlogout" onClick={handleLogout}>
          <BiLogOut size={40} />
        </button>
      </ul>
    </nav>
  ) : null;
};

export default NavBar;
