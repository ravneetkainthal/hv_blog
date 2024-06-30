import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { signOut } from 'next-auth/react';

const handleLogout: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await signOut({ redirect: false, callbackUrl: '/' });
    res.status(200).end();
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).end();
  }
};

export default handleLogout;

