# Octofit Tracker Backend

Node.js Express server providing the API tier for the Octofit Tracker multi-tier application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env` or `.env.local`:
   ```
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/octofit_db
   CODESPACE_NAME=your-codespace-name
   ```

3. Ensure MongoDB is running:
   ```bash
   mongod
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

## API Endpoints

- `GET /api/users/` - Fetch all users
- `POST /api/users/` - Create a new user
- `GET /api/teams/` - Fetch all teams
- `POST /api/teams/` - Create a new team
- `GET /api/activities/` - Fetch all activities
- `POST /api/activities/` - Create a new activity
- `GET /api/leaderboard/` - Fetch leaderboard
- `GET /api/workouts/` - Fetch all workouts
- `POST /api/workouts/` - Create a new workout

## Codespaces Support

The backend automatically detects the Codespaces environment and constructs the appropriate API URL:

- **In Codespaces**: `https://${CODESPACE_NAME}-8000.app.github.dev`
- **Local development**: `http://localhost:8000`

The frontend's `VITE_CODESPACE_NAME` environment variable must match the backend's `CODESPACE_NAME` for proper API communication.

## Database

MongoDB connection is established in `src/config/database.ts`. Models are defined in `src/models/`.
