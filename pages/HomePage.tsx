import React, { useMemo, useState, useEffect } from 'react';
import { ALL_PRODUCTS } from '../constants';
import ProductGrid from '../components/ProductGrid';
import { Link } from 'react-router-dom';
import TopCategories from '../components/TopCategories';

const slides = [
  {
    image: "https://images.pexels.com/photos/10573079/pexels-photo-10573079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    titlePart1: "Diwali",
    titlePart2: "sale",
    subtitle: "UPTO 50% OFF"
  },
  {
    image: "https://images.pexels.com/photos/11993359/pexels-photo-11993359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    titlePart1: "New",
    titlePart2: "arrivals",
    subtitle: "DISCOVER THE LATEST TRENDS"
  },
  {
    image: "https://images.pexels.com/photos/16147488/pexels-photo-16147488/free-photo-of-woman-in-red-sari-sitting-on-flower-petals.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    titlePart1: "Wedding",
    titlePart2: "collection",
    subtitle: "ELEGANCE FOR YOUR BIG DAY"
  }
];

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const latestProducts = useMemo(() => ALL_PRODUCTS.filter(p => p.category === 'new').slice(0, 4), []);
  const topRatedProducts = useMemo(() => ALL_PRODUCTS.filter(p => p.category === 'best').slice(0, 4), []);
  const popularProducts = useMemo(() => ALL_PRODUCTS.filter(p => p.category === 'popular').slice(0, 4), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 animate-fadeIn">
      <section className="relative h-[70vh] min-h-[450px] w-full overflow-hidden rounded-lg shadow-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <div className="animate-slideInUp">
            <h1 className="font-serif text-6xl md:text-8xl font-bold">
              {slides[currentSlide].titlePart1}
              <span className="text-4xl md:text-6xl italic font-normal ml-2">{slides[currentSlide].titlePart2}</span>
            </h1>
            <p className="mt-2 text-xl md:text-2xl font-sans font-semibold tracking-widest uppercase">{slides[currentSlide].subtitle}</p>
            <Link to="/products" className="mt-8 inline-block bg-white text-black font-bold py-3 px-10 rounded-md text-lg hover:bg-gray-200 transition-colors">
              SHOP NOW
            </Link>
          </div>
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <TopCategories />

      <section>
        <h2 className="text-3xl font-serif font-bold text-center mb-8">Latest Arrivals</h2>
        <ProductGrid products={latestProducts} />
      </section>

      <section>
        <h2 className="text-3xl font-serif font-bold text-center mb-8">Top Rated</h2>
        <ProductGrid products={topRatedProducts} />
      </section>
      
      <section>
        <h2 className="text-3xl font-serif font-bold text-center mb-8">Popular Picks</h2>
        <ProductGrid products={popularProducts} />
      </section>
    </div>
  );
};

export default HomePage;
