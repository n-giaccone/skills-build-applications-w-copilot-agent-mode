"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = require("../models/Leaderboard");
const router = (0, express_1.Router)();
/**
 * GET /api/leaderboard/
 * Retrieve the leaderboard (ranked users by activity)
 */
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find()
            .sort({ rank: 1 })
            .populate('userId', 'username email')
            .populate('teamId', 'name');
        res.json({ message: 'GET leaderboard', leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve leaderboard' });
    }
});
/**
 * GET /api/leaderboard/:teamId
 * Retrieve leaderboard for a specific team
 */
router.get('/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const leaderboard = await Leaderboard_1.Leaderboard.find({ teamId })
            .sort({ rank: 1 })
            .populate('userId', 'username email')
            .populate('teamId', 'name');
        res.json({ message: `GET leaderboard for team ${teamId}`, leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve team leaderboard' });
    }
});
/**
 * POST /api/leaderboard/refresh
 * Refresh leaderboard rankings
 */
router.post('/refresh', async (_req, res) => {
    try {
        res.json({ message: 'Leaderboard refreshed' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to refresh leaderboard' });
    }
});
exports.default = router;
