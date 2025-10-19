# Ethnic Elegance - AI Powered Indian Wear

Ethnic Elegance is a modern e-commerce web application designed for browsing and purchasing traditional Indian ethnic wear. What sets this project apart is its integration with the Gemini API to provide an AI-enhanced shopping experience, featuring a personal shopper and an internal tool for dynamic product image generation.

The storefront is fully responsive, offering a seamless user experience across desktops, tablets, and mobile devices.

## ✨ Features

- **AI Personal Shopper**: Utilizes the Gemini API to understand natural language queries (e.g., "a blue silk saree for a wedding guest") and returns a curated list of the most relevant products from the catalog.
- **AI Product Image Generation**: An internal tool for administrators to generate new, high-quality, photorealistic images for products based on their name and description, powered by Imagen.
- **Comprehensive Product Catalog**: Browse products by category (Women, Men, Girls, Boys) or view the entire collection.
- **Advanced Filtering**: Filter products by type (Saree, Kurta, etc.) and price range to easily find what you're looking for.
- **Detailed Product Pages**: View extensive product details, a gallery of images, customer reviews, and similar items.
- **Shopping Cart**: A fully functional cart to add, remove, and update the quantity of items before checkout.
- **Wishlist**: Save favorite items to a personal wishlist for later viewing or purchase.
- **Customer Reviews & Ratings**: Users can submit reviews and ratings for products, which are then displayed on the product detail page.
- **Order History & Tracking**: Mock order system that allows users to view their order history and track the status of a specific order using an Order ID.
- **Responsive Design**: The entire application is built with a mobile-first approach using Tailwind CSS, ensuring a great experience on any device.
- **Social Sharing**: Easily share products with friends and family via a clean, modern share modal that includes Facebook, Twitter, Pinterest, WhatsApp, and Email.

## 🚀 Running Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key

```dotenv
GEMINI_API_KEY=your-google-gemini-key
# Optional; defaults to http://localhost:4000/api
VITE_API_BASE_URL=http://localhost:4000/api
```
   
3. Run the app:
   `npm run dev`

    ```bash
    python -m http.server
    ```
3.  Open your web browser and go to `http://localhost:8000`.

The application should now be running in your browser!
