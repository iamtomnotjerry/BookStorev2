// pages/api/auth/reset-password/request.ts
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid'; // Import the v4 function from the uuid library
import UserModel from '../../../../models/user';
import { sendPasswordResetEmail } from '../../../../lib/email-service';

export async function POST(req: any) {
  try {
    const { email } = await req.json();
    // Check if user with the given email exists
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate a unique token using uuid
    const resetToken = uuidv4();

    // Save the token and expiration time in the user document
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send a password reset email with the token link
    await sendPasswordResetEmail(user.email, user.resetToken);
    return NextResponse.json({ success: true, message: 'Password reset email sent' }, { status: 200 });
  } catch (error) {
    console.error('Error during password reset request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
