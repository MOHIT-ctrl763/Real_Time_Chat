# 💬 ChatWorld - Real-Time Chat Application

A modern real-time chat application built with the MERN Stack and Socket.IO. Users can create accounts, log in securely, update their profile, search other users, view online users, and chat instantly in real time.

---

# 🚀 Live Demo

### Frontend
https://real-time-chat-1-4s8o.onrender.com

### Backend API
https://real-time-chat-l5q7.onrender.com

---

# 📖 Project Overview

ChatWorld is a full-stack real-time messaging application developed using MongoDB, Express.js, React.js, Node.js, and Socket.IO.

The application allows users to:

- Register and login securely
- Authenticate using JWT
- Store authentication token in HTTP-only cookies
- Edit profile
- Upload profile image using Cloudinary
- Search users
- View all registered users
- See online/offline status
- Send and receive messages instantly
- Communicate using WebSockets (Socket.IO)

---

# ✨ Features

## Authentication

- User Signup
- User Login
- JWT Authentication
- HTTP Only Cookies
- Secure Logout

---

## User Features

- View Current User
- Edit Profile
- Upload Profile Picture
- Search Users
- View Other Registered Users
- Online User Status

---

## Chat Features

- Real-Time Messaging
- Instant Message Delivery
- Socket.IO Integration
- Live Online User Tracking

---

# 🛠 Tech Stack

## Frontend

- React.js
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- Socket.IO Client

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- Multer
- Cloudinary
- Socket.IO
- BcryptJS
- CORS

---

# 📂 Project Structure

```
ChatWorld
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── socket
│   ├── index.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── customHooks
│   │   ├── pages
│   │   ├── redux
│   │   ├── assets
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/chatworld.git
```

Go inside project

```bash
cd chatworld
```

---

# Backend Setup

Install dependencies

```bash
cd backend
npm install
```

Create a `.env` file

```env
PORT=8000

MONGODB_URL=your_mongodb_url

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Run backend

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_SERVER_URL=http://localhost:8000
```

Run frontend

```bash
npm run dev
```

---

# 🔒 Authentication Flow

1. User signs up.
2. Password is hashed using Bcrypt.
3. JWT token is generated.
4. Token is stored in HTTP-only Cookie.
5. Protected APIs verify JWT.
6. Authorized user gets access.

---

# 🌐 REST API

## Authentication

### Signup

```
POST /api/auth/signup
```

### Login

```
POST /api/auth/login
```

### Logout

```
GET /api/auth/logout
```

---

## User

### Current User

```
GET /api/user/current
```

### Other Users

```
GET /api/user/others
```

### Search Users

```
GET /api/user/search?query=name
```

### Update Profile

```
PUT /api/user/profile
```

---

## Messages

### Send Message

```
POST /api/message/send/:receiverId
```

### Get Messages

```
GET /api/message/:receiverId
```

---

# ☁ Deployment

## Backend

- Render Web Service

## Frontend

- Render Static Site

## Database

- MongoDB Atlas

## Image Storage

- Cloudinary

---

# 🔐 Environment Variables

Backend

```env
PORT=
MONGODB_URL=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Frontend

```env
VITE_SERVER_URL=
```

---

# 📸 Screenshots

Add screenshots here

- Login Page
- Signup Page
- Home
- Chat
- Profile
- Online Users

---

# 🚀 Future Improvements

- Group Chat
- Typing Indicator
- Read Receipts
- Emoji Support
- Voice Messages
- Video Calling
- Push Notifications
- Dark Mode

---

# 👨‍💻 Author

**Mohit Porwal**

MERN Stack Developer

GitHub:
https://github.com/your-github

LinkedIn:
https://linkedin.com/in/your-linkedin

Portfolio:
https://your-portfolio-link

---

# 📜 License

This project is developed for learning, portfolio, and educational purposes.
