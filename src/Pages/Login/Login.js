import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithCredentials } = useAuth();

  function loginHandler() {
    loginWithCredentials(username, password);
  }

  return (
    <div>
      <label>
        Username:{" "}
        <input
          onChange={(event) => setUsername(event.target.value)}
          type="text"
        />
      </label>
      <br />
      <label>
        Password:{" "}
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
      </label>
      <br />
      <button onClick={loginHandler}>Login</button>
    </div>
  );
};
