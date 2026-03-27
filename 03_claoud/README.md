# 🌬️ AC Servicing & Repair Business - Web Application

A complete, production-ready web application for AC servicing and repair business with role-based access control, booking system, and admin management panel.

## ✨ Features

### 🏠 User Side (Client Panel)
- ✅ **Home Page** - Hero section, services listing, testimonials, contact section
- ✅ **User Authentication** - Secure JWT-based register/login with bcrypt password hashing
- ✅ **Service Booking** - Easy form to book services with date/time selection
- ✅ **Booking Dashboard** - View all bookings, filter by status, real-time updates
- ✅ **Ratings & Reviews** - Rate completed services and leave reviews
- ✅ **Profile Management** - Update profile, change password
- ✅ **Responsive Design** - Mobile-first design using Tailwind CSS

### 🛠️ Admin Panel
- ✅ **Dashboard** - View total bookings, revenue, user statistics
- ✅ **Booking Management** - View all bookings, update status, assign technicians
- ✅ **User Management** - View users, deactivate/delete accounts
- ✅ **Service Management** - Create, edit, delete services
- ✅ **Role-Based Access** - Secure admin-only routes with JWT verification

### 🔧 Backend Features
- ✅ **MVC Architecture** - Well-organized code structure
- ✅ **MongoDB Integration** - Mongoose ODM with proper schemas
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - bcryptjs for secure password storage
- ✅ **Error Handling** - Comprehensive error handling middleware
- ✅ **CORS & Security** - Properly configured CORS, input validation
- ✅ **API Documentation** - Postman collection included

### 🎨 Frontend Features
- ✅ **React + Vite** - Fast development with React and modern tooling
- ✅ **Tailwind CSS** - Professional, responsive UI
- ✅ **Context API** - State management for authentication
- ✅ **Toast Notifications** - User-friendly notifications
- ✅ **Loading States** - Smooth loading indicators
- ✅ **Form Validation** - Client & server-side validation
- ✅ **Responsive Design** - Works on all devices

## 🚀 Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcryptjs |
| HTTP Client | Axios |
| Notifications | React Toastify |
| Icons | React Icons |

## 📋 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- Git

### Installation Steps

#### 1. Clone/Extract Project
```bash
cd your-project-directory
```

#### 2. Backend Setup
```bash
cd backend
npm install
cp example.env .env
# Edit .env with your MongoDB URI and settings
npm run dev
```

Backend runs on: `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 🔑 Demo Credentials

**Regular User:**
- Email: user@example.com
- Password: user123456

**Admin User:**
- Email: admin@example.com
- Password: admin123456

---

## 📁 Project Structure

```
AC-Servicing-App/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/      # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, error handling
│   ├── utils/           # Helper functions
│   ├── server.js        # Entry point
│   ├── package.json
│   ├── example.env
│   └── .env            # (Create this file)
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API calls
│   │   ├── context/     # Auth context
│   │   ├── hooks/       # Custom hooks
│   │   ├── styles/      # CSS files
│   │   ├── App.jsx      # Main app
│   │   └── main.jsx     # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
│
├── SETUP_GUIDE.md       # Detailed setup instructions
├── AC_Servicing_API.postman_collection.json
└── README.md            # This file
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/ac_servicing
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_minimum_32_characters
JWT_EXPIRY=7d
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - Logout

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `POST /api/bookings/rating/add` - Add rating

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/bookings` - All bookings
- `PUT /api/admin/bookings/:id` - Update booking
- `GET /api/admin/users` - All users

📖 **Complete API documentation** in `SETUP_GUIDE.md`

---

## 🚢 Deployment

### Backend Deployment (Render.com)
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Import repository in Vercel
3. Vercel auto-detects Vite setup
4. Deploy

### Database (MongoDB Atlas)
1. Create free MongoDB Atlas account
2. Create a cluster
3. Use connection string in backend `.env`

📖 **Detailed deployment guide** in `SETUP_GUIDE.md`

---

## 🧪 Testing with Postman

1. Import `AC_Servicing_API.postman_collection.json` into Postman
2. Set base URL to `http://localhost:5000/api`
3. Use demo credentials to get token
4. Test all endpoints

---

## ⚡ Key Features Explained

### 1. Booking System
- Users can book services with date/time selection
- Real-time status updates (pending → in-progress → completed)
- Automatic cost calculation based on service type
- Cancellation support

### 2. Rating System
- Users can rate completed services (1-5 stars)
- Leave detailed reviews
- Average ratings displayed on service cards
- Verified purchase badges

### 3. Admin Dashboard
- At-a-glance statistics (total bookings, revenue, users)
- Manage all bookings with status updates
- Assign technicians to jobs
- User account management (activate/deactivate/delete)
- Service catalog management

### 4. Security
- Password hashing with bcryptjs
- JWT tokens with expiration
- Protected API routes with middleware
- Input validation on frontend and backend
- CORS properly configured
- HTTP-only cookies

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED
```
- Ensure MongoDB is running
- Check MONGO_URI in .env
- Use MongoDB Atlas if local MongoDB unavailable

**CORS Error**
- Verify CLIENT_URL in backend .env
- Ensure frontend URL matches

**Port Already in Use**
- Change PORT in .env or kill the process using that port

📖 **Full troubleshooting guide** in `SETUP_GUIDE.md`

---

## 📈 Performance Optimizations

- ✅ Database indexing for faster queries
- ✅ Pagination for large datasets
- ✅ Lazy loading of components
- ✅ Optimized images and assets
- ✅ Code splitting with Vite
- ✅ Caching strategies

---

## 🔒 Security Measures

- ✅ Bcryptjs password hashing (10 rounds)
- ✅ JWT tokens with 7-day expiry
- ✅ Role-based access control (RBAC)
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ Error handling without exposing internals
- ✅ Environment variables for sensitive data

---

## 📞 Support

For detailed setup, deployment, and troubleshooting guidance, see `SETUP_GUIDE.md`.

---

## 📄 License

MIT License - Free to use and modify

---

## 🎯 Next Steps

1. **Setup Locally** - Follow the Quick Start guide
2. **Explore Features** - Test booking, ratings, admin panel
3. **Customize** - Modify colors, services, content
4. **Deploy** - Use deployment guide for production
5. **Monitor** - Track usage and optimize

---

## ✅ Checklist for Production

- [ ] Update all environment variables
- [ ] Set strong JWT_SECRET
- [ ] Configure MongoDB Atlas
- [ ] Enable HTTPS
- [ ] Set proper NODE_ENV to production
- [ ] Review and update email configuration
- [ ] Add your business information
- [ ] Customize branding and colors
- [ ] Test all features thoroughly
- [ ] Setup monitoring and logging
- [ ] Configure backup strategy
- [ ] Create admin account

---

**Built with ❄️ for AC Servicing Businesses**

**Happy Coding! 🚀**
