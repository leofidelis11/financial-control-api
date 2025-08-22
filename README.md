# Financial Control API

This application was developed with the objective to show expertise in test plan, strategy and execution, simulated into agile environment. This project simulates a MVP, which after questions raised during refinement, improvements and new features suggested could be implemented. The main focus of this repo is the documentation in Wiki, bugs reported in Issues, test automation of functional and non functional requirements as well as CI pipeline. Moreover, the development structure was created with use of IA, which leverage knowledge in prompt engineering, but automated functional and non functional tests and CI pipeline were built manually by project's owner.

## 🎯 Objective
A REST API for personal financial control built with Node.js and Express. This API allows users to manage their incomes and expenses, categorize transactions, and track their financial balance.

## 🚀 Features

- **User Management**: Create, read, update, and delete users
- **Transaction Management**: Track income and expenses with detailed categorization
- **Balance Calculation**: Automatic calculation of user financial balance
- **API Documentation**: Interactive Swagger documentation

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Swagger** - API documentation and testing
- **UUID** - Unique identifier generation
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## 📁 Project Structure

```plaintext
financial-control-api/
├── .github/
│   └── workflows/
│       └── main.yml                 # CI pipeline with GitHub Actions
├── data/
│   ├── database.js                  # In-memory data storage
│   ├── db.json                      # Simulated database file
│   └── seedUsers.json               # Initial user seed data
├── src/
│   ├── models/
│   │   ├── User.js                  # User model with validations
│   │   └── Transaction.js           # Transaction model with category handling
│   └── routes/
│       ├── userRoutes.js            # API endpoints related to users
│       └── transactionRoutes.js     # API endpoints related to transactions
├── test/
│   ├── helpers/                     # Helper functions for testing
│   │   ├── transactions.js
│   │   └── users.js
│   ├── performance/                 # API performance tests
│   │   ├── checkBalance.test.js
│   │   ├── transaction.test.js
│   │   └── usersSearch.test.js
│   └── specs/                       # Functional automated tests
│       ├── transactions.test.js
│       └── users.test.js
├── server.js                        # Entry point for the Express server
├── package.json                     # Project dependencies and scripts
└── README.md                        # Project documentation
```


## 🏗️ Architecture

### Models

#### User
- `id`: Unique identifier (auto-generated)
- `name`: User's full name (required)
- `email`: User's email address (required, unique)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

#### Transaction
- `id`: Unique identifier (auto-generated)
- `userId`: Reference to user (required)
- `type`: Transaction type - "income" or "expense" (required)
- `value`: Transaction amount (required, > 0)
- `category`: Predefined category (required)
- `description`: Optional description
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Predefined Categories
- Food
- Transportation
- Housing
- Education
- Pet
- Health
- Personal
- Leisure
- Financial Services

## 📋 API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users` | Create a new user |
| `GET` | `/api/users` | Get all users |
| `GET` | `/api/users/:id` | Get user by ID |
| `PUT` | `/api/users/:id` | Update user information |
| `GET` | `/api/users/:id/balance` | Get user balance |
| `DELETE` | `/api/users/:id` | Delete user |

### Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/transactions` | Create a new transaction |
| `GET` | `/api/transactions` | Get all transactions |
| `GET` | `/api/transactions/:id` | Get transaction by ID |
| `GET` | `/api/transactions/user/:userId` | Get user transactions |
| `GET` | `/api/transactions/user/:userId/filter` | Filter user transactions |
| `PUT` | `/api/transactions/:id` | Update transaction |
| `DELETE` | `/api/transactions/:id` | Delete transaction |
| `GET` | `/api/transactions/categories` | Get available categories |


## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd financial-control-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3.  **Install and configure dotenv**
   ```bash
   # Install dotenv dependency
   npm i dotenv
   
   # Create a file on project root called '.env' and add the info:
   BASE_URL="http://localhost:3000"
   ```
3.  **Install k6**
   ```bash
   winget install k6 --source winget
   ```
4. **Start the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the API**
   - API Base URL: `http://localhost:3000`
   - Swagger Documentation: `http://localhost:3000/api-docs`
   - Health Check: `http://localhost:3000/health`

## 🧪 Testing the API

### Using Swagger UI

1. Open your browser and navigate to `http://localhost:3000/api-docs`
2. Use the interactive interface to test all endpoints
3. View request/response schemas and examples

### Functional Test Automation

```bash
npm test
```

### Performance Testing with k6

```bash
npm test:balance       # Run performance of check balance functionality

npm test:transaction   # Run performance of post transaction

npm test:user          # Run performance of search all users

npm test:all           # Run all performance test scripts
```

### k6 Web Dashboard and HTML Report

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run relative.script.path.js
```

## 📊 Business Rules

1. **Transaction Value**: Must be greater than zero
2. **Transaction Type**: Can only be "income" or "expense"
3. **Balance Calculation**: `sum(income) - sum(expenses)`
4. **Categories**: Predefined list of 9 categories
5. **User Attributes**: All attributes are mandatory
6. **Transaction Attributes**: All attributes are mandatory except description

## 🔧 Configuration

The API runs on port 3000 by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## 🚨 Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `409` - Conflict (e.g., duplicate email)


## 🆘 Support

For support and questions, please open an issue in the repository.
