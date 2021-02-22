import type { NextApiRequest, NextApiResponse } from "next";
import Firebase from "../../utils/Firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValidated = emailRegex.test(req.body.email) && req.body.email;

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

    const { db } = Firebase.firestore();
    const { signup } = Firebase.auth();
    const userDB = db.collection("users");

    try {
      const user = (await signup(email, password)).user;

      const userData = await userDB.add({
        address: address,
        city: city,
        company: company,
        email: user.email,
        firstname: firstname,
        lastname: lastname,
        phoneNumber: phoneNumber,
        picture: user.photoURL,
        postalCode: postalCode,
        province: province,
        wooId: 0,
      });

      return res.send(
        JSON.stringify({
          email: user.email,
          name: user.displayName,
          picture: user.photoURL,
          isVerified: user.emailVerified,
          additionalUserInformation: (await userData.get()).data(),
        })
      );
    } catch (e) {
      res
        .status(404)
        .send(JSON.stringify({ code: e.code, message: e.message }));
    }
  }
};
