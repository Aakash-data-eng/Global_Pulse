import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import logo from "../../assets/images/logo.png";
import background from "../../assets/images/space-background.png";
import google from "../../assets/icons/google.avif";

function Login() {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/auth/google-login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: tokenResponse.access_token,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem(
            "access_token",
            data.access_token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );

          navigate("/login-success");
        } else {
          alert(data.detail || "Google Login Failed");
        }
      } catch (error) {
        console.error(error);
        alert("Server Error");
      }
    },

    onError: () => {
      alert("Google Login Failed");
    },
  });

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="login-card">

        {/* Header */}

        <div className="login-header">

          <img
            src={logo}
            alt="GlobalPulse"
            className="login-logo"
          />

          <button
            className="close-btn"
            type="button"
          >
            &times;
          </button>

        </div>

        {/* Title */}

        <h1 className="login-title">
          Welcome Back
        </h1>

        <p className="login-subtitle">
          Log in to continue your trading journey.
        </p>

        {/* Mobile Login */}

        <button
          className="mobile-btn"
          onClick={() =>
            navigate("/verify-phone", {
              state: {
                from: "login",
              },
            })
          }
        >
          Continue with Mobile Number
        </button>

        {/* Google Login */}

        <button
          className="google-btn"
          onClick={() => googleLogin()}
        >
          <img
            src={google}
            alt="Google"
            className="google-icon"
          />

          Continue with Google
        </button>

        {/* Divider */}

        <div className="divider">

          <span className="line"></span>

          <span className="or-text">
            OR
          </span>

          <span className="line"></span>

        </div>

        {/* Login Form */}

        <form className="login-form">

          <div className="input-group">

            <input
              type="text"
              placeholder="Username"
              className="login-input"
            />

          </div>

          <div className="input-group">

            <input
              type="password"
              placeholder="Password"
              className="login-input"
            />

          </div>

          <div className="forgot-password">

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>

          <button
  type="button"
  className="login-submit-btn"
  onClick={() => navigate("/login-success")}
>
  Login
</button>

        </form>

        <div className="signup-text">

          Don't have an account?

          <Link to="/signup">
            Create Account
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Login;