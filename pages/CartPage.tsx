import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, cartCount } = useCart();

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  if (cartCount === 0) {
    return (
      <div className="text-center py-20 animate-fadeIn">
        <h1 className="text-4xl font-serif font-bold text-gray-800">Your Cart is Empty</h1>
        <p className="mt-4 text-lg text-gray-600">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="mt-6 inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-4xl font-serif font-bold text-center mb-10">Your Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        
        <div className="lg:w-2/3">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <li key={item.id} className="p-4 sm:p-6 flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-md object-cover" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item, parseInt(e.target.value, 10))}
                      className="w-16 p-1 border border-gray-300 rounded-md text-center"
                      aria-label={`Quantity for ${item.name}`}
                    />
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-600 transition-colors" aria-label={`Remove ${item.name}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="w-20 text-right font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-6 sticky top-24">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal ({cartCount} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
