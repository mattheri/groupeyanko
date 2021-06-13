import type { NextApiRequest, NextApiResponse } from "next";
import UserService from "services/User/UserService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValidated = emailRegex.test(req.body.email) && req.body.email;

  if (emailValidated) {
    try {
      const { email, password } = req.body;
      const user = await UserService.secretSignupAndDatabaseAdd(email, password);
      res.send(JSON.stringify(user));
    } catch (e) {
      console.log({
        code: e.code,
        message: e.message,
      });
      return res.status(404).send(JSON.stringify({ code: e.code }));
    }
  }
};
