# Task Manager Backend

## Overview
This project is a backend service for a task management application that allows users to securely create, update, and manage tasks. It provides RESTful APIs for authentication and task operations while ensuring structured and reliable data storage.

## Features
- User authentication and authorization
- Create, update, delete, and filter tasks
- RESTful APIs for frontend integration
- Structured data validation and persistence

## Tech Stack
- Backend: Node.js
- Database: MySQL
- Cloud: AWS
- Version Control: Git

## Architecture
The backend follows a REST-based architecture where client requests are processed through APIs, business logic is applied, and data is stored in a relational database.

## Folder Structure
src/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── services/
 └── config/

## Environment Variables
Create a `.env` file and configure the following:
PORT=5000  
DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=yourpassword  
JWT_SECRET=your_secret_key  

## How to Run Locally
1. Clone the repository
2. Install dependencies using `npm install`
3. Configure environment variables
4. Start the server using `npm start`

## Deployment
The backend is deployed on a cloud platform for public access.

## Future Improvements
- Add automated tests
- Improve scalability and performance
- Enhance security features
