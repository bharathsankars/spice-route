import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const UserLogin = ({ onLogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSocialLogin = (provider) => {
    // In a real app, implement OAuth flow for each provider
    console.log(`Logging in with ${provider}`);
    // Simulate successful login
    onLogin({
      name: 'John Doe',
      email: 'john@example.com',
      provider: provider
    });
    navigate('/');
  };

  const handleGuestLogin = () => {
    // Login as guest with limited access
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
    // In a real app, validate against backend
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
             {/* <Link to="/forgot-password">Forgot Password?</Link> */}
          </div>
          
          
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        
        <div className="divider">
          <span>or</span>
        </div>

        <div className="social-login">
          <button 
            className="social-button google"
            onClick={() => handleSocialLogin('google')}
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" />
            Continue with Google
          </button>
{/*           
          <button 
            className="social-button facebook"
            onClick={() => handleSocialLogin('facebook')}
          >
            <img src="https://www.facebook.com/favicon.ico" alt="Facebook" />
            Continue with Facebook
          </button> */}
{/*           
          <button 
            className="social-button apple"
            onClick={() => handleSocialLogin('apple')}
          >
            <img src="https://www.apple.com/favicon.ico" alt="Apple" />
            Continue with Apple
          </button> */}

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
  );
};

export default UserLogin;