import { Router, Request, Response } from 'express';
import { User } from '../models/User';

const router = Router();

/**
 * GET /api/users/
 * Retrieve all users
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json({ message: 'GET all users', users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

/**
 * GET /api/users/:id
 * Retrieve a specific user by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: `GET user ${id}`, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

/**
 * POST /api/users/
 * Create a new user
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User created', user: { username, email, _id: user._id } });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

/**
 * PUT /api/users/:id
 * Update a user by ID
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: `User ${id} updated`, user });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

/**
 * DELETE /api/users/:id
 * Delete a user by ID
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: `User ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
