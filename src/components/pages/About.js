import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>Our Story</h1>
        <p className="subtitle">A Journey Through Kerala Cuisine</p>
      </div>
      
      <div className="about-content">
        <section className="story-section">
          <h2>Why choose us</h2>
          <p className="story-text">Nestled in the vibrant heart of Munich, our restaurant stands as a distinguished destination for culinary enthusiasts who seek an extraordinary dining experience. We pride ourselves on offering not only exquisite cuisine but also an ambiance that seamlessly blends sophistication with comfort. Our team of talented chefs uses only the finest, locally sourced ingredients to craft dishes that celebrate both tradition and innovation. Whether you're joining us for a casual meal or a special occasion, we are committed to providing impeccable service and an unforgettable dining journey that will leave a lasting impression. At our restaurant, every detail is thoughtfully curated to ensure that your experience is nothing short of exceptional.</p>
        </section>

        <section className="chef-section">
          <h2>Meet Our Chef</h2>
          <div className="chef-info">
            <div className="chef-text">
              <h3>Shinz Antony</h3>
              <p>With over 20 years of experience in Indian cuisine, Chef Shinz brings his expertise and passion to every dish served at Spice Route.</p>
            </div>

          </div>
        
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Quality</h3>
              <p>We use only the finest ingredients, sourced from trusted suppliers.</p>
            </div>
            <div className="value-card">
              <h3>Tradition</h3>
              <p>Preserving authentic recipes and cooking methods.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>Blending traditional flavors with modern presentation.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;