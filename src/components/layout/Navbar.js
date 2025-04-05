import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';
import logo from '../../assets/Logo.png'; // Ensure to add your logo to this path

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Spice Route" className="logo-image" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/reserve" className="reserve-link">Reserve a Seat</Link> {/* New reservation link */}
        <Link to="/contact">Contact</Link>
        <Link to="/bucket" className="bucket-link">
          <FaShoppingCart /> Cart
        </Link>
        <Link to="/about">About Us</Link>
        {/* <Link to="/admin">Admin</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
