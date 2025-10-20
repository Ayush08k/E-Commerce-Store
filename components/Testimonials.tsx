import React from 'react';
import StarRating from './StarRating';

const testimonials = [
  {
    quote: "The quality of the Banarasi saree I bought is breathtaking. The craftsmanship is evident in every thread. I received so many compliments!",
    author: "Priya S.",
    rating: 5,
  },
  {
    quote: "Ethnic Elegance is my go-to for festive wear. Their collection is unique and the AI search helped me find the perfect sherwani for my brother's wedding.",
    author: "Rohan M.",
    rating: 5,
  },
  {
    quote: "I was hesitant to buy a lehenga online, but the entire experience was seamless. The fit was perfect and it looked even more beautiful in person.",
    author: "Anjali K.",
    rating: 4.5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-indigo-50 py-16 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-center mb-12 text-gray-800">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col items-center animate-slideInUp" 
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <StarRating rating={testimonial.rating} />
              <p className="font-serif italic text-gray-600 my-4 flex-grow">"{testimonial.quote}"</p>
              <span className="font-semibold text-gray-800">- {testimonial.author}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;