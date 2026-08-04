import "./ResetPassword.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import background from "../../assets/images/space-background.png";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const identifier = location.state?.identifier || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please enter both passwords.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier,
            new_password: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Unable to reset password.");
        return;
      }

      navigate("/password-reset-success");
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="reset-page"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="reset-card">

        <div className="reset-icon">🔒</div>

        <h1 className="reset-title">Set New Password</h1>

        <p className="reset-subtitle">
          Create a strong password for your account.
        </p>

        <input
          type="password"
          placeholder="New Password"
          className="reset-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="reset-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="reset-button"
          onClick={handleResetPassword}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

      </div>
    </div>
  );
}

export default ResetPassword;