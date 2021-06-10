import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import styles from "./Login.module.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithCredentials, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    login && navigate("/");
  }, []);

  function loginHandler(event) {
    // event.preventdefault();
    loginWithCredentials(username, password);
  }

  return (
    <div className={`${styles.main}`}>
      <h2>Login</h2>
      {/* <label>
        Username:{" "} */}
      {/* <form> */}
      <input
        placeholder="Username/Email"
        className={`${styles.input}`}
        onChange={(event) => setUsername(event.target.value)}
        type="text"
      />
      {/* </label> */}
      <br />
      {/* <label>
        Password:{" "} */}
      <input
        placeholder="Password"
        className={`${styles.input}`}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
      />
      {/* </label> */}
      <br />
      <button
        className={`${styles.button}`}
        onClick={(event) => loginHandler(event)}
      >
        Login
      </button>
      {/* </form> */}
      <br />
      <button className={`${styles.button} ${styles.button_transparent}`}>
        New to Fitverse? Sign up!
      </button>
    </div>
  );
};
