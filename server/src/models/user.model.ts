import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  photoURL?: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the User schema
const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false, // Don't return password by default
    },
    photoURL: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);
export default User;
