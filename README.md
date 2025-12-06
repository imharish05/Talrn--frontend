##    Developer Directory App

A Full-Stack Developer Directory application built with React (frontend) and Node.js + Express + MongoDB (backend).
The app allows users to add developers, view a developer directory, and search/filter by role or tech stack.
## Features

-   Add new developers with:
    -   Name
    -   Role (Frontend / Backend / Full-Stack)
    -   Tech Stack (comma-separated)
    -   Experience (in years)
    -   Optional description and joining date

-   View all developers in a clean, responsive table

-  Search & filter developers by:
    - Name
    - Role
    - Tech Stack

-   Sort developers by experience (High → Low / Low → High)

-   Responsive design for:
    - Mobile
    - Tablet
    - Desktop

-   Toast notifications for success and errors

-   REST API with MongoDB integration

-   Modern UI using Material UI + TailwindCSS


## Tech Stack

**Client:** React, Axios, Material UI, React Toastify, TailwindCSS, React Router

**Server:** Node, Express, MonogoDB, Mongoose, JWT Authentication


## Installation

Backend 

```bash
git clone https://github.com/imharish05/Talrn-backend.git
cd Talrn-backend
npm install

```
Create .env file
```bash
PORT=5000
DB_URL=mongodb+srv://harish05082004_db_user:57rB4Rq7SRwlzR9S@cluster0.cabgiss.mongodb.net/TalrnTask
JWT_SECRET=TalrnTask@0505>

```
Run the backend server
```bash
npm start
```
Frontend 

```bash
git clone https://github.com/imharish05/Talrn--frontend.git
cd Talrn--frontend
npm install
npm run dev
```
Open your browser: http://localhost:5173


## Responsive Design
- The UI automatically adjusts for:
    -   Mobile view
    -   Tablet
    -   Desktop

## Architecture Overview

1. **Frontend (React):**  
   - Handles UI, routing, forms, and displays developer data.  
   - Uses **Material UI**, **TailwindCSS**, and **React Toastify** for notifications.  
   - Communicates with the backend API via Axios.

2. **Backend (Node.js + Express):**  
   - Provides RESTful API endpoints for CRUD operations on developers.  
   - Handles **authentication** using JWT tokens.  
   - Connects to **MongoDB** for data persistence.

3. **Database (MongoDB):**  
   - Stores developer records and user credentials.  
   - Hosted on MongoDB Atlas.

4. **Communication:**  
   - Frontend sends HTTP requests with JWT authentication headers to the backend API.


## Authentication
-   Signup / Login using JWT
-   Protected routes prevent unauthorized access

## Validation
- All fields are required
- Experience must be a valid number (0–50)
- Tech stack is comma-separated (converted to array)

## UI/UX
-   Clean and modern interface
-   Infinite scroll for large developer lists
-   Toast notifications for user feedback
-   Material UI + TailwindCSS

## Hosted URLs

- **Frontend:** [[https://talrn-frontend.vercel.app](https://talrnfrontend-c7yly71g6-imharish05s-projects.vercel.app/)]([https://talrn-frontend.vercel.app](https://talrnfrontend-c7yly71g6-imharish05s-projects.vercel.app/))  
- **Backend API:** [https://talrn-backend-nm58.onrender.com](https://talrn-backend-nm58.onrender.com)


## 🔗 Project Repositories

- **Frontend Repo:** [https://github.com/imharish05/Talrn--frontend](https://github.com/imharish05/Talrn--frontend)  
- **Backend Repo:** [https://github.com/imharish05/Talrn-backend](https://github.com/imharish05/Talrn-backend)


## License

This project is open-source and free to use.


