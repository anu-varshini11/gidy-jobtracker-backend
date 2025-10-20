# Gidy Job Tracker Backend

This is the backend API for the **Gidy Job Tracker** application. It provides authentication, job management, and CRUD operations for tracking job applications.

## Features

- **User Authentication**
  - Signup & Login
  - Password hashing & JWT authentication
- **Job Management**
  - Add, edit, view, and delete job entries
  - Track application date, company, job title, and status
- **Secure Endpoints**
  - JWT-based authorization for all job-related routes
- **Deployment Ready**
  - Works locally and on cloud platforms (Render, Vercel frontend)

---

## Tech Stack

- **Node.js** + **Express** – API server  
- **MongoDB** + **Mongoose** – Database  
- **JWT** – Authentication  
- **bcryptjs** – Password hashing  
- **dotenv** – Environment variables  
- **cors** – Cross-Origin Resource Sharing  

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)  
- MongoDB URI (Atlas or local)  
- npm or yarn  

### Installation

1. Clone the repository:

```bash
git clone <backend-repo-url>
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the root directory with the following variables:
```bash
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```
4. Running Locally
```bash
npm run dev
```

Server will run on http://localhost:5000
Base route: http://localhost:5000/ → Returns "API is running..."

## API Routes

### Auth Routes

| Method | Route                             | Description                     |
|--------|-----------------------------------|---------------------------------|
| POST   | `/api/auth/signup`                | Create new user & return token  |
| POST   | `/api/auth/login`                 | Login existing user & return token |
| GET    | `/api/auth/check-username/:username` | Check if username is available |

### Job Routes (Authenticated, require Bearer token)

| Method | Route            | Description          |
|--------|-----------------|--------------------|
| GET    | `/api/jobs`      | Get all jobs for user |
| POST   | `/api/jobs`      | Add a new job        |
| PUT    | `/api/jobs/:id`  | Edit job by ID       |
| DELETE | `/api/jobs/:id`  | Delete job by ID     |

## Deployment

1. Push the code to a Git repository.  
2. Deploy to a platform like **Render**.  
3. Set environment variables on the deployment platform (same as `.env` file):  
   - `PORT`  
   - `MONGO_URI`  
   - `JWT_SECRET`  
4. Update the frontend `REACT_APP_API_URL` to point to your deployed backend.


## Notes

1. Ensure that JWT secret is kept safe.
2. Always validate frontend requests before sending them to backend.
3. Status options for jobs: "Applied", "Interview", "Offer", "Rejected".

License
This project is licensed under the MIT License.
