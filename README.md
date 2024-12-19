# sostaBazar Web Application

## Introduction
This project is an e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to browse products, add items to a cart, and complete purchases. Admin users can manage products and orders through an admin panel.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
### User Features
- **Product Lists**: Browse and search products with sorting, filtering, and pagination.
- **Product Details**: View detailed information about each product.
- **Shopping Cart**: Add, update, and remove products from the cart.
- **Checkout**: Secure card payments using Stripe or cash on delivery.
- **User Authentication**: Register, login, and password reset using Passport.js and JWT.
- **User Profile**: Manage user profile and view order history.
- **Order Confirmation**: Receive email notifications for order confirmations and password resets.

### Admin Features
- **Product Management**: Add, edit, and delete products.
- **Order Management**: View and update order statuses.

## Tech Stack
- **Front-end**: React 18, Tailwind CSS, Redux Toolkit with Async Thunk, React Router v6
- **Back-end**: Node.js, Express.js, Mongoose v7
- **Database**: MongoDB Atlas
- **Testing**: JSON-server for front-end testing
- **Deployment**: Vercel for server deployment
- **Authentication**: Passport.js, Passport JWT
- **Email**: Nodemailer with Gmail SMTP
- **Payments**: Stripe with custom payment intent flow

## Installation
### Prerequisites
- Node.js and npm
- MongoDB Atlas account
- Stripe account
- Gmail account for SMTP

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/AsedAliSekh/sostaBazar.git
   cd sostaBazar
2. **Install dependencies**:
    ```bash
    npm install
    cd client
    npm install
    cd ..

3. **Set up environment variables**:
Create a .env file in the root directory with the following variables:
    ```bash
    MONGO_URI=your_mongodb_atlas_uri
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    SMTP_USER=your_gmail_address
    SMTP_PASS=your_gmail_password
    Run the application:

4. **Run the application**:
    ```bash
    # Start the backend server
    npm run server

    # Start the frontend development server
    cd client
    npm start


## Usage
### Development
- Start the back-end server:
    ```bash
    npm run server
- Start the front-end server:
    ```bash
    cd client
    npm start

### Production
- Build the front-end:
    ```bash
    cd client
    npm run build

- Deploy the back-end and front-end:
Follow Vercel's deployment guides to deploy both the client and server.

## API Endpoints
### Authentication
- POST /api/auth/register: Register a new user
- POST /api/auth/login: User login
- POST /api/auth/reset-password: Reset password

### Products
- GET /api/products: Get all products with sorting, filtering, and pagination
- GET /api/products/
: Get a single product by ID
- POST /api/products: Add a new product (Admin)
- PUT /api/products/
: Update a product (Admin)
- DELETE /api/products/
: Delete a product (Admin)

### Orders
- GET /api/orders: Get all orders (Admin)
- GET /api/orders/user/
: Get orders by user ID
- POST /api/orders: Create a new order
- PUT /api/orders/
: Update an order (Admin)

### Cart
- GET /api/cart: Get user's cart
- POST /api/cart: Add to cart
- PUT /api/cart/
: Update cart item
- DELETE /api/cart/
: Remove from cart

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the project's coding standards and add appropriate tests for your code.

### Steps to Contribute
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
3. Make your changes.
4. Commit and push your changes:
    ```bash
    git add .
    git commit -m "Description of your changes"
    git push origin feature-branch
5. Create a pull request.
```bash
#Feature ADD:---> AdminOrderPage With functionality.
#Fix:----> 
#TODO:----> Page Pagination & Sorting/ out 0f stock/ same product add in cart/ and API & thunk is write in my style.
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.