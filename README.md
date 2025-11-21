Backend Developer Intern – Project Assignment

Secure Authentication, Role-Based Access, CRUD API, and Basic Frontend

This project implements a scalable authentication system using Spring Boot and a simple React.js frontend for testing all APIs.
Completed according to the task requirements of the Backend Developer Internship.

1. Features Implemented
   
Authentication

User Registration
Email Verification (with async email queue)
Login using JWT
Access Token + Refresh Token
Logout
Forgot Password + Reset Password  Change Password
Role-Based Access USER role ADMIN role

Admin-protected APIs using Spring Security

Unauthorized users get proper 403 responses
CRUD Module
Secondary Entity Implemented (example: Product or Task)
Create Read Update Delete

JWT required for all operations


4. API Endpoints
Authentication Endpoints
Method	Endpoint	Description
POST	/api/users/register	Register a new user
GET	/api/users/verify-email	Verify email link
POST	/api/users/login	Login and get tokens
POST	/api/users/refresh-token	Renew access token
POST	/api/users/forgot-password	Send reset link
POST	/api/users/reset-password	Reset password
POST	/api/users/change-password	Logged-in user updates password
Role Management (Admin Only)
Method	Endpoint	Description
PUT	/api/users/update-role	Update user role
