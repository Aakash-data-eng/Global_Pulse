import "./SignUp.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";  
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import background from "../../assets/images/space-background.png";
import google from "../../assets/icons/google.avif";

function SignUp() {

  const navigate = useNavigate();
  const googleSignup = useGoogleLogin({
  onSuccess: async (tokenResponse) => {

  alert("Google Success");

  console.log("Google Success");
  console.log(tokenResponse);

  
    try {
      console.log("Calling backend...");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/google-login",
        {
          access_token: tokenResponse.access_token,
        }
      );

      console.log("Backend Response:", response.data);

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      if (response.data.is_new_user) {
  navigate("/complete-profile", {
    state: {
      email: response.data.user.email,
    },
  });
} else {
  navigate("/login-success");
}

    }catch (error) {

  console.error("AXIOS ERROR:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
  }

  alert("Google Signup Failed");
}
  },

  onError: () => {
    alert("Google Login Failed");
  },
});

  return (
    <div
      className="signup-page"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="signup-card">

        {/* Header */}

        <div className="signup-header">

          <img
            src={logo}
            alt="GlobalPulse"
            className="signup-logo"
          />

          <button
            className="close-btn"
            type="button"
            onClick={() => navigate("/")}
          >
            &times;
          </button>

        </div>

        {/* Title */}

        <h1 className="signup-title">
          Create an Account
        </h1>

        <p className="signup-subtitle">
          Start your journey to learn global markets and trading.
        </p>

        {/* Continue with Mobile */}

        <button
          className="mobile-btn"
          type="button"
          onClick={() =>
  navigate("/verify-phone", {
    state: { from: "signup" },
  })
}
        >
          Continue with Mobile Number
        </button>

        {/* Continue with Google */}

     {/* Continue with Google */}

<button
  className="google-btn"
  type="button"
  onClick={() => googleSignup()}
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

        {/* Bottom */}

        <div className="login-text">

          Already have an account?

          <Link to="/login">
            Log In
          </Link>

        </div>

      </div>
    </div>
  );
}

export default SignUp;