import { Router } from 'express';
import { userController } from '../controller/index.js';

const router = Router();

// CRUD routes
router.post('/', userController.createUser);           // Create user
router.get('/', userController.getAllUsers);           // Get all users
router.get('/:id', userController.getUserById);        // Get user by ID
router.put('/:id', userController.updateUser);         // Update user
router.delete('/:id', userController.deleteUser);      // Delete user

export default router;