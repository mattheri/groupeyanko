import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import QuoteProductController from "../components/QuoteProduct/QuoteProductController";
import { QuoteForm } from "../components/QuoteForm/organism/QuoteForm";
import NoItemsInCart from "../components/NoItemsInCart/NoItemsInCart";
import useCart from "components/Hooks/useCart";
import { useAuth } from "components/Hooks/useAuth";
import { AxiosResponse } from "axios";
import { Quotes } from "services/domain/Quote";
import ApiService from "services/ApiService";

export default function Quote() {
  const { userId } = useAuth();

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
      <QuoteProductController />
      {cart && Object.keys(cart).length > 0 ? (
        <QuoteForm cart={cart} onQuoteSent={onQuoteSent} />
      ) : (
        <NoItemsInCart />
      )}
    </Container>
  );
}
