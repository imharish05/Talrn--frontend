Developer Directory App

A simple Full-Stack Developer Directory application built with React (frontend) and Node.js + Express + MongoDB (backend). The app allows users to add developers, view a developer directory, and search/filter by role or tech stack.
## Features

-   Add new developers (Name, Role, Tech Stack, Experience)

-   View all developers displayed in a clean table

-  Search/filter developers by:
    - Name
    - Role
    - Tech Stack

-   Responsive UI (Mobile + Desktop)

-   Toast notifications for success and errors

-   REST API with MongoDB integration

-    Modern UI using Material UI + TailwindCSS


## Tech Stack

**Client:** React, Axios, Material UI, React Toastify, TailwindCSS

**Server:** Node, Express, MonogoDB


## Installation

Backend 

```bash
git clone https://github.com/imharish05/Talrn-backend.git
cd backend
```
Create .env file
```bash
PORT=5000
DB_URL=mongodb+srv://harish05082004_db_user:57rB4Rq7SRwlzR9S@cluster0.cabgiss.mongodb.net/TalrnTask
```
Run the backend server
```bash
npm start
```
Frontend 

```bash
git clone https://github.com/imharish05/Talrn--frontend.git
cd frontend

```

Start server 

```bash
cd frontend
npm install
npm run dev
```

    
## Responsive Design
- The UI automatically adjusts for:
    -   Mobile view
    - Tablet
    - Desktop
## License

This project is open-source and free to use.


## Validation
- All fields are required
- Experience must be a valid number (0–50)
- Tech stack is comma-separated (converted to array)
