import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ALL_PRODUCTS } from '../constants';
import StarRating from '../components/StarRating';
import { useCart } from '../context/CartContext';
import { useReviews } from '../context/ReviewContext';
import ReviewsList from '../components/ReviewsList';
import ProductReviewForm from '../components/ProductReviewForm';
import { useWishlist } from '../context/WishlistContext';
import Breadcrumbs from '../components/Breadcrumbs';
import ConfirmationModal from '../components/ConfirmationModal';
import { ShareModal } from '../components/ShareModal';
import { Product } from '../types';
import ProductDetailSkeleton from '../components/ProductDetailSkeleton';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getReviews, getReviewStats } = useReviews();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addProductToRecentlyViewed } = useRecentlyViewed();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    // Simulate API call to fetch product details
    const timer = setTimeout(() => {
      const foundProduct = ALL_PRODUCTS.find(p => p.id === id);
      setProduct(foundProduct);
      if (foundProduct) {
        addProductToRecentlyViewed(foundProduct.id);
      }
      setLoading(false);
    }, 500); // 500ms delay to showcase skeleton loader

    return () => clearTimeout(timer);
  }, [id, addProductToRecentlyViewed]);

  const isWishlisted = product ? isInWishlist(product.id) : false;

  const handleWishlistToggle = () => {
    if (!product) return;
    if (isWishlisted) {
      setIsModalOpen(true);
    } else {
      addToWishlist(product);
    }
  };

  const handleConfirmRemove = () => {
    if (product) {
      removeFromWishlist(product.id);
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">Product not found</h1>
        <Link to="/products" className="mt-4 inline-block text-indigo-600 hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }
  
  const { name, price, image, description } = product;
  
  const relatedProducts = ALL_PRODUCTS.filter(p => p.productType === product.productType && p.id !== product.id).slice(0, 4);
  const productReviews = getReviews(product.id);
  const { averageRating, reviewCount } = getReviewStats(product.id);

  // Simulated data to match the screenshot
  const discountPercentage = 92;
  const originalPrice = price / (1 - discountPercentage / 100);
  const galleryImages = [image, ...[...Array(5)].map((_, i) => `https://placehold.co/600x600/F472B6/FFFFFF?text=View+${i+2}`)];

  const productDetails = {
    "Material composition": "Kanjivaram Soft Silk",
    "Weave type": "Zari",
    "Design name": "Zari",
    "Length": "6 yards",
    "Occasion type": "Festive",
    "Pattern": "Floral",
    "Country of Origin": "India"
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: capitalize(product.demographic), to: `/category/${product.demographic}` },
    { label: product.name },
  ];
  
  return (
    <>
      <div className="animate-slideInRight">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8">
            
            {/* --- LEFT COLUMN: IMAGE GALLERY --- */}
            <div className="lg:col-span-5">
              <h2 className="text-xl font-serif font-bold text-gray-800 mb-4">Image Gallery</h2>
              <div className="flex gap-4">
                <div className="flex flex-col space-y-2">
                  {galleryImages.slice(0, 6).map((img, i) => (
                    <div 
                      key={i} 
                      onMouseEnter={() => setActiveImage(i)}
                      className={`w-16 h-16 border rounded-md p-1 cursor-pointer transition ${activeImage === i ? 'border-indigo-500' : 'hover:border-gray-400'}`}
                    >
                      <img src={img} alt={`thumbnail ${i + 1}`} className="w-full h-full object-cover rounded-sm" />
                    </div>
                  ))}
                </div>
                <div className="flex-1 relative">
                  <img className="w-full h-auto object-cover rounded-lg shadow-md aspect-[1/1]" src={galleryImages[activeImage]} alt={name} />
                </div>
              </div>
            </div>

            {/* --- MIDDLE COLUMN: PRODUCT INFO --- */}
            <div className="lg:col-span-4 mt-6 lg:mt-0">
              <h2 className="text-xl font-serif font-bold text-gray-800 mb-4">Product Details</h2>
              <a href="#" className="text-sm text-indigo-600 hover:underline">Visit the SGF11 Store</a>
              <div className="flex justify-between items-start mt-1">
                <h1 className="text-2xl font-bold font-serif text-gray-800 mb-2">{name}</h1>
                <button 
                  onClick={() => setIsShareModalOpen(true)}
                  className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                  aria-label="Share this product"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.001l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367 2.684z" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <span className="text-gray-700 font-semibold">{averageRating.toFixed(1)}</span>
                  <StarRating rating={averageRating} />
                </div>
                <a href="#reviews" className="text-sm text-indigo-600 hover:underline">{reviewCount} ratings</a>
              </div>
              <div className="text-sm">
                  <span className="bg-orange-600 text-white font-semibold px-2 py-1 rounded-sm">#1 Best Seller</span>
                  <span className="text-gray-600 ml-2">in Women's Sarees</span>
              </div>
              
              <hr className="my-4"/>

              <div className="space-y-1">
                <div>
                  <span className="text-red-600 font-bold text-xl mr-2">-{discountPercentage}%</span>
                  <span className="text-3xl font-bold text-gray-800">${price.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-500">
                  M.R.P.: <span className="line-through">${originalPrice.toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-600">Inclusive of all taxes</div>
              </div>
              
              <div className="my-4">
                <h3 className="text-md font-bold mb-2">Offers</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    <div className="border p-2 rounded-md">
                        <h4 className="font-bold text-gray-800">Cashback</h4>
                        <p className="text-gray-600">Upto $13.00 cashback...</p>
                    </div>
                    <div className="border p-2 rounded-md">
                        <h4 className="font-bold text-gray-800">Partner Offers</h4>
                        <p className="text-gray-600">5% off any 2, 10% off...</p>
                    </div>
                    <div className="border p-2 rounded-md">
                        <h4 className="font-bold text-gray-800">Bank Offer</h4>
                        <p className="text-gray-600">Upto $30.00 discount...</p>
                    </div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-around text-center my-4 text-xs text-indigo-700">
                  <div className="p-1 text-center">10 days Return<br/>& Exchange</div>
                  <div className="p-1 text-center">Pay on Delivery</div>
                  <div className="p-1 text-center">Free Delivery</div>
                  <div className="p-1 text-center">Top Brand</div>
              </div>
            </div>

            {/* --- RIGHT COLUMN: ACTION PANEL --- */}
            <div className="lg:col-span-3 mt-6 lg:mt-0">
              <h2 className="text-xl font-serif font-bold text-gray-800 mb-4">Purchase Options</h2>
              <div className="border rounded-lg p-4 shadow-sm sticky top-24">
                <div className="text-2xl font-bold text-gray-800">${(price * quantity).toFixed(2)}</div>
                <p className="text-sm text-gray-600 mt-2">
                    <span className="font-semibold text-indigo-600">FREE delivery</span> Thursday, 23 October.
                </p>
                <p className="text-sm text-gray-600">Or fastest delivery Sunday, 19 October.</p>
                <div className="mt-4 text-lg font-semibold text-green-700">In Stock</div>
                  <p className="text-xs text-gray-600 mt-2">Ships from: Amazon</p>
                  <p className="text-xs text-gray-600">Sold by: SGF11</p>

                <div className="mt-4">
                    <label htmlFor="quantity" className="text-sm font-semibold mr-2">Quantity:</label>
                    <select 
                        id="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}
                        className="p-1 border rounded-md text-sm"
                    >
                        {[...Array(10)].map((_, i) => (<option key={i+1} value={i+1}>{i+1}</option>))}
                    </select>
                </div>
                
                <div className="mt-4 flex flex-col gap-3">
                    <button onClick={() => addToCart(product, quantity)} className="w-full bg-yellow-400 font-semibold py-2.5 rounded-full hover:bg-yellow-500 transition-colors">
                        Add to Cart
                    </button>
                    <button onClick={handleBuyNow} className="w-full bg-orange-500 text-white font-semibold py-2.5 rounded-full hover:bg-orange-600 transition-colors">
                        Buy Now
                    </button>
                </div>
                
                <div className="mt-3 text-sm flex items-center">
                      <input type="checkbox" id="gift" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                      <label htmlFor="gift" className="ml-2 text-gray-700">Add gift options</label>
                </div>

                <button
                    onClick={handleWishlistToggle}
                    className="mt-3 w-full border border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                  >
                    {isWishlisted ? 'Remove from Wishlist' : 'Add to Wish List'}
                  </button>
              </div>
            </div>

            {/* --- SECTIONS BELOW MAIN GRID --- */}
            <div className="lg:col-span-12 lg:col-start-1 mt-8 space-y-10">
                <div className="lg:pr-[25%]"> {/* Aligns with middle and left columns */}
                    <hr/>
                    <div className="pt-6">
                      <h3 className="text-md font-bold mb-4">Colour: <span className="font-normal">Pink</span></h3>
                      <div className="flex flex-wrap gap-3">
                        {ALL_PRODUCTS.filter(p => p.productType === 'saree').slice(0, 6).map((variant) => (
                          <div key={variant.id} className={`border-2 rounded-lg p-2 cursor-pointer w-28 text-center transition ${product.id === variant.id ? 'border-indigo-500' : 'border-gray-200 hover:border-gray-400'}`}>
                            <img src={variant.image} alt={variant.name} className="w-full h-24 object-cover rounded-md mb-1" />
                            <p className="text-sm font-semibold">${variant.price.toFixed(2)}</p>
                            <p className="text-xs text-gray-500 line-through">${(variant.price * 1.25).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 mt-8 border-t">
                        <div>
                            <h3 className="text-xl font-serif font-bold mb-4">Product details</h3>
                            <div className="space-y-3 text-gray-700">
                              {Object.entries(productDetails).map(([key, value]) => (
                                <div key={key} className="flex text-sm">
                                    <p className="w-1/2 font-semibold text-gray-800">{key}</p>
                                    <p className="w-1/2">{value}</p>
                                  </div>
                              ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-serif font-bold mb-4">About this item</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                                <li>Fabric: Kanchipuram Silk, Blouse Fabric Kanchipuram Silk. Work: Jacquard Woven Stylish Sari, Zari Woven.</li>
                                <li>Saree Length: 5.50 Meter, Blouse Piece Length: 0.80 Meter (Unstitched, attached with saree)</li>
                            </ul>
                            <button className="text-indigo-600 hover:underline text-sm mt-2 font-semibold">See more</button>
                            <div className="mt-6 pt-6 border-t">
                                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1.75-5.25a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3z" clipRule="evenodd" />
                                    </svg>
                                    Report an issue with this product
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    {/* Similar Sarees delivered by tomorrow */}
                    {relatedProducts.length > 0 && (
                      <div className="pt-8 mt-8 border-t">
                        <h3 className="text-xl font-serif font-bold mb-4">Similar Sarees delivered by tomorrow</h3>
                        <div className="space-y-4">
                          {relatedProducts.slice(0, 3).map(p => { 
                            const { averageRating, reviewCount } = getReviewStats(p.id);
                            return (
                              <Link key={p.id} to={`/product/${p.id}`} className="flex items-start gap-4 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                                <div className="flex-grow">
                                  <p className="font-semibold text-indigo-700 hover:underline text-sm leading-tight">{p.name}</p>
                                  <div className="flex items-center mt-1">
                                    <StarRating rating={averageRating} />
                                    <span className="text-xs text-gray-500 ml-2">({reviewCount})</span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-lg font-bold text-gray-800">${p.price.toFixed(2)}</span>
                                    <span className="text-sm font-bold text-blue-600 italic">✓prime</span>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}

                </div>
            </div>
          </div>
        </div>

        {/* --- PRODUCT DESCRIPTION SECTION --- */}
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-sm mt-10">
          <h2 className="text-2xl font-serif font-bold text-gray-800 border-b pb-4 mb-8">Product Description</h2>
          <div className="space-y-12 text-gray-700">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <img src={galleryImages[0]} alt="Premium Saree" className="rounded-lg w-full" />
                <div className="flex flex-col gap-6">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Premium Superb Quality Saree For Indian Occasions</h3>
                        <p className="text-sm leading-relaxed">Kanjivaram silk saree is a magnificent creation of the craftsmen living in a small town. The silk used in the creation of Kanjivaram saree is extremely fine as well as durable and is one of the most popular forms of silk.</p>
                        <p className="text-sm leading-relaxed mt-2">A beautiful Pink color saree is well crafted with premium quality Kanjivaram silk fabric with Rani Golden color Zari border.</p>
                        <div className="mt-4 p-3 border rounded-md bg-gray-50 text-sm">
                            Saree Color - Pink With Golden color wide Border
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-start">
                        <img src={galleryImages[1]} alt="Fabric detail" className="rounded-lg w-full" />
                        <div>
                            <h4 className="font-semibold text-gray-800">About Saree</h4>
                            <p className="text-xs leading-relaxed mt-1">When a woman is dressed in saree, it redefines her elegance and accentuates her grace. With the right material and drape, it can accentuate the beauty of women of all ages and forms.</p>
                            <ul className="list-disc list-inside text-xs mt-2 space-y-1 font-semibold">
                                <li>Traditional Wear</li>
                                <li>Wedding Wear</li>
                                <li>Party Wear</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="md:order-last">
                    <img src={galleryImages[2]} alt="Saree pallu" className="rounded-lg w-full" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Kanjivaram Soft Silk Saree with Rich Pallu And Border</h3>
                    <p className="text-sm leading-relaxed">One of the most graceful costumes made from unstitched fabric-the saree-the much-loved choice for most Indian women can be worn in so many different ways. The saree and all its parts, the body, the pallu and the border, all of them play a significant role in the entire look.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <img src={galleryImages[3]} alt="Saree close-up" className="rounded-lg w-full" />
                <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Kanjivaram Soft Silk Saree with Easy Care</h3>
                    <p className="text-sm leading-relaxed">Gorgeous beautiful color saree is well crafted with high quality Kanjivaram Silk fabric soft finished, heavy Zari border with Rich pallu, comfortable to wear, artistically woven by our skilled artisans; now flaunt your sophisticated appearance on any special function!</p>
                    <p className="text-sm leading-relaxed mt-2">Festivals are not far away, the best way to celebrate this time with dressing up your traditional attire. Saree is one such attire that would never go out of fashion.</p>
                </div>
            </div>

            <div>
                <h3 className="font-bold text-lg text-gray-800 mb-6 text-center">Kanjivaram Latest Design Soft Silk Saree</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div>
                        <img src={galleryImages[4]} alt="Saree Border" className="rounded-lg mb-3 shadow-sm" />
                        <h4 className="font-semibold text-gray-800">Saree Border</h4>
                        <p className="text-sm mt-1">Our saree and beautiful Kanjivaram Silk Saree comes with an elegant border that highlights the saree well. With easy draping and a beautiful fall, these sarees can be worn for any festive occasion.</p>
                    </div>
                    <div>
                        <img src={galleryImages[0]} alt="Saree Body part" className="rounded-lg mb-3 shadow-sm" />
                        <h4 className="font-semibold text-gray-800">Saree Body part</h4>
                        <p className="text-sm mt-1">saree is traditionally created by weavers. Considered to be made from the highest quality silks, though intricate and very beautiful. Featuring an unending variety in color, shades, contrasts and patterns.</p>
                    </div>
                    <div>
                        <img src={galleryImages[5]} alt="Latest Design Collection" className="rounded-lg mb-3 shadow-sm" />
                        <h4 className="font-semibold text-gray-800">Latest Design Collection</h4>
                        <p className="text-sm mt-1">The beauty of Kanjivaram Silk Saree is that it emanates a rich grace. With its rich looks, and eye-catching colors, you can choose from a wide range of our Kanjivaram Sarees.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div id="reviews" className="mt-16 border-t pt-12">
          <h3 className="text-3xl font-serif font-bold text-center mb-10">Customer Feedback</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="md:pr-6">
                  <h4 className="text-2xl font-semibold mb-4 border-b pb-2">Reviews ({reviewCount})</h4>
                  <ReviewsList reviews={productReviews} />
              </div>
              <div className="md:pl-6">
                  <h4 className="text-2xl font-semibold mb-4 border-b pb-2">Write a Review</h4>
                  <ProductReviewForm productId={product.id} />
              </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmRemove}
        title="Remove from Wishlist"
        message="Are you sure you want to remove this item from your wishlist?"
      />
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        productName={product.name}
        productImage={product.image}
        pageUrl={window.location.href}
      />
    </>
  );
};

export default ProductDetailPage;