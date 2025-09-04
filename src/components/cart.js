import React, { useState } from 'react';
import './cart.css';

function Cart({ product, onDelete, onEdit }) {
  const [price] = useState(product.price);

  const getPriceColor = (price) => {
    const numprice = parseFloat(price);
    if (numprice < 20) return '#28a745';   // green
    if (numprice <= 50) return '#fd7e14';  // orange
    return '#dc3545';                      // red
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      onDelete(product.id);
    }
  };

  return (
  <div className="product-card">
  <div className="product-header">
    <div className="product-left">
      <img src={product.image} alt={product.name} className="product-img" />
      <div className="product-info">
        <span className="product-name">{product.name}</span>
        <div className="price-section">
          <span style={{ color: 'green' }}>$</span>
          <input
            type="number"
            value={price}
            className="price-input"
            disabled
            style={{ color: getPriceColor(price) }}
          />
        </div>
      </div>
    </div>

    <div className="header-actions">
    
      <button className="edit-btn" onClick={onEdit}>
        <img
          src="https://img.icons8.com/?size=100&id=AuMLFRmG95tQ&format=png&color=FCC419"
          alt="edit Icon"
          width="20"
          height="20"
        />
      </button>
      <button className="delete-btn" onClick={handleDelete}>
        <img
          src="https://img.icons8.com/?size=100&id=nzdmtXcPuwzf&format=png&color=FCC419"
          alt="delete Icon"
          width="20"
          height="20"
        />
      </button>
    </div>
  </div>
</div>

  );
}

export default Cart;