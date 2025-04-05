// Bucket.js
import React, { useState } from 'react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Bucket.css';

const Bucket = () => {
  const { cart, updateQuantity, removeItem } = useCart();
const [notification, setNotification] = useState('');
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0).toFixed(2);
  };
  const handleCheckout = (item) => {
    setNotification('Uber Eats API called'); // Show notification
    setTimeout(() => {
      setNotification(''); // Hide notification after 3 seconds
    }, 3000);
  };

  return (
    <div className="bucket-page">
      {notification && <div className="notification">{notification}</div>} {/* Notification */}
      <div className="bucket-header">
        <h1>Your Cart</h1>
        <p className="bucket-subtitle">Review your selected items</p>
      </div>

      <div className="bucket-container">
        {cart.length === 0 ? (
          <div className="empty-bucket">
            <h2>Your cart is empty</h2>
            <p>Add some delicious items from our menu!</p>
            <Link to="/menu" className="bucket-Menu">Menu</Link>
          </div>
        ) : (
          <>
            <div className="bucket-items">
              {cart.map((item) => (
                <div key={item.id} className="bucket-item">
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <div className="item-tags">
                      {item.isVegetarian && <span className="veg-tag">Vegetarian</span>}
                      {item.spiceLevel && (
                        <span className={`spice-tag ${item.spiceLevel}`}>
                          {item.spiceLevel}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="quantity-btn"
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    
                    <div className="price-section">
                      <span className="item-price">
                        €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="remove-btn"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>€{calculateTotal()}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>€5.00</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>€{(parseFloat(calculateTotal()) + 5).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={handleCheckout} className="checkout-btn">
                Proceed to Checkout via Uber Eats
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Bucket;