import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");
    console.log(token + ", " + email);
    if (email && token) {
      localStorage.setItem(
        "user",
        JSON.stringify({ token: token, email: email })
      ); // Save token
      navigate("/");
    }
    // Redirect to the dashboard
  }, [navigate]);

  return <h2>Logging you in...</h2>;
};

export default AuthSuccess;
