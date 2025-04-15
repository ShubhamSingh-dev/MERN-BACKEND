# Authentication Logger Mini-Project

## Project Overview
This project implements a secure logger system that differentiates between private and public file access. The system ensures that private routes are only accessible when authenticated, while public routes remain available to all users.

## Project Structure

### Routes Architecture
```
routes/
├── private.routes.js   - Protected routes (require authentication)
└── public.routes.js    - Open access routes
```

### Route Endpoints

#### Public Routes (`/public`)
1. `GET /` - Home page (accessible to all)
2. `POST /generate-token` - Generates authentication token

#### Private Routes (`/private`)
1. `GET /dashboard` - Protected dashboard (requires valid token)

## Key Implementation Details

### ES Modules Configuration
Since we're using ES Modules (not CommonJS), special handling is required for `__filename` and `__dirname`:

```javascript
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

### Middleware Implementation

#### 1. Built-in Middleware
```javascript
app.use(express.json());  // Parses incoming JSON requests
```

#### 2. Custom Global Middleware (`log.middleware.js`)
- Logs all incoming requests to `logs/requests.log`
- Tracks:
  - Timestamp
  - HTTP method
  - Request URL
  - Additional metadata

#### 3. Authentication Middleware (`auth.middleware.js`)
```javascript
import { validateToken } from "../utils/token-utils.js";

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if(token && validateToken(token)) {
        req.user = { name: "Suraj", id: 1 };  // Attach user to request
        next();
    } else {
        res.status(401).send("Unauthorized: invalid or missing token");
    }
}

export default authMiddleware;
```

### Token Utilities (`token-utils.js`)
```javascript
import crypto from "crypto";

// Generates a 32-character hexadecimal token
export const generateToken = () => {
    return crypto.randomBytes(16).toString("hex");
}

// Validates token structure (must be 32 chars)
export const validateToken = (token) => {
    return token.length === 32;
}
```

### Server Configuration (`server.js`)
```javascript
import express from "express";
import publicRoutes from "./routes/public.routes.js";
import privateRoutes from "./routes/private.routes.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import logMiddleware from "./middleware/log.middleware.js";

const app = express();
const PORT = 8080;

// Create logs directory if it doesn't exist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if(!fs.existsSync(path.join(__dirname, "logs"))) {
    fs.mkdirSync(path.join(__dirname, "logs"));
}

// Middleware setup
app.use(express.json());
app.use(logMiddleware);

// Route handlers
app.use("/public", publicRoutes);
app.use("/private", privateRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

## Development Tools

### Thunder Client Configuration
- Create a collection to manage all endpoints:
  1. `POST /public/generate-token`
  2. `GET /public/`
  3. `GET /private/dashboard` (requires Authorization header)

## Security Considerations
1. Token Generation:
   - Uses Node.js `crypto` module for secure random token generation
   - Tokens are 32-character hexadecimal strings

2. Validation:
   - Simple length validation (could be enhanced with JWT or other mechanisms)
   - Tokens must be passed in the `Authorization` header

3. Logging:
   - All requests are logged for security auditing
   - Logs are stored in a dedicated `logs/` directory

## Potential Enhancements
1. Implement proper user database
2. Add token expiration
3. Implement refresh tokens
4. Enhance logging with more request details
5. Add rate limiting
6. Implement proper error handling
