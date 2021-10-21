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

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 403) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  async function loginWithCredentials(email, password) {
    try {
      console.log("entered.....");
      const response = await loginService(email, password);
      console.log(response);
      const {
        data: { message, success },
        status,
      } = response;

      if (status === 200) {
        console.log("status 200");
        loginUser(response.data);
      }
      return { message, success };
    } catch (error) {
      const { message, success } = error?.response?.data;
      console.log("Wrong Password!! Try again.", error);
      return { message, success };
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
    console.log(state);
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
    <AuthContext.Provider
      value={{ loginWithCredentials, loginUser, logout, token, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
