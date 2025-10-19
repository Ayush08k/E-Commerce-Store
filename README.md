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

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- A modern web browser that supports ES6 modules.
- A local web server to serve the `index.html` file. You can use any simple server, like the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code, or Python's built-in server.
- A valid API key for the Gemini API.

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone <your-repository-url>
cd <repository-folder>
```

### 2. Set up Environment Variables

The application requires an API key for the Gemini API. While the project is coded to use `process.env.API_KEY`, this won't work directly in a browser without a build tool. For local development, you can add a script tag to `index.html` to set this variable on the `window` object.

1.  Open `index.html` in your code editor.
2.  Add the following script tag inside the `<head>` section, replacing `YOUR_API_KEY` with your actual Gemini API key:

```html
<script>
  // For local development only
  window.process = {
    env: {
      API_KEY: 'YOUR_API_KEY'
    }
  };
</script>
```
**Important**: Do not commit this change to version control if your repository is public. This method is for local testing only.

### 3. Install Dependencies

This project uses an `importmap` in `index.html` to load dependencies like React and the Gemini SDK directly from a CDN. Therefore, there is **no `npm install` step required**.

### 4. Run the Application

You need to serve the files from a local web server because browser security policies can block some functionality (like module imports) when opening the `index.html` file directly from the filesystem.

**Option A: Using VS Code's Live Server Extension**

1.  Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension from the VS Code Marketplace.
2.  Open the project folder in VS Code.
3.  Right-click on the `index.html` file and select "Open with Live Server".

**Option B: Using Python's HTTP Server**

If you have Python installed, you can run a simple web server from your terminal.

1.  Navigate to the project's root directory in your terminal.
2.  Run the following command (for Python 3):

    ```bash
    python -m http.server
    ```
3.  Open your web browser and go to `http://localhost:8000`.

The application should now be running in your browser!
