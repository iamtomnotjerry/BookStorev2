// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth/next';
import CredentialProvider from 'next-auth/providers/credentials';
import { connectMongoDB } from '@/app/lib/mongodb-connection-module';
import bcrypt from 'bcryptjs';
import User from '@/app/models/user';

async function authorize(credentials) {
  const { email, password } = credentials;
  try {
    await connectMongoDB();
    const user = await User.findOne({ email });
    console.log('User:', user); // Debugging log

    if (!user) {
      return null;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    console.log('Passwords Match:', passwordsMatch); // Debugging log

    if (!passwordsMatch) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error for more information
  }
}

const authOptions = {
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {},
      authorize,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signin: '/signin',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
