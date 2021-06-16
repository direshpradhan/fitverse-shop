import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { login: isUserLoggedIn, token: savedToken } = JSON.parse(
    localStorage?.getItem("login")
  ) || { login: false, token: null };
  // const [login, setLogin] = useState(isUserLoggedIn);
  const [token, setToken] = useState(savedToken);
  const navigate = useNavigate();
  const { state } = useLocation();

  // useEffect(() => {
  //   const loginStatus = JSON.parse(localStorage?.getItem("login"));
  //   loginStatus?.login && setLogin(true);
  // }, []);

  function loginService(email, password) {
    return axios.post("https://Fitverse-Shop-Backend.pdiresh.repl.co/login", {
      email,
      password,
    });
  }

  async function loginWithCredentials(email, password) {
    try {
      console.log("entered.....");
      const response = await loginService(email, password);
      if (response.status === 200) {
        loginUser(response.data);
      }
    } catch (error) {
      console.log("Sahi password nahi pata kya?", error);
    }
  }

  function loginUser({ token }) {
    setToken(token);
    // setLogin(true);
    localStorage?.setItem("login", JSON.stringify({ login: true, token }));
    navigate(state?.from ? state.from : "/");
  }

  function logout() {
    localStorage.removeItem("login");
    // setLogin(false);
    setToken(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ loginWithCredentials, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
