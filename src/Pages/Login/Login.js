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
      <h2>Login to Fitverse Shop</h2>
      {/* <label>
        email:{" "} */}
      <form onSubmit={(event) => loginHandler(event)}>
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

        <br />
        <button className={`${styles.button}`} type="submit">
          Login
        </button>
      </form>

      <div
        onClick={() => {
          setEmail(() => "test@test.com");
          setPassword(() => "test@123");
        }}
        className={`${styles.guest}`}
      >
        Login as Guest
      </div>

      <div className={`text-centre`}>
        New to Fitverse?{" "}
        <a href="/signup" className={`${styles.signup_link}`}>
          Sign up!
        </a>
      </div>
    </div>
  );
};
