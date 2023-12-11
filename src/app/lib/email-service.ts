import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // Configure your email provider's SMTP settings here
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (to: string, resetLink: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset Request',
    html: `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};
