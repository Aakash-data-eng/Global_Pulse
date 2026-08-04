import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import background from "../../assets/images/space-background.png";

function ForgotPassword() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    const cleanedIdentifier = identifier.trim();

    if (!cleanedIdentifier) {
      alert("Please enter your registered Gmail address or mobile number.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: cleanedIdentifier,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Unable to send verification code.");
        return;
      }

      // Show OTP for development
      alert(`Your Verification Code is: ${data.otp}`);

      navigate("/forgot-otp", {
        state: {
          identifier: cleanedIdentifier,
        },
      });

    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !identifier.trim() || loading;

  return (
    <div
      className="forgot-page"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="forgot-card">

        <button
          type="button"
          className="forgot-back"
          onClick={() => navigate("/login")}
        >
          ← Back
        </button>

        <div className="forgot-icon">↻</div>

        <h1 className="forgot-title">
          Forgot Password?
        </h1>

        <p className="forgot-subtitle">
          No worries! Enter your registered Gmail address or mobile number and
          we'll send you a verification code to reset your password.
        </p>

        <input
          type="text"
          className="forgot-input"
          placeholder="Mobile number or Gmail address"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
        />

        <button
          type="button"
          className={`forgot-submit ${!isDisabled ? "active" : ""}`}
          disabled={isDisabled}
          onClick={handleSendCode}
        >
          {loading ? "Sending..." : "Send Verification Code"}
        </button>

      </div>
    </div>
  );
}

export default ForgotPassword;