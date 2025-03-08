import { useState } from "react";
import "../pages/Login.css";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import google from "../images/google.png";

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
      <a href={`${process.env.REACT_APP_API_URI}/auth/google`}>
        <button
          type="button"
          className="google"
          style={{
            color: "#000000",
            backgroundColor: "#f7f5f5",
            fontSize: "12px",
            border: "1px solid #bfbfbf",
            boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
            padding: "13px",
          }}
        >
          <img src={google} alt="google" />
          Login with Google
        </button>
      </a>

      <div className="quote-divider">
        <div className="or-line"></div>
        <span className="or">OR</span>
        <div className="or-line"></div>
      </div>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        required={true}
        type="password"
        minLength={4}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button type="submit" disabled={isLoading}>
        Login
      </button>
      <p className="register">
        Don't have an account?{" "}
        <span onClick={() => handleSignup()}>Register</span>
      </p>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
