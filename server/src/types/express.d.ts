import { Request } from 'express';
import { describe, it, expect } from '@jest/globals';
import '../types/express'; // This imports the type augmentation

describe('Type Definitions', () => {
  it('should extend Express Request type with user property', () => {
    const req = {} as Request;
    
    // Now TypeScript should recognize the user property
    req.user = {
      _id: 'some-id', // or new Types.ObjectId() if you prefer
      isAdmin: true
    };

    expect(req.user).toBeDefined();
    expect(req.user?._id).toBeDefined();
    expect(req.user?.isAdmin).toBeDefined();
  });
});