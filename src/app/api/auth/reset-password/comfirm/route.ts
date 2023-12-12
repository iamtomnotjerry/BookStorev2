// pages/api/auth/reset-password/confirm.ts
import { NextResponse } from 'next/server';
import UserModel from '../../../../models/user';
import { hash } from 'bcryptjs';

export async function POST(req: any) {
  
  
  try {
    const { resetToken, newPassword } = await req.json();
    // Find the user by reset token
    const user = await UserModel.findOne({
      resetToken,
      resetTokenExpiration: { $gt: new Date().getTime() }, // Convert to timestamp
    });;

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 10);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    // Save the updated user
    await user.save();

    return NextResponse.json({ success: true, message: 'Password reset successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during password reset confirmation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
