import { Types } from 'mongoose';

declare global {
  namespace Express {
    // Extend the Express User interface
    interface User {
      _id: Types.ObjectId;
      isAdmin: boolean;
    }

    // Extend the Express Request interface
    interface Request {
      user?: User;
    }
  }
}

// This export is needed to make this file a module
export {};
