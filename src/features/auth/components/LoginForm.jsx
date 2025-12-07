// src/features/auth/pages/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      setError("");

      // Kiểm tra thông tin đăng nhập
      if (values.username === "admin" && values.password === "123") {
        // Nếu đăng nhập thành công, điều hướng đến trang dashboard
        navigate("/dashboard");
      } else {
        // Nếu thông tin đăng nhập không đúng, hiển thị thông báo lỗi
        setError("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error}
        onClearError={() => setError("")}
      />
    </div>
  );
};

export default LoginPage;
