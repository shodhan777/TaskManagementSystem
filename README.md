# TaskFlow

A full-stack MERN Task Management application built using MongoDB, Express.js, React.js, and Node.js. TaskFlow allows users to securely manage their tasks through a clean and responsive interface with authentication, task analytics, progress tracking, and drag-and-drop task organization.

---

## Live Demo

- **Frontend:** https://taskflowtms.vercel.app/
- **Backend API:** https://taskmanagementsystem-ljtj.onrender.com
- **GitHub Repository:** https://github.com/shodhan777/TaskManagementSystem.git

> **Note:** The backend is hosted on Render's free tier. If the server has been idle, the first request may take **30–60 seconds** while it wakes up.

---

## Project Overview

TaskFlow was built as part of a MERN stack internship assignment to demonstrate full-stack development skills including backend API design, database modeling, authentication, frontend state management, and responsive UI/UX development.

Users can register/login, manage personal tasks, organize them through a Kanban board, and monitor productivity through a dedicated progress analytics page with charts and task progress sections.

---

## Features

### Core Features
- User registration and login with JWT authentication
- Create, read, update, and delete tasks
- Protected routes for authenticated users
- User-specific task management
- Responsive dashboard UI
- Search tasks by title/description
- Filter tasks by status and priority
- Pagination support for task listing
- Dashboard statistics (total, completed, pending, overdue)

### Advanced Features
- Drag-and-drop Kanban board for status management
- Dedicated Progress & Analytics page
- Productivity charts and analytics dashboard
- Separate sections for completed and in-progress tasks
- Reopen completed tasks / mark tasks done instantly
- Edit task modal popup
- Toast notifications for feedback
- Loading spinner for async operations
- Modern responsive navbar/navigation
- Reusable component-based architecture

---

## Tech Stack

### Frontend
- React.js
- Vite
- Axios
- React Router DOM
- React Hot Toast
- @hello-pangea/dnd

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database
- MongoDB Atlas
- Mongoose

---

## Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/shodhan777/TaskManagementSystem.git
cd TaskManagementSystem


TaskManagementSystem/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── styles/