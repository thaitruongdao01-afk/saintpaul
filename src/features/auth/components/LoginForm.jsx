// src/components/Auth/LoginForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ============================================
  // TÀI KHOẢN MẶC ĐỊNH - KHÔNG CẦN DATABASE
  // ============================================
  const DEFAULT_USER = {
    username: 'admin',
    password: '123456',
    fullName: 'Administrator',
    role: 'admin',
    email: 'admin@example.com',
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate input
      if (!formData.username || !formData.password) {
        setError('Vui lòng nhập đầy đủ thông tin');
        setLoading(false);
        return;
      }

      // ============================================
      // KIỂM TRA TÀI KHOẢN MẶC ĐỊNH
      // ============================================
      if (
        formData.username === DEFAULT_USER.username &&
        formData.password === DEFAULT_USER.password
      ) {
        // Đăng nhập thành công
        const userData = {
          id: 1,
          username: DEFAULT_USER.username,
          fullName: DEFAULT_USER.fullName,
          role: DEFAULT_USER.role,
          email: DEFAULT_USER.email,
        };

        // Lưu thông tin user vào localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', 'demo-token-123456'); // Token giả
        localStorage.setItem('isAuthenticated', 'true');

        // Chuyển hướng đến trang chính
        navigate('/');
        window.location.reload(); // Reload để cập nhật state
      } else {
        // Sai tài khoản hoặc mật khẩu
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container>
        <div className="login-container">
          <Card className="login-card">
            <Card.Body>
              {/* Logo & Title */}
              <div className="text-center mb-4">
                <div className="login-logo">
                  <i className="fas fa-cross"></i>
                </div>
                <h2 className="login-title">Hệ Thống Quản Lý</h2>
                <p className="login-subtitle">Dòng Mến Thánh Giá Bà Rịa</p>
              </div>

              {/* Demo Account Info */}
              <Alert variant="info" className="text-center">
                <small>
                  <strong>Tài khoản demo:</strong><br />
                  Username: <code>admin</code><br />
                  Password: <code>123456</code>
                </small>
              </Alert>

              {/* Error Message */}
              {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {error}
                </Alert>
              )}

              {/* Login Form */}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="fas fa-user me-2"></i>
                    Tên đăng nhập
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Nhập tên đăng nhập"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={loading}
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    <i className="fas fa-lock me-2"></i>
                    Mật khẩu
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 login-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Đang đăng nhập...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Đăng Nhập
                    </>
                  )}
                </Button>
              </Form>

              {/* Footer */}
              <div className="text-center mt-4">
                <small className="text-muted">
                  © 2024 Dòng Mến Thánh Giá Bà Rịa
                </small>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
