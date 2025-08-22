# Financial Control API

This application was developed with the objective to show expertise in test plan, strategy and execution, simulated into agile environment. This project simulates a MVP, which after questions raised during refinement, improvements and new features suggested could be implemented. The main focus of this repo is the documentation in Wiki, bugs reported in Issues, test automation of functional and non functional requirements as well as CI pipeline. Moreover, the development structure was created with use of IA, which leverage knowledge in prompt engineering, but automated functional and non functional tests and CI pipeline were built manually by project's owner.

## 🎯 Objective
A REST API for personal financial control built with Node.js and Express. This API allows users to manage their incomes and expenses, categorize transactions, and track their financial balance.

## 🚀 Features

- **User Management**: Create, read, update, and delete users
- **Transaction Management**: Track income and expenses with detailed categorization
- **Balance Calculation**: Automatic calculation of user financial balance
- **Filtering**: Filter transactions by period and category
- **Validation**: Comprehensive input validation and error handling
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

```
financial-control-api/
├── models/
│   ├── User.js              # User model with validation
│   └── Transaction.js       # Transaction model with categories
├── routes/
│   ├── userRoutes.js        # User endpoints
│   └── transactionRoutes.js # Transaction endpoints
├── data/
│   └── database.js          # In-memory data storage
├── server.js                # Main server file
├── package.json             # Dependencies and scripts
└── README.md               # Project documentation
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
- `datetime`: Transaction date and time
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

### Filtering Transactions

Filter transactions by period and/or category:
```
GET /api/transactions/user/:userId/filter?startDate=2024-01-01&endDate=2024-01-31&category=Food
```

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

3. **Start the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Access the API**
   - API Base URL: `http://localhost:3000`
   - Swagger Documentation: `http://localhost:3000/api-docs`
   - Health Check: `http://localhost:3000/health`

## 🧪 Testing the API

### Using Swagger UI

1. Open your browser and navigate to `http://localhost:3000/api-docs`
2. Use the interactive interface to test all endpoints
3. View request/response schemas and examples

### Using cURL or Postman

#### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

#### Create a Transaction
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-uuid-here",
    "type": "expense",
    "value": 50.00,
    "category": "Food",
    "description": "Grocery shopping"
  }'
```

#### Get User Balance
```bash
curl http://localhost:3000/api/users/user-uuid-here/balance
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
- `500` - Internal Server Error

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Comprehensive validation for all inputs
- **Error Handling**: Secure error messages without exposing internals

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables
- `PORT`: Server port (default: 3000)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**Note**: This API uses in-memory storage for development purposes. For production use, consider implementing a persistent database solution like PostgreSQL, MongoDB, or MySQL.
