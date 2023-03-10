import axios, { axiosAuth } from "../api/Axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
  logIn: () => {},
  register: () => {},
  logout: () => {},
  refresh: () => {},
});

const AuthContextProvider = ({ children }) => {
  const localStorageData = JSON.parse(localStorage.getItem("mern-todo"));
  const [user, setUser] = useState(localStorageData && localStorageData.user);
  const navigate = useNavigate();

  // Register
  const registerHandler = async (userData) => {
    try {
      const res = await axios.post("/api/v1/auth/register", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // setting user
      setUser(() => res.data);
      localStorage.setItem("mern-todo", JSON.stringify({ user: res.data }));
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  // Login
  const loginHandler = async (userData) => {
    try {
      const res = await axios.post("/api/v1/auth/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      // setting user
      setUser(res.data);
      localStorage.setItem("mern-todo", JSON.stringify({ user: res.data }));
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  // Refresh
  const refreshHandler = async () => {
    try {
      const res = await axios.get("/api/v1/auth/refresh");

      const updatedUser = { ...user, accessToken: res.data.accessToken };
      localStorage.setItem("mern-todo", JSON.stringify({ user: updatedUser }));
      setUser(updatedUser);
      return res.data.accessToken;
    } catch (err) {
      console.log(err);
    }
  };

  // Logout
  const logOutHandler = async () => {
    try {
      await axiosAuth.get("/api/v1/auth/logout", {
        headers: {
          authorization: "Bearer " + user.accessToken,
        },
      });
      setUser(null);
      localStorage.removeItem("mern-todo");
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logIn: loginHandler,
        register: registerHandler,
        logout: logOutHandler,
        refresh: refreshHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
