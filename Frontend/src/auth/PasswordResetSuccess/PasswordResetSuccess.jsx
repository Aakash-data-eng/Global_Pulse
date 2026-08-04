import "./PasswordResetSuccess.css";
import { useNavigate } from "react-router-dom";

import background from "../../assets/images/space-background.png";
import success from "../../assets/images/success.png";

function PasswordResetSuccess() {

  const navigate = useNavigate();

  return (
    <div
      className="password-success-page"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="password-success-card">

        <img
          src={success}
          alt="Success"
          className="password-success-image"
        />

        <h1 className="password-success-title">
          Password Reset Successful!
        </h1>

        <p className="password-success-subtitle">
          Your password has been updated successfully.
          You can now log in using your new password.
        </p>

        <button
          className="password-success-btn"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}

export default PasswordResetSuccess;