# 🔐 Setup Login System - Panduan Lengkap

## 📋 Ringkasan Masalah & Solusi

### Masalah Yang Ditemukan:
1. ❌ LoginForm tidak terhubung ke AuthContext
2. ❌ Tidak ada API call ke backend
3. ❌ Tidak ada redirect setelah login
4. ❌ Backend port mismatch (5000 vs 4000)

### Solusi yang Diimplementasikan:
✅ Koneksi LoginForm ke AuthContext dengan useAuth hook
✅ API call ke backend dengan fetch
✅ Token storage di localStorage
✅ Redirect ke /homeanalisis setelah login sukses
✅ Backend port diubah ke 4000
✅ Enhanced AuthContext dengan localStorage persistence

---

## 📁 File yang Sudah Diperbaiki

### 1. **Frontend - LoginForm.jsx**
📍 Lokasi: `src/components/forms/LoginForm.jsx`

**Perubahan:**
- Tambah `useRouter` dari Next.js
- Tambah `useAuth` dari AuthContext
- API call ke backend: `POST http://localhost:4000/auth/login`
- Simpan token di localStorage
- Redirect ke `/homeanalisis` setelah login berhasil
- Loading state dengan spinner animasi

**Kode Kunci:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  
  if (response.ok) {
    login(data.user); // Update AuthContext
    router.push("/homeanalisis"); // Redirect
  }
};
```

---

### 2. **Frontend - AuthContext.jsx**
📍 Lokasi: `src/context/AuthContext.jsx`

**Perubahan:**
- Tambah `useEffect` untuk check localStorage saat app load
- Tambah localStorage untuk persist user data
- Tambah localStorage untuk persist token
- Better logout function yang clear semua data

**Fitur:**
- Otomatis restore session jika sudah login sebelumnya
- Token tersimpan di localStorage
- User data tersimpan di localStorage

---

### 3. **Backend - server.js**
📍 Lokasi: `backend/server.js`

**Perubahan:**
- Port diubah dari `5000` ke `4000`
- Route path diubah dari `/api/auth` ke `/auth`

**Sebelum:**
```javascript
const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
```

**Sesudah:**
```javascript
const PORT = process.env.PORT || 4000;
app.use("/auth", authRoutes);
```

---

## ⚙️ Setup Checklist

Sebelum testing, pastikan:

### Backend Setup:
```bash
# 1. Masuk folder backend
cd college/Capstone/backend

# 2. Install dependencies (jika belum)
npm install

# 3. Buat file .env dengan:
# PORT=4000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key

# 4. Jalankan backend
node server.js
```

Output yang benar:
```
Server running on port 4000
MongoDB connected
```

### Frontend Setup:
```bash
# 1. Masuk folder frontend
cd college/Capstone/frontend

# 2. Pastikan dependencies terinstall
npm install

# 3. Jalankan frontend
npm run dev
```

Output yang benar:
```
Local:        http://localhost:3000
```

---

## 🧪 Testing Login

### Skenario 1: Login Sukses
1. Buka `http://localhost:3000/login`
2. Input email: `test@gmail.com`
3. Input password: `password123`
4. Klik "Masuk"
5. ✅ Harus redirect ke `/homeanalisis`
6. ✅ User data harus tersimpan di AuthContext
7. ✅ Token harus tersimpan di localStorage

### Skenario 2: Email/Password Salah
1. Input email yang tidak terdaftar
2. Klik "Masuk"
3. ✅ Harus muncul error: "User not found"
4. ✅ Tidak boleh redirect

### Skenario 3: Validasi Form
1. Klik "Masuk" tanpa input apa-apa
2. ✅ Harus muncul error: "Email tidak boleh kosong"

### Skenario 4: Persist Session
1. Login dengan credentials yang benar
2. Refresh halaman
3. ✅ Harus tetap logged in
4. ✅ Harus tidak redirect ke /login

---

## 🔍 Troubleshooting

### Masalah: "Failed to fetch" / CORS Error
**Solusi:**
- Pastikan backend running di port 4000
- Cek CORS setting di backend: `cors({ origin: "http://localhost:3000" })`
- Cek network tab di browser DevTools

### Masalah: Login tidak redirect
**Solusi:**
- Check console untuk error message
- Pastikan response dari backend berisi `token` dan `user`
- Pastikan AuthContext Provider membungkup seluruh app di `layout.jsx`

### Masalah: "User not found" padahal email sudah register
**Solusi:**
- Cek database MongoDB, apakah user ada?
- Pastikan email yang di-register sama dengan email yang di-login
- Cek case sensitivity (email case-insensitive)

### Masalah: Token tidak tersimpan
**Solusi:**
- Buka DevTools → Application → Local Storage
- Pastikan ada `authToken` dan `userData`
- Cek localStorage.getItem("authToken") di console

---

## 📌 Informasi Penting

### File Structure:
```
frontend/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx ✅ Updated
│   ├── components/forms/
│   │   └── LoginForm.jsx ✅ Updated
│   └── app/
│       ├── login/
│       │   └── page.jsx (menggunakan LoginForm)
│       └── layout.jsx (harus dengan AuthProvider)

backend/
├── server.js ✅ Updated
├── routes/
│   └── auth.js (endpoint: /login, /register)
├── models/
│   └── user.js
└── .env (harus ada MONGO_URI & JWT_SECRET)
```

### API Endpoints:
```
POST http://localhost:4000/auth/login
- Input: { email, password }
- Output: { token, user: { id, name, email } }

POST http://localhost:4000/auth/register
- Input: { name, email, password }
- Output: { token, user: { id, name, email } }
```

---

## ✨ Next Steps (Optional Enhancement)

1. **Add RegisterForm** - Koneksi ke backend register endpoint
2. **Add Protected Routes** - Middleware untuk cek authentication
3. **Add Logout** - Clear localStorage & redirect ke /login
4. **Add Remember Me** - Save credentials di localStorage (encrypted)
5. **Add Token Refresh** - Auto refresh token sebelum expired
6. **Add Profile Page** - Tampilkan data user yang login

---

## 📞 Support

Kalau masih ada error, cek:
1. ✅ Backend running? `http://localhost:4000/auth/login` (test di Postman)
2. ✅ Frontend running? `http://localhost:3000/login`
3. ✅ MongoDB connected? Cek console backend
4. ✅ .env file ada? (MONGO_URI, JWT_SECRET)
5. ✅ Dependencies installed? `npm install` di kedua folder

Happy coding! 🚀
