import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { Link } from 'react-router-dom';
const UserLogin = ({ onLogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSocialLoginSuccess = (response) => {
    console.log(response);
    onLogin({
      name: response.profileObj.name,
      email: response.profileObj.email,
      provider: 'google'
    });
    navigate('/');
  };

  const handleSocialLoginFailure = (response) => {
  console.error(response);
  setError('Failed to log in with Google');
};

  const handleGuestLogin = () => {
    onLogin({
      name: 'Guest User',
      email: 'guest@example.com',
      provider: 'guest',
      isGuest: true
    });
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      onLogin({
        name: 'John Doe',
        email: formData.email,
        provider: 'email'
      });
      navigate('/');
    } else {
      setError('Please fill in all fields');
    }
  };

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="auth-container">
        <div className="auth-box">
          <h2>Login to Spice Route</h2>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Login
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="social-login">
            <GoogleLogin
              onSuccess={handleSocialLoginSuccess}
              onError={handleSocialLoginFailure}
              className="social-button google"
            />

            <button
              className="social-button guest"
              onClick={handleGuestLogin}
            >
              <i className="fas fa-user-circle"></i>
              Continue as Guest
            </button>
          </div>

          <div className="auth-links">
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default UserLogin;
