import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import styles from "./Login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithCredentials, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    token && navigate("/");
  }, []);

  function loginHandler(event) {
    event.preventDefault();
    loginWithCredentials(email, password);
  }

  return (
    <div className={`${styles.main}`}>
      <h2>Login</h2>
      {/* <label>
        email:{" "} */}
      <form onSubmit={(event) => loginHandler(event)}>
        <input
          placeholder="Email"
          className={`${styles.input}`}
          onChange={(event) => setEmail(event.target.value)}
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
          type="submit"
          // onClick={() => loginHandler(event)}
        >
          Login
        </button>
      </form>
      <br />
      <button className={`${styles.button} ${styles.button_transparent}`}>
        New to Fitverse? Sign up!
      </button>
    </div>
  );
};
