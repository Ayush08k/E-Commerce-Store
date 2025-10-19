import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'SAREES',
    image: 'https://images.pexels.com/photos/16655228/pexels-photo-16655228/free-photo-of-woman-in-a-sari-posing-by-a-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '/category/women',
  },
  {
    name: 'BLOUSES',
    image: 'https://images.pexels.com/photos/10357606/pexels-photo-10357606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '/products',
  },
  {
    name: 'SHAPEWEARS',
    image: 'https://images.pexels.com/photos/7679883/pexels-photo-7679883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '/products',
  },
  {
    name: 'SAREE SATURDAY',
    image: 'https://images.pexels.com/photos/10573082/pexels-photo-10573082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '/products',
  },
];

const TopCategories: React.FC = () => {
  return (
    <section>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-center mb-10 text-blue-900">
          TOP CATEGORIES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
             <Link to={category.link} key={index} className="group block animate-slideInUp" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="bg-gradient-to-b from-[#f3eac8] to-[#d6b56e] rounded-2xl p-2 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full flex flex-col">
                    <div className="flex-grow overflow-hidden rounded-xl h-96">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                    <div className="text-center py-4 flex-shrink-0">
                        <p className="font-bold text-lg text-blue-900 tracking-wider">
                            {category.name}
                        </p>
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
