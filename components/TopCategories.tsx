import React from 'react';
import { Link } from 'react-router-dom';

const collections = [
  {
    name: "Women's Collection",
    description: 'Graceful sarees, elegant suits, and stunning lehengas.',
    image: 'https://images.pexels.com/photos/3860203/pexels-photo-3860203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '/category/women',
    align: 'justify-end',
  },
  {
    name: "Men's Collection",
    description: 'Regal sherwanis and sophisticated kurtas for the modern man.',
    image: 'https://images.pexels.com/photos/17058611/pexels-photo-17058611/free-photo-of-man-in-traditional-clothing-posing-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '/category/men',
    align: 'justify-start',
  },
];

const TopCategories: React.FC = () => {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <Link to={collection.link} key={index} className="group relative block h-96 rounded-lg overflow-hidden shadow-lg animate-slideInUp" style={{ animationDelay: `${index * 150}ms` }}>
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url('${collection.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className={`relative h-full flex flex-col p-8 text-white ${collection.align} text-left`}>
                <h3 className="text-3xl font-serif font-bold">{collection.name}</h3>
                <p className="mt-2 max-w-xs">{collection.description}</p>
                <div className="mt-4 px-6 py-2 border border-white rounded-full self-start group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  Shop Now
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;