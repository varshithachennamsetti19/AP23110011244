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

---

# Stage 2: Database Design & Scalability Solutions

## Database Technology Choice: NoSQL (MongoDB)

### Why MongoDB Over SQL (PostgreSQL/MySQL)?

**1. Flexible Schema**
- Notifications have variable structures and optional metadata
- MongoDB's document-based model allows easy schema evolution without migrations
- SQL requires strict schema definition, making changes cumbersome

**2. Horizontal Scalability**
- MongoDB supports native sharding for distributing data across multiple servers
- SQL databases typically require complex replication strategies
- Perfect for handling growing notification volumes across multiple institutions

**3. JSON-Native Operations**
- Direct alignment with REST API JSON payloads
- No impedance mismatch between application objects and database storage
- Faster serialization/deserialization compared to SQL

**4. High Write Throughput**
- Notifications are write-heavy (multiple notifications per second)
- MongoDB's write optimization handles bulk notification creation efficiently
- Better suited for real-time notification systems

**5. Ease of Development**
- Mongoose provides intuitive ORM for Node.js
- Quick iteration and prototyping capabilities
- Reduced development complexity

### SQL Alternative Comparison

If SQL were used (PostgreSQL):

**Advantages:**
- ACID guarantees for complex transactions
- Better for highly relational data
- Advanced querying with JOINs

**Disadvantages:**
- Requires predefined schema
- Vertical scaling limitations
- Complex schema migrations for schema changes
- Higher query complexity for simple document retrieval

**Conclusion:** NoSQL (MongoDB) is the better choice for a notification system prioritizing scalability and flexibility.

---

## Database Schema Design

### Current Notification Collection Schema

```javascript
{
  _id: ObjectId,              // Primary key (auto-generated)
  studentId: String,          // Foreign key reference to student
  message: String,            // Notification content
  type: String,              // Enum: "alert", "info", "warning", "success"
  read: Boolean,             // Read status (indexed for queries)
  createdAt: Timestamp,      // Creation time (indexed)
  updatedAt: Timestamp       // Last update time
}
```

### Recommended Indexes for Performance

```javascript
// Index 1: Query student notifications efficiently
db.notifications.createIndex({ studentId: 1, createdAt: -1 });

// Index 2: Find unread notifications quickly
db.notifications.createIndex({ studentId: 1, read: 1 });

// Index 3: Time-based queries for cleanup and archival
db.notifications.createIndex({ createdAt: 1 });

// Index 4: Efficient notification type filtering
db.notifications.createIndex({ type: 1, studentId: 1 });
```

---

## Scalability Issues & Solutions

### Problem 1: Large Data Volume

**Issue:** As the system grows with millions of notifications, queries become slow and storage increases.

**Solutions:**

1. **Database Sharding**
   ```
   Shard Key: studentId
   - Distributes notifications across multiple MongoDB instances
   - Each shard handles notifications for a subset of students
   - Horizontal scaling as student base grows
   ```

2. **Data Archival/Partitioning**
   ```
   Archive old notifications (>90 days) to separate collection:
   - notifications_active (recent, frequently accessed)
   - notifications_archive (older, rarely accessed)
   - Reduces main collection size and improves query speed
   ```

3. **TTL (Time-To-Live) Indexes**
   ```javascript
   // Automatically delete notifications after 1 year
   db.notifications.createIndex(
     { createdAt: 1 }, 
     { expireAfterSeconds: 31536000 }
   );
   ```

### Problem 2: High Query Load

**Issue:** Multiple concurrent read requests slow down the database.

**Solutions:**

1. **Read Replicas**
   ```
   MongoDB Replica Set Architecture:
   - Primary: Handles all writes
   - Secondary 1 & 2: Handle read queries
   - Distributes read load across multiple instances
   ```

2. **Caching Layer (Redis)**
   ```
   Cache frequently accessed data:
   - Recent notifications for active students
   - Notification counts by type
   - TTL: 1 hour for cache invalidation
   ```

3. **Pagination**
   ```javascript
   // Instead of loading all notifications
   // Load in batches: 20 notifications per page
   // Reduces memory and network overhead
   ```

### Problem 3: Bulk Write Operations

**Issue:** Creating thousands of notifications simultaneously during batch campaigns.

**Solutions:**

1. **Batch Insert Operations**
   ```javascript
   // Use insertMany instead of individual inserts
   // Reduces database round trips by 95%
   // Increases throughput from 100s to 10,000s per second
   ```

2. **Message Queue Integration**
   ```
   Use RabbitMQ/Kafka for bulk notifications:
   - Decouple notification creation from API
   - Process notifications asynchronously
   - Prevents database overload
   ```

### Problem 4: Storage Efficiency

**Issue:** Storage costs increase with growing notification volume.

**Solutions:**

1. **Document Compression**
   - Compress notification messages before storage
   - Reduces document size by 60-70%

2. **Cleanup Policies**
   ```javascript
   // Delete notifications older than 2 years
   db.notifications.deleteMany({
     createdAt: { $lt: new Date(Date.now() - 2*365*24*60*60*1000) }
   });
   ```

---

## Database Queries Based on REST APIs

### 1. CREATE NOTIFICATION (POST /notifications)

**NoSQL Query (MongoDB):**
```javascript
db.notifications.insertOne({
  studentId: "STU001",
  message: "Your assignment has been graded",
  type: "alert",
  read: false,
  createdAt: new Date(),
  updatedAt: new Date()
});
```

**SQL Equivalent (PostgreSQL):**
```sql
INSERT INTO notifications (student_id, message, type, read, created_at, updated_at)
VALUES ('STU001', 'Your assignment has been graded', 'alert', false, NOW(), NOW());
```

**Mongoose Implementation (Node.js):**
```javascript
const newNotification = new Notification({
  studentId: "STU001",
  message: "Your assignment has been graded",
  type: "alert"
});
await newNotification.save();
```

---

### 2. GET ALL NOTIFICATIONS (GET /notifications)

**NoSQL Query (MongoDB):**
```javascript
// Without pagination (not recommended for production)
db.notifications.find({}).sort({ createdAt: -1 }).toArray();

// With pagination (recommended)
db.notifications
  .find({})
  .sort({ createdAt: -1 })
  .skip(0)
  .limit(20)
  .toArray();
```

**SQL Equivalent (PostgreSQL):**
```sql
-- Without pagination
SELECT * FROM notifications ORDER BY created_at DESC;

-- With pagination
SELECT * FROM notifications 
ORDER BY created_at DESC 
LIMIT 20 OFFSET 0;
```

**Mongoose Implementation:**
```javascript
const page = req.query.page || 1;
const limit = 20;
const skip = (page - 1) * limit;

const notifications = await Notification.find()
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);
```

---

### 3. GET STUDENT NOTIFICATIONS (GET /notifications/:studentId)

**NoSQL Query (MongoDB):**
```javascript
// Get all notifications for a student
db.notifications
  .find({ studentId: "STU001" })
  .sort({ createdAt: -1 })
  .toArray();

// With unread filter
db.notifications
  .find({ studentId: "STU001", read: false })
  .sort({ createdAt: -1 })
  .toArray();

// With type filter
db.notifications
  .find({ studentId: "STU001", type: "alert" })
  .sort({ createdAt: -1 })
  .toArray();
```

**SQL Equivalent (PostgreSQL):**
```sql
-- Get all notifications for a student
SELECT * FROM notifications 
WHERE student_id = 'STU001' 
ORDER BY created_at DESC;

-- With unread filter
SELECT * FROM notifications 
WHERE student_id = 'STU001' AND read = false 
ORDER BY created_at DESC;

-- With type filter
SELECT * FROM notifications 
WHERE student_id = 'STU001' AND type = 'alert' 
ORDER BY created_at DESC;
```

**Mongoose Implementation:**
```javascript
const studentId = req.params.studentId;

// Basic query
const notifications = await Notification.find({ studentId })
  .sort({ createdAt: -1 });

// With filters
const unreadNotifications = await Notification.find({ 
  studentId, 
  read: false 
}).sort({ createdAt: -1 });

// With pagination
const notifications = await Notification.find({ studentId })
  .sort({ createdAt: -1 })
  .skip((page - 1) * 20)
  .limit(20);
```

---

### 4. MARK NOTIFICATION AS READ (PUT /notifications/:id/read)

**NoSQL Query (MongoDB):**
```javascript
// Update single notification
db.notifications.findOneAndUpdate(
  { _id: ObjectId("507f1f77bcf86cd799439011") },
  { 
    $set: { 
      read: true, 
      updatedAt: new Date() 
    }
  },
  { returnDocument: "after" }
);

// Mark all notifications as read for a student
db.notifications.updateMany(
  { studentId: "STU001" },
  { 
    $set: { 
      read: true, 
      updatedAt: new Date() 
    }
  }
);
```

**SQL Equivalent (PostgreSQL):**
```sql
-- Update single notification
UPDATE notifications 
SET read = true, updated_at = NOW() 
WHERE id = 1
RETURNING *;

-- Mark all notifications as read for a student
UPDATE notifications 
SET read = true, updated_at = NOW() 
WHERE student_id = 'STU001';
```

**Mongoose Implementation:**
```javascript
// Single notification
const notification = await Notification.findByIdAndUpdate(
  req.params.id,
  { read: true },
  { new: true }
);

// Bulk update for student
await Notification.updateMany(
  { studentId: req.params.studentId },
  { read: true }
);
```

---

### 5. DELETE NOTIFICATION (DELETE /notifications/:id)

**NoSQL Query (MongoDB):**
```javascript
// Delete single notification
db.notifications.deleteOne(
  { _id: ObjectId("507f1f77bcf86cd799439011") }
);

// Delete all notifications for a student
db.notifications.deleteMany(
  { studentId: "STU001" }
);

// Delete old notifications (cleanup)
db.notifications.deleteMany(
  { createdAt: { $lt: new Date(Date.now() - 90*24*60*60*1000) } }
);
```

**SQL Equivalent (PostgreSQL):**
```sql
-- Delete single notification
DELETE FROM notifications WHERE id = 1;

-- Delete all notifications for a student
DELETE FROM notifications WHERE student_id = 'STU001';

-- Delete old notifications (90 days)
DELETE FROM notifications 
WHERE created_at < NOW() - INTERVAL '90 days';
```

**Mongoose Implementation:**
```javascript
// Single deletion
await Notification.findByIdAndDelete(req.params.id);

// Bulk deletion
await Notification.deleteMany({ studentId: req.params.studentId });

// Cleanup old notifications
await Notification.deleteMany({
  createdAt: { $lt: new Date(Date.now() - 90*24*60*60*1000) }
});
```

---

## Performance Optimization Strategies

### 1. Indexing Strategy

**Recommended Index Creation:**
```javascript
// In MongoDB initialization script
db.notifications.createIndex({ studentId: 1, createdAt: -1 });  // Most common query pattern
db.notifications.createIndex({ studentId: 1, read: 1 });        // Unread filter queries
db.notifications.createIndex({ createdAt: 1 });                  // Time-based cleanup
db.notifications.createIndex({ type: 1 });                       // Type filtering
```

**Expected Performance Improvement:**
- Query speed: 5000ms → 50ms (100x improvement)
- Write performance: 1% overhead per index created

### 2. Query Optimization

```javascript
// ❌ Inefficient: Loads all fields
db.notifications.find({ studentId: "STU001" });

// ✅ Efficient: Select only needed fields
db.notifications.find(
  { studentId: "STU001" },
  { message: 1, type: 1, read: 1, createdAt: 1 }
);
```

### 3. Aggregation Pipeline for Analytics

```javascript
// Get notification count by type for a student
db.notifications.aggregate([
  { $match: { studentId: "STU001" } },
  { $group: {
      _id: "$type",
      count: { $sum: 1 }
    }
  }
]);

// Get unread notification count
db.notifications.aggregate([
  { $match: { studentId: "STU001", read: false } },
  { $count: "unreadCount" }
]);
```

---

## Summary: Database Design Decisions

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| **Database** | MongoDB (NoSQL) | Flexible schema, horizontal scalability, JSON-native |
| **Sharding** | By studentId | Even distribution, locality of reference |
| **Indexing** | Composite indexes | studentId + timestamp for most queries |
| **Caching** | Redis for hot data | Reduces database load, improves response time |
| **Archival** | 2-year retention | Balance storage cost with data availability |
| **Scalability** | Horizontal via sharding | Handles millions of notifications |
| **Consistency** | Eventual consistency | Acceptable for notification system |

This design supports the system's REST APIs while maintaining performance and scalability as data volumes increase.

