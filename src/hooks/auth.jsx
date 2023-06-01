import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../redux/Actions";
import { useDispatch } from "react-redux";

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.allUsers);
  

 
  // SESSION STORAGE

  useEffect(() => {
    const isAuthenticatedSessionStorage = JSON.parse(
      sessionStorage.getItem("isAuthenticated")
    );
    const currentUser = JSON.parse(sessionStorage.getItem("currentuser"));
    const isPublicRoute = ["/signUp", "/signIn",].includes(window.location.pathname);
    const privateRouteUserAuthenticate = !isPublicRoute;
    if (isAuthenticatedSessionStorage || isPublicRoute || currentUser) {
      if (users) {
        const user = users.find((user) => user.status === "active");
        if (user) {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
        sessionStorage.removeItem("isAuthenticated");
        navigate("/Home");
      }
    } else {
      setIsAuthenticated(false);
      navigate("/signIn");
    }
  }, [isAuthenticated, navigate]);

  return [isAuthenticated];
}