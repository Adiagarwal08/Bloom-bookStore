import { useState } from "react";
import "../pages/Signup.css";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

import google from "../images/google.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h1>Sign up</h1>

      <button
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
        Signup with Google
      </button>
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
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Sign up</button>
      <p className="register">
        Already have an account?{" "}
        <span onClick={() => handleLogin()}>Login</span>
      </p>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
