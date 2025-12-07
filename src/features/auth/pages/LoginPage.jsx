// src/components/Auth/LoginForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import authService from '../../services/authService'; // Import authService
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
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

      console.log('🔐 Attempting login...');

      // Gọi authService.login
      const response = await authService.login(formData.username, formData.password);

      if (response.success) {
        console.log('✅ Login successful, redirecting...');
        
        // Chuyển hướng đến trang dashboard
        navigate('/');
        
        // Reload để cập nhật state
        window.location.reload();
      }
    } catch (err) {
      console.error('❌ Login failed:', err);
      setError(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
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
                  <strong>🔑 Tài khoản demo:</strong><br />
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
