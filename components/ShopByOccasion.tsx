import React from 'react';
import { Link } from 'react-router-dom';

const occasions = [
  {
    name: 'Weddings',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/search?q=wedding+wear',
  },
  {
    name: 'Festivals',
    image: 'https://images.pexels.com/photos/16147488/pexels-photo-16147488/free-photo-of-woman-in-red-sari-sitting-on-flower-petals.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/search?q=festive+wear',
  },
  {
    name: 'Party Wear',
    image: 'https://images.pexels.com/photos/15945391/pexels-photo-15945391/free-photo-of-a-woman-in-a-traditional-indian-sari-and-jewelry.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/search?q=party+wear',
  },
  {
    name: 'Casual & Work',
    image: 'https://images.pexels.com/photos/11269389/pexels-photo-11269389.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/search?q=casual+kurta',
  },
];

const ShopByOccasion: React.FC = () => {
  return (
    <section>
      <h2 className="text-4xl font-serif font-bold text-center mb-10">Shop by Occasion</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {occasions.map((occasion, index) => (
          <Link
            to={occasion.link}
            key={occasion.name}
            className="group relative block h-80 rounded-lg overflow-hidden shadow-lg animate-slideInUp"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
              style={{ backgroundImage: `url('${occasion.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl font-serif font-bold">{occasion.name}</h3>
              <div className="mt-2 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Shop Now &rarr;
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByOccasion;