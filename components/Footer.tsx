import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      const storedEmails = JSON.parse(localStorage.getItem('newsletterEmails') || '[]');
      if (storedEmails.includes(email)) {
        setMessage('You are already subscribed!');
      } else {
        const newEmails = [...storedEmails, email];
        localStorage.setItem('newsletterEmails', JSON.stringify(newEmails));
        setMessage('Thank you for subscribing!');
      }
      setEmail('');
    } catch (error) {
      setMessage('Could not subscribe. Please try again.');
    }
    
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif font-bold">Stay Updated</h3>
            <p className="text-gray-400 mt-2">Get the latest on new arrivals, special offers, and ethnic fashion trends.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Email for newsletter"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            {message && <p className="mt-3 text-sm text-green-400 animate-fadeIn">{message}</p>}
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/track-order" className="hover:text-white">Track Your Order</Link></li>
              <li><Link to="/order-history" className="hover:text-white">Order History</Link></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            </ul>
          </div>

        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ethnic Elegance. All rights reserved.</p>
          <p className="mt-1">Celebrating Tradition with AI-Powered Style</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;