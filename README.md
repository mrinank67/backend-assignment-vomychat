# 🚀 Linktree/Bento Backend API

This is a **Node.js backend** for a **Linktree/Bento-like platform** with authentication, referral tracking, and security features like **JWT authentication** and **CSRF protection**. Built using **Express, MongoDB, and Jest for testing**.

---

## 📌 **Features**
✅ **User Authentication (JWT)** – Register & login with secure token-based authentication.  
✅ **Referral System** – Unique referral codes & tracking for invited users.  
✅ **CSRF Protection** – Secure API endpoints with automatic CSRF token handling.  
✅ **Database Integration** – Uses MongoDB with Mongoose schemas for users & referrals.  
✅ **Testing with Jest** – Automated unit & integration tests.  

---

## 🛠️ **Tech Stack**
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Security:** JWT, bcrypt.js, CSRF protection  
- **Testing:** Jest, Supertest  
- **Version Control:** Git, GitHub  

---

## ⚙️ **Installation & Setup**
### 🔹 **1. Clone the Repository**
```sh
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

### 🔹 **2. Install Dependencies**
```sh
npm install
```

### 🔹 **3. Create a `.env` File**
Create a `.env` file in the root directory and add the following:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/linktree
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
COOKIE_SECRET=your_cookie_secret
```

### 🔹 **4. Start the Server**
Run the server in development mode:
```sh
npm run dev
```
Or start normally:
```sh
npm start
```

---

## 📺 **Project Structure**
```
/project-root
  ├── __tests__/                # Jest test cases
  │   ├── auth.test.js
  ├── config/
  │   ├── db.js                  # MongoDB connection
  ├── controllers/
  │   ├── authController.js       # Handles authentication
  ├── middleware/
  │   ├── authMiddleware.js       # JWT & security middleware
  ├── models/
  │   ├── User.js                 # User schema
  │   ├── Referral.js             # Referral tracking schema
  ├── routes/
  │   ├── authRoutes.js           # Authentication routes
  ├── app.js                     # Express app (no listen())
  ├── index.js                   # Main server file
  ├── jest.config.js             # Jest configuration
  ├── README.md                  # Documentation
  ├── package.json
```

---

## 🔐 **Authentication & Security**
- **JWT Authentication** – Token-based login, stored in HTTP-only cookies.
- **CSRF Protection** – Tokens are automatically handled inside the backend.
- **Password Hashing** – Securely hashed passwords using bcrypt.js.
- **Input Validation** – Ensures valid email & password format.

---

## 🚀 **API Endpoints**
### 🔹 **1. User Authentication**
#### **🔹 Register**
```http
POST /api/auth/register
```
**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "referralCode": "ABC123"
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "referral_code": "ABCDEF123"
  }
}
```

#### **🔹 Login**
```http
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
```

---

## 🔋 **Testing**
Run tests using Jest:
```sh
npm test
```

---

## 🚜 **Next Steps**
- Deploy using **Heroku** or **Vercel**.
- Implement **rate limiting** and **logging** for better security.
- Add **frontend integration** with React or Next.js.

---

## 🌟 **Contributing**
Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 🌐 **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

💪 Built with passion by YOUR-NAME 💪

