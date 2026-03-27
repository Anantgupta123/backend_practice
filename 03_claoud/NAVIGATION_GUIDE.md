# 📊 Project Overview & File Navigation Guide

## 🎯 Start Here

You're looking at a **complete, production-ready AC Servicing web application**.

### First Time? Read These Files in Order:
1. **README.md** ← Start here for overview
2. **QUICK_START.md** ← Get running in 5 minutes
3. **BUILD_SUMMARY.md** ← See what's included
4. **SETUP_GUIDE.md** ← Detailed setup steps

---

## 📂 Directory Map

### Backend (`/backend`)
The Node.js + Express API server

**Key Files:**
- `server.js` - Main entry point (start here)
- `seedDatabase.js` - Initialize demo data
- `example.env` - Copy to `.env` before running

**Key Folders:**
- `/config` - Database setup
- `/models` - Database schemas (User, Booking, etc.)
- `/controllers` - Business logic (auth, bookings, admin)
- `/routes` - API endpoints
- `/middleware` - Auth verification, error handling
- `/utils` - Helper functions

**To Run:**
```bash
cd backend
npm install
npm run seed
npm run dev
```

### Frontend (`/frontend`)
The React + Vite user interface

**Key Files:**
- `src/App.jsx` - Main app component (start here)
- `src/main.jsx` - React entry point
- `index.html` - HTML template
- `.env.example` - Copy to `.env`

**Key Folders:**
- `/src/pages` - Full page components (Home, Login, Dashboard, Admin)
- `/src/components` - Reusable UI components
- `/src/services` - API calls (api.js, endpoints.js)
- `/src/context` - Auth state management
- `/src/hooks` - Custom React hooks
- `/src/styles` - CSS styling

**To Run:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🔄 How It Works

### User Registration Flow
```
User fills register form
        ↓
Frontend validates input
        ↓
POST /api/auth/register (backend)
        ↓
Backend validates & hashes password
        ↓
Saves user to MongoDB
        ↓
Returns JWT token
        ↓
Frontend stores token & user data
        ↓
Redirects to dashboard
```

### Booking Service Flow
```
User selects service & date
        ↓
Frontend validates form
        ↓
POST /api/bookings (with auth token)
        ↓
Backend creates booking in MongoDB
        ↓
Returns created booking
        ↓
Frontend updates UI with new booking
        ↓
Shows success notification
        ↓
User can view booking in dashboard
```

### Admin Managing Bookings
```
Admin views /admin page
        ↓
Frontend fetches all bookings
        ↓
GET /api/admin/bookings (admin verified)
        ↓
Backend returns all bookings from MongoDB
        ↓
Admin sees list of all bookings
        ↓
Admin updates booking status
        ↓
PUT /api/admin/bookings/{id}
        ↓
Backend updates MongoDB record
        ↓
Frontend refreshes booking list
```

---

## 🔐 Authentication Flow

```
User Logs In
     ↓
Credentials sent to backend
     ↓
Backend verifies with bcrypt
     ↓
JWT token created & signed
     ↓
Token sent to frontend
     ↓
Frontend stores in localStorage
     ↓
Token sent with every API request (header)
     ↓
Backend verifies JWT with middleware
     ↓
Request processed if valid
     ↓
Returns 401 if token invalid/expired
```

---

## 📡 API Endpoint Categories

### 1. Authentication (`/api/auth`)
- `POST /register` - Create account
- `POST /login` - Login
- `POST /logout` - Logout
- `GET /me` - Current user
- `PUT /profile` - Update profile
- `POST /change-password` - Change password

### 2. Bookings (`/api/bookings`)
- `POST /` - Create booking
- `GET /` - User's bookings
- `GET /:id` - Single booking
- `PUT /:id/cancel` - Cancel booking
- `POST /rating/add` - Add rating

### 3. Services (`/api/services`)
- `GET /` - All services
- `GET /:id` - Single service

### 4. Admin (`/api/admin`)
- `GET /stats` - Dashboard stats
- `GET /bookings` - All bookings
- `PUT /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Delete booking
- `GET /users` - All users
- `PUT /users/:id/toggle-status` - Block/unblock user
- `DELETE /users/:id` - Delete user

---

## 🗄️ Database Collections

### Users Collection
```
Email → user@example.com
Password → hashed (bcrypt)
Phone → 1234567890
Name → John Doe
Role → user (or admin)
Created → 2024-01-15
```

### Bookings Collection
```
UserId → links to User
ServiceType → repair, installation, etc.
Status → pending, in-progress, completed
Date → 2024-02-15 14:30
Address → Customer location
```

### Services Collection
```
Name → AC Repair
Price → 2000
Duration → 1 hour
Features → diagnosis, repair, testing
```

### Ratings Collection
```
BookingId → links to Booking
UserId → links to User
Rating → 5
Review → "Great service!"
```

---

## 🎨 Frontend Component Hierarchy

```
App.jsx (Main Router)
├── Navbar
├── Routes
│   ├── Home (public)
│   ├── Login (public)
│   ├── Register (public)
│   ├── Dashboard (protected)
│   │   ├── BookingForm
│   │   ├── BookingsList
│   │   └── RatingModal
│   ├── Profile (protected)
│   └── AdminDashboard (restricted)
│       ├── Stats Cards
│       ├── BookingManager
│       └── UserManager
└── Footer
```

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `.env` | Environment variables (create from `example.env`) |
| `vite.config.js` | Frontend build configuration |
| `tailwind.config.js` | Tailwind CSS customization |
| `package.json` | Dependencies and scripts |

---

## 💾 How to Create Your `.env` File

### Backend .env
```bash
cd backend
cp example.env .env
# Then edit .env with your settings
```

Contents:
```
MONGO_URI=mongodb://localhost:27017/ac_servicing
PORT=5000
NODE_ENV=development
JWT_SECRET=change_this_to_something_secure
JWT_EXPIRY=7d
CLIENT_URL=http://localhost:5173
```

### Frontend .env.local
```bash
cd frontend
# Create file: .env.local
```

Contents:
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Running the Application

### Terminal 1: MongoDB (if using local)
```bash
# macOS: brew services start mongodb-community
# Windows: MongoDB Service automatic
# Or use MongoDB Atlas (cloud)
```

### Terminal 2: Backend
```bash
cd backend
npm install         # Run once
npm run seed        # Run once (creates demo data)
npm run dev         # Runs on port 5000
```

### Terminal 3: Frontend
```bash
cd frontend
npm install         # Run once
npm run dev         # Runs on port 5173
```

### Open Browser
```
http://localhost:5173
```

---

## 👤 Demo Accounts to Test

| Role | Email | Password |
|------|-------|----------|
| User | user@example.com | user123456 |
| Admin | admin@acservicing.com | admin123456 |

---

## 📋 Main Features to Test

### As Regular User:
1. ✅ Register/Login
2. ✅ Book a service
3. ✅ View bookings
4. ✅ Cancel booking
5. ✅ Rate a completed service
6. ✅ Update profile

### As Admin:
1. ✅ View dashboard stats
2. ✅ Update booking status
3. ✅ Assign technician
4. ✅ View all users
5. ✅ Deactivate users
6. ✅ Delete bookings

---

## 🧪 Testing with Postman

1. **Import Collection**
   - Open Postman
   - Import `AC_Servicing_API.postman_collection.json`

2. **Get Access Token**
   - Call: `POST /api/auth/login`
   - Use demo credentials
   - Copy token from response

3. **Set Token in Postman**
   - Go to Collection Variables
   - Set `token` variable with copied token

4. **Test All Endpoints**
   - Test bookings API
   - Test admin API
   - Test services API

---

## 📦 What's Installed

### Backend Packages
```json
{
  "express": "Web framework",
  "mongoose": "MongoDB connection",
  "bcryptjs": "Password hashing",
  "jsonwebtoken": "JWT auth",
  "cors": "Cross-origin support",
  "dotenv": "Environment config"
}
```

### Frontend Packages
```json
{
  "react": "UI library",
  "react-router-dom": "Routing",
  "axios": "HTTP requests",
  "tailwindcss": "Styling",
  "react-toastify": "Notifications",
  "react-icons": "Icon library"
}
```

---

## 🔍 File Naming Conventions

- **Controllers**: `*Controller.js` (e.g., `authController.js`)
- **Models**: `*.js` (e.g., `User.js`)
- **Routes**: `*Routes.js` (e.g., `authRoutes.js`)
- **Components**: `*.jsx` (e.g., `Navbar.jsx`)
- **Pages**: `*.jsx` (e.g., `Dashboard.jsx`)
- **Services**: `*.js` (e.g., `api.js`)

---

## ⚠️ Before Going Live

Checklist:
- [ ] Change JWT_SECRET
- [ ] Setup MongoDB Atlas
- [ ] Update CLIENT_URL
- [ ] Test all features
- [ ] Review error handling
- [ ] Setup monitoring
- [ ] Plan backups
- [ ] Configure HTTPS
- [ ] Add your business info
- [ ] Test on mobile

---

## 📚 Documentation Files

| File | Contains |
|------|----------|
| `README.md` | Project overview |
| `QUICK_START.md` | 5-minute setup |
| `SETUP_GUIDE.md` | Detailed guide (40 pages) |
| `FEATURES.md` | Feature documentation |
| `BUILD_SUMMARY.md` | What's included |
| This file | Navigation guide |

---

## 🎓 Learning Path

### Beginner
1. Read README.md
2. Run QUICK_START.md
3. Explore Home page

### Intermediate
1. Login and book service
2. Check API calls in network tab
3. Review React components

### Advanced
1. Study controller logic
2. Read database schemas
3. Review authentication flow

---

## 🔗 Quick Links

- **Backend**: localhost:5000
- **Frontend**: localhost:5173
- **API Health**: localhost:5000/api/health
- **Postman**: Import `.postman_collection.json`

---

## 💡 Pro Tips

1. **Use VS Code** - Better TypeScript support
2. **Install Postman** - Test APIs easily
3. **MongoDB Compass** - Browse database GUI
4. **React DevTools** - Debug components
5. **Network Tab** - See API requests

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | Check MONGO_URI in .env |
| Frontend won't load | Check API_URL in .env |
| Port in use | Kill process or change port |
| Login fails | Check email/password |
| API returns 401 | Token expired, login again |

---

## ✅ Verification Checklist

- [ ] Both terminals showing running servers
- [ ] Frontend loads at localhost:5173
- [ ] Backend responds at localhost:5000/api/health
- [ ] Can login with demo credentials
- [ ] Can book a service
- [ ] Can view bookings
- [ ] Admin panel accessible with admin account

---

## 🎊 You're Ready!

Everything is set up and documented. Start with **QUICK_START.md** and you'll be running in minutes!

**Happy Coding! 🚀**

---

**Need Help?**
- See detailed guides in `/docs` folder
- Check SETUP_GUIDE.md for troubleshooting
- Review code comments in source files
