import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controller/userController.js';

const router = Router();

// CRUD routes
router.post('/', createUser);           // Create user
router.get('/', getAllUsers);           // Get all users
router.get('/:id', getUserById);        // Get user by ID
router.put('/:id', updateUser);         // Update user
router.delete('/:id', deleteUser);      // Delete user

export default router;