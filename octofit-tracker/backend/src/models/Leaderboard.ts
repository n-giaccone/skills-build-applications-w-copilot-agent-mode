import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  rank: number;
  totalActivities: number;
  totalDuration: number;
  totalDistance: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    rank: { type: Number, required: true },
    totalActivities: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 },
    totalDistance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
