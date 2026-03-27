# Backend Connectivity Test

## Quick Test Steps:

1. **Open Browser Console** (F12)
2. **Go to any page** in the app
3. **Paste this in the Console:**

```javascript
// Test 1: Check API URL
console.log('API URL:', import.meta.env.VITE_API_URL)

// Test 2: Check if backend is running
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(d => console.log('✅ Backend Status:', d))
  .catch(e => console.log('❌ Backend Error:', e.message))

// Test 3: Try registration (replace with test data)
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test' + Date.now() + '@test.com',
    password: 'password123',
    confirmPassword: 'password123',
    phone: '1234567890',
    address: 'Test Address'
  })
})
.then(r => r.json())
.then(d => console.log('📤 Register Response:', d))
.catch(e => console.log('❌ Register Error:', e.message))
```

## What to Look For:

✅ If you see "Backend Status: success" → Backend is working
❌ If you see "Network error" → Backend not running
❌ If you see error from register → Check the error message for details

## Common Issues:

| Issue | Solution |
|-------|----------|
| `CORS error` | Backend not running or cross-origin issue |
| `Network error` | Port 5000 not accessible |
| `Validation error` | Check form data matches requirements |
| `Email already exists` | Use a different email |

## After Testing:

1. Watch the **Console tab** when you register
2. Look for:
   - 🔵 API Request logs
   - 🟢 API Response logs
   - 🔴 API Error logs (if any)
3. Share the error message if registration still fails
