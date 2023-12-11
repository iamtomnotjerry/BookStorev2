// pages/api/auth/profile.ts
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
      res.status(200).json({ user: session.user });
    } else {
      // User is not authenticated
      res.status(401).json({ error: 'User not authenticated' });
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
