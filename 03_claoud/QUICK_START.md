# Quick Start Guide - AC Servicing App

## ⚡ Get Running in 5 Minutes

### Step 1: Setup Backend (2 min)

```bash
cd backend
npm install
cp example.env .env
```

Edit `.env` - change `MONGO_URI` if needed (default uses local MongoDB):
```
MONGO_URI=mongodb://localhost:27017/ac_servicing
JWT_SECRET=your_secret_key_123
```

### Step 2: Seed Database (30 sec)

```bash
node seedDatabase.js
```

This creates sample services and demo users.

### Step 3: Start Backend (30 sec)

```bash
npm run dev
```

Wait for: `🚀 Server running on port 5000`

### Step 4: Setup Frontend (2 min)

```bash
cd ../frontend
npm install
npm run dev
```

Open: **http://localhost:5173**

---

## 📱 Test the App

### Login as Regular User
- Email: `user@example.com`
- Password: `user123456`

**Available Features:**
- Book a service
- View bookings
- Cancel bookings
- Rate services
- Update profile

### Login as Admin
- Email: `admin@acservicing.com`
- Password: `admin123456`

**Available Features:**
- View dashboard stats
- Manage all bookings
- Update booking status
- Manage users
- Delete bookings

---

## 🔧 Common Commands

### Backend
```bash
npm run dev      # Development with auto-reload
npm start        # Production
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🆘 Quick Fixes

### MongoDB not running?
```bash
# macOS
brew services start mongodb-community

# Or use MongoDB Atlas (cloud) - update MONGO_URI in .env
```

### Port already in use?
```bash
# Change port in backend .env
PORT=5001

# Or frontend
npm run dev -- --port 3000
```

### API Connection Failed?
- Check backend is running on port 5000
- Check frontend .env has correct API URL
- Check CORS is configured (CLIENT_URL in backend .env)

---

## 📌 Important Files

| File | Purpose |
|------|---------|
| `backend/.env` | Backend configuration |
| `backend/server.js` | Backend entry point |
| `backend/seedDatabase.js` | Initialize demo data |
| `frontend/src/App.jsx` | Frontend entry point |
| `SETUP_GUIDE.md` | Detailed setup guide |
| `AC_Servicing_API.postman_collection.json` | API testing |

---

## 🚀 Next Steps

1. ✅ Both backend and frontend running
2. ✅ Logged in with demo credentials
3. 🔜 Explore booking features
4. 🔜 Test admin dashboard
5. 🔜 Customize for your business
6. 🔜 Deploy to production

---

## 📞 Need Help?

See `SETUP_GUIDE.md` for:
- Detailed setup instructions
- API documentation
- Deployment guide
- Troubleshooting

---

**Happy Coding! 🎉**
