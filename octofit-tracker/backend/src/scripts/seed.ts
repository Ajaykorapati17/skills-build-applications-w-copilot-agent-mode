import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

/**
 * Seed the octofit_db database with test data
 */

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const users = await User.insertMany([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'hashed_password_1', // In production, use proper hashing
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: 'hashed_password_2',
      },
      {
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        password: 'hashed_password_3',
      },
      {
        name: 'Diana Prince',
        email: 'diana@example.com',
        password: 'hashed_password_4',
      },
      {
        name: 'Eve Wilson',
        email: 'eve@example.com',
        password: 'hashed_password_5',
      },
    ]);
    console.log(`Created ${users.length} users`);

    // Create teams
    const teams = await Team.insertMany([
      {
        name: 'Team Rocket',
        description: 'The best fitness team in town',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id, users[2]._id],
      },
      {
        name: 'Fitness Champions',
        description: 'Always pushing limits',
        leader: users[3]._id,
        members: [users[3]._id, users[4]._id],
      },
    ]);
    console.log(`Created ${teams.length} teams`);

    // Create activities
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'run',
        distance: 5.2,
        duration: 30,
        calories: 450,
        date: new Date('2024-06-20'),
      },
      {
        userId: users[0]._id,
        type: 'cycle',
        distance: 15.3,
        duration: 45,
        calories: 600,
        date: new Date('2024-06-21'),
      },
      {
        userId: users[1]._id,
        type: 'swim',
        distance: 2.0,
        duration: 40,
        calories: 500,
        date: new Date('2024-06-20'),
      },
      {
        userId: users[1]._id,
        type: 'run',
        distance: 8.5,
        duration: 50,
        calories: 750,
        date: new Date('2024-06-22'),
      },
      {
        userId: users[2]._id,
        type: 'cycle',
        distance: 20.0,
        duration: 60,
        calories: 800,
        date: new Date('2024-06-21'),
      },
      {
        userId: users[3]._id,
        type: 'run',
        distance: 10.0,
        duration: 55,
        calories: 900,
        date: new Date('2024-06-22'),
      },
      {
        userId: users[4]._id,
        type: 'swim',
        distance: 3.5,
        duration: 50,
        calories: 700,
        date: new Date('2024-06-20'),
      },
    ]);
    console.log(`Created ${activities.length} activities`);

    // Create leaderboard entries
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        score: 1500,
        rank: 1,
        totalDistance: 20.5,
        totalActivities: 2,
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        score: 1250,
        rank: 2,
        totalDistance: 10.5,
        totalActivities: 2,
      },
      {
        userId: users[2]._id,
        teamId: teams[0]._id,
        score: 800,
        rank: 3,
        totalDistance: 20.0,
        totalActivities: 1,
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        score: 900,
        rank: 4,
        totalDistance: 10.0,
        totalActivities: 1,
      },
      {
        userId: users[4]._id,
        teamId: teams[1]._id,
        score: 700,
        rank: 5,
        totalDistance: 3.5,
        totalActivities: 1,
      },
    ]);
    console.log(`Created ${leaderboardEntries.length} leaderboard entries`);

    // Create workouts
    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        name: 'Morning Routine',
        description: 'Quick morning stretching and cardio',
        exercises: [
          { name: 'Jumping Jacks', sets: 3, reps: 20 },
          { name: 'Push-ups', sets: 3, reps: 15 },
          { name: 'Squats', sets: 3, reps: 20 },
        ],
        difficulty: 'beginner',
      },
      {
        userId: users[1]._id,
        name: 'Full Body Strength',
        description: 'Complete strength training workout',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, weight: 80 },
          { name: 'Deadlift', sets: 3, reps: 5, weight: 120 },
          { name: 'Squat', sets: 4, reps: 8, weight: 100 },
          { name: 'Barbell Row', sets: 4, reps: 8, weight: 90 },
        ],
        difficulty: 'advanced',
      },
      {
        userId: users[2]._id,
        name: 'Core Blast',
        description: 'Targeted core strengthening exercises',
        exercises: [
          { name: 'Planks', sets: 3, reps: 1, weight: 60 }, // time in seconds
          { name: 'Russian Twists', sets: 3, reps: 20 },
          { name: 'Leg Raises', sets: 3, reps: 15 },
        ],
        difficulty: 'intermediate',
      },
      {
        userId: users[3]._id,
        name: 'Cardio Burst',
        description: 'High-intensity interval training',
        exercises: [
          { name: 'Burpees', sets: 3, reps: 10 },
          { name: 'Mountain Climbers', sets: 3, reps: 20 },
          { name: 'High Knees', sets: 3, reps: 30 },
        ],
        difficulty: 'intermediate',
      },
      {
        userId: users[4]._id,
        name: 'Beginner Yoga',
        description: 'Relaxing yoga routine for flexibility',
        exercises: [
          { name: 'Child Pose', sets: 1, reps: 1 },
          { name: 'Cat Cow Stretch', sets: 2, reps: 10 },
          { name: 'Downward Dog', sets: 2, reps: 1 },
        ],
        difficulty: 'beginner',
      },
    ]);
    console.log(`Created ${workouts.length} workouts`);

    console.log('✓ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
