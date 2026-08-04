import "./OTPVerification.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import background from "../../assets/images/space-background.png";

function OTPVerification() {

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "login";
  const mobileNumber = location.state?.mobileNumber || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = async () => {

    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      alert("Please enter a valid OTP");
      return;
    }

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: mobileNumber,
            otp_code: otpCode,
            purpose: from,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail);
        return;
      }

      // Save user only for LOGIN
      if (from === "login") {

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        navigate("/login-success");

      } else {

        // SIGNUP
        navigate("/complete-profile", {
          state: {
            mobileNumber,
          },
        });

      }

    } catch (error) {

      console.error(error);
      alert("Server Error");

    }

  };

  return (

    <div
      className="otp-page"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >

      <div className="otp-card">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1 className="otp-title">
          Enter OTP
        </h1>

        <p className="otp-subtitle">
          Enter the 6-digit verification code sent to
          <br />
          +91 {mobileNumber}
        </p>

        <div className="otp-boxes">

          {otp.map((digit, index) => (

            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              className="otp-input"
            />

          ))}

        </div>

        <button
          className="verify-btn"
          onClick={handleVerify}
        >
          Verify
        </button>

        <p className="resend-text">

          Didn't receive the code?

          <button className="resend-btn">
            Resend OTP
          </button>

        </p>

      </div>

    </div>

  );
}

export default OTPVerification;