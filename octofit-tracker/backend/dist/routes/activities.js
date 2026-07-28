"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
/**
 * GET /api/activities/
 * Retrieve all activities
 */
router.get('/', async (_req, res) => {
    try {
        const activities = await Activity_1.Activity.find().populate('userId', 'username email');
        res.json({ message: 'GET all activities', activities });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve activities' });
    }
});
/**
 * GET /api/activities/:id
 * Retrieve a specific activity by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.Activity.findById(id).populate('userId', 'username email');
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: `GET activity ${id}`, activity });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve activity' });
    }
});
/**
 * POST /api/activities/
 * Log a new activity
 */
router.post('/', async (req, res) => {
    try {
        const { userId, type, duration, distance } = req.body;
        const activity = new Activity_1.Activity({ userId, type, duration, distance });
        await activity.save();
        await activity.populate('userId', 'username email');
        res.status(201).json({ message: 'Activity logged', activity });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to log activity' });
    }
});
/**
 * PUT /api/activities/:id
 * Update an activity by ID
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.Activity.findByIdAndUpdate(id, req.body, { new: true }).populate('userId', 'username email');
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: `Activity ${id} updated`, activity });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update activity' });
    }
});
/**
 * DELETE /api/activities/:id
 * Delete an activity by ID
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.Activity.findByIdAndDelete(id);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ message: `Activity ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});
exports.default = router;
