import React from "react";
import {
  CartContext,
  CartContextTuple,
} from "../components/Context/CartContext";
import Container from "react-bootstrap/Container";
import { AppContext, AppContextTuple } from "../components/Context/AppContext";
import { FormData } from "../next-env";
import { SignupForm } from "../components/SignupForm/SignupForm";
import Row from "react-bootstrap/Row";
import { QuoteProduct } from "../components/QuoteProduct/QuoteProduct";
import { Button } from "../components/Button/Button";
import { sendEmail } from "../utils/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useBreadcrumbs } from "../components/Hooks/useBreadcrumbs";

/**
 * Quote page component. Will show the items in the cart as well as prefill
 * the information in the form if the user is logged in and those information
 * have been previously filled.
 *
 * When the user sends the quote, an email is sent as confirmation to the user and the
 * cart is emptied.
 */
export default function Quote() {
  const [cart, , , setCart]: CartContextTuple = React.useContext(CartContext);
  const [user, setUser]: AppContextTuple = React.useContext(AppContext);
  const [quoteMsg, setQuoteMsg] = React.useState("Envoyer la soumission");

  const { setNavigationState } = useBreadcrumbs();
  React.useEffect(() => {
    setNavigationState(["Envoyer votre soumission", "/quote"]);
  }, []);

  const [formData, setFormData] = React.useState<FormData>({
    firstname:
      (user.connected && user.user.additionalUserInformation.firstname) || "",
    lastname:
      (user.connected && user.user.additionalUserInformation.lastname) || "",
    email: (user.connected && user.user.additionalUserInformation.email) || "",
    company:
      (user.connected && user.user.additionalUserInformation.company) || "",
    phoneNumber:
      (user.connected && user.user.additionalUserInformation.phoneNumber) || "",
    address:
      (user.connected && user.user.additionalUserInformation.address) || "",
    province:
      (user.connected && user.user.additionalUserInformation.province) ||
      "Québec",
    city: (user.connected && user.user.additionalUserInformation.city) || "",
    postalCode:
      (user.connected && user.user.additionalUserInformation.postalCode) || "",
    message: "",
  });

  const [errors, setErrors] = React.useState<FormData>();
  const router = useRouter();

  const hasErrors = (fieldsToIgnore?: string[]) => {
    const condition = fieldsToIgnore
      ? Object.entries(formData)
          .filter(([key, value]) =>
            fieldsToIgnore.every((keys) => keys !== key)
          )
          .every(([key, value]) => {
            console.log(value);
            return value.length > 0 && errors
              ? errors[key].length === 0
              : false;
          })
      : Object.entries(formData).every(([key, value]) =>
          value.length > 0 && errors ? errors[key].length === 0 : false
        );

    if (condition) {
      return false;
    }

    return true;
  };

  const handleSendEmail = async () => {
    try {
      const status = await sendEmail(formData, cart.cart);

      if (status.status === 200) {
        setQuoteMsg("Soumission envoyée");
        setCart((cart) => Object.assign({}, cart, { cart: {} }));
        router.push("/quotesent");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className="p-2 pt-5">
      <Row>
        {Object.entries(cart.cart).map(([key, product]) => {
          return <QuoteProduct product={product} />;
        })}
      </Row>
      {Object.keys(cart.cart).length > 0 ? (
        <>
          <SignupForm
            anonymus
            returnErrors={setErrors}
            formData={formData}
            setFormData={setFormData}
          />
          <Button
            className="w-100"
            disabled={hasErrors(["province", "company", "message"])}
            onClick={handleSendEmail}
            text={quoteMsg}
          />
        </>
      ) : (
        <>
          <h1 className="text-center">
            Vous n'avez pas encore d'articles dans votre panier. Ajoutez des
            articles afin de pouvoir envoyer votre soumission.
          </h1>
          <Link href="/">
            <a className="text-center text-primary">
              <h1>Retour au catalogue</h1>
            </a>
          </Link>
        </>
      )}
    </Container>
  );
}
