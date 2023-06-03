import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, deleteUsers } from "../../redux/Actions";
import { MdDisabledVisible } from "react-icons/md";
import { SiStatuspage } from "react-icons/si";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";
import Swal from "sweetalert2";

const Admin = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const [status, setStatus] = useState({
    status: "",
  });
  const navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.getItem("currentuser"));
  useEffect(() => {
    dispatch(getAllUsers());
    if (currentUser.email !== "balta98_@hotmail.com") {
      navigate("/Home");
    }
  }, [dispatch]);

  const handleChangeStatus = async (id) => {
    const userId = id; // Obtener el id del usuario

    // Mostrar la alerta de confirmación
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres deshabilitar a este usuario? No podrá iniciar sesión",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, deshabilitar",
    });

    // Si se confirma la deshabilitación, cambiar el estado a "inactive"
    if (result.isConfirmed) {
      try {
        await axios.put(`/users/${id}`, { status: "inactive" }); // Cambiar el estado a "inactive"
        setStatus({ status: "inactive" }); // Cambiar el estado del componente

        Swal.fire("Usuario deshabilitado", "", "success").then(() => {
          window.location.reload(); // Recargar la página
        });
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "No se pudo deshabilitar al usuario", "error");
      }
    }
  };

  const handleChangeStatusActive = async (id) => {
    const userId = id; // Obtener el id del usuario

    // Mostrar la alerta de confirmación
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres habilitar a este usuario? Podrá iniciar sesión nuevamente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, habilitar",
      cancelButtonText: "Cancelar",
    });

    // Si se confirma la habilitación, cambiar el estado a "active"
    if (result.isConfirmed) {
      try {
        await axios.put(`/users/${id}`, { status: "active" }); // Cambiar el estado a "active"
        setStatus({ status: "active" }); // Cambiar el estado del componente

        Swal.fire("Usuario habilitado", "", "success").then(() => {
          window.location.reload(); // Recargar la página
        });
      } catch (error) {
        Swal.fire("Error", "No se pudo habilitar al usuario", "error");
        console.log(error);
      }
    }
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title:
        "¿Estás seguro que deseas eliminar este usuario? NO SE PUEDE REVERTIR ESTA ACCION",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUsers(id)).then(() => {
          Swal.fire({
            title: "Usuario eliminado con éxito",
            icon: "success",
            showConfirmButton: false,
            timer: 1500, // 2 segundos
            timerProgressBar: true,
          }).then(() => {
            window.location.reload();
            dispatch(getAllUsers());
          });
        });
      }
    });
  };

  return (
    <div>
      <h1 className="tituloadmin">Usuarios registrados</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Rol</th>

            <th>Email</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>
                {user.email === "balta98_@hotmail.com" &&
                user.role === "user" ? (
                  <span className="admin-role">admin</span>
                ) : (
                  user.role
                )}
              </td>
              <td>{user.email}</td>
              <td>
                {user.status}
                {user.email !== "balta98_@hotmail.com" && (
                  <>
                    <button
                      onClick={() => handleDeleteUser(user?.id)}
                      style={{ border: "none" }}
                       className="btnadmin"
                    >
                      <AiOutlineDelete  size={25} style={{border:"none", marginBottom:"-5px",backgroundColor:"transparent", color: "red",cursor:"pointer" }} />
                    </button>{" "}
                    <button style={{ border: "none" }}>
                      {user.status === "active" ? (
                        <MdDisabledVisible 
                        className="btnadmin"
                          onClick={() => handleChangeStatus(user?.id)}
                          size={25} style={{border:"none", marginBottom:"-5px",backgroundColor:"transparent", color: "#3c3a3a", cursor: "pointer" }}
                        />
                      ) : (
                        <SiStatuspage 
                        className="btnadmin"
                          onClick={() => handleChangeStatusActive(user?.id)}
                          size={25} style={{border:"none", marginBottom:"-5px", backgroundColor:"transparent", color: "#100f0f", cursor: "pointer" }}
                        />
                      )}
                    </button>{" "}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
