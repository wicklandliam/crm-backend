# CRM Backend API Documentation

Base URL: `http://localhost:3000/api`

## Health & Testing

### Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running",
  "timestamp": "2025-10-05T12:34:56.789Z"
}
```

### Test Supabase Connection
```
GET /supabase/test
```

**Response:**
```json
{
  "status": "connected",
  "message": "Supabase connection successful",
  "authenticated": false
}
```

## Jobs

### Get All Jobs
```
GET /jobs
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "client_name": "John Doe",
      "email": "john@example.com",
      "phone": "555-1234",
      "status": "pending",
      "description": "Website redesign project",
      "created_at": "2025-10-05T12:00:00.000Z",
      "updated_at": "2025-10-05T12:00:00.000Z"
    }
  ]
}
```

### Get Job by ID
```
GET /jobs/:id
```

**Parameters:**
- `id` (URL parameter) - Job UUID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "client_name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "status": "pending",
    "description": "Website redesign project",
    "created_at": "2025-10-05T12:00:00.000Z",
    "updated_at": "2025-10-05T12:00:00.000Z"
  }
}
```

### Create Job
```
POST /jobs
```

**Request Body:**
```json
{
  "client_name": "John Doe",       // Required
  "email": "john@example.com",     // Optional
  "phone": "555-1234",             // Optional
  "status": "pending",             // Optional (default: "pending")
  "description": "Website redesign project"  // Optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "client_name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "status": "pending",
    "description": "Website redesign project",
    "created_at": "2025-10-05T12:00:00.000Z",
    "updated_at": "2025-10-05T12:00:00.000Z"
  }
}
```

### Update Job
```
PUT /jobs/:id
```

**Parameters:**
- `id` (URL parameter) - Job UUID

**Request Body:**
```json
{
  "client_name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "555-5678",
  "status": "in_progress",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "client_name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "555-5678",
    "status": "in_progress",
    "description": "Updated description",
    "created_at": "2025-10-05T12:00:00.000Z",
    "updated_at": "2025-10-05T13:00:00.000Z"
  }
}
```

### Delete Job
```
DELETE /jobs/:id
```

**Parameters:**
- `id` (URL parameter) - Job UUID

**Response:**
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

## Error Responses

All endpoints may return error responses in this format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created (for POST requests)
- `500` - Server error

## Notes

- All timestamps are in ISO 8601 format
- Job IDs are UUIDs
- The `status` field can be any string, but common values are: `pending`, `in_progress`, `completed`, `cancelled`
