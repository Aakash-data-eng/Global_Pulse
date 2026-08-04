import "./ForgotOTP.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import background from "../../assets/images/space-background.png";

function ForgotOTP() {

  const navigate = useNavigate();
  const location = useLocation();

  const identifier = location.state?.identifier || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {

    if (!/^[0-9]?$/.test(value)) return;

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
      alert("Enter valid OTP");
      return;
    }

    try {
console.log(identifier);
      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
         body: JSON.stringify({
  identifier,
  otp_code: otpCode,
  purpose: "forgot-password",
}),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail);
        return;
      }

      navigate("/reset-password", {
        state: {
          identifier,
        },
      });

    } catch {

      alert("Server Error");

    }
  };

  return (

    <div
      className="forgot-otp-page"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >

      <div className="forgot-otp-card">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1>
          Verify Your
          <br />
          Account
        </h1>

        <p>
          Enter the 6-digit verification code sent to
          <br />
          {identifier}
        </p>

        <div className="otp-container">

          {otp.map((digit, index) => (

            <input
              key={index}
              id={`otp-${index}`}
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
            />

          ))}

        </div>

        <button
          className="verify-btn"
          disabled={otp.join("").length !== 6}
          onClick={handleVerify}
        >
          Verify
        </button>

        <p className="resend-text">

          Didn't receive the code?

          <span>
            Resend OTP
          </span>

        </p>

      </div>

    </div>

  );
}

export default ForgotOTP;