import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaPhoneAlt, FaUserAlt, FaEnvelope, FaUsers, FaClock } from 'react-icons/fa';
import './ReserveSeat.css';

const ReserveSeat = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: 1,
    status: 'Pending', // Default status is Pending
  });

  const [reservation, setReservation] = useState(null); // Track the reservation state
  const [notification, setNotification] = useState(null); // For showing notification message

  // Check if the reservation exists in localStorage
  useEffect(() => {
    const savedReservation = JSON.parse(localStorage.getItem('reservation'));
    if (savedReservation) {
      setReservation(savedReservation); // If a reservation is found, set it to state
      setFormData(savedReservation); // Pre-fill the form with saved data
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const selectedDateTime = new Date(formData.date + 'T' + formData.time); // Combine the date and time into a single Date object
    
    // Validate if the selected date and time are in the future
    if (selectedDateTime <= currentDate) {
      setNotification({ type: 'error', message: 'Please select a future date and time for your reservation.' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
  
    // Validate that the selected time is at least 30 minutes from now
    const minValidTime = new Date(currentDate.getTime() + 30 * 60 * 1000);
    if (selectedDateTime < minValidTime) {
      setNotification({ type: 'error', message: 'Please select a time at least 30 minutes from now.' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const selectedDay = selectedDateTime.getDay();
    const selectedHour = selectedDateTime.getHours();
    const selectedMinute = selectedDateTime.getMinutes();

    // Check if the reservation falls within the working hours based on the day
    if (selectedDay >= 3 && selectedDay <= 5) { // Wednesday to Friday
      // Valid working hours: 17:30 - 22:30
      if (!(selectedHour === 17 && selectedMinute >= 30) && 
          !(selectedHour > 17 && selectedHour < 22) && 
          !(selectedHour === 22 && selectedMinute <= 30)) {
        setNotification({ type: 'error', message: 'Reservations are only allowed between 17:30 and 22:30 on Wednesdays to Fridays.' });
        setTimeout(() => setNotification(null), 3000);
        return;
      }
    } else if (selectedDay === 6 || selectedDay === 0) { // Saturday or Sunday
      // Valid working hours: 12:00 - 15:00 and 17:30 - 22:30
      if (
        !(selectedHour === 12 && selectedMinute >= 0) &&
        !(selectedHour > 12 && selectedHour < 15) &&
        !(selectedHour === 15 && selectedMinute === 0) &&
        !(selectedHour === 17 && selectedMinute >= 30) &&
        !(selectedHour > 17 && selectedHour < 22) &&
        !(selectedHour === 22 && selectedMinute <= 30)
      ) {
        setNotification({ type: 'error', message: 'Reservations are only allowed between 12:00-15:00 and 17:30-22:30 on Saturdays and Sundays.' });
        setTimeout(() => setNotification(null), 3000);
        return;
      }
    } else { // Monday or Tuesday
      setNotification({ type: 'error', message: 'Reservations are only allowed from Wednesday to Sunday.' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Save the reservation data to localStorage with Pending status
    const newReservation = { ...formData, status: 'Pending' }; // Ensure the status is 'Pending' when the user submits
    localStorage.setItem('reservation', JSON.stringify(newReservation));
  
    // Update state to show the reservation details
    setReservation(newReservation);
  
    setNotification({ type: 'success', message: 'Reservation submitted successfully!' });
    setTimeout(() => setNotification(null), 3000); // Hide the notification after 3 seconds
};


  const handleChangeReservation = () => {
    // Allow user to update the form (this already happens as they can change the inputs and resubmit)
    setReservation(null); // Clear current reservation state to allow editing
  };

  const handleCancelReservation = () => {
    // Remove reservation from localStorage and reset state
    localStorage.removeItem('reservation');
    setReservation(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      partySize: 1,
      status: 'Pending', // Reset status to Pending
    });

    setNotification({ type: 'error', message: 'Your reservation has been canceled.' });
    setTimeout(() => setNotification(null), 3000); // Hide the notification after 3 seconds
  };

  const handleBookNewReservation = () => {
    // Clear the rejected reservation and reset the form for a new reservation
    setReservation(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      partySize: 1,
      status: 'Pending', // Reset status to Pending for new booking
    });
  };

  const handleOkReservation = () => {
    // Close the rejection message and reset state
    setReservation(null);
    setNotification({ type: 'info', message: 'You can now make a new reservation.' });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="reserve-seat">
      <div className="reserve-container">
        <h1 className="reserve-title">Reserve Your Seat</h1>
        <p className="reserve-subtitle">
          {reservation
            ? 'You have already made a reservation. Here are your details.'
            : 'Please fill the form below to secure your reservation at Spice Route.'}
        </p>

        {/* If reservation exists, show reservation details, else show form */}
        {reservation ? (
          <div className="reservation-details">
            <h2>Your Reservation Details</h2>
            <p><strong>Name:</strong> {reservation.name}</p>
            <p><strong>Email:</strong> {reservation.email}</p>
            <p><strong>Phone:</strong> {reservation.phone}</p>
            <p><strong>Date:</strong> {reservation.date}</p>
            <p><strong>Time:</strong> {reservation.time}</p>
            <p><strong>Party Size:</strong> {reservation.partySize}</p>
            <p><strong>Status:</strong> {reservation.status}</p> {/* Display reservation status */}

            {/* Check if reservation is rejected */}
            {reservation.status === 'Rejected' && (
              <div className="rejection-message">
                <p>Your current reservation has been rejected. Please book another reservation.</p>
                <div className="rejection-actions">
                  <button onClick={handleBookNewReservation} className="book-new-btn">
                    Book New
                  </button>
                  <button onClick={handleOkReservation} className="ok-btn">
                    OK
                  </button>
                </div>
              </div>
            )}

            {/* Display regular reservation actions if not rejected */}
            {reservation.status !== 'Rejected' && (
              <div className="reservation-actions">
                <button className="change-btn" onClick={handleChangeReservation}>
                  Change Reservation
                </button>
                <button className="cancel-btn" onClick={handleCancelReservation}>
                  Cancel Reservation
                </button>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reserve-form">
            <div className="form-group">
              <label htmlFor="name">
                <FaUserAlt className="form-icon" />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your full name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope className="form-icon" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Your email"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <FaPhoneAlt className="form-icon" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="Your phone number"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">
                <FaCalendarAlt className="form-icon" />
                Reservation Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                title="Please select a future date from the calender icon"
                className="form-input"
                min={new Date().toISOString().split('T')[0]} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">
                <FaClock className="form-icon" />
                Reservation Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                title="Please select a future time from the clock icon"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="partySize">
                <FaUsers className="form-icon" />
                Number of People
              </label>
              <select
                id="partySize"
                name="partySize"
                value={formData.partySize}  
                onChange={handleInputChange}
                required
                className="form-input"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((size) => (
                  <option key={size} value={size}>
                    {size === '9+' ? '9+' : size}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="submit-btn">
              Reserve Now
            </button>
          </form>
        )}

        {/* Notification Message */}
        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReserveSeat;
