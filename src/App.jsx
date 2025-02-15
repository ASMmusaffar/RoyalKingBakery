import React, { useState } from 'react';
import './index.css';

const bakeryItems = [
  { id: 1, name: 'Brioche', price: 2.5, img:'/1.svg' },
  { id: 2, name: 'Oatmeal', price: 3.0, img:'/2.svg' },
  { id: 3, name: 'Crossiant Pastries', price: 5.0, img:'/3.svg' },
  { id: 4, name: 'Delicious Bagel', price: 4.5, img:'/4.svg' },
  { id: 5, name: 'Classic Cookies', price: 3.5, img:'/5.svg' },
  { id: 6, name: 'Premium Cookies', price: 5, img:'/6.svg' },
  { id: 7, name: 'Crossiant Bread', price: 1.5, img:'/7.svg' },
  { id: 8, name: 'Whole Wheat Bread', price: 1.5, img:'/8.svg' },
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
      <div className="navbar bg-base-100 shadow-sm mb-5 px-10 sticky top-0 z-100">
        <div className="flex-1">
          <h3 className="text-xl font-black uppercase">Royal King Bakers</h3>
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
              <div className="w-10 rounded-full flex justify-center items-center">
                <svg className='' xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M15 15H9a4 4 0 0 0-3.834 2.856A8.98 8.98 0 0 0 12 21a8.98 8.98 0 0 0 6.834-3.144A4 4 0 0 0 15 15" opacity="0.16"/><path stroke="currentColor" stroke-width="2" d="M21 12a8.96 8.96 0 0 1-1.526 5.016A8.99 8.99 0 0 1 12 21a8.99 8.99 0 0 1-7.474-3.984A9 9 0 1 1 21 12Z"/><path fill="currentColor" d="M13 9a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3zm-1 1a1 1 0 0 1-1-1H9a3 3 0 0 0 3 3zm-1-1a1 1 0 0 1 1-1V6a3 3 0 0 0-3 3zm1-1a1 1 0 0 1 1 1h2a3 3 0 0 0-3-3zm-6.834 9.856l-.959-.285l-.155.523l.355.413zm13.668 0l.76.651l.354-.413l-.155-.523zM9 16h6v-2H9zm0-2a5 5 0 0 0-4.793 3.571l1.917.57A3 3 0 0 1 9 16zm3 6a7.98 7.98 0 0 1-6.075-2.795l-1.518 1.302A9.98 9.98 0 0 0 12 22zm3-4c1.357 0 2.506.902 2.876 2.142l1.916-.571A5 5 0 0 0 15 14zm3.075 1.205A7.98 7.98 0 0 1 12 20v2a9.98 9.98 0 0 0 7.593-3.493z"/></g></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  mx-auto max-w-[80rem]">
        {filteredItems.map(item => (
        <div key={item.id} className="card bg-base-100 shadow-sm hover:shadow-lg hover: transition-shadow">
            <figure>
              <img
                className=' max-w-[200px]'
                src={item.img}
                alt="" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>${item.price.toFixed(2)}</p>
              <div className="card-actions justify-end items-center">
                <label htmlFor="">Quantity</label>
                <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="p-1 w-16 mr-2 font-bold border-0"
                    id={`quantity-${item.id}`}
                  />
                <button className="btn transition-colors hover:btn-success hover:text-black" 
                        onClick={() => {
                            const quantity = parseInt(document.getElementById(`quantity-${item.id}`).value);
                            handleAddToCart(item.id, quantity);
                  }}>Add to Card</button>
              </div>
            </div>
        </div>
        ))}
      </div>

      <div className="overflow-x-auto max-w-[80rem] mx-auto">
      {totalAmount>0 ?
      <>
      <h2 className="text-xl font-bold mt-8">Your Order</h2>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(cart).map(([itemId, quantity]) => {
              const item = bakeryItems.find(item => item.id === parseInt(itemId));
              return (
          <tr key={itemId}>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={item.img}
                      alt="Item Image" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{item.name}</div>
                </div>
              </div>
            </td>
            <td>
              {quantity}
            </td>
            <td>
              ${(quantity * item.price).toFixed(2)}
            </td>
            <th className='flex '>
              <button className="hover:bg-yellow-500 hover:text-black text-yellow-500 px-2 py-1 rounded mr-2 cursor-pointer flex gap-1" onClick={() => handleReduceQuantity(itemId)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m13 12.6l6-3.4V13c.7 0 1.4.1 2 .4V7.5c0-.4-.2-.7-.5-.9l-7.9-4.4c-.2-.1-.4-.2-.6-.2s-.4.1-.6.2L3.5 6.6c-.3.2-.5.5-.5.9v9c0 .4.2.7.5.9l7.9 4.4c.2.1.4.2.6.2s.4-.1.6-.2l.9-.5c-.3-.6-.4-1.3-.5-2M12 4.2l6 3.3l-2 1.1l-5.9-3.4zm-1 15.1l-6-3.4V9.2l6 3.4zm1-8.5L6 7.5l2-1.2l6 3.5zM23 18v2h-8v-2z"/></svg>
                  Drop 1
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded mr-2 cursor-pointer flex gap-1" onClick={() => handleRemoveFromCart(itemId)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m13 12.6l6-3.4V13c.7 0 1.4.1 2 .4V7.5c0-.4-.2-.7-.5-.9l-7.9-4.4c-.2-.1-.4-.2-.6-.2s-.4.1-.6.2L3.5 6.6c-.3.2-.5.5-.5.9v9c0 .4.2.7.5.9l7.9 4.4c.2.1.4.2.6.2s.4-.1.6-.2l.9-.5c-.3-.6-.4-1.3-.5-2M12 4.2l6 3.3l-2 1.1l-5.9-3.4zm-1 15.1l-6-3.4V9.2l6 3.4zm1-8.5L6 7.5l2-1.2l6 3.5zm4.9 4.7l2.1 2.1l2.1-2.1l1.4 1.4l-2.1 2.1l2.1 2.1l-1.4 1.4l-2.1-2.1l-2.1 2.1l-1.4-1.4l2.1-2.1l-2.1-2.1z"/></svg>
                  Drop All
              </button>
            </th>
          </tr>
          );
      })}
        </tbody>
        {/* foot */}

        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th className='font-black'>Total: ${totalAmount.toFixed(2)}</th>
            <th><button className="btn btn-success w-full text-black px-2 py-1 rounded mr-2 cursor-pointer">Confirm Order</button></th>
          </tr>
        </tfoot>
      </table>
      </>
    :
    <div role="alert" className="alert alert-warning my-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current h-6 w-6 shrink-0">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>No order placed yet</span>
    </div>
    }
    </div>
    </ div>
  );
}

export default App;