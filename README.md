# Quantum: Modern E-Commerce Platform

Quantum is a full-stack, responsive e-commerce web application featuring client-side shopping, guest and user cart synchronization, Razorpay payment processing, and an admin management dashboard.

---

## Features

### Storefront & Shopping Experience
- **Product Discovery:** Filter by category, gender, size, color, material, brand, and price range with real-time sorting.
- **Cart Management:** Persistent Redux cart supporting guest sessions with automatic cart merging upon login.
- **Razorpay Checkout:** Secure checkout flow with server-side signature verification.
- **User Dashboard:** Order tracking, order status updates, and profile management.

### Admin Dashboard
- **Product Management:** Add, edit, and delete products with image upload support via Cloudinary and Multer.
- **Order Management:** Track customer orders, update fulfillment statuses, and calculate revenue.
- **User Management:** Manage registered accounts and update user roles.

---

## Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS (v4)
- **State Management:** Redux Toolkit & React-Redux
- **Routing & Networking:** React Router DOM (v7), Axios
- **UI Components & Feedback:** Sonner (Toast notifications), React Icons

### Backend
- **Runtime & Framework:** Node.js, Express.js (v5)
- **Database & ODM:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens) & `bcryptjs`
- **Payment Processing:** Razorpay
- **File Uploads & Media Storage:** Multer, Cloudinary, Streamifier

---

## Project Structure

```text
├── backend/
│   ├── config/          # Database configuration
│   ├── Models/          # Mongoose schemas (User, Product, Order, Cart, Checkout)
│   ├── routes/          # Express API route handlers
│   ├── middleware/      # Authentication & authorization middleware
│   └── seeder.js        # Initial database seed script
├── frontend/
│   └── src/
│       ├── components/  # Layout, Admin, Product, and Cart UI components
│       ├── pages/       # Route views (Home, Collection, Checkout, Admin, etc.)
│       ├── redux/       # Redux Toolkit store & slices
│       └── utils/       # Formatting & helper utilities
```

## 📦 Getting Started

### ✅ Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB instance

---

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file in backend/
# Example:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```


### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file in backend/
# Example:
# VITE_BACKEND_URL= http://localhost:5000

# Start development server
npm run dev
```