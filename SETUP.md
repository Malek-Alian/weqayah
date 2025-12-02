# 🚀 Weqayah v2 - Quick Setup Guide

This guide will help you get the Weqayah v2 application up and running quickly.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)
- **Git** - [Download here](https://git-scm.com/)

## 🗄️ Database Setup

### 1. Install PostgreSQL

Follow the installation guide for your operating system from the PostgreSQL website.

### 2. Create Database

```bash
# Option 1: Using createdb command
createdb weqayah_v2

# Option 2: Using psql
psql -U postgres
CREATE DATABASE weqayah_v2;
\q
```

### 3. Note Your Database Credentials

You'll need these for the environment configuration:

- Database name: `weqayah_v2`
- Username: `postgres` (or your custom username)
- Password: (your PostgreSQL password)
- Host: `localhost`
- Port: `5432`

## 🔧 Backend Setup

### 1. Navigate to Server Directory

```bash
cd server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
# Copy the example environment file
cp env.example .env

# Edit the .env file with your database credentials
# Use your favorite text editor
```

**Edit `.env` file:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=weqayah_v2
DB_USER=postgres
DB_PASSWORD=your_actual_password_here

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Run Database Migrations

```bash
# Create database tables
npm run migrate

# Seed with sample data
npm run seed
```

### 5. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

**✅ Server should be running at:** `http://localhost:5000`

## 🎨 Frontend Setup

### 1. Navigate to Client Directory

```bash
cd client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

**✅ Frontend should be running at:** `http://localhost:5173`

## 🧪 Test the Setup

### 1. Check Server Health

Visit: `http://localhost:5000/health`

Expected response:

```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected"
}
```

### 2. Check API Endpoints

Visit: `http://localhost:5000/api`

Expected response:

```json
{
  "success": true,
  "message": "Welcome to Weqayah v2 API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "users": "/api/users",
    "health": "/health"
  }
}
```

### 3. Test Frontend

Visit: `http://localhost:5173`

You should see:

- Welcome page with theme toggle
- Language selector (English/Arabic)
- Feature cards showing the tech stack

## 🔐 Test Authentication

### 1. Register a New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123"
  }'
```

### 3. Use Pre-seeded Accounts

The database comes with these test accounts:

**Admin Account:**

- Email: `admin@weqayah.com`
- Password: `admin123`
- Role: `admin`

**User Account:**

- Email: `user@weqayah.com`
- Password: `user123`
- Role: `user`

## 🎯 Features to Test

### 1. Theme System

- Click the theme toggle button in the header
- Notice the smooth transition between light and dark themes
- Refresh the page - your theme preference should persist

### 2. Internationalization

- Use the language selector to switch between English and Arabic
- Notice how the interface text changes
- The language preference should persist across page refreshes

### 3. Icons

- All icons are powered by Iconify
- Icons are loaded dynamically and cached
- No additional icon fonts needed

### 4. Responsive Design

- Resize your browser window
- The layout should adapt to different screen sizes
- Test on mobile devices or use browser dev tools

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
pg_ctl status

# Start PostgreSQL if not running
pg_ctl start

# Test connection
psql -U postgres -d weqayah_v2 -c "SELECT 1;"
```

### Port Already in Use

```bash
# Check what's using the port
lsof -i :5000  # For server
lsof -i :5173  # For client

# Kill the process or use different ports
```

### Missing Dependencies

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Loading

- Ensure `.env` file is in the correct directory (`server/`)
- Check that there are no spaces around the `=` sign
- Restart the server after making changes

## 📚 Next Steps

1. **Explore the Code**: Check out the component structure and API endpoints
2. **Customize Themes**: Modify colors and styles in `client/src/themes/`
3. **Add Translations**: Add new languages in `client/src/locales/`
4. **Extend API**: Add new endpoints in `server/routes/`
5. **Database**: Add new tables and relationships

## 🆘 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Look at the code comments for implementation details
- Create an issue if you encounter problems

---

**🎉 Congratulations! Your Weqayah v2 application is now running!**
