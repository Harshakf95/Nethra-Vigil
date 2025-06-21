# Nethra Sentinel - Backend Server

This is the backend server for the Nethra Sentinel application, built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nethra-sentinel-sight/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/nethra-sentinel
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will be available at `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm run build` - Build the TypeScript project
- `npm start` - Start the production server
- `npm test` - Run tests (not implemented yet)

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

## Environment Variables

- `NODE_ENV` - Application environment (development/production)
- `PORT` - Port to run the server on
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `JWT_EXPIRE` - JWT expiration time

## Project Structure

```
src/
  ├── config/         # Configuration files
  ├── controllers/     # Route controllers
  ├── middleware/      # Custom middleware
  ├── models/         # Database models
  ├── routes/         # Route definitions
  ├── app.ts          # Express application
  └── index.ts        # Server entry point
```

## License

MIT
