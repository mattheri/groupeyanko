import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from 'services/User/UserService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, oldPassword, newPassword } = req.body;
  const response = await UserService.updatePassword(email, oldPassword, newPassword);

  res.send(JSON.stringify(response));
}