# ShopKart 🛒

A full stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js).

## Screenshots

| Home Page | Product Detail |
|-----------|---------------|
| ![Home](screenshots/home.png) | ![Product](screenshots/product-detail.png) |

| Login | Register |
|-------|----------|
| ![Login](screenshots/login.png) | ![Register](screenshots/register.png) |

| Cart | Orders |
|------|--------|
| ![Cart](screenshots/cart.png) | ![Orders](screenshots/orders.png) |

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Browse products with search and category filter
- Product detail page
- Add to cart with quantity management
- Place orders and view order history
- Admin panel to add, edit, and delete products
- Protected routes for authenticated users
- Responsive dark themed UI

## Tech Stack

**Frontend:**
- React 18 with Vite
- React Router v6
- Context API for state management
- Axios for API calls

**Backend:**
- Node.js
- Express.js
- JWT for authentication
- bcryptjs for password hashing

**Database:**
- MongoDB Atlas (cloud)
- Mongoose ODM

## Project Structure
```
shopkart/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
├── screenshots/
└── README.md
```

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account (free tier)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/AdityaJha27/shopkart-mern.git
cd shopkart-mern
```

**2. Backend setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

**3. Frontend setup**
```bash
cd frontend
npm install
```

### Running the Application

**Start Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Start Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

Open your browser at `http://localhost:5173`

## API Endpoints

### Auth Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/register | Register new user | Public |
| POST | /api/auth/login | Login user | Public |
| GET | /api/auth/profile | Get user profile | Private |

### Product Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/products | Get all products | Public |
| GET | /api/products/:id | Get single product | Public |
| POST | /api/products | Create product | Admin |
| PUT | /api/products/:id | Update product | Admin |
| DELETE | /api/products/:id | Delete product | Admin |

### Order Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/orders | Place order | Private |
| GET | /api/orders/myorders | Get my orders | Private |

## Environment Variables

Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/shopkart
JWT_SECRET=your_secret_key
PORT=5000
```

> Never commit the .env file to GitHub

## Upcoming Features 🚀

### Fashion Recommendation System (AI Powered)
- Personalized outfit recommendations based on user purchase history
- AI model trained on fashion dataset to suggest matching products
- "Complete the Look" feature — suggest accessories and clothing that match
- Style preference quiz for new users
- Collaborative filtering — "Users like you also bought"
- Season based recommendations (Summer, Winter, Festival collections)
- Size recommendation based on previous orders

### Other Planned Improvements
- Razorpay payment gateway integration
- Product image upload with Cloudinary
- Email notifications with Nodemailer
- Product reviews and ratings system
- Coupon and discount code system
- Wishlist / Save for later
- Order tracking with real time status updates
- Pagination and infinite scroll
- Redis caching for better performance
- TypeScript migration
- Deployment on AWS (EC2 for backend, S3 + CloudFront for frontend)

## What I Learned

- Building a REST API with Node.js and Express
- JWT based authentication and authorization
- Password hashing with bcrypt
- MongoDB schema design with Mongoose
- React Context API for global state management
- Protected routes in React Router v6
- Axios interceptors for automatic token attachment
- Connecting frontend and backend with Vite proxy

## Author

**Aditya Kumar Jha**
- GitHub: [@AdityaJha27](https://github.com/AdityaJha27)
- LinkedIn: [Aditya Kumar Jha](https://www.linkedin.com/in/aditya-kumar-jha-05844b380/)

## License

MIT License