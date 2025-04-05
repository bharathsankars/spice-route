import React, { useState } from 'react';
import './Specials.css'; // Make sure to style it with CSS for a clean look
import { FaPlus, FaTrashAlt, FaStar } from 'react-icons/fa';

const Specials = ({ menuItems, setSpecials }) => {
  const [currentSpecialType, setCurrentSpecialType] = useState(''); // To track the current special type (Today's or Weekend)
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleSetSpecial = (specialType) => {
    const selectedItem = menuItems.find(item => item.id === parseInt(selectedItemId));
    if (selectedItem) {
      setSpecials(prevState => ({
        ...prevState,
        [specialType]: selectedItem
      }));
      alert(`${specialType === 'todaySpecial' ? "Today's" : "Weekend"} special has been set to ${selectedItem.name}`);
    } else {
      alert('Please select a menu item to set as special.');
    }
  };

  const handleEditSpecial = (specialType) => {
    const special = specialType === 'todaySpecial' ? 'Today\'s Special' : 'Weekend Special';
    alert(`Edit functionality for ${special} will go here.`);
  };

  return (
    <div className="specials-container">
      <h3>Specials Management</h3>
      
      {/* Today's Special */}
      <div className="special">
        <h4>Today's Special</h4>
        <p>{menuItems.some(item => item.id === (selectedItemId ? selectedItemId : null)) 
          ? `${menuItems.find(item => item.id === (selectedItemId ? selectedItemId : null)).name}` 
          : 'No special set for today'}</p>
        <button onClick={() => handleEditSpecial('todaySpecial')}>
          <FaStar /> Edit
        </button>
        <select onChange={(e) => setSelectedItemId(e.target.value)}>
          <option value="">Select Menu Item</option>
          {menuItems.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        <button onClick={() => handleSetSpecial('todaySpecial')}>
          Set Today’s Special
        </button>
      </div>
      
      {/* Weekend Special */}
      <div className="special">
        <h4>Weekend Special</h4>
        <p>{menuItems.some(item => item.id === (selectedItemId ? selectedItemId : null)) 
          ? `${menuItems.find(item => item.id === (selectedItemId ? selectedItemId : null)).name}` 
          : 'No special set for this weekend'}</p>
        <button onClick={() => handleEditSpecial('weekendSpecial')}>
          <FaStar /> Edit
        </button>
        <select onChange={(e) => setSelectedItemId(e.target.value)}>
          <option value="">Select Menu Item</option>
          {menuItems.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        <button onClick={() => handleSetSpecial('weekendSpecial')}>
          Set Weekend Special
        </button>
      </div>
    </div>
  );
};

export default Specials;
