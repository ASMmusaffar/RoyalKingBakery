import React, { useState } from 'react';
import './index.css';

const bakeryItems = [
  { id: 1, name: 'Croissant', price: 2.5 },
  { id: 2, name: 'Baguette', price: 3.0 },
  { id: 3, name: 'Chocolate Cake', price: 5.0 },
  { id: 4, name: 'Apple Pie', price: 4.5 },
  { id: 5, name: 'Donut', price: 1.5 },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});

  const handleAddToCart = (itemId, quantity) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + quantity,
    }));
  };

  const handleRemoveFromCart = (itemId) => {
    const newCart = { ...cart };
    delete newCart[itemId];
    setCart(newCart);
  };

  const handleReduceQuantity = (itemId) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[itemId] || 0) - 1;
      if (newQuantity <= 0) {
        const newCart = { ...prevCart };
        delete newCart[itemId];
        return newCart;
      }
      return { ...prevCart, [itemId]: newQuantity };
    });
  };

  const filteredItems = bakeryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = Object.entries(cart).reduce((total, [itemId, quantity]) => {
    const item = bakeryItems.find(item => item.id === parseInt(itemId));
    return total + (item.price * quantity);
  }, 0);

  return (
    <div className="bg-white">
      <div className="navbar bg-base-100 shadow-sm mb-5 px-5 sticky top-0 z-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Royal King Bakers</a>
        </div>
        <div className="flex gap-2">
          <input 
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="input input-bordered w-24 md:w-auto" />
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="profile"
                  src="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  mx-auto max-w-[80rem]">
        {filteredItems.map(item => (
        <div key={item.id} className="card bg-base-100 shadow-sm w-[]">
            <figure>
              <img
                src=""
                alt="" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>${item.price.toFixed(2)}</p>
              <div className="card-actions justify-end">
                <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="border p-1 w-16 mr-2"
                    id={`quantity-${item.id}`}
                  />
                <button className="btn btn-primary" 
                        onClick={() => {
                            const quantity = parseInt(document.getElementById(`quantity-${item.id}`).value);
                            handleAddToCart(item.id, quantity);
                  }}>Add to Card</button>
              </div>
            </div>
        </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-8">Cart</h2>
      <ul>
        {Object.entries(cart).map(([itemId, quantity]) => {
          const item = bakeryItems.find(item => item.id === parseInt(itemId));
          return (
            <li key={itemId} className="flex justify-between items-center">
              <span>{item.name} x {quantity}</span>
              <div className="flex items-center">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleRemoveFromCart(itemId)}
                >
                  Remove
                </button>
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleReduceQuantity(itemId)}
                >
                  Reduce
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <h2 className="text-xl font-bold mt-4">Total Amount: ${totalAmount.toFixed(2)}</h2>
    </ div>
  );
}

export default App;