// import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import { signupService } from "../../services";

import styles from "../Login/Login.module.css";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithCredentials, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    token && navigate("/");
  }, []);

  async function signupHandler(event) {
    event.preventDefault();
    const response = await signupService(name, email, password);
    if (response.status === 200) {
      navigate("/login");
    }
  }

  return (
    <div className={`${styles.main}`}>
      <h2>Signup to Fitverse Shop</h2>
      {/* <label>
        email:{" "} */}
      <form onSubmit={signupHandler}>
        <input
          placeholder="Name"
          className={`${styles.input}`}
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
        />
        <br />
        <input
          placeholder="Email"
          className={`${styles.input}`}
          value={email}
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
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
        {/* </label> */}
        <br />
        <button className={`${styles.button}`} type="submit">
          Signup
        </button>
      </form>
      <br />
      <button
        onClick={() => navigate("/login")}
        className={`${styles.button} ${styles.button_transparent}`}
      >
        Already have an account? Log In!
      </button>
    </div>
  );
};
