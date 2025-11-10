# 🧩 TaskHub API

A clean and modular **backend** built with **Node.js, Express, and MongoDB** — part of a **MERN Stack** project.  
It provides secure authentication, user management, and task handling with role-based access control (admin/user).

---

## 🚀 Features

- 🔐 **Authentication** (Register / Login with JWT)
- 👥 **User Management** (Admin and regular user roles)
- ✅ **Task Management** (CRUD operations)
- ⚙️ **Middleware Protection** (isLogin, isAdmin)
- 🧰 **Error Handling** with custom middleware (`HandleERROR`)
- 🧮 **Query Filtering, Sorting, Pagination** via `ApiFeatures`
- 🧾 Built with modular **MVC structure**

---

## 🏗️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (jsonwebtoken) |
| Encryption | bcryptjs |
| Logger | morgan |
| Env Config | dotenv |
| API Utility | vanta-api |
| CORS | Enabled |

---

## 📁 Folder Structure

```
api/
 ├── Controllers/
 │    ├── auth.controller.js
 │    ├── task.controller.js
 │    └── user.controller.js
 │
 ├── Middlewares/
 │    ├── isAdmin.js
 │    └── isLogin.js
 │
 ├── Models/
 │    ├── task.model.js
 │    └── user.model.js
 │
 ├── Routes/
 │    ├── auth.route.js
 │    ├── task.route.js
 │    └── user.route.js
 │
 ├── app.js
 ├── server.js
 └── .env
```

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/taskhub-api.git

# Go to the project directory
cd taskhub-api

# Install dependencies
npm install
```

---

## 🔧 Environment Variables

Create a `.env` file in the root and add the following:

```
DATA_BASE=mongodb://localhost:27017/taskhub
PORT=3000
JWT_SECRET=kjedf83924567r932ldhfncksjfjafbkwhkhiwe
```

---

## ▶️ Run Server

```bash
npm run dev
```

or (if using nodemon):

```bash
npm run dev
```

The API will run on:  
👉 **http://localhost:3000**

---

## 🔑 API Endpoints

### 🔹 Auth Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT token |

### 🔹 Task Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/task` | Get all tasks (admin → all users, user → own tasks) |
| POST | `/api/task` | Create new task |
| GET | `/api/task/:id` | Get task by ID |
| PATCH | `/api/task/:id` | Update task |
| DELETE | `/api/task/:id` | Delete task |

### 🔹 User Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/user` | Get all users (admin only) |
| GET | `/api/user/:id` | Get user info (self or admin) |
| PATCH | `/api/user/:id` | Update user info (admin only) |

---

## 🔒 Middleware

- `isLogin` → verifies token and attaches `req.userId`, `req.role`
- `isAdmin` → checks if user has `admin` role
- `HandleERROR` → handles custom API errors consistently

---

## 🧠 Developer

**Hossein** — 19 y/o Full-Stack Developer (MERN Stack)  
📍 Mashhad, Iran  
🔗 [GitHub](https://github.com/Hossein-aghili)

---

## 📌 Notes

- Currently backend only — frontend (React) will be added later.  
- Designed for **TaskHub MERN Project**.  
- Built with clean, modular, and scalable architecture.
