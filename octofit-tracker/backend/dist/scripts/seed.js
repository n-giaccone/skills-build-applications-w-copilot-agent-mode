"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seeding the octofit_db database with test data...\n');
        // Clear existing collections
        await Promise.all([
            User_1.User.deleteMany({}),
            Team_1.Team.deleteMany({}),
            Activity_1.Activity.deleteMany({}),
            Leaderboard_1.Leaderboard.deleteMany({}),
            Workout_1.Workout.deleteMany({}),
        ]);
        // Create users
        const users = await User_1.User.insertMany([
            { username: 'alice', email: 'alice@octofit.com', password: 'secure123' },
            { username: 'bob', email: 'bob@octofit.com', password: 'secure123' },
            { username: 'charlie', email: 'charlie@octofit.com', password: 'secure123' },
            { username: 'diana', email: 'diana@octofit.com', password: 'secure123' },
            { username: 'eve', email: 'eve@octofit.com', password: 'secure123' },
        ]);
        console.log(`✓ Created ${users.length} users`);
        // Create teams
        const teams = await Team_1.Team.insertMany([
            { name: 'Morning Runners', description: 'Early bird fitness enthusiasts', members: [users[0]._id, users[1]._id] },
            { name: 'Cycle Crew', description: 'Cycling and outdoor adventures', members: [users[2]._id, users[3]._id] },
            { name: 'Gym Rats', description: 'Strength training and bodybuilding', members: [users[4]._id] },
        ]);
        console.log(`✓ Created ${teams.length} teams`);
        // Create activities
        const activities = await Activity_1.Activity.insertMany([
            { userId: users[0]._id, type: 'running', duration: 45, distance: 7.2, date: new Date() },
            { userId: users[0]._id, type: 'running', duration: 30, distance: 5.1, date: new Date(Date.now() - 86400000) },
            { userId: users[1]._id, type: 'cycling', duration: 60, distance: 20.5, date: new Date() },
            { userId: users[2]._id, type: 'gym', duration: 90, distance: 0, date: new Date() },
            { userId: users[3]._id, type: 'swimming', duration: 50, distance: 2.0, date: new Date() },
            { userId: users[4]._id, type: 'walking', duration: 30, distance: 2.5, date: new Date() },
            { userId: users[0]._id, type: 'running', duration: 40, distance: 6.8, date: new Date(Date.now() - 172800000) },
        ]);
        console.log(`✓ Created ${activities.length} activities`);
        // Create leaderboard entries
        const leaderboard = await Leaderboard_1.Leaderboard.insertMany([
            { userId: users[0]._id, teamId: teams[0]._id, rank: 1, totalActivities: 3, totalDuration: 115, totalDistance: 19.1 },
            { userId: users[1]._id, teamId: teams[0]._id, rank: 2, totalActivities: 1, totalDuration: 60, totalDistance: 20.5 },
            { userId: users[2]._id, teamId: teams[1]._id, rank: 3, totalActivities: 1, totalDuration: 90, totalDistance: 0 },
            { userId: users[3]._id, teamId: teams[1]._id, rank: 4, totalActivities: 1, totalDuration: 50, totalDistance: 2.0 },
            { userId: users[4]._id, teamId: teams[2]._id, rank: 5, totalActivities: 1, totalDuration: 30, totalDistance: 2.5 },
        ]);
        console.log(`✓ Created ${leaderboard.length} leaderboard entries`);
        // Create workouts
        const workouts = await Workout_1.Workout.insertMany([
            { name: 'Morning Run', type: 'cardio', duration: 45, difficulty: 'intermediate', description: 'Energizing morning jog through the park' },
            { name: 'HIIT Training', type: 'cardio', duration: 30, difficulty: 'advanced', description: 'High-intensity interval training' },
            { name: 'Strength Builder', type: 'strength', duration: 60, difficulty: 'intermediate', description: 'Full body strength training' },
            { name: 'Yoga Flow', type: 'flexibility', duration: 50, difficulty: 'beginner', description: 'Relaxing yoga and stretching routine' },
            { name: 'Core Workout', type: 'strength', duration: 30, difficulty: 'beginner', description: 'Core strengthening exercises' },
        ]);
        console.log(`✓ Created ${workouts.length} workouts`);
        console.log('\n✓ Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
