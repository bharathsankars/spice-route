import React, { useState, useEffect } from 'react';
import './Admin.css';
import { FaPlus, FaTrashAlt, FaList, FaStar, FaBox, FaCog, FaCalendarAlt } from 'react-icons/fa'; // Import icons

const Admin = () => {
  // Menu items and modal state
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Burger', price: 5.99 },
    { id: 2, name: 'Pizza', price: 8.99 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', price: '' });

  // Active section state
  const [activeSection, setActiveSection] = useState('dashboard'); // Default section is dashboard
  const [reservation, setReservation] = useState(null); // Track reservation data
  const [cancelReservation, setCancelReservation] = useState(false); // Track if cancel form is visible
  const [cancelReason, setCancelReason] = useState(''); // Track the cancellation reason

  // Reservation status state
  const [reservationStatus, setReservationStatus] = useState('Pending'); // Default status is Pending

  // Fetch reservation data from localStorage when the component mounts
  useEffect(() => {
    const savedReservation = JSON.parse(localStorage.getItem('reservation'));
    if (savedReservation) {
      setReservation(savedReservation); // Set reservation data if available
      setReservationStatus(savedReservation.status || 'Pending'); // Set the initial status
    }
  }, []);

  const handleAddItem = () => {
    const item = {
      id: menuItems.length + 1,
      name: newItem.name,
      price: parseFloat(newItem.price),
    };
    setMenuItems([...menuItems, item]);
    setNewItem({ name: '', price: '' });
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  // Handle cancel reservation
  const handleCancelReservation = () => {
    setCancelReservation(true);
  };

  const handleReasonChange = (e) => {
    setCancelReason(e.target.value);
  };

  const handleConfirmCancel = () => {
    if (cancelReason === '') {
      alert('Please select a reason for cancellation');
      return;
    }

    // Remove reservation from state and localStorage
    setReservation(null);
    localStorage.removeItem('reservation');
    setCancelReservation(false);
    setReservationStatus('Canceled');
    alert(`Reservation canceled. Reason: ${cancelReason}`);
  };

  const handleCancelCancel = () => {
    setCancelReservation(false);
  };

  const handleApproveReservation = () => {
    // Update the status to approved and store in localStorage
    setReservationStatus('Approved');
    if (reservation) {
      const updatedReservation = { ...reservation, status: 'Approved' };
      localStorage.setItem('reservation', JSON.stringify(updatedReservation));
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <nav>
          <ul>
            {/* <li onClick={() => setActiveSection('dashboard')}><FaHome /> Dashboard</li> */}
            <li onClick={() => setActiveSection('menu')}><FaList /> Menu</li>
            <li onClick={() => setActiveSection('specials')}><FaStar /> Specials</li>
            <li onClick={() => setActiveSection('orders')}><FaBox /> Orders</li>
            <li onClick={() => setActiveSection('reservation')}><FaCalendarAlt /> Reservation</li> {/* New Reservation Tab */}
            <li onClick={() => setActiveSection('settings')}><FaCog /> Settings</li>
          </ul>
        </nav>
      </div>
      
      <div className="admin-content">
        {/* Render Menu Management only when the "Menu" section is active */}
        {activeSection === 'menu' && (
          <div className="card">
            <div className="card-header">
              <h3>Menu Management</h3>
              <button className="add-btn" onClick={() => setIsModalOpen(true)}>
                <FaPlus /> Add New Item
              </button>
            </div>
            <table className="menu-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>€{item.price.toFixed(2)}</td>
                    <td>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDeleteItem(item.id)}>
                        <FaTrashAlt /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Render Reservation details when "Reservation" section is active */}
        {activeSection === 'reservation' && !reservation && (
          <div className="no-reservation-message">
            <h3>No reservation available currently</h3>
          </div>
        )}

        {activeSection === 'reservation' && reservation && (
          <div className="reservation-details">
            <h3>Current Reservation</h3>
            <p><strong>Name:</strong> {reservation.name}</p>
            <p><strong>Email:</strong> {reservation.email}</p>
            <p><strong>Phone:</strong> {reservation.phone}</p>
            <p><strong>Date:</strong> {reservation.date}</p>
            <p><strong>Time:</strong> {reservation.time}</p>
            <p><strong>Party Size:</strong> {reservation.partySize}</p>
            <p><strong>Status:</strong> {reservationStatus}</p> {/* Display Reservation Status */}

            <div className="reservation-actions">
              {/* Approve button */}
              {reservationStatus === 'Pending' && (
                <button onClick={handleApproveReservation} className="approve-btn">
                  Approve Reservation
                </button>
              )}
              {/* Cancel button */}
              <button onClick={handleCancelReservation} className="cancel-btn">
                Reject Reservation
              </button>
            </div>

            {cancelReservation && (
              <div className="cancel-reservation-form">
                <h4>Reason for Cancellation</h4>
                <select value={cancelReason} onChange={handleReasonChange} className="cancel-reason-select">
                  <option value="">Select Reason</option>
                  <option value="Customer Requested Change in Reservation Date/Time">Customer Requested Change in Reservation Date/Time</option>
                  <option value="Customer Cancelled Reservation">Customer Cancelled Reservation</option>
                  <option value="Overbooked (No Available Seats)">Overbooked (No Available Seats)</option>
                  <option value="Special Request Not Possible (e.g., Seat Arrangement)">Special Request Not Possible (e.g., Seat Arrangement)</option>
                  <option value="Internal Issue (e.g., Restaurant Closed, Staff Shortage)">Internal Issue (e.g., Restaurant Closed, Staff Shortage)</option>
                  <option value="Customer Found Another Venue">Customer Found Another Venue</option>
                  <option value="Unforeseen Circumstances (e.g., Weather Conditions)">Unforeseen Circumstances (e.g., Weather Conditions)</option>
                  <option value="Customer Late for Reservation">Customer Late for Reservation</option>
                  <option value="Other">Other</option>
                </select>
                <div className="cancel-buttons">
                  <button onClick={handleConfirmCancel} className="confirm-cancel-btn">Confirm Cancellation</button>
                  <button onClick={handleCancelCancel} className="cancel-cancel-btn">Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Render other sections */}
        {activeSection === 'orders' && (
          <div className="orders-section">
            <h3>Orders</h3>
            <p>Manage customer orders here.</p>
          </div>
        )}

        {activeSection === 'settings' && (
          <div className="settings-section">
            <h3>Settings</h3>
            <p>Manage system settings here.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Menu Item</h3>
            <label>
              Item Name:
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Enter item name"
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                placeholder="Enter price"
              />
            </label>
            <div className="modal-buttons">
              <button onClick={handleAddItem}>Add Item</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
