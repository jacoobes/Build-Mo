import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5005/logout', {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });
      if (response.ok) {
        // Redirect to login page after logout
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      // Example of adding an item
      const response = await fetch('http://localhost:5005/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: 'userId', itemData: { name: 'New Item' } })
      });
      if (response.ok) {
        console.log('Item added successfully');
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      // Example of deleting an item
      const response = await fetch(`http://localhost:5005/delete-item/${itemId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Item deleted successfully');
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleUpdateItem = async (itemId, newItemData) => {
    try {
      // Example of updating an item
      const response = await fetch(`http://localhost:5005/update-item/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItemData)
      });
      if (response.ok) {
        console.log('Item updated successfully');
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
      <div style={{ marginTop: '20px' }}>
        <h1>Click the buttons</h1>
        <button onClick={handleLogout} style={{ marginRight: '10px' }}>Logout</button>
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Enter item name" style={{ marginRight: '10px' }} />
        <button onClick={handleAddItem} style={{ marginRight: '10px' }}>Add Item</button>
        <button onClick={() => handleDeleteItem('itemIdToDelete')} style={{ marginRight: '10px' }}>Delete Item</button>
        <button onClick={() => handleUpdateItem('itemIdToUpdate', { name: 'Updated Item' })}>Update Item</button>
      </div>
    );
  };

export default Logout;
