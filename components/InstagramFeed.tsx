import React from 'react';

const instagramPosts = [
  { id: 1, img: 'https://images.pexels.com/photos/16888463/pexels-photo-16888463/free-photo-of-woman-in-traditional-clothing-posing-outdoors.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, img: 'https://images.pexels.com/photos/10357606/pexels-photo-10357606.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, img: 'https://images.pexels.com/photos/15945391/pexels-photo-15945391/free-photo-of-a-woman-in-a-traditional-indian-sari-and-jewelry.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 4, img: 'https://images.pexels.com/photos/16500003/pexels-photo-16500003/free-photo-of-a-girl-in-a-yellow-dress-is-posing-for-a-picture.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

const InstagramFeed: React.FC = () => {
  return (
    <section>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-serif font-bold mb-4">From Our Instagram</h2>
        <p className="text-lg text-gray-600 mb-8">Follow us <a href="#" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">@EthnicElegance</a> for style inspiration.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post, index) => (
            <a 
              href="#" 
              key={post.id} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative block overflow-hidden rounded-lg shadow-md animate-slideInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <img src={post.img} alt={`Instagram post ${post.id}`} className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white opacity-0 group-hover:opacity-80 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 8V0L8.11 5.87 3 5.87 3 11 8.11 11 13 16.87 13 8zM19 12c0-3.86-3.14-7-7-7v2c2.76 0 5 2.24 5 5s-2.24 5-5 5v2c3.86 0 7-3.14 7-7zM19 12V8h2v8h-2v-4z" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;