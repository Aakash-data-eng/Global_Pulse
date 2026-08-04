import { createContext, useContext, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Landing from "./auth_old/pages/Landing";
import Login from "./auth/Login/Login";
import SignUp from "./auth/SignUp/SignUp";
import VerifyPhone from "./auth/VerifyPhone/VerifyPhone";
import OTPVerification from "./auth/OTPVerification/OTPVerification";
import ForgotPassword from "./auth/ForgotPassword/ForgotPassword";
import ForgotOTP from "./auth/ForgotOTP/ForgotOTP";
import ResetPassword from "./auth/ResetPassword/ResetPassword";
import PasswordResetSuccess from "./auth/PasswordResetSuccess/PasswordResetSuccess";
import LoginSuccess from "./auth/LoginSuccess/LoginSuccess";
import GoogleLogin from "./auth/GoogleLogin/GoogleLogin";
import CompleteProfile from "./auth/CompleteProfile/CompleteProfile";

// Dashboard Pages
import DashboardLayout from "./pages/Dashboard/DashboardLayout/DashboardLayout.jsx";
import Dashboard from "./pages/Dashboard/Home/Dashboard.jsx";
import Goals from "./pages/Dashboard/Goals/Goals.jsx";
import Constituents from "./pages/Dashboard/Constituents/Constituents.jsx";
import MarketAnalysis from "./pages/Dashboard/MarketAnalysis/MarketAnalysis.jsx";
import LearningHub from "./pages/Dashboard/LearningHub/LearningHub.jsx";
import ExpenseTracker from "./pages/Dashboard/ExpenseTracker/ExpenseTracker.jsx";
import Upgrade from "./pages/Dashboard/Upgrade/Upgrade.jsx";
import Settings from "./pages/Dashboard/Settings/Settings.jsx";
import Profile from "./pages/Dashboard/Profile/Profile.jsx";

const FlowContext = createContext(null);

export function useFlow() {
  return useContext(FlowContext);
}

export default function App() {
  const [flow, setFlow] = useState({
    country: "+91",
    phone: "",
    email: "john.abc@gmail.com",
    username: "john",
  });

  const value = useMemo(
    () => ({
      flow,
      updateFlow: (next) =>
        setFlow((current) => ({
          ...current,
          ...next,
        })),
    }),
    [flow]
  );

  return (
    <FlowContext.Provider value={value}>
      <Routes>

        {/* Authentication */}
       <Route path="/" element={<Landing />} />
<Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-phone" element={<VerifyPhone />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-otp" element={<ForgotOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/password-reset-success"
          element={<PasswordResetSuccess />}
        />
        <Route path="/google-login" element={<GoogleLogin />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route
          path="/complete-profile"
          element={<CompleteProfile />}
        />
        <Route
          path="/complete-account"
          element={<CompleteProfile google />}
        />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="goals" element={<Goals />} />
          <Route path="constituents" element={<Constituents />} />
          <Route path="market-analysis" element={<MarketAnalysis />} />
          <Route path="learning-hub" element={<LearningHub />} />
          <Route path="expense-tracker" element={<ExpenseTracker />} />
          <Route path="upgrade" element={<Upgrade />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </FlowContext.Provider>
  );
}