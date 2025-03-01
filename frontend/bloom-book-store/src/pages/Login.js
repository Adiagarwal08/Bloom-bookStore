import { useState } from "react";
import "../pages/Login.css";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Log in</h1>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Login</button>
      <p className="register">
        Don't have an account?{" "}
        <span onClick={() => handleSignup()}>Register</span>
      </p>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
