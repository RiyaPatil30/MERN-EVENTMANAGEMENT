# 🎉 Event Management System

A Full Stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing events.

This system allows users to create, view, update, delete, search, filter, and sort events efficiently.

---

## 📌 Project Overview

The Event Management System is built using:

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB

The application follows REST API architecture and connects frontend to backend using Axios.

---

## ✨ Features

- Create new events
- View all events
- Edit event details
- Delete events with confirmation
- Search events by title
- Filter by category
- Sort by date (Ascending / Descending)
- Automatic status detection (Upcoming / Completed)

---

## 📂 Project Structure

EVENT MANAGEMENT SYSTEM
│
├── backend
│   ├── src
│   │   ├── config
│   │   │   └── db.js
│   │   ├── controllers
│   │   │   └── eventControllers.js
│   │   ├── models
│   │   │   └── eventModel.js
│   │   ├── routes
│   │   │   └── eventRoutes.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── EventCard.jsx
│   │   │   ├── EventNotFound.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages
│   │   │   ├── CreatePage.jsx
│   │   │   ├── EventDetailPage.jsx
│   │   │   └── HomePage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
│
└── README.md

---

## ⚙ Installation

### 1️⃣ Clone Repository

```bash
git clone <repository-link>
cd Event-Management-System
2️⃣ Backend Setup
cd backend
npm install
npm run dev
Backend runs on: http://localhost:3000⁠�
3️⃣ Frontend Setup
Open a new terminal:
Bash
cd frontend
npm install
npm run dev
Frontend runs on: http://localhost:5173⁠�

🔗 API Endpoints
Method
Endpoint
Description
GET
/events
Get all events
GET
/events/:id
Get single event
POST
/events
Create event
PUT
/events/:id
Update event
DELETE
/events/:id
Delete event