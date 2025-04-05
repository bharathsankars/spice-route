
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaLeaf, FaArrowUp } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  // Handle the scroll event to show the button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true); // Show button when scrolled down more than 200px
      } else {
        setShowScrollButton(false); // Hide button when near the top
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [currentImage, setCurrentImage] = useState(0); // Track the current background image

  const images = [
    require('../../assets/Background.jpg'),
    require('../../assets/Background1.jpg'),
    require('../../assets/Background2.jpg'),
    require('../../assets/Background3.jpg'),
    require('../../assets/Background4.jpg'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length); // Loop through the images
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };
  

  return (
    <div className="page-content">
      <section className="hero">
        <div className="hero-content">
        </div>
        <div className="hero-controls">
  <button className="nav-button prev-button" title="Previous" onClick={prevImage}>‹</button>
  <button className="nav-button next-button" title="Next" onClick={nextImage}>›</button>
</div>

        <div className="hero-backgrounds">
          {images.map((image, index) => (
            <img
              key={index}
              className={`hero-image ${index === currentImage ? 'active' : ''}`}
              src={image}
              alt={`Hero Background ${index + 1}`}
            />
          ))}
        </div>
        <div className="dots-container">
          {images.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentImage ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </section>

      <section className="features">
        <section>
          <h2 className="section-title">Welcome to Spice Route</h2>
          <p className="section-text">
            Welcome to Spice Route, where culinary excellence meets exceptional hospitality.
            Located in the heart of Munich, we offer an exquisite dining experience that is sure to captivate your senses. 
            Our carefully crafted dishes, inspired by global flavors, are made with the highest quality ingredients, ensuring a delightful culinary journey. 
            Whether you're here for a casual meal or a special celebration, our inviting atmosphere and impeccable service promise an unforgettable experience. 
            Join us and embark on a gastronomic adventure that reflects our passion for fine dining.
          </p>
          <div className="cta-buttons">
            <Link to="/menu" className="cta-button">Explore Our Menu</Link>
            <Link to="/reserve" className="cta-button reserve-button">Reserve Your Seat</Link>
          </div>
        </section>
        

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaUtensils />
            </div>
            <h2>Authentic Cuisine</h2>
            <p>Experience the true essence of Kerala cooking with our traditional recipes passed down through generations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaLeaf />
            </div>
            <h2>Fresh Ingredients</h2>
            <p>We source only the finest local ingredients and premium spices to create our exceptional dishes</p>
          </div>
        </div>
      </section>

      <section className="specials-section">
        <div className="specials-container">
          <div className="special-category">
            <div className="special-header">
              <h2 className="section-title">Today's Specials</h2>
            </div>
            <div className="offers-grid">
              <div className="offer-card">
                <h3>Executive Lunch</h3>
                <p>A complete thali experience featuring our chef's special curry, fresh naan, rice, and dessert</p>
                <div className="price-tag">
                  <span className="price">14.99</span>
                </div>
              </div>
              <div className="offer-card">
                <h3>Family Feast</h3>
                <p>Perfect for 4: Selection of appetizers, main courses, bread basket, and signature desserts</p>
                <div className="price-tag">
                  <span className="price">19.99</span>
                </div>
              </div>
            </div>
          </div>

          <div className="special-category">
            <div className="special-header">

              <h2 className="section-title">Weekend Specials</h2>
            </div>
            <div className="offers-grid">
              <div className="offer-card weekend-special">
                <div className="special-badge">Limited Time</div>
                <h3>Chatti Choru</h3>
                <p>Premium selection including Rice, fish, and our signature dessert platter</p>
                <div className="price-tag">
                  <span className="price">12.99</span>
                </div>
              </div>
              <div className="offer-card weekend-special">
                <div className="special-badge">Chef's Choice</div>
                <h3>Tandoor Special</h3>
                <p>Assorted tandoor items with special marinades, served with mint chutney and salad</p>
                <div className="price-tag">
                  <span className="price">19.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showScrollButton && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          title="Go to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default Home;
