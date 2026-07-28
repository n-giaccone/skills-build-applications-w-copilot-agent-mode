"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = require("../models/Team");
const router = (0, express_1.Router)();
/**
 * GET /api/teams/
 * Retrieve all teams
 */
router.get('/', async (_req, res) => {
    try {
        const teams = await Team_1.Team.find().populate('members', 'username email');
        res.json({ message: 'GET all teams', teams });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve teams' });
    }
});
/**
 * GET /api/teams/:id
 * Retrieve a specific team by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.Team.findById(id).populate('members', 'username email');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({ message: `GET team ${id}`, team });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve team' });
    }
});
/**
 * POST /api/teams/
 * Create a new team
 */
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        const team = new Team_1.Team({ name, description });
        await team.save();
        res.status(201).json({ message: 'Team created', team });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
/**
 * PUT /api/teams/:id
 * Update a team by ID
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.Team.findByIdAndUpdate(id, req.body, { new: true }).populate('members', 'username email');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({ message: `Team ${id} updated`, team });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
});
/**
 * DELETE /api/teams/:id
 * Delete a team by ID
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.Team.findByIdAndDelete(id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({ message: `Team ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
exports.default = router;
