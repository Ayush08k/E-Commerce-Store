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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
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

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.258.058 2.152.248 2.92.546.804.318 1.458.78 2.08 1.402.62.622 1.082 1.276 1.4 2.08.3.768.49 1.662.546 2.92.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.058 1.258-.248 2.152-.546 2.92-.318.804-.78 1.458-1.402 2.08-.622.62-1.276 1.082-2.08 1.4-.768.3-1.662.49-2.92.546-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.258-.058-2.152-.248-2.92-.546-.804-.318-1.458-.78-2.08-1.402-.62-.622-1.082-1.276-1.4-2.08-.3-.768-.49-1.662-.546-2.92-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.058-1.258.248-2.152.546-2.92.318-.804.78-1.458 1.402-2.08.622-.62 1.276-1.082 2.08-1.4.768-.3 1.662.49 2.92.546 1.266.058 1.646.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.29.058-2.227.248-3.024.558-.833.32-1.557.78-2.25 1.476-.69.694-1.156 1.417-1.476 2.25-.31.797-.5 1.734-.558 3.024-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.29.248 2.227.558 3.024.32.833.78 1.557 1.476 2.25.694.69 1.417 1.156 2.25 1.476.797.31 1.734.5 3.024.558 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.29-.058 2.227-.248 3.024-.558.833-.32 1.557-.78 2.25-1.476.69-.694 1.156-1.417-1.476-2.25.31-.797.5-1.734.558-3.024.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.29-.248-2.227-.558-3.024-.32-.833-.78-1.557-1.476-2.25-.694-.69-1.417-1.156-2.25-1.476-.797-.31-1.734-.5-3.024-.558-1.28-.058-1.688-.072-4.947-.072z" clipRule="evenodd" />
                  <path d="M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM12 14a2 2 0 110-4 2 2 0 010 4z" />
                  <path d="M18.802 6.11a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
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
