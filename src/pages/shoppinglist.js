import React, { useState } from 'react';
import EmptyCartAnimation from '../components/EmptyCartAnimation';
import Cart from '../components/cart';
import '../style/shoppinglist.css'

function ShoppingList() {
  const [products, setProducts] = useState([
    { id: 1, name: "Book", price: 10 , image:"https://img.icons8.com/?size=100&id=bwUgs69v7bOd&format=png&color=000000"},
    { id: 2, name: "NoteBook", price: 20 ,image:"https://img.icons8.com/?size=100&id=POLP3DltgQN2&format=png&color=000000"}
  ]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addProduct = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    if (
      editIndex === null &&
      products.some(p => p.name.toLowerCase() === name.toLowerCase())
    ) {
      alert("This item already exists!");
      return;
    }

    if (editIndex !== null) {
     
      const updated = [...products];
      updated[editIndex] = { ...updated[editIndex], name, price: Number(price) };
      setProducts(updated);
      setEditIndex(null);
    } else {
    
      setProducts(prev => [
        ...prev,
        { id: prev.length + 1, name, price: Number(price) }
      ]);
    }

    setName('');
    setPrice('');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const handleEdit = (index) => {
    setName(products[index].name);
    setPrice(products[index].price);
    setEditIndex(index);
  };

  const total = products.reduce((sum, item) => sum + item.price, 0);
  const removeAll = () => setProducts([]);

  return (
    <div className="Shopping-List-container">
      
      <h1 className="list-title"> <img
      src="https://img.icons8.com/?size=100&id=7lnFGeC57oqS&format=png&color=FAB005"
      alt="Custom Icon"
      width={"50px"}
      height={"50px"}
      style={{ objectFit: 'contain', marginTop: '-10PX'}}/> Shopping List</h1>
      <div className='totalcost'>
      <div className='.heading-group'>
      <h1 >Total Cost</h1>
      <div className='cost-row'>
      <h3 >Total: <br></br><span style={{ color: 'green' }}>$</span>{total.toFixed(2)}</h3>
      <h3 >Items:<br></br>{products.length}</h3>
      </div></div></div>


      <form onSubmit={addProduct} className="add-product-form">
        <h1>Add New Product</h1>
        <label htmlFor="product-name">Product Name:</label>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="product-name-input"
          required
        />
        
        <label htmlFor="Price">Price(<span style={{ color: 'green' }}>$</span>):</label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="price-input-field"
          min="0"
          max="10000"
          required
        />
        <button type="submit" className="add-product-btn">
          {editIndex !== null ? "Update Product" : "Add Product"}
        </button>
      </form>

    

<div className="products-list">
  <div className='item-all'>
  <h1 className="items">Shopping Items ({products.length})</h1>
   <button className="alldelete-btn" onClick={ removeAll } >
        Remove All
      </button></div>

  {products.length === 0 ? (
    <EmptyCartAnimation />
  ) : (
    products.map((product, index) => (
      <Cart
        key={product.id}
        product={product}
        onDelete={deleteProduct}
        onEdit={() => handleEdit(index)}
      />
    ))
  )}
</div>

    
      
    </div>
  );
}

export default ShoppingList;