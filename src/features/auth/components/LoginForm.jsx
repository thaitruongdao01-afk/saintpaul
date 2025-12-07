// src/features/auth/pages/LoginPage.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Tự động điều hướng đến dashboard
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="login-page">
      <h2>Đang chuyển hướng đến Dashboard...</h2>
    </div>
  );
};

export default LoginPage;
