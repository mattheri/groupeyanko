import type { NextApiRequest, NextApiResponse } from "next";
import { GET } from "../../utils/utils";
import { LocalLogin } from "../../utils/logins";
import { db } from "../../utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValidated = emailRegex.test(req.body.email) && req.body.email;

  if (emailValidated) {
    const { email, password } = req.body;
    const isPreviousCustomer = await (
      await GET(`customers?email=${req.body.email}`)
    ).data;
    const login = new LocalLogin();
    const userDB = db().collection("users");

    try {
      let user = (await login.login(email, password)).user;

      if (isPreviousCustomer.length && !user) {
        user = (await login.signup(email, password)).user;

        try {
          const {
            id,
            first_name,
            last_name,
            billing: {
              company,
              address_1,
              address_2,
              city,
              postcode,
              state,
              phone,
            },
            avatar_url,
          } = isPreviousCustomer[0];

          const userData = await userDB.add({
            address: address_1
              ? address_1
              : "" + " " + address_2
              ? address_2
              : "",
            city: city ? city : "",
            phoneNumber: phone ? phone : "",
            company: company ? company : "",
            email: user.email,
            firstname: first_name ? first_name : "",
            lastname: last_name ? last_name : "",
            picture: avatar_url ? avatar_url : "",
            postalCode: postcode ? postcode : "",
            province: state ? state : "",
            wooId: id ? id : "",
          });

          res.send(
            JSON.stringify({
              email: user.email,
              name: user.displayName,
              picture: user.photoURL,
              isVerified: user.emailVerified,
              additionalUserInformation: (await userData.get()).data(),
            })
          );
        } catch (e) {
          console.log({
            code: e.code,
            message: e.message,
          });
          return res.status(404).send(JSON.stringify({ code: e.code }));
        }
      } else {
        try {
          const additionalUserInformation = (
            await userDB.where("email", "==", `${user.email}`).get()
          ).docs.map((doc) => doc.data())[0];
          res.send(
            JSON.stringify({
              email: user.email,
              name: user.displayName,
              picture: user.photoURL || "none",
              isVerified: user.emailVerified,
              additionalUserInformation,
            })
          );
        } catch (e) {
          console.log({
            code: e.code,
            message: e.message,
          });

          return res.status(404).send(JSON.stringify({ code: e.code }));
        }
      }
    } catch (e) {
      console.log({
        code: e.code,
        message: e.message,
      });
      return res.status(404).send(JSON.stringify({ code: e.code }));
    }
  }
};
