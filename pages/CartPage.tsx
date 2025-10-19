import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, cartCount } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-4">Items ({cartCount})</h2>
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-6 last:border-b-0 last:pb-0">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                <div className="flex-grow">
                  <Link to={`/product/${item.id}`} className="font-semibold text-lg text-gray-800 hover:text-indigo-600">{item.name}</Link>
                  <p className="text-sm text-gray-500">{item.demographic}'s {item.productType}</p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex items-center border rounded-md">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="px-3 py-1 text-lg font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-50" disabled={item.quantity <= 1}>-</button>
                    <span className="px-4 py-1 text-md font-semibold text-gray-900">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="px-3 py-1 text-lg font-semibold text-gray-600 hover:bg-gray-100">+</button>
                  </div>
                  <p className="w-20 text-right font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500" aria-label="Remove item">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-4">Order Summary</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="border-t pt-4 mt-4 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
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