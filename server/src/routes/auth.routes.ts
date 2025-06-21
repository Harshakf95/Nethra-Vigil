import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, getProfile, updateProfile } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
  ],
  register
);

// @route   POST /api/auth/login
// @desc    Auth user & get token
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  login
);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getProfile);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile',
  protect,
  [
    body('name', 'Name is required').optional().not().isEmpty(),
    body('email', 'Please include a valid email').optional().isEmail(),
  ],
  updateProfile
);

export default router;
