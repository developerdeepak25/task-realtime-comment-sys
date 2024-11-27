# Real-Time Comments System

## Overview
A full-stack real-time comments system built with Node.js, Express, MySQL, and Next.js(as frontend).

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/developerdeepak25/task-realtime-comment-sys.git
```

### 2. Backend Setup
1. Navigate to backend directory
```bash
cd ./server
npm install
```

2. Create `.env` file
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=comments_system
```

3. Database Configuration (I used workbench)
- Open MySQL and run:
```sql
CREATE DATABASE comments_system;
USE comments_system;
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    comment TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

4. Start Backend Server
```bash
npm start
```
- Server runs on `http://localhost:5000`

### 3. Frontend Setup
1. Navigate to frontend directory
```bash
cd ./client
npm install
```

2. Start Development Server
```bash
npm run dev
```
- Frontend runs on `http://localhost:3000`

## Preview
![image](https://github.com/user-attachments/assets/081cf241-2cd0-44f2-853c-12412aa738ba)

![image](https://github.com/user-attachments/assets/8ee636e6-2348-4006-83aa-0053b5629976)
