import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import database connection and models
import { connectDB } from './config/database';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Workout } from './models/Workout';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;

const apiUrl = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

const allowedOrigins = [apiUrl, `http://localhost:${PORT}`, 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  }
}));

// Health check endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Octofit Tracker API', apiUrl });
});

// ==================== Users API ====================
app.get('/api/users/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users/', async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// ==================== Teams API ====================
app.get('/api/teams/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('leader').populate('members');
    res.json({ teams });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

app.post('/api/teams/', async (req: Request, res: Response) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

// ==================== Activities API ====================
app.get('/api/activities/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

app.post('/api/activities/', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

// ==================== Leaderboard API ====================
app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('userId', 'name email')
      .sort({ rank: 1 });
    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// ==================== Workouts API ====================
app.get('/api/workouts/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId', 'name email');
    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

app.post('/api/workouts/', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

// Start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`\n🚀 Octofit Tracker Backend running at ${apiUrl}`);
      console.log(`\nAPI Endpoints:`);
      console.log(`  GET  /api/users/`);
      console.log(`  POST /api/users/`);
      console.log(`  GET  /api/teams/`);
      console.log(`  POST /api/teams/`);
      console.log(`  GET  /api/activities/`);
      console.log(`  POST /api/activities/`);
      console.log(`  GET  /api/leaderboard/`);
      console.log(`  GET  /api/workouts/`);
      console.log(`  POST /api/workouts/\n`);
    });
  } catch (error) {
    console.error('✗ Server startup error:', error);
    process.exit(1);
  }
};

startServer();
