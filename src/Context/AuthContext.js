import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginService } from "../services";

const AuthContext = createContext();

const setupAuthHeaderForServiceCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  }
  delete axios.defaults.headers.common["Authorization"];
};

export const AuthContextProvider = ({ children }) => {
  const {
    login: isUserLoggedIn,
    token: savedToken,
    user: savedUser,
  } = JSON.parse(localStorage?.getItem("login")) || {
    login: false,
    token: null,
    user: null,
  };
  // const [login, setLogin] = useState(isUserLoggedIn);
  const [token, setToken] = useState(savedToken);
  const [user, setUser] = useState(savedUser);
  const navigate = useNavigate();
  const { state } = useLocation();

  async function loginWithCredentials(email, password) {
    try {
      console.log("entered.....");
      const response = await loginService(email, password);
      if (response.status === 200) {
        loginUser(response.data);
      }
    } catch (error) {
      console.log("Wrong Password!! Try again.", error);
    }
  }

  function loginUser({ token, user }) {
    setToken(token);
    setUser(user);
    setupAuthHeaderForServiceCalls(token);
    localStorage?.setItem(
      "login",
      JSON.stringify({ login: true, token, user })
    );
    navigate(state?.from ? state.from : "/");
  }

  function logout() {
    localStorage.removeItem("login");
    setupAuthHeaderForServiceCalls(null);
    token && setToken(null);
    navigate("/");
  }

  useEffect(() => {
    token && setupAuthHeaderForServiceCalls(token);
  });

  return (
    <AuthContext.Provider value={{ loginWithCredentials, logout, token, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
