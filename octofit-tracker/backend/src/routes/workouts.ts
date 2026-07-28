import { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

/**
 * GET /api/workouts/
 * Retrieve all workout suggestions
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json({ message: 'GET all workouts', workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve workouts' });
  }
});

/**
 * GET /api/workouts/:id
 * Retrieve a specific workout by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: `GET workout ${id}`, workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve workout' });
  }
});

/**
 * POST /api/workouts/
 * Create a new workout suggestion
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, type, duration, difficulty, description } = req.body;
    const workout = new Workout({ name, type, duration, difficulty, description });
    await workout.save();
    res.status(201).json({ message: 'Workout created', workout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

/**
 * POST /api/workouts/suggest/:userId
 * Get personalized workout suggestions for a user
 */
router.post('/suggest/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const workouts = await Workout.find().limit(3);
    res.json({ 
      message: `Personalized workouts for user ${userId}`, 
      suggestions: workouts 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate workout suggestions' });
  }
});

/**
 * PUT /api/workouts/:id
 * Update a workout by ID
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: `Workout ${id} updated`, workout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout' });
  }
});

/**
 * DELETE /api/workouts/:id
 * Delete a workout by ID
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: `Workout ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
