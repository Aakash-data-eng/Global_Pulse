import "./LoginSuccess.css";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import background from "../../assets/images/space-background.png";
import successIcon from "../../assets/images/success.png";

function LoginSuccess() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // useEffect(() => {

  //   const timer = setTimeout(() => {
  //     navigate("/dashboard");
  //   }, 2500);

  //   return () => clearTimeout(timer);

  // }, [navigate]);

  return (
    <div
      className="success-page"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="success-card">

    <img
        src={successIcon}
        alt="Success"
        className="success-icon"
    />

    <h1 className="success-title">
        Welcome,
        <br />
        {user?.full_name || user?.username || "User"} 🎉
    </h1>

    <p className="success-subtitle">
        Your account has been verified successfully.
        <br />
        Everything is ready.
        <br />
        Continue to your personalized dashboard.
    </p>

    <button
        className="dashboard-btn"
        onClick={() => navigate("/dashboard")}
    >
        Go to Dashboard →
    </button>

</div>
    </div>
  );
}

export default LoginSuccess;