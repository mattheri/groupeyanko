import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from 'services/User/UserService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, informations } = req.body;
  const customer = UserService.modifyUser(informations, id);

  return res.send(JSON.stringify(customer));
}