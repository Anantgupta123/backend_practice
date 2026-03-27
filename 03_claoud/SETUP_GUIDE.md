# AC Servicing Web Application - Complete Setup Guide

## 🚀 Project Overview

This is a production-ready web application for AC servicing and repair business with:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT-based with role-based access control
- **Features**: Booking system, admin panel, ratings & reviews, real-time updates

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Environment Variables](#environment-variables)
5. [Running Locally](#running-locally)
6. [API Documentation](#api-documentation)
7. [Deployment Guide](#deployment-guide)
8. [Troubleshooting](#troubleshooting)

---

## 📦 Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (either local or MongoDB Atlas) - [Setup Guide](https://docs.mongodb.com/manual/installation/)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** or any code editor

### Verify Installation

```bash
node --version
npm --version
git --version
```

---

## 🔧 Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-Origin Resource Sharing
- **cookie-parser** - Cookie parsing
- **dotenv** - Environment variables
- **nodemailer** - Email notifications (optional)

### Step 3: Create .env File

Copy the `example.env` file and rename it to `.env`:

```bash
cp example.env .env
```

Update the `.env` file with your values:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/ac_servicing
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ac_servicing

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRY=7d

# Frontend URL (CORS)
CLIENT_URL=http://localhost:5173

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### How to Set Up MongoDB

#### Option 1: Local MongoDB

```bash
# Windows
# Install MongoDB from: https://www.mongodb.com/try/download/community

# macOS
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

#### Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `MONGO_URI` in `.env`

### Step 4: Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
```

---

## ⚛️ Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- **react** - UI library
- **react-router-dom** - Routing
- **axios** - HTTP client
- **react-toastify** - Notifications
- **react-icons** - Icons
- **tailwindcss** - CSS framework

### Step 3: Create .env File (Optional)

```bash
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### Step 4: Start Frontend Server

```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

### Step 5: Build for Production

```bash
npm run build
```

This creates a `dist` folder ready for deployment.

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/ac_servicing |
| PORT | Server port | 5000 |
| NODE_ENV | Environment mode | development |
| JWT_SECRET | JWT signing key | your_secret_key_min_32_chars |
| JWT_EXPIRY | Token expiration time | 7d |
| CLIENT_URL | Frontend URL for CORS | http://localhost:5173 |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |

---

## 🏃 Running Locally

### Terminal 1: Start MongoDB (if local)

```bash
# macOS
brew services start mongodb-community

# Windows
# MongoDB should be running as a service by default
```

### Terminal 2: Start Backend

```bash
cd backend
npm run dev
```

Expected output:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
Environment: development
```

### Terminal 3: Start Frontend

```bash
cd frontend
npm run dev
```

Expected output:
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Open in Browser

Navigate to: **http://localhost:5173**

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

### Booking Routes

#### Create Booking
```http
POST /bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "serviceType": "repair",
  "description": "AC is not cooling",
  "address": "123 Main St",
  "phone": "1234567890",
  "bookingDate": "2024-04-15T14:30:00"
}
```

#### Get User Bookings
```http
GET /bookings?status=pending
Authorization: Bearer {token}
```

#### Cancel Booking
```http
PUT /bookings/{bookingId}/cancel
Authorization: Bearer {token}
```

#### Add Rating
```http
POST /bookings/rating/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "bookingId": "...",
  "rating": 5,
  "review": "Great service, very professional!"
}
```

### Service Routes

#### Get All Services
```http
GET /services
```

### Admin Routes (Requires admin role)

#### Get Dashboard Stats
```http
GET /admin/stats
Authorization: Bearer {admin_token}
```

#### Get All Bookings (Paginated)
```http
GET /admin/bookings?status=pending&page=1&limit=10
Authorization: Bearer {admin_token}
```

#### Update Booking Status
```http
PUT /admin/bookings/{bookingId}
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "in-progress",
  "assignedTechnician": "Raj Kumar",
  "notes": "Customer called - will arrive in 30 mins",
  "actualCost": 1500
}
```

#### Get All Users
```http
GET /admin/users?page=1&limit=10
Authorization: Bearer {admin_token}
```

---

## 🚀 Deployment Guide

### Backend Deployment (Render.com)

#### Step 1: Create Render Account
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub

#### Step 2: Deploy Backend

1. Create a new Web Service
2. Connect your GitHub repository
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add Environment Variables:
   ```
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=generate_a_strong_secret
   JWT_EXPIRY=7d
   CLIENT_URL=your_frontend_url
   NODE_ENV=production
   ```
6. Deploy

### Frontend Deployment (Vercel)

#### Step 1: Create Vercel Account
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub

#### Step 2: Deploy Frontend

1. Import your GitHub repository
2. Select `frontend` directory
3. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
4. Deploy

### Database Setup (MongoDB Atlas)

#### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get connection string

#### Step 2: Update Connection String
Replace in `.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ac_servicing
```

---

## 🐛 Troubleshooting

### Backend Issues

#### Port Already in Use
```bash
# Change port in .env or kill the process
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

#### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Check if MongoDB is running
- Verify MONGO_URI in .env
- Try MongoDB Atlas instead

#### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Check CLIENT_URL in backend .env matches frontend URL
- Ensure credentials are set in API client

### Frontend Issues

#### Port 5173 Already in Use
```bash
npm run dev -- --port 3000
```

#### API Connection Failed
- Check if backend is running
- Verify VITE_API_URL in .env
- Check network tab in browser devtools

#### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📱 Demo Credentials

**Regular User:**
- Email: user@example.com
- Password: user123456

**Admin User:**
- Email: admin@example.com
- Password: admin123456

---

## 📁 Project Structure

```
.
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── adminController.js
│   │   └── serviceController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Booking.js
│   │   ├── Service.js
│   │   └── Rating.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── serviceRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   ├── tokenUtils.js
│   │   ├── responseFormatter.js
│   │   └── validators.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── RatingModal.jsx
    │   │   └── UIComponents.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Profile.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   └── endpoints.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── hooks/
    │   │   └── useAuth.js
    │   ├── styles/
    │   │   └── index.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── package.json
    └── .env

```

---

## 🔒 Security Best Practices

✅ Implemented:
- Password hashing with bcryptjs
- JWT authentication with expiry
- CORS protection
- Input validation
- Protected routes with role-based access
- HTTP-only cookies
- Environment variables for sensitive data

---

## 🆘 Need Help?

- Check the [Troubleshooting](#troubleshooting) section
- Review error messages in browser console
- Check server logs in terminal
- Verify environment variables

---

## 📄 License

MIT License - Feel free to use this project for your needs.

---

**Happy Coding! 🚀**
