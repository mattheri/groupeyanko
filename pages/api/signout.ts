import type { NextApiRequest, NextApiResponse } from 'next';
import Firebase from 'utils/Firebase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  Firebase.auth.signout();

  return res.send(JSON.stringify(true));
}