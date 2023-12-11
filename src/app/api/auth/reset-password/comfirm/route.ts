// pages/api/auth/reset-password/confirm.ts
import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../../../../models/user';
import { compare, hash } from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { resetToken, newPassword } = req.body;

    try {
      // Find the user by reset token
      const user = await UserModel.findOne({
        resetToken,
        resetTokenExpiration: { $gt: new Date() }, // Ensure token is not expired
      });

      if (!user) {
        res.status(400).json({ error: 'Invalid or expired reset token' });
        return;
      }

      // Hash the new password
      const hashedPassword = await hash(newPassword, 10);

      // Update user's password and clear reset token fields
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;

      // Save the updated user
      await user.save();

      res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
      console.error('Error during password reset confirmation:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Method not allowed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
