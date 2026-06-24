# Backend API - User & Attendance Management System

A comprehensive Node.js/Express backend API for managing users, attendance, lectures, and spiritual notes for an educational/religious institution.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Middleware](#middleware)
- [Environment Setup](#environment-setup)

---

## Overview

This backend API provides a complete system for:
- **User Management**: Registration, authentication, and role-based access control
- **Attendance Tracking**: Record and manage attendance with multiple statuses
- **Lecture Management**: Upload and manage educational lectures with categorization
- **Spiritual Notes**: Track spiritual submissions from users
- **Admin Controls**: Comprehensive admin features for managing users, attendance, and content

The system supports multiple user roles (SUDO, ADMIN, FATHER, USER) with corresponding permission levels.

---

## Tech Stack

### Core Dependencies
- **Runtime**: Node.js with TypeScript
- **Framework**: Express 5.2.1
- **Database**: PostgreSQL with Prisma ORM
- **Storage**: Supabase for file uploads
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **File Upload**: Multer for handling multipart file uploads
- **Real-time**: WebSocket support (ws)
- **Validation**: Express-validator

### Development Tools
- TypeScript 6.0.3
- ts-node for development
- Prisma Client & CLI

---

## Project Structure

```
backend-main/
├── app.ts                          # Express app entry point
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
│
├── config/                         # Configuration files
│   ├── prismaConnection.ts        # Prisma client setup
│   └── supabaseConfig.ts          # Supabase SDK configuration
│
├── Controllers/                    # Request handlers
│   ├── auth/
│   │   ├── loginController.ts
│   │   └── registerController.ts
│   ├── adminControllers/
│   │   ├── attendanceControllers/
│   │   ├── lectureControllers/
│   │   └── onUser/
│   ├── userControllers/
│   ├── spiritualNoteController/
│   └── ...
│
├── routes/                         # API route definitions
│   ├── authRouter.ts              # /api/v1/auth routes
│   ├── adminUserRouter.ts         # /api/v1/admin/user routes
│   ├── adminAttendanceRouter.ts   # /api/v1/attendance/admin routes
│   ├── userAttendanceRouter.ts    # /api/v1/attendance routes
│   ├── userRouter.ts              # /api/v1/user routes
│   ├── lectureRoutes.ts           # /api/v1/lectures routes
│   └── spiritualNoteRouter.ts     # /api/v2/spiritual-note routes
│
├── middleware/                     # Express middleware
│   ├── authAdmin.ts               # Admin role verification
│   ├── authFather.ts              # Father role verification
│   ├── authSUDO.ts                # SUDO role verification
│   ├── authUser.ts                # User role verification
│   └── multer.ts                  # File upload configuration
│
├── models/                         # Data models
│   └── userData.ts                # User-related type definitions
│
├── prisma/                         # Prisma ORM
│   ├── schema.prisma              # Database schema
│   ├── testData.ts                # Test data seeding
│   └── migrations/                # Database migrations
│
├── repo/                           # Database queries/repositories
│   ├── attendanceQueries.ts
│   ├── authQueries.ts
│   ├── userDataQueries.ts
│   ├── lecturesQueries.ts
│   ├── spiritualNoteQueries.ts
│   ├── userModQueries.ts
│   └── ...
│
├── services/                       # External service integrations
│   └── supabase/
│       ├── uploadLectures.ts
│       └── uploadPfp.ts
│
├── types/                          # TypeScript type definitions
│   └── express/
│       └── index.d.ts
│
├── utils/                          # Utility functions
│   ├── jwt.ts                     # JWT token generation/verification
│   ├── registerValidator.ts       # Input validation rules
│   └── ...
│
└── tests/                          # Test files
    ├── attendanceTests.js
    ├── bcryptTests.ts
    └── jwtTests.ts
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Supabase account (for file storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/database_name
   PORT=3000
   JWT_SECRET=your_jwt_secret_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_api_key
   ```

4. **Initialize the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Seed test data (optional)**
   ```bash
   npx prisma db seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

   Or build and run production:
   ```bash
   npm run build
   npm start
   ```

The server will start on `http://localhost:3000`

---

## API Endpoints

### Authentication (v1)
- `POST /api/v1/auth/register` - Register new user with profile picture
- `POST /api/v1/auth/login` - User login

### User Management (v1)
- `GET /api/v1/user/profile` - Get user profile
- `GET /api/v1/user/attendance` - Get user attendance records

### Admin User Management (v1)
- `GET /api/v1/admin/user/pending` - Get pending user applications
- `GET /api/v1/admin/user/students` - Get all students
- `GET /api/v1/admin/user/:id` - Get specific user
- `PATCH /api/v1/admin/user/:id/status` - Update user approval status
- `PATCH /api/v1/admin/user/:id/role` - Update user role (SUDO only)

### Attendance (v1)
- **User Endpoints**
  - `GET /api/v1/attendance` - Get user's attendance records
  - `POST /api/v1/attendance` - Record user attendance

- **Admin Endpoints**
  - `GET /api/v1/attendance/admin` - Get all attendance records
  - `POST /api/v1/attendance/admin` - Create attendance record for user
  - `GET /api/v1/attendance/admin/absent` - Get users not present on specific date

### Lectures (v1)
- `GET /api/v1/lectures` - Get all lectures
- `POST /api/v1/lectures` - Upload new lecture (Admin)
- Subjects supported: BIBLE, SERVICE_TOPICS, DOCTRINE, CHURCH_HISTORY, RITUALS, HYMNS

### Spiritual Notes (v2)
- `GET /api/v2/spiritual-note` - Get user's spiritual notes
- `POST /api/v2/spiritual-note` - Submit spiritual note
- Note types: BIBLE_STUDY, REFLECTION, CONFESSION

---

## Database Schema

### Core Models

#### User
```
- id (UUID, Primary Key)
- userName (String, Unique)
- password (String, Hashed)
- name, gender, birthdate, address
- role (SUDO | ADMIN | USER | FATHER)
- status (PENDING | REJECTED | APPROVED)
- whatsapp, phoneNumber (Unique), homeNumber
- schoolName, educationType, educationYear
- confessionFather, liturgyDate, servantPrepYear, serviceType
- registerDate, attendances[], spiritualNotes[]
```

#### Attendance
```
- id (UUID, Primary Key)
- userId (Foreign Key)
- date (DateTime)
- status (PRESENT | ABSENT | EXCUSEDLATE | UNEXCUSEDLATE)
- note (Optional)
- Unique constraint on (userId, date)
```

#### Lecture
```
- id (UUID, Primary Key)
- title, type, date
- path (String, Unique - file path in storage)
- subject (BIBLE | SERVICE_TOPICS | DOCTRINE | CHURCH_HISTORY | RITUALS | HYMNS)
```

#### SpiritualNote
```
- userId, date, submission (Composite Primary Key)
- submission (BIBLE_STUDY | REFLECTION | CONFESSION)
- user (Foreign Key to User)
```

---

## Authentication

The API uses **JWT (JSON Web Tokens)** for authentication.

### Token Generation
- Generated on successful login
- Contains user ID and role
- Tokens are verified for protected routes

### Protected Routes
Routes are protected by role-based middleware:
- `authAdmin` - Requires ADMIN or SUDO role
- `authFather` - Requires FATHER role
- `authUser` - Requires USER role
- `authSUDO` - Requires SUDO role only

### Password Security
- Passwords are hashed using bcryptjs
- Never stored in plain text
- Verified during login

---

## Middleware

### Authentication Middleware
Located in `middleware/`:
- **authAdmin.ts** - Validates admin access (ADMIN, SUDO roles)
- **authFather.ts** - Validates father access
- **authSUDO.ts** - Validates SUDO-only access
- **authUser.ts** - Validates general user access

### File Upload Middleware
- **multer.ts** - Configured for profile picture and lecture uploads
- File size limits and validation

### Global Middleware
- CORS enabled for cross-origin requests
- JSON and URL-encoded body parsing
- Error handling for Multer and general server errors

---

## Environment Setup

### Required Environment Variables
```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Server
PORT=3000

# Authentication
JWT_SECRET=your_secure_jwt_secret_key

# Supabase (for file storage)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_public_api_key
```

### Database Setup
```bash
# Create migrations
npx prisma migrate dev --name migration_name

# View database
npx prisma studio

# Reset database (development only)
npx prisma migrate reset
```

---

## Scripts

- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled production build

---

## Error Handling

The API includes comprehensive error handling:
- Multer file upload errors (400 status)
- Validation errors via express-validator
- Authentication/Authorization errors (401, 403)
- Server errors (500 status)
- Detailed error logging for debugging

---

## Contributing

1. Create feature branches from `main`
2. Follow TypeScript best practices
3. Add tests for new features
4. Ensure migrations are created for schema changes
5. Submit pull requests with detailed descriptions

---

## License

ISC License

---

## Support

For issues, questions, or contributions, please open an issue or contact the development team.
