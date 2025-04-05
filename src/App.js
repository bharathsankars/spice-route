import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Menu from './components/pages/Menu';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
// import AdminLogin from './components/admin/AdminLogin';
// import AdminDashboard from './components/admin/AdminDashboard';
import Admin from './components/admin/Admin';  // Import Admin component
import UserLogin from './components/auth/UserLogin';
import UserRegister from './components/auth/UserRegister';
import UserProfile from './components/auth/UserProfile';
import Bucket from './components/pages/Bucket';
import { CartProvider } from './context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReserveSeat from './components/pages/ReserveSeat';
import { faInstagram, faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './App.css';

function App() {

  // const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // const ProtectedAdminRoute = ({ children }) => {
  //   if (!isAdminAuthenticated) {
  //     return <Navigate to="/admin/login" />;
  //   }
  //   return children;
  // };

  const ProtectedUserRoute = ({ children }) => {
    if (!isUserAuthenticated) {
      return <Navigate to="/login" />;
    }
    // Allow guests to view but not interact with certain features
    if (currentUser?.isGuest) {
      return React.cloneElement(children, { isGuestUser: true });
    }
    return children;
  };

  const handleUserLogin = (userData) => {
    setIsUserAuthenticated(true);
    setCurrentUser(userData);
  };

  const handleUserLogout = () => {
    setIsUserAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar
            isAuthenticated={isUserAuthenticated}
            user={currentUser}
            onLogout={handleUserLogout}
          />
          <Routes>
            <Route
              path="/"
              element={isUserAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/bucket" element={<Bucket />} />
            <Route
              path="/login"
              element={<UserLogin onLogin={handleUserLogin} isAuthenticated={isUserAuthenticated} />}
            />
            <Route
              path="/register"
              element={isUserAuthenticated ? <Navigate to="/" /> : <UserRegister onRegister={handleUserLogin} />}
            />
            <Route
              path="/menu"
              element={<ProtectedUserRoute><Menu /></ProtectedUserRoute>}
            />
            <Route
              path="/about"
              element={<ProtectedUserRoute><About /></ProtectedUserRoute>}
            />
            <Route
              path="/contact"
              element={<ProtectedUserRoute><Contact /></ProtectedUserRoute>}
            />
            <Route
              path="/profile"
              element={<ProtectedUserRoute><UserProfile user={currentUser} onLogout={handleUserLogout} /></ProtectedUserRoute>}
            />
            <Route path="/reserve" element={<ReserveSeat />} />
            {/* <Route 
              path="/admin/login" 
              element={<AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />} 
            /> */}
            <Route
              path="/admin/*"
              element={<Admin />}
            />
          </Routes>
          {isUserAuthenticated && (

            <footer className="footer">
              <div className="footer-content">
                <div className="footer-section">
                  <h3>Location</h3>
                  <p>SpiceRoute Schäftlarnstraße 166, 81371 München, Germany</p>
                  <p>
                    <a
                      href="https://maps.app.goo.gl/CfyQtxhbwDCsRMof8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-on-map"
                    >
                      View on Map
                    </a>
                  </p>
                </div>
                <div className="footer-section">
  <h3 className="footer-title">Working Hours</h3>
  <div className="working-hours">
    <div className="working-day">
      <span className="day">Wed - Fri :</span>
      <span className="hours">17:30 - 22:30</span>
    </div>
    <div className="working-day">
      <span className="day">Sat - Sun:</span>
      <span className="hours">12:00 - 15:00 & 17:30 - 22:30</span>
    </div>
  </div>
</div>



                <div className="footer-section">
                  <h3>Contact</h3>
                  <p>Tel: +49 89 46220082</p>
                  <p>Phone: +49 155 60684508</p>
                  <p>Email: <a href="mailto:Contact@thespiceroute.de">Contact@thespiceroute.de</a></p>
                </div>
                <div className="footer-section">
                  <h3>Follow Us</h3>
                  <div className="social-media">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://www.instagram.com/spiceroute.de?igsh=ZjhwYnpibTBjcHIx" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a> */}
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <p>&copy; 2025 Spice Route Restaurant. All rights reserved.</p>
              </div>
            </footer>
          )}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
