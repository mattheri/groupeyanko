import type { NextApiRequest, NextApiResponse } from "next";
import UserService from "services/User/UserService";
import regex from "utils/regex";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const emailValidated = regex.email.test(req.body.email) && req.body.email;

  if (emailValidated) {
    const {
      email,
      password,
      firstname,
      lastname,
      company,
      phoneNumber,
      address,
      province,
      city,
      postalCode,
    } = req.body;

    try {
      const user = await UserService.signupUserAndAddToDatabse(
        email,
        password,
        {
          firstname,
          lastname,
          company,
          phoneNumber,
          address,
          province,
          city,
          postalCode,
        }
      );

      return res.send(JSON.stringify(user));
    } catch (e) {
      res
        .status(404)
        .send(JSON.stringify({ code: e.code, message: e.message }));
    }
  }
};
