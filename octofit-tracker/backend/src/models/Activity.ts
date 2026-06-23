import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string; // 'run', 'cycle', 'swim', etc.
  distance?: number; // in km
  duration?: number; // in minutes
  calories?: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    distance: { type: Number },
    duration: { type: Number },
    calories: { type: Number },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
