# Drone Survey Backend

This is the backend for the Drone Survey application. It is built using Node.js, Express, and MongoDB.

## Project Structure

backend/
│
├── .env                          # Environment variables (DB connection, JWT secret)
├── app.js                        # Main application file to set up routes, middleware, etc.
├── config/                       # Configuration files
│   └── db.js                     # Database connection and configuration (MongoDB)
│
├── controllers/                  # Logic for handling incoming requests
│   ├── authController.js         # Handles registration, login, and user authentication
│   ├── droneController.js        # Handles CRUD operations for drones
│   ├── flightController.js       # Handles flight logs and generation of PDF flight logs
│   └── missionController.js      # Handles CRUD operations for missions
│
├── middleware/                   # Middleware for authentication, etc.
│   └── authenticateToken.js      # JWT token authentication middleware
│
├── models/                       # Mongoose models for database schemas
│   ├── droneModel.js             # Schema for drone details
│   ├── flightModel.js            # Schema for flight logs
│   ├── missionModel.js           # Schema for mission details
│   └── userModel.js              # Schema for user details (authentication)
│
├── package.json                 # Node.js package descriptor (dependencies, scripts)
│
├── routes/                       # Route definitions for handling API requests
│   ├── authRoute.js              # Routes for user authentication (login, registration)
│   ├── dronesRoute.js            # Routes for CRUD operations on drones
│   ├── flightLogRoutes.js        # Routes for fetching flight logs, generating PDFs
│   └── missionRoute.js           # Routes for CRUD operations on missions
│
└── utils/                        # Utility functions (e.g., algorithms for waypoint generation)
    └── algorithm.js              # Algorithm for generating random points or other utility functions




## Setup

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the [backend] directory with the following content:
    ```
    DB_CONNECT=mongodb://localhost:27017/latandlongDB
    PORT=5000
    JWT_SECRET=your_jwt_secret_key
    ```

4. Start the server:
    ```sh
    npm run dev
    ```

## API Endpoints

### Authentication

- **Register a user**
    - `POST /user/register`
    - Body: `{ "name": "string", "email": "string", "password": "string" }`

- **Login a user**
    - `POST /user/login`
    - Body: `{ "email": "string", "password": "string" }`

- **Logout a user**
    - `POST /user/logout`
    - Headers: `{ "Authorization": "Bearer <token>" }`

- **Get current user details**
    - `GET /user/me`
    - Headers: `{ "Authorization": "Bearer <token>" }`

### Drones

- **Create a drone**
    - `POST /drone/create`
    - Headers: `{ "Authorization": "Bearer <token>" }`
    - Body: `{ "name": "string", "type": "string" }`

- **Get all drones**
    - `GET /drone/all`
    - Headers: `{ "Authorization": "Bearer <token>" }`

- **Get drones by user ID**
    - `GET /drone/drones/user`
    - Headers: `{ "Authorization": "Bearer <token>" }`

- **Delete a drone**
    - `DELETE /drone/drones/:droneId`
    - Headers: `{ "Authorization": "Bearer <token>" }`

### Missions

- **Create a mission**
    - `POST /mission/create`
    - Headers: `{ "Authorization": "Bearer <token>" }`
    - Body: `{ "name": "string", "lat": "number", "long": "number", "altitude": "number", "radius": "number", "speed": "number" }`

- **Get waypoints for a mission**
    - `GET /mission/waypoints/:missionId`

- **Get all missions for a user**
    - `GET /mission/userMissions`
    - Headers: `{ "Authorization": "Bearer <token>" }`

- **Delete a mission**
    - `DELETE /mission/delete/:missionId`
    - Headers: `{ "Authorization": "Bearer <token>" }`

### Flights

- **Log flight data**
    - `GET /flight/log`
    - Headers: `{ "Authorization": "Bearer <token>" }`

- **Download flight logs as PDF**
    - `GET /flight/logpdf`
    - Headers: `{ "Authorization": "Bearer <token>" }`

## Controllers

### Auth Controller

Handles user authentication, including registration, login, logout, and fetching user details.

### Drone Controller

Manages drone-related operations such as creating, fetching, and deleting drones.

### Flight Controller

Handles flight data logging and downloading flight logs as PDF.

### Mission Controller

Manages mission-related operations such as creating missions, fetching waypoints, and deleting missions.

## Models

### User Model

Defines the schema for user data, including fields for name, email, and password.

### Drone Model

Defines the schema for drone data, including fields for name, type, and user ID.

### Flight Model

Defines the schema for flight data, including fields for drone ID, mission ID, and flight logs.

### Mission Model

Defines the schema for mission data, including fields for name, latitude, longitude, altitude, radius, and speed.

## Utils

- **Algorithm functions**
    - `generateRandomPoints(centerLat, centerLng, radiusInKm, numPoints)`
    - `haversineDistance(lat1, lon1, lat2, lon2)`
    - `droneTime(lat1, lon1, lat2, lon2)`
    - `calculateTotalDistance(randomPoints)`

## License