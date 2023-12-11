// Check whether a user is currently authenticated. Return a response indicating the authentication status.
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    if (session) {
      // User is authenticated
      res.status(200).json({ isAuthenticated: true, user: session.user });
    } else {
      // User is not authenticated
      res.status(200).json({ isAuthenticated: false, user: null });
    }
  } catch (error) {
    console.error('Error checking authentication status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}