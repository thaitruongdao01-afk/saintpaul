// src/services/authService.js

// ============================================
// AUTH SERVICE - KHÔNG CẦN BACKEND
// ============================================

// Tài khoản mặc định
const DEFAULT_USER = {
  username: 'admin',
  password: '123456',
  fullName: 'Administrator',
  role: 'admin',
  email: 'admin@example.com',
  id: 1,
};

class AuthService {
  /**
   * Đăng nhập (không cần backend)
   */
  async login(username, password) {
    console.log('🔐 Login attempt with:', { username, password });

    try {
      // Giả lập delay như gọi API thật
      await new Promise(resolve => setTimeout(resolve, 500));

      // Kiểm tra tài khoản
      if (username === DEFAULT_USER.username && password === DEFAULT_USER.password) {
        const userData = {
          id: DEFAULT_USER.id,
          username: DEFAULT_USER.username,
          fullName: DEFAULT_USER.fullName,
          role: DEFAULT_USER.role,
          email: DEFAULT_USER.email,
        };

        // Lưu vào localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', 'demo-token-123456');
        localStorage.setItem('isAuthenticated', 'true');

        console.log('✅ Login successful:', userData);

        return {
          success: true,
          data: userData,
          token: 'demo-token-123456',
        };
      } else {
        console.log('❌ Invalid credentials');
        throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  }

  /**
   * Đăng xuất
   */
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    console.log('👋 Logged out');
  }

  /**
   * Lấy user hiện tại
   */
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      console.log('📦 Current user data:', userStr);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Kiểm tra đã đăng nhập chưa
   */
  isAuthenticated() {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    console.log('🔐 Is authenticated:', isAuth);
    return isAuth;
  }

  /**
   * Lấy token
   */
  getToken() {
    return localStorage.getItem('token');
  }
}

export default new AuthService();
