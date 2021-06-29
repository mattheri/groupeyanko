import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from 'services/User/UserService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.id) {
    const customer = await UserService.findUserBy.id(req.body.id);
    return res.send(JSON.stringify(customer));
  }

  const customer = await UserService.findUserBy.email(req.body.email);

  return res.send(JSON.stringify(customer));
}