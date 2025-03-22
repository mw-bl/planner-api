import express from 'express';
import { signUp, login, listUsers } from '../controllers/authController.js';
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router.get('/users', authenticateToken, authorizeRole('organizador'), listUsers);

export default router;
