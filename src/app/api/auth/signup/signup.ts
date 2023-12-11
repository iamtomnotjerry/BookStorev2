// pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { signIn } from 'next-auth/react';
import UserModel from '../../../models/user';
import { connectMongoDB } from '../../../lib/mongodb-connection-module';

interface SignUpRequestBody {
  name: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body as SignUpRequestBody;

    try {
      // Connect to MongoDB
      await connectMongoDB();

      // Check if user with the same email already exists
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        res.status(400).json({ error: 'User with this email already exists' });
        return;
      }

      // Hash the password before saving it
      const hashedPassword = await hash(password, 10);

      // Create a new user
      const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        // Include any other user data you want to store
      });

      // Sign in the user after successful registration
      await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      res.status(200).json({ success: true, user: newUser });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Method not allowed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
