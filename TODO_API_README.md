# Todo API Documentation

This document provides comprehensive information about the Todo API endpoints in the HRMS system.

## Base URL
```
http://localhost:5000
```

## Authentication
Most endpoints require JWT authentication. Include the Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### 1. Create Todo
**POST** `/todos`

Creates a new todo item.

**Request Body:**
```json
{
  "Title": "Complete project documentation",
  "Description": "Write comprehensive documentation for the HRMS project",
  "Priority": "H",
  "StatusType": "A",
  "BucketID": 1,
  "AssignTo": 2,
  "DueDateTime": "2024-01-15T10:00:00Z",
  "NotificationTo": "team@company.com",
  "CID": 1
}
```

**Response:**
```json
{
  "ToDoId": 1,
  "Title": "Complete project documentation",
  "Description": "Write comprehensive documentation for the HRMS project",
  "Priority": "H",
  "StatusType": "A",
  "BucketID": 1,
  "AssignTo": 2,
  "AssgnBy": 1,
  "CreatedBy": 1,
  "UpdatedBy": 1,
  "created": "2024-01-10T10:00:00Z",
  "updated": "2024-01-10T10:00:00Z"
}
```

### 2. Get All Todos
**GET** `/todos`

Retrieves all todo items with related data.

**Response:**
```json
[
  {
    "ToDoId": 1,
    "Title": "Complete project documentation",
    "Description": "Write comprehensive documentation",
    "Priority": "H",
    "StatusType": "A",
    "bucket": { "BucketId": 1, "BucketName": "Development" },
    "assignToUser": { "UID": 2, "Fname": "John", "Lname": "Doe" },
    "assignedByUser": { "UID": 1, "Fname": "Jane", "Lname": "Smith" }
  }
]
```

### 3. Get Todo by ID
**GET** `/todos/:id`

Retrieves a specific todo item by its ID.

**Parameters:**
- `id` (number): The todo ID

**Response:**
```json
{
  "ToDoId": 1,
  "Title": "Complete project documentation",
  "Description": "Write comprehensive documentation",
  "Priority": "H",
  "StatusType": "A",
  "bucket": { "BucketId": 1, "BucketName": "Development" },
  "assignToUser": { "UID": 2, "Fname": "John", "Lname": "Doe" }
}
```

### 4. Update Todo
**PUT** `/todos/:id`

Updates an existing todo item.

**Parameters:**
- `id` (number): The todo ID

**Request Body:**
```json
{
  "Title": "Updated project documentation",
  "Description": "Updated description",
  "Priority": "M",
  "StatusType": "P"
}
```

### 5. Update Todo Status
**PUT** `/todos/:id/status`

Updates only the status of a todo item.

**Parameters:**
- `id` (number): The todo ID

**Request Body:**
```json
{
  "status": "C"
}
```

**Status Values:**
- `A` - Active
- `C` - Completed
- `P` - Pending

### 6. Get Todos by Assignee
**GET** `/todos/assignee/:userId`

Retrieves all todos assigned to a specific user.

**Parameters:**
- `userId` (number): The user ID

### 7. Get Todos by Assigner
**GET** `/todos/assigner/:userId`

Retrieves all todos assigned by a specific user.

**Parameters:**
- `userId` (number): The user ID

### 8. Get Todos by Bucket
**GET** `/todos/bucket/:bucketId`

Retrieves all todos in a specific bucket.

**Parameters:**
- `bucketId` (number): The bucket ID

### 9. Delete Todo
**DELETE** `/todos/:id`

Deletes a todo item.

**Parameters:**
- `id` (number): The todo ID

### 10. Upload File
**POST** `/todos/upload`

Uploads a file for a todo item.

**Content-Type:** `multipart/form-data`

**Request Body:**
- `file` (file): The file to upload

**Response:**
```json
{
  "success": true,
  "filePath": "/uploads/file-1234567890.pdf"
}
```

## Data Models

### Todo Entity
```typescript
interface Todo {
  ToDoId: number;
  BucketID?: number;
  AssignTo?: number;
  AssgnBy?: number;
  NotificationTo?: string;
  DueDateTime?: Date;
  Priority?: 'H' | 'M' | 'L';
  StatusType?: 'A' | 'C' | 'P';
  FilePath?: string;
  Title: string;
  Description?: string;
  CID?: number;
  created: Date;
  updated: Date;
  CreatedBy?: number;
  UpdatedBy?: number;
}
```

### Create Todo DTO
```typescript
interface CreateTodoDto {
  Title: string;           // Required
  Description?: string;
  Priority?: 'H' | 'M' | 'L';
  StatusType?: 'A' | 'C' | 'P';
  BucketID?: number;
  AssignTo?: number;
  AssgnBy?: number;
  DueDateTime?: string;
  NotificationTo?: string;
  FilePath?: string;
  CID?: number;
}
```

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["Title should not be empty"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "ToDo with ID 999 not found",
  "error": "Not Found"
}
```

## Testing the API

### Using the Test Script
Run the provided test script to verify all endpoints:

```bash
cd HRMS-Vraj_4503/hrms-backend
node test-todo-api.js
```

### Using Swagger UI
Access the interactive API documentation at:
```
http://localhost:5000/api-docs
```

### Using cURL Examples

1. **Create a todo:**
```bash
curl -X POST http://localhost:5000/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "Title": "Test Todo",
    "Description": "Test description",
    "Priority": "M",
    "StatusType": "A"
  }'
```

2. **Get all todos:**
```bash
curl -X GET http://localhost:5000/todos \
  -H "Authorization: Bearer <your-token>"
```

3. **Update todo status:**
```bash
curl -X PUT http://localhost:5000/todos/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{"status": "C"}'
```

## Notes

- All timestamps are in ISO 8601 format
- User authentication is required for most endpoints
- File uploads are stored in the `./uploads` directory
- The API automatically sets `CreatedBy` and `UpdatedBy` based on the authenticated user
- Priority defaults to 'M' (Medium) if not specified
- Status defaults to 'A' (Active) if not specified 