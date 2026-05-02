# Notification System Design

## Project Overview

**Project Name:** notification_app_be  
**Version:** 1.0.0  
**Type:** Node.js/Express Backend Application  
**Main Entry Point:** server.js

The Notification System is a backend application designed to manage and deliver notifications to students. It provides RESTful APIs for creating, retrieving, and managing notifications with MongoDB as the database backend.

---

## Environment Configuration (.env)

The following environment variables are required to run the application:

```
PORT=3002
MONGO_URI=mongodb://127.0.0.1:27017/notification_db
```

### Environment Variables Details

| Variable | Value | Description |
|----------|-------|-------------|
| `PORT` | `3002` | The port on which the Express server runs |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/notification_db` | MongoDB connection string pointing to the notification database |

---

## Project Architecture

### Directory Structure

```
notification_app_be/
├── config/
│   └── db.js                      # Database connection configuration
├── controllers/
│   └── notificationController.js  # Business logic for notifications
├── middleware/
│   └── loggerMiddleware.js        # Logging and error handling middleware
├── models/
│   └── Notification.js            # MongoDB notification schema
├── routes/
│   └── notificationRoutes.js      # API endpoint definitions
├── services/                      # (Directory for future service layer)
├── images/                        # (Directory for image storage)
├── .env                          # Environment variables
├── package.json                  # Project dependencies and scripts
└── server.js                     # Main application entry point
```

---

## Technology Stack

### Dependencies

- **express** (^4.18.2) - Web framework for building RESTful APIs
- **mongoose** (^7.0.3) - MongoDB object modeling
- **dotenv** (^16.0.3) - Environment variable management

### Runtime

- **Node.js** with ES6 modules enabled (`"type": "module"`)

---

## Database Schema

### Notification Model

The `Notification` collection stores notification records with the following structure:

```javascript
{
  _id: ObjectId,
  studentId: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: Timestamp,    // Automatically added
  updatedAt: Timestamp     // Automatically added
}
```

#### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Yes | MongoDB unique identifier |
| `studentId` | String | Yes | Unique identifier for the student |
| `message` | String | Yes | Notification message content |
| `type` | String | Yes | Classification of notification (e.g., "alert", "info", "warning") |
| `read` | Boolean | No | Flag indicating if notification has been read (default: false) |
| `createdAt` | Timestamp | Auto | Timestamp when notification was created |
| `updatedAt` | Timestamp | Auto | Timestamp when notification was last updated |

---

## API Endpoints

### Base URL

```
http://localhost:3002/notifications
```

### Endpoints

#### 1. Create Notification
- **Method:** `POST`
- **Endpoint:** `/notifications`
- **Description:** Create a new notification
- **Request Body:**
  ```json
  {
    "studentId": "string",
    "message": "string",
    "type": "string"
  }
  ```
- **Response:** 
  - **Status:** 201 Created
  - **Body:** Saved notification object with _id and timestamps

#### 2. Get All Notifications
- **Method:** `GET`
- **Endpoint:** `/notifications`
- **Description:** Retrieve all notifications in the system
- **Response:**
  - **Status:** 200 OK
  - **Body:** Array of all notification objects

#### 3. Get Student Notifications
- **Method:** `GET`
- **Endpoint:** `/notifications/:studentId`
- **Description:** Retrieve all notifications for a specific student
- **URL Parameters:**
  - `studentId` (required): The student's unique identifier
- **Response:**
  - **Status:** 200 OK
  - **Body:** Array of notifications filtered by studentId

#### 4. Mark Notification as Read
- **Method:** `PUT`
- **Endpoint:** `/notifications/:id/read`
- **Description:** Mark a specific notification as read
- **URL Parameters:**
  - `id` (required): The notification's MongoDB _id
- **Response:**
  - **Status:** 200 OK
  - **Body:** Updated notification object with `read: true`
  - **Error:** 404 Not Found if notification doesn't exist

#### 5. Delete Notification
- **Method:** `DELETE`
- **Endpoint:** `/notifications/:id`
- **Description:** Delete a specific notification
- **URL Parameters:**
  - `id` (required): The notification's MongoDB _id
- **Response:**
  - **Status:** 200 OK or 204 No Content

---

## Middleware

### Logger Middleware (`loggerMiddleware.js`)

- **loggerMiddleware:** Logs incoming HTTP requests
- **errorLoggerMiddleware:** Handles and logs errors that occur during request processing

---

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB running locally or accessible at the specified MONGO_URI
- npm package manager

### Installation Steps

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create or update the `.env` file with the required variables:
   ```
   PORT=3002
   MONGO_URI=mongodb://127.0.0.1:27017/notification_db
   ```

3. **Start the Server:**
   ```bash
   npm start
   ```

   The server will start on the specified port and connect to MongoDB:
   ```
   Server running on port 3002
   ```

---

## Error Handling

- **Validation Errors:** Missing required fields return a 400 Bad Request status
- **Not Found Errors:** Attempting to update/delete non-existent notifications returns a 404 status
- **Server Errors:** Unhandled exceptions are caught and passed to error middleware

---

## Future Enhancements

- Implement authentication and authorization
- Add pagination for large datasets
- Implement notification filtering and sorting
- Add notification expiration functionality
- Integrate with message queue systems (e.g., RabbitMQ, Redis)
- Add email/SMS notification delivery
- Implement real-time notifications with WebSockets

---

## Development Notes

- The application uses ES6 modules (import/export syntax)
- Async/await is used for all database operations
- Error handling follows middleware-based approach
- The application follows RESTful API conventions

