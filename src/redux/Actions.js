import axios from "axios";
import bcrypt from "bcryptjs";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const DELETE_USER = "DELETE_USER";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";

export const getAllUsers = () => {
    return async function (dispatch) {
      const bdUsers = await axios.get(`/users`);
      return dispatch({
        type: "GET_ALL_USERS",
        payload: bdUsers.data,
      });
    };
  };

  export const deleteUsers = (id) => {
    return async function (dispatch) {
      const bdUsers = await axios.delete(`/users/${id}`);
      return dispatch({
        type: "DELETE_USER",
        bdUsers,
      });
    };
  }

  export const changePassword = (userData) => {
    return async function (disptach) {
      const response = await axios.put("/update", userData);
      const user = response.data;
      return disptach({
        type: "CHANGE_PASSWORD",
        payload: user,
      });
    };
  };


  export const signInUser = (userData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post("/signin", userData);
        const user = response.data;
        if (user && user.password) {
          const passwordMatch = await bcrypt.compare(
            userData.password,
            user.password
          );
          if (passwordMatch && user.status === "active") {
            sessionStorage.setItem("isAuthenticated", true);
            sessionStorage.setItem("currentuser", JSON.stringify(user));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  };


  export const signUpUser = (userData, history) => {
    return async function (dispatch) {
      const response = await axios.post("/signup", userData);
      
      const user = response.data;
      
  
      return dispatch({
        type: "POST_USER",
        payload: user,
      });
    };
  };


  export const logoutUser = () => {
    return (dispatch) => {
      return axios.get("/logout");
    };
  };
  