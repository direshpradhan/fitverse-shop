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
  const [signupStatus, setSignupStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { loginWithCredentials, loginUser, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    token && navigate("/");
  }, []);

  async function signupHandler(event) {
    event.preventDefault();
    try {
      if (name !== "" && email !== "" && password !== "") {
        setSignupStatus("loading");
        const {
          data: { success, message, user, token },
          status,
        } = await signupService(name, email, password);
        console.log(user);
        if (status === 200) {
          setSignupStatus("success");
          loginUser({ token, user });
          // navigate("/login");
        }
      } else {
        setSignupStatus("failed");
        if (name === "") return setErrorMessage("Enter name !!");

        name !== "" && email === ""
          ? setErrorMessage("Enter email !!")
          : setErrorMessage("Enter password !!");
      }
    } catch (error) {
      setSignupStatus("failed");
      setName("");
      setEmail("");
      setPassword("");
      const { message } = error.response.data;
      console.log(message);
      setErrorMessage(message);
      console.log("Error with signup!!", error);
    }
  }

  return (
    <div className={`${styles.main}`}>
      <h2>Signup to Fitverse Shop</h2>
      {/* <label>
        email:{" "} */}

      {signupStatus === "failed" && (
        <div class={`alert alert-error flex ${styles.alert}`}>
          <span class="material-icons-outlined"> error_outline </span>
          <span>{errorMessage}</span>
        </div>
      )}
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
          {signupStatus === "loading" ? "Signing up. Please wait..." : "Signup"}
        </button>
      </form>
      <br />
      <div className="text-centre">
        Already have an account?{" "}
        <a href="/login" className={`${styles.link}`}>
          Log In!
        </a>
      </div>
    </div>
  );
};
