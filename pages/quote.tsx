import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { QuoteProduct } from "../components/QuoteProduct/QuoteProduct";
import { useBreadcrumbs } from "../components/Hooks/useBreadcrumbs";
import { QuoteForm } from "../components/QuoteForm/organism/QuoteForm";
import NoItemsInCart from "../components/NoItemsInCart/NoItemsInCart";
import useCart from "components/Hooks/useCart";
import { useAuth } from "components/Hooks/useAuth";
import { AxiosResponse } from "axios";
import { Quotes } from "services/domain/Quote";
import ApiService from "services/ApiService";

/**
 * Quote page component. Will show the items in the cart as well as prefill
 * the information in the form if the user is logged in and those information
 * have been previously filled.
 *
 * When the user sends the quote, an email is sent as confirmation to the user and the
 * cart is emptied.
 */
export default function Quote() {
  const { userId } = useAuth();
  const { setNavigationState } = useBreadcrumbs();
  React.useEffect(() => {
    setNavigationState(["Envoyer votre soumission", "/quote"]);
  }, []);

  const { cart, resetCart } = useCart();

  const onQuoteSent = async () => {
    const response:AxiosResponse<Quotes> = await ApiService.post({
      url: '/api/addQuote',
      data: {
        id: userId,
        quote: {
          products: cart,
        }
      }
    })
    if (response.status === 200) resetCart();
  }

  return (
    <Container className="p-2 pt-5">
      <Row>
        {cart && Object.entries(cart).map(([key, product]) => {
          return <QuoteProduct product={product} />;
        })}
      </Row>
      {cart && Object.keys(cart).length > 0 ? (
        <QuoteForm cart={cart} onQuoteSent={onQuoteSent} />
      ) : (
        <NoItemsInCart />
      )}
    </Container>
  );
}
