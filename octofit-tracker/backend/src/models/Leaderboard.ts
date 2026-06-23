import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  score: number;
  rank: number;
  totalDistance?: number;
  totalActivities?: number;
  updatedAt: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    totalDistance: { type: Number, default: 0 },
    totalActivities: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
