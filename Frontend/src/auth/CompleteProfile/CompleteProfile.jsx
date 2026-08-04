import "./CompleteProfile.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import background from "../../assets/images/space-background.png";

function CompleteProfile() {

  const navigate = useNavigate();
  const location = useLocation();

  const emailFromGoogle = location.state?.email || "";
  const mobileNumber = location.state?.mobileNumber || "";

  const [email, setEmail] = useState(emailFromGoogle);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = async () => {

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!userName.trim()) {
      alert("Please enter username.");
      return;
    }

    if (!password.trim()) {
      alert("Please enter password.");
      return;
    }

    try {

      // ==========================
      // GOOGLE SIGNUP
      // ==========================

      if (emailFromGoogle) {

        const response = await fetch(
          "http://127.0.0.1:8000/api/auth/google-signup-complete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              username: userName,
              password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.detail);
          return;
        }

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        if (user) {
          user.username = userName;

          localStorage.setItem(
            "user",
            JSON.stringify(user)
          );
        }

      }

      // ==========================
      // MOBILE SIGNUP
      // ==========================

      else {

        const response = await fetch(
          "http://127.0.0.1:8000/api/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: userName,
              email,
              mobile_number: mobileNumber,
              password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.detail);
          return;
        }

      }

      alert("Account Created Successfully");

// Save newly created user
localStorage.setItem(
  "user",
  JSON.stringify({
    username: userName,
    email: email,
    mobile_number: mobileNumber,
  })
);

navigate("/login-success");

    } catch (error) {

      console.error(error);

      alert("Server Error");

    }

  };

  return (

    <div
      className="complete-profile-page"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >

      <div className="complete-profile-card">

        <button
          type="button"
          className="complete-profile-back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="complete-profile-icon">
          👤
        </div>

        <h1 className="complete-profile-title">
          Complete Your Account
        </h1>

        <p className="complete-profile-subtitle">
          Almost there! Just a few more details to finish setting up.
        </p>

        <div className="complete-profile-form">

          {/* Email */}

          <div className="complete-profile-email">

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!!emailFromGoogle}
            />

            {emailFromGoogle && (

              <span className="complete-profile-badge">
                Google
              </span>

            )}

          </div>

          {/* Username */}

          <input
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) =>
              setUserName(e.target.value)
            }
          />

          {/* Password */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {/* Button */}

          <button
            type="button"
            className={`create-account-btn ${
              userName &&
              password &&
              email
                ? "active"
                : ""
            }`}
            disabled={
              !userName ||
              !password ||
              !email
            }
            onClick={handleCreateAccount}
          >
            Create Account
          </button>

        </div>

      </div>

    </div>

  );
}

export default CompleteProfile;