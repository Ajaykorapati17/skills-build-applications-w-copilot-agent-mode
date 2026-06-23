import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    weight?: number;
  }>;
  difficulty: string; // 'beginner', 'intermediate', 'advanced'
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
        weight: { type: Number },
      },
    ],
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
