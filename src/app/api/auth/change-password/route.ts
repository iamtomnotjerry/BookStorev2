import { NextResponse } from 'next/server';
import { compare, hash } from 'bcryptjs';
import UserModel from '../../../models/user';
import bcrypt from 'bcryptjs';

export async function POST(req: any) {
  try {
    const { currentPassword, newPassword, userEmail } = await req.json();

    // Find the user by session user ID
    const user = await UserModel.findOne({ email: userEmail });

    // Verify the user's existence
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify the user's current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    return NextResponse.json({ success: true, message: 'Password change successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during password change:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
