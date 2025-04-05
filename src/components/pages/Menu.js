import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

import './Menu.css';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('starters');
  const [notification, setNotification] = useState(''); // state for notification
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();

  const menuData = {
    starters: [
      {
        id: 's1',
        name: "Pazhampori",
        description: "Fried banana fritters served crispy and sweet",
        price: "4.99",
        spiceLevel: "mild",
        isVegetarian: true
      },
      {
        id: 'd1',
        name: "Cutlets",
        description: "Crispy fried patties with a flavorful filling of meat or vegetables",
        price: "5.99",
        isVegetarian: true
      }
    ],
    mainCourse: [
      {
        id: 'm1',
        name: "Biriyani",
        description: "Fragrant rice cooked with spices and your choice of meat or vegetables",
        price: "14.99",
        spiceLevel: "medium",
        isVegetarian: false
      },

      {
        id: 'm3',
        name: "Chattichoru",
        description: "Traditional Kerala-style rice served with a variety of sides like curry, pickle, and papad",
        price: "13.99",
        spiceLevel: "medium",
        isVegetarian: true
      },
      {
        id: 'm4',
        name: "Beef Fry",
        description: "Spicy and flavorful stir-fried beef cooked with Kerala spices",
        price: "18.99",
        spiceLevel: "hot",
        isVegetarian: false
      },
      {
        id: 'm5',
        name: "Chicken Curry",
        description: "Tender chicken cooked in a spicy and rich curry sauce",
        price: "15.99",
        spiceLevel: "medium",
        isVegetarian: false
      },
      {
        id: 'm6',
        name: "Beef",
        description: "Deliciously spiced beef served with rice or bread",
        price: "17.99",
        spiceLevel: "hot",
        isVegetarian: false
      },
      {
        id: 'm7',
        name: "Fish Curry",
        description: "Tangy and spicy fish curry made with fresh local fish",
        price: "19.99",
        spiceLevel: "medium",
        isVegetarian: false
      },
      {
        id: 'm8',
        name: "Veg Stew",
        description: "A mild vegetable stew with coconut milk and aromatic spices",
        price: "12.99",
        spiceLevel: "mild",
        isVegetarian: true
      }
    ],
    breads: [
      {
        id: 'b1',
        name: "Porotta",
        description: "Soft, flaky, and layered flatbread from Kerala",
        price: "3.99",
        isVegetarian: true
      },
      {
        id: 'b2',
        name: "Chappathy",
        description: "Soft, flaky, and layered flatbread from Kerala",
        price: "3.99",
        isVegetarian: true
      },
      {
        id: 'b3',
        name: "Appam",
        description: "Soft, flaky, and layered flatbread from Kerala",
        price: "3.99",
        isVegetarian: true
      }
    ],
    desserts: [
      {
        id: 'm2',
        name: "Cloud9",
        description: "A special mix of tender meats or vegetables in a creamy and spicy gravy",
        price: "16.99",
        spiceLevel: "medium",
        isVegetarian: true
      }
    ],
    rice: [
      {
        id: 'r1',
        name: "Ghee Rice",
        description: "Aromatic rice cooked with ghee, cumin, and mild spices",
        price: "4.99",
        isVegetarian: true
      }
    ]
  };

  const categories = [
    { id: 'starters', name: 'Starters' },
    { id: 'mainCourse', name: 'Main Course' },
    { id: 'breads', name: 'Breads' },
    { id: 'desserts', name: 'Desserts' }
  ];

  const renderSpiceLevel = (level) => {
    return level && <span className={`spice-indicator ${level}`}>{level}</span>;
  };

  const goToBucket = () => {
    navigate('/bucket');
  };

  // Add to cart and show notification
  const handleAddToCart = (item) => {
    addToCart(item);
    setNotification(`${item.name} added to cart!`); // Show notification
    setTimeout(() => {
      setNotification(''); // Hide notification after 3 seconds
    }, 3000);
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p className="menu-subtitle">Experience the authentic flavors of India</p>
      </div>
      <div className="download-section">
  <p className="download-caption">
    Prefer a printable version? Download our full menu and browse at your convenience.
  </p>
  <a
    href="../../assets/SpiceRoute_Menu.pdf"
    download
    className="download-button"
    target="_blank"
    rel="noopener noreferrer"
  >
    Download Full Menu (PDF)
  </a>
</div>

      {notification && <div className="notification">{notification}</div>} {/* Notification */}

      <div className="menu-container">
        <div className="category-nav">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="menu-content">
          <div className="menu-items">
            {menuData[activeCategory].map(item => (
              <div key={item.id} className="menu-item">
                <div className="item-header">
                  <h3>{item.name}</h3>
                  <div className="item-badges">
                    {item.isVegetarian && (
                      <span className="dietary-info">Vegetarian</span>
                    )}
                    {item.chefSpecial && (
                      <span className="special-info">Chef's Special</span>
                    )}
                  </div>
                </div>
                <p className="item-description">{item.description}</p>
                <div className="item-footer">
                  <div className="item-details">
                    <span className="price">€{item.price}</span>
                    {renderSpiceLevel(item.spiceLevel)}
                  </div>
                  <button 
                    className="add-to-cart"
                    onClick={() => handleAddToCart(item)} // Call the new function
                  >
                    <FaShoppingCart /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {cart.length > 0 && (
        <div className="cart-fab" onClick={goToBucket}>
          <FaShoppingCart />
          <span className="cart-count">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </div>
      )}
    </div>
  );
};

export default Menu;
