import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const UserRegister = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSocialRegister = (provider) => {
    // In a real app, implement OAuth flow for each provider
    console.log(`Registering with ${provider}`);
    // Simulate successful registration
    onRegister({
      name: 'John Doe',
      email: 'john@example.com',
      provider: provider
    });
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // In a real app, send to backend
    onRegister({
      name: formData.name,
      email: formData.email,
      provider: 'email'
    });
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create an Account</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="social-login">
          <button 
            className="social-button google"
            onClick={() => handleSocialRegister('google')}
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" />
            Sign up with Google
          </button>
          
          <button 
            className="social-button facebook"
            onClick={() => handleSocialRegister('facebook')}
          >
            <img src="https://www.facebook.com/favicon.ico" alt="Facebook" />
            Sign up with Facebook
          </button>
          
          <button 
            className="social-button apple"
            onClick={() => handleSocialRegister('apple')}
          >
            <img src="https://www.apple.com/favicon.ico" alt="Apple" />
            Sign up with Apple
          </button>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
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
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
          
          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>

        <div className="auth-links">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;