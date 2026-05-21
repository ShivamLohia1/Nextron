<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# Nextron - Full Stack MERN E-Commerce Platform

Nextron is a modern full-stack e-commerce web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform provides secure authentication, product management, shopping cart functionality, wishlist management, and order handling with a responsive and user-friendly interface.

---

## 🚀 Features

* User Signup & Login Authentication
* JWT-Based Authentication & Authorization
* Secure Password Hashing using bcrypt.js
* MongoDB Database Integration
* Product Listing & Management
* Shopping Cart System
* Wishlist Functionality
* Order Placement & Management
* Protected Routes & APIs
* RESTful API Architecture
* Responsive UI using Tailwind CSS
* Full Stack MERN Architecture

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JWT (JSON Web Token)
* bcrypt.js

---

## 📁 Project Structure

```txt id="r1"
project/
│
├── src/                 # Frontend Source Code
├── public/              # Static Assets
├── server/              # Backend Server
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash id="r2"
git clone <repository-url>
```

---

## Frontend Setup

```bash id="r3"
cd project
npm install
npm run dev
```

Frontend will run on:

```txt id="r4"
http://localhost:5173
```

---

## Backend Setup

```bash id="r5"
cd server
npm install
node index.js
```

Backend will run on:

```txt id="r6"
http://localhost:5000
```

---

## 🔐 Environment Variables

Create a `.env` file inside the server folder and add:

```env id="r7"
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 🔄 Authentication Flow

### Signup

1. User enters details
2. Password hashed using bcrypt.js
3. User stored in MongoDB
4. JWT token generated

### Login

1. User enters email & password
2. Password verified using bcrypt.compare()
3. JWT token returned
4. Protected routes accessible

---

## 🗄️ Database

MongoDB is used as the database for storing:

* User Data
* Product Information
* Orders
* Cart Data
* Wishlist Data

Mongoose is used for:

* Schema Creation
* Data Validation
* Database Operations

---

## 📡 REST API Methods

| Method | Purpose     |
| ------ | ----------- |
| GET    | Fetch Data  |
| POST   | Create Data |
| PUT    | Update Data |
| DELETE | Remove Data |

---

## 🎯 Key Learning Outcomes

* Full Stack MERN Development
* REST API Development
* JWT Authentication
* Password Security & Hashing
* MongoDB Integration
* Frontend-Backend Communication
* Responsive UI Design

---

## 👨‍💻 Team Project

This project was collaboratively developed by a team of 4 members as a full-stack web development project.

---

## 📌 Future Improvements

* Payment Gateway Integration
* Admin Dashboard
* Product Search & Filters
* Email Verification
* Real-Time Notifications
* Deployment on Cloud Platforms

---

## 📄 License

This project is developed for educational and learning purposes.

---

## 👤 Author

Shivam Lohia, Suryansh Gupta, Siddhant Rajpal and Rakshit Mangla.
>>>>>>> c7b857ed40307ab00e20dbd9a588c3933c3a3029
