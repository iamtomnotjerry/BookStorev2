// pages/api/auth/reset-password/request.ts
import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../../../../models/user';
import { connectMongoDB } from '../../../../lib/mongodb-connection-module';
import { sendPasswordResetEmail } from '../../../../lib/email-service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      // Connect to MongoDB
      await connectMongoDB();

      // Check if user with the given email exists
      const user = await UserModel.findOne({ email });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Generate a unique token (you may use a library like uuid)
      const resetToken = 'generated-reset-token';

      // Save the token and expiration time in the user document
      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
      await user.save();

      // Send a password reset email with the token link
      const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken}`;
      await sendPasswordResetEmail(user.email, resetLink);

      res.status(200).json({ success: true, message: 'Password reset email sent' });
    } catch (error) {
      console.error('Error during password reset request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Method not allowed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
