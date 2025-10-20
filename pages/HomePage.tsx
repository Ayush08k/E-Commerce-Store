import React, { useMemo, useState } from 'react';
import { ALL_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import TopCategories from '../components/TopCategories';
import RecentlyViewed from '../components/RecentlyViewed';
import Testimonials from '../components/Testimonials';
import InstagramFeed from '../components/InstagramFeed';

// New section data
const shopTheLookImages = [
  {
    img: 'https://images.pexels.com/photos/20399121/pexels-photo-20399121/free-photo-of-woman-in-sari-standing-on-a-pavement.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/products'
  },
  {
    img: 'https://images.pexels.com/photos/1482101/pexels-photo-1482101.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/products'
  },
  {
    img: 'https://images.pexels.com/photos/15704870/pexels-photo-15704870/free-photo-of-a-woman-in-a-sari-walking-down-the-street.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/category/women'
  },
  {
    img: 'https://images.pexels.com/photos/15984635/pexels-photo-15984635/free-photo-of-an-indian-groom-in-a-traditional-turban-and-sherwani.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/category/men'
  }
];

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'best' | 'popular'>('new');

  const featuredProducts = useMemo(() => {
    // Show more products for horizontal scroll
    return ALL_PRODUCTS.filter(p => p.category === activeTab).slice(0, 8);
  }, [activeTab]);

  const TabButton: React.FC<{ tab: 'new' | 'best' | 'popular'; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-lg font-medium transition-colors duration-300 ${
        activeTab === tab
          ? 'text-indigo-600 border-b-2 border-indigo-600'
          : 'text-gray-500 hover:text-gray-800'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-20 animate-fadeIn">
      {/* Hero Video Section */}
      <section className="relative h-screen min-h-[600px] w-full -mt-8 -mb-8 flex items-center justify-center text-white text-center rounded-lg shadow-lg overflow-hidden">
        <video 
          src="https://videos.pexels.com/video-files/5982218/5982218-hd_1920_1080_25fps.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
        ></video>
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        <div className="relative z-20 p-4 animate-fadeIn">
          <h1 className="font-serif text-5xl md:text-7xl font-bold">The Essence of Tradition</h1>
          <p className="mt-4 text-xl md:text-2xl font-sans max-w-2xl mx-auto">Discover timeless elegance in every thread. Our curated collection celebrates the rich heritage of Indian craftsmanship.</p>
          <Link to="/products" className="mt-8 inline-block bg-white text-gray-900 font-bold py-3 px-10 rounded-md text-lg hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105">
            Shop The Collection
          </Link>
        </div>
      </section>

      {/* Top Categories */}
      <TopCategories />

      {/* Featured Products Section */}
      <section>
        <h2 className="text-4xl font-serif font-bold text-center mb-4">Discover Our Collections</h2>
        <div className="flex justify-center items-center mb-8 border-b">
          <TabButton tab="new" label="New Arrivals" />
          <TabButton tab="best" label="Best Sellers" />
          <TabButton tab="popular" label="Most Popular" />
        </div>
        <div className="flex overflow-x-auto space-x-8 pb-4 horizontal-scrollbar">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="flex-shrink-0 w-72 animate-slideInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
         <div className="text-center mt-8">
          <Link to="/products" className="text-indigo-600 font-semibold hover:underline">
            View All Products &rarr;
          </Link>
        </div>
      </section>
      
      {/* New "Shop The Look" Section */}
      <section>
        <h2 className="text-4xl font-serif font-bold text-center mb-10">Shop The Look</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shopTheLookImages.map((item, index) => (
            <Link to={item.link} key={index} className="group relative block overflow-hidden rounded-lg shadow-lg animate-slideInUp" style={{ animationDelay: `${index * 150}ms` }}>
              <img src={item.img} alt={`Look ${index + 1}`} className="w-full h-96 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-bold border-2 border-white px-6 py-2 rounded-full">Shop Now</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <Testimonials />

      {/* Instagram Feed Section */}
      <InstagramFeed />

      {/* Recently Viewed Section */}
      <RecentlyViewed />

       {/* Brand Story Section */}
      <section className="bg-white py-16 rounded-lg shadow-md">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInUp">
                <img src="https://images.pexels.com/photos/7745564/pexels-photo-7745564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Artisanal Craftsmanship" className="rounded-lg shadow-lg w-full h-auto object-cover"/>
            </div>
            <div className="animate-slideInUp" style={{ animationDelay: '200ms' }}>
                <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">Why Choose Ethnic Elegance?</h2>
                <div className="space-y-6">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">AI-Powered Curation</h3>
                            <p className="text-gray-600 mt-1">Our smart technology helps you discover pieces that perfectly match your style and occasion.</p>
                        </div>
                    </div>
                     <div className="flex items-start">
                        <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full mr-4">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 12l4.293 4.293a1 1 0 010 1.414L13 20m5-16l2.293 2.293a1 1 0 010 1.414L17 12l4.293 4.293a1 1 0 010 1.414L19 20M9 3l2.293 2.293a1 1 0 010 1.414L7 12l4.293 4.293a1 1 0 010 1.414L9 20" /></svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Artisanal Craftsmanship</h3>
                            <p className="text-gray-600 mt-1">We partner with skilled artisans across India to bring you authentic, handcrafted garments.</p>
                        </div>
                    </div>
                     <div className="flex items-start">
                        <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full mr-4">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Ethical & Authentic</h3>
                            <p className="text-gray-600 mt-1">Committed to quality and authenticity, ensuring every piece tells a story of tradition.</p>
                        </div>
                    </div>
                </div>
            </div>
      </div>
      </section>
    </div>
  );
};

export default HomePage;