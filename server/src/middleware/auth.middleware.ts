import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import User from '../models/user.model';

// Define the user type for our request object
interface AuthUser {
  _id: Types.ObjectId;
  isAdmin: boolean;
}

// Extend the Express Request type
declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthUser;
  }
}

// JWT payload interface
interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

// Protect routes
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // Get token from header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      // Get token from header
      token = authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as JwtPayload;

      // Get user from the token
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Set user on request object with type assertion
      const authUser: AuthUser = {
        _id: user._id,
        isAdmin: Boolean(user.isAdmin)
      };
      (req as any).user = authUser;

      return next();
    } catch (error) {
      console.error('Authentication error:', error);
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: 'Token expired' });
      }
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};

// Admin middleware
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};
