// pages/api/auth/change-password.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { compare, hash } from 'bcryptjs';
import UserModel from '../../../models/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const session = await getSession({ req });

      if (!session || !session.user || !('id' in session.user)) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { currentPassword, newPassword } = req.body;

      // Find the user by session user ID
      const user = await UserModel.findById(session.user.id);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Verify the user's current password
      const isPasswordValid = await compare(currentPassword, user.password);

      if (!isPasswordValid) {
        res.status(400).json({ error: 'Current password is incorrect' });
        return;
      }

      // Hash the new password
      const hashedPassword = await hash(newPassword, 10);

      // Update user's password
      user.password = hashedPassword;

      // Save the updated user
      await user.save();

      res.status(200).json({ success: true, message: 'Password change successful' });
    } catch (error) {
      console.error('Error during password change:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Method not allowed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
