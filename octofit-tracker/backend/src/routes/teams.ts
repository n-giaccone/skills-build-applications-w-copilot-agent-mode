import { Router, Request, Response } from 'express';
import { Team } from '../models/Team';

const router = Router();

/**
 * GET /api/teams/
 * Retrieve all teams
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members', 'username email');
    res.json({ message: 'GET all teams', teams });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve teams' });
  }
});

/**
 * GET /api/teams/:id
 * Retrieve a specific team by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate('members', 'username email');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: `GET team ${id}`, team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve team' });
  }
});

/**
 * POST /api/teams/
 * Create a new team
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const team = new Team({ name, description });
    await team.save();
    res.status(201).json({ message: 'Team created', team });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

/**
 * PUT /api/teams/:id
 * Update a team by ID
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndUpdate(id, req.body, { new: true }).populate('members', 'username email');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: `Team ${id} updated`, team });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update team' });
  }
});

/**
 * DELETE /api/teams/:id
 * Delete a team by ID
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: `Team ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
