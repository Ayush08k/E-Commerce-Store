import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/category/women', label: 'Women' },
  { to: '/category/men', label: 'Men' },
  { to: '/category/girl', label: 'Girls' },
  { to: '/category/boy', label: 'Boys' },
  { to: '/products', label: 'Shop' },
  { to: '/order-history', label: 'Orders' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const NavItem: React.FC<{ to: string, label: string, onClick: () => void }> = ({ to, label, onClick }) => (
    <NavLink 
      to={to} 
      onClick={onClick}
      className={({ isActive }) => 
        `relative py-2 font-medium text-gray-600 transition-colors duration-300 group ${isActive ? 'text-indigo-600' : 'hover:text-gray-900'}`
      }
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
    </NavLink>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center" aria-label="Ethnic Elegance Home">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-gray-800">
                Ethnic<span className="text-indigo-600">Elegance</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <NavItem key={link.to} {...link} onClick={() => setIsMenuOpen(false)} />
            ))}
          </nav>
          
          <div className="flex items-center justify-end">
             <form onSubmit={handleSearchSubmit} className="relative hidden lg:block mr-4">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..." 
                className="w-48 pl-4 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:w-64" 
              />
              <button type="submit" className="absolute right-0 top-0 mt-2 mr-3" aria-label="Search">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <div className="hidden md:flex items-center space-x-1">
               <Link to="/wishlist" className="relative p-2 text-gray-600 hover:text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <Link to="/wishlist" className="relative p-2 text-gray-600 hover:text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
               <Link to="/cart" className="relative p-2 text-gray-600 hover:text-indigo-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute w-full bg-white shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="p-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..." 
                className="w-full pl-4 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <button type="submit" className="absolute right-0 top-0 mt-2 mr-3" aria-label="Search">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map(link => (
                <NavItem key={link.to} {...link} onClick={() => setIsMenuOpen(false)} />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;