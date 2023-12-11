// models/user.ts
import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  books: string[]; // Assuming book references are stored as strings
  resetToken?: string;
  resetTokenExpiration?: Date | number; // Allow both Date and number (timestamp)
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: [{
    type: String,
    ref: 'Book',
  }],
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Schema.Types.Mixed, // Allow both Date and number (timestamp)
    get: (timestamp: number) => new Date(timestamp), // Custom getter for conversion
  },
}, { timestamps: true });

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>('User', userSchema);

export default UserModel;
