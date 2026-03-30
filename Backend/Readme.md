# Smart Expense Tracker - Backend API

A comprehensive REST API for managing expenses and income tracking with user authentication.

---

## Table of Contents
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Expense Endpoints](#expense-endpoints)

---

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the Backend directory:

```
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### Running the Server

```bash
npm start
```

---

## Authentication

All protected endpoints require a valid JWT token. The token is returned on successful registration or login and should be included in:
- **Cookie:** `token` (automatically set)
- **Header:** `Authorization: Bearer <token>`

---

## API Endpoints

### User Endpoints

#### 1. Register User

**Endpoint:** `POST /api/users/register`

**Description:** Create a new user account

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201 Created):**
```json
{
  "message": "USer created successfully",
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": "John Doe",
    "email": "john@example.com",
    "totalMoney": 0,
    "totalIncome": 0,
    "totalExpense": 0,
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**
```json
{
  "message": "User already exist with given email",
  "error": "Already email registered",
  "success": false
}
```

---

#### 2. Login User

**Endpoint:** `POST /api/users/login`

**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200 OK):**
```json
{
  "message": "User logged in successfuly",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": "John Doe",
    "email": "john@example.com",
    "totalMoney": 5000,
    "totalIncome": 10000,
    "totalExpense": 5000,
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

User not found (404):
```json
{
  "message": "No user found",
  "success": false,
  "error": "No user registered"
}
```

Invalid password (401):
```json
{
  "message": "invalid password",
  "success": false,
  "error": "Password mismatched"
}
```

---

#### 3. Get User Profile

**Endpoint:** `GET /api/users/profile`

**Description:** Retrieve authenticated user's profile information

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "message": "User profile retrieved successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": "John Doe",
    "email": "john@example.com",
    "totalMoney": 5000,
    "totalIncome": 10000,
    "totalExpense": 5000,
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "success": true
}
```

**Error Response (401):**
```json
{
  "message": "Unauthorized",
  "success": false
}
```

---

#### 4. Logout User

**Endpoint:** `POST /api/users/logout`

**Description:** Logout user and invalidate token

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "message": "User logged out successfully",
  "success": true
}
```

---

### Expense Endpoints

#### 1. Add Expense/Income

**Endpoint:** `POST /api/expenses/add`

**Description:** Add a new expense or income entry

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "amount": 50.00,
  "type": "expense",
  "category": "Food",
  "note": "Lunch at restaurant"
}
```

**Parameters:**
- `amount` (number, required): Transaction amount
- `type` (string, required): Either "expense" or "income"
- `category` (string, required): Category of transaction
- `note` (string, optional): Additional notes

**Success Response (201 Created):**
```json
{
  "message": "expense created successfully",
  "expense": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "amount": 50,
    "type": "expense",
    "category": "Food",
    "note": "Lunch at restaurant",
    "createdAt": "2024-01-15T11:30:00.000Z"
  },
  "success": true
}
```

**Error Response (400):**
```json
{
  "message": "All fields are required",
  "success": false
}
```

Invalid amount (400):
```json
{
  "message": "Amount can't be empty or negative"
}
```

---

#### 2. Get Summary

**Endpoint:** `GET /api/expenses/getSummery`

**Description:** Get user's financial summary (total money, income, and expenses)

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "message": "User summery found successfully",
  "success": true,
  "totalAmount": 5000,
  "totalExpense": 5000,
  "totalIncome": 10000
}
```

**Error Response (400):**
```json
{
  "error": "No user found",
  "message": "unauthorized or no user found",
  "success": false
}
```

---

#### 3. Get Dashboard

**Endpoint:** `GET /api/expenses/getDashboard`

**Description:** Get comprehensive dashboard data including balance, recent expenses, and category breakdown

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "balance": 5000,
  "totalIncome": 10000,
  "totalExpense": 5000,
  "recentExpenses": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439011",
      "amount": 50,
      "type": "expense",
      "category": "Food",
      "note": "Lunch at restaurant",
      "createdAt": "2024-01-15T11:30:00.000Z"
    }
  ],
  "categoryBreakdown": {
    "Food": 150,
    "Transport": 200,
    "Entertainment": 100
  }
}
```

**Error Response (500):**
```json
{
  "message": "Internal Server Error",
  "error": "error message",
  "success": false
}
```

---

## Common Error Responses

### 401 Unauthorized
```json
{
  "message": "Unauthorized",
  "success": false
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal Server Error",
  "error": "error message",
  "success": false
}
```

---

## Example API Calls

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Add Expense:**
```bash
curl -X POST http://localhost:5000/api/expenses/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "amount": 50,
    "type": "expense",
    "category": "Food",
    "note": "Lunch"
  }'
```

---

## Support

For issues or questions, please contact the development team or create an issue in the repository.
