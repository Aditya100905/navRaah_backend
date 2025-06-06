# 🚌 navRaah Backend

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A robust backend service for **navRaah**, a comprehensive bus tracking and scheduling application. Built with modern Node.js technologies to provide seamless transit management capabilities.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based auth with refresh tokens
- 🚌 **Bus Management** - Complete CRUD operations for bus fleet
- 🗺️ **Route Planning** - Dynamic route creation and management  
- 📅 **Schedule Management** - Flexible scheduling system
- 💬 **Feedback System** - User feedback collection and management
- 🛑 **Stop Management** - Bus stop creation and tracking
- 👥 **User-Bus Relations** - Link users with specific buses
- 📧 **Email Integration** - Password recovery via email

## 🏗️ Architecture

```
navRaah_backend/
├── src/
│   ├── server.js           # Application entry point
│   ├── controllers/        # Business logic layer
│   │   ├── UserController.js
│   │   ├── BusController.js
│   │   ├── RouteController.js
│   │   ├── FeedbackController.js
│   │   ├── ScheduleController.js
│   │   ├── UserBusController.js
│   │   └── StopController.js
│   ├── routes/            # API route definitions
│   ├── models/            # MongoDB schemas
│   └── middleware/        # Authentication & validation
├── .env                   # Environment variables
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** v18 or higher
- **MongoDB** (Local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vansh-000/navRaah_backend.git
   cd navRaah_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGO_URI=mongodb://localhost:27017/navraah
   # Or for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/navraah
   
   # JWT Configuration
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   JWT_REFRESH_SECRET=your_super_secure_refresh_secret_key_here
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   
   # Email Configuration (for password reset)
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_app_specific_password
   EMAIL_SERVICE=gmail
   ```

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000` (or your specified PORT).

## 📚 API Documentation

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `api/users/register` | Create new user account | ❎ |
| `POST` | `api/users/login` | User authentication | ❎ |
| `POST` | `api/users/refresh-token` | Refresh access token | ✅ |
| `POST` | `api/users/logout` | Clear authentication tokens | ✅ |
| `POST` | `api/users/forgot-password` | Send password reset email | ❎ |
| `POST` | `api/users/reset-password` | Reset password with token | ✅ |

### 👤 User Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `api/users/me` | Get current user profile | ✅ |
| `PUT` | `api/users/me` | Update user profile | ✅ |
| `DELETE` | `api/usersme` | Delete user account | ✅ |

### 🚌 Bus Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `api/bus` | Add new bus | ✅ |
| `PUT` | `api/bus/:id` | Update bus details | ✅ |
| `DELETE` | `api/bus/:id` | Delete bus | ✅ |
| `GET` | `api/bus` | Get all buses | ❎ |
| `GET` | `api/bus/:id` | Get bus by identifier | ❎ |

### 🗺️ Route Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/route` | Create new route | ✅ |
| `PUT` | `/api/route/:id` | Update route | ✅ |
| `DELETE` | `/api/route/:id` | Delete route | ✅ |
| `GET` | `/api/route` | Get all routes | ❎ |
| `GET` | `/api/route/:id` | Get route by identifier | ❎ |

### 📅 Schedule Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `api/schedule` | Create new schedule | ✅ |
| `PUT` | `api/schedule/:scheduleId` | Update schedule | ✅ |
| `DELETE` | `api/schedule/:scheduleId` | Delete schedule | ✅ |
| `GET` | `api/schedule` | Get all schedules | ❎ |
| `GET` | `api/schedule/bus/:busId` | Get schedules by bus | ❎ |
| `GET` | `api/schedule/route/:routeId` | Get schedules by route | ❎ |
| `GET` | `api/schedule/:scheduleId` | Get schedule by ID | ❎ |
| `GET` | `api/schedule//bus/:busId/route/:routeId` | Get schedule by Bus and Route | ❎ |

### 💬 Feedback System

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `api/feedback` | Submit feedback | ✅ |
| `PUT` | `api/feedback/:feedbackId` | Update feedback | ✅ |
| `DELETE` | `api/feedback/:feedbackId` | Delete feedback | ✅ |
| `GET` | `api/feedback` | Get all feedback | ❎ |
| `GET` | `api/feedback/user/:userId` | Get user's feedback | ❎ |

### 🛑 Stop Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `api/stop` | Add new stop | ✅ |
| `PUT` | `api/stop/:id` | Update stop | ✅ |
| `DELETE` | `api/stop/:id` | Delete stop | ✅ |
| `GET` | `api/stop` | Get all stops | ❎ |
| `GET` | `api/stop/:id` | Get stop by ID | ❎ |

### 👥 User-Bus Relations

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `api/userBus` | Link user with bus | ✅ |
| `PUT` | `api/userBus/:userId` | Update user-bus relation | ✅ |
| `DELETE` | `api/userBus/:userId` | Remove user-bus link | ✅ |
| `GET` | `api/userBus` | Get all user-bus relations | ❎ |
| `GET` | `api/userBus/:userId` | Get user's linked buses | ❎ |

## 🛠️ Technology Stack

### Backend Framework
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Mongoose** - MongoDB object modeling

### Database
- **MongoDB** - NoSQL document database
- **MongoDB Atlas** - Cloud database service (optional)

### Authentication & Security
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing
- **cookie-parser** - Cookie parsing middleware
- **cors** - Cross-origin resource sharing

### Email Service
- **Nodemailer** - Email sending functionality
- **Gmail SMTP** - Email service provider

### Development Tools
- **Nodemon** - Development server with auto-restart
- **dotenv** - Environment variable management

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | `5000` |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `REFRESH_TOKEN_SECRET` | Refresh token secret | Yes | - |
| `REFRESH_TOKEN_EXPIRY` | Refresh token expiry | Yes | `10d` |
| `ACCESS_TOKEN_SECRET` | Access token secret | Yes | - |
| `ACCESS_TOKEN_EXPIRY` | Access token expiry | Yes | `1d` |
| `FRONTEND_URL` | URL of the frontend | Yes | `http://localhost:3000` |
| `CORS_ORIGIN` | CORS URL | Yes | - |
| `SMTP_MAIL` | Email service username | Yes | - |
| `SMTP_APP_PASS` | Email service password | Yes | - |
| `SMTP_HOST` | Email service host | Yes | `smtp.gmail.com` |
| `SMTP_PORT` | Email service port | Yes | `587` |

### Database Schema

The application uses the following main collections:
- **users** - User account information
- **buses** - Bus fleet data
- **routes** - Route definitions
- **schedules** - Bus schedules
- **stops** - Bus stop locations
- **feedback** - User feedback
- **userbuses** - User-bus relationships

## 📦 Package Scripts

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix"
  }
}
```

## 🚀 Deployment

### Production Deployment Steps

1. **Set environment variables**
   ```bash
   export NODE_ENV=production
   export MONGO_URI=your_production_mongodb_uri
   export JWT_SECRET=your_production_jwt_secret
   # ... other variables
   ```

2. **Install production dependencies**
   ```bash
   npm ci --only=production
   ```

3. **Start the application**
   ```bash
   npm start
   ```

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Standards
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📈 Performance & Monitoring

- **Database Indexing** - Optimized queries with proper indexes
- **Request Validation** - Input validation middleware
- **Error Handling** - Comprehensive error handling system
- **Logging** - Structured logging for debugging

## 🐛 Troubleshooting

### Common Issues

**Connection Errors**
```bash
# Check MongoDB connection
mongosh "your_connection_string"

# Verify environment variables
echo $MONGO_URI
```

**Authentication Issues**
```bash
# Check JWT token expiry
# Verify JWT_SECRET is set correctly
```

**Email Service Errors**
```bash
# Verify email credentials
# Check app-specific password for Gmail
```

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/NavRaah/navRaah_backend/issues)
- **Email**: [navraahi@gmail.com](mailto:navraahi@gmail.com)

<!-- 
## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details. -->

## 👥 Contributors

| Profile | Name | GitHub | Role |
|--------|------|--------|------|
| <img src="https://avatars.githubusercontent.com/vansh-000?s=80" width="50" height="50" style="border-radius:50%;" /> | **Vansh Verma** | [@vansh-000](https://github.com/vansh-000) | Backend Admin and Developer |
| <img src="https://avatars.githubusercontent.com/Snehaaa-Kri?s=80" width="50" height="50" style="border-radius:50%;" /> | **Sneha Kumari** | [@Snehaaa-Kri](https://github.com/Snehaaa-Kri) | Backend Developer |
| <img src="https://avatars.githubusercontent.com/srishtisethi28?s=80" width="50" height="50" style="border-radius:50%;" /> | **Srishti Sethi** | [@srishtisethi28](https://github.com/srishtisethi28) | Backend Developer |


## 👨‍💻 Readme Author

**Vansh Verma**
- GitHub: [@vansh-000](https://github.com/vansh-000)
- LinkedIn: [Vansh Verma](https://linkedin.com/in/vanshverma000)
- Email: vermavansh7777@gmail.com

---


**⭐ Star this repository if you find it helpful!**

Made with ❤️ for the transit community
