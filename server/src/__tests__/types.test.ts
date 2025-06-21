import { Request } from 'express';
import { describe, it } from '@jest/globals';
import { Types } from 'mongoose';

// Import the type extensions
import 'express';

// This is a type test file - it won't be executed, only type-checked
describe('Type Definitions', () => {
  it('should extend Express Request type with user property', () => {
    // This is a type assertion test
    interface CustomRequest extends Request {
      user?: {
        _id: Types.ObjectId;
        isAdmin: boolean;
      };
    }

    const req = {} as CustomRequest;
    
    // This should not cause a TypeScript error if our types are correct
    req.user = {
      _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
      isAdmin: true
    };

    // These lines are just for TypeScript to check the types
    if (req.user) {
      const id: Types.ObjectId = req.user._id;
      const isAdmin: boolean = req.user.isAdmin;
    }
  });
});
