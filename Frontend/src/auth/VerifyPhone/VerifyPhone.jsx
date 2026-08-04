import "./VerifyPhone.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import background from "../../assets/images/space-background.png";

function VerifyPhone() {

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "login";

  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

 const handleContinue = async () => {

  if (mobileNumber.length !== 10) {
    alert("Enter a valid mobile number");
    return;
  }

  try {

    setLoading(true);

    // Decide which API to call
    const apiUrl =
  from === "signup"
    ? "http://127.0.0.1:8000/api/auth/send-signup-otp"
    : "http://127.0.0.1:8000/api/auth/send-login-otp";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile_number: mobileNumber,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.detail);
      return;
    }

    // Development only
    alert(`Your OTP is: ${data.otp}`);

    navigate("/OTPVerification", {
      state: {
        from,
        mobileNumber,
      },
    });

  } catch (error) {

    console.error(error);
    alert("Unable to connect to server.");

  } finally {

    setLoading(false);

  }

};

  return (
    <div
      className="verify-page"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="verify-card">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1 className="verify-title">
          Verify your
          <br />
          Mobile Number
        </h1>

        <p className="verify-subtitle">
          We'll send you a verification code
          to confirm your number.
        </p>

        <label className="phone-label">
          Phone number
        </label>

        <div className="phone-row">

          <select className="country-code">
            <option>+91</option>
            <option>+1</option>
            <option>+44</option>
          </select>

          <input
            type="tel"
            placeholder="9876543210"
            className="phone-input"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />

        </div>

        <button
          type="button"
          className="continue-btn"
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? "Sending..." : "Continue"}
        </button>

      </div>
    </div>
  );
}

export default VerifyPhone;