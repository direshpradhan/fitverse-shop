import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fakeAuthApi } from "../fakeAuthApi";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const loginStatus = JSON.parse(localStorage?.getItem("login"));
  const [login, setLogin] = useState(loginStatus?.login);
  const navigate = useNavigate();
  const { state } = useLocation();

  // useEffect(() => {
  //   const loginStatus = JSON.parse(localStorage?.getItem("login"));
  //   loginStatus?.login && setLogin(true);
  // }, []);

  async function loginWithCredentials(username, password) {
    try {
      const response = await fakeAuthApi(username, password);
      if (response.success) {
        setLogin(true);
        localStorage?.setItem("login", JSON.stringify({ login: true }));
        navigate(state?.from ? state.from : "/");
      }
    } catch (error) {
      console.log("Sahi password nahi pata kya?", error);
    }
  }

  function logout() {
    localStorage.removeItem("login");
    setLogin(false);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ login, loginWithCredentials, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
