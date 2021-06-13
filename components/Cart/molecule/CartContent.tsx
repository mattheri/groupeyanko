import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CartItem } from "components/CartItem/atom/CartItem";
import { ReactNode } from "react";
import styles from "../cart.module.scss";
import { Button } from "components/Button/atom/Button";
import { Cart } from "components/Context/CartContext";

interface Props {
  items: { [x:string]:Cart }[];
  children?: ReactNode;
}

const DEFAULT_PLACEHOLDER_IMAGE = "/uploads/images/placeholder.png";

export function CartContent({ items, children }: Props) {
  return (
    <Container fluid className="px-0">
      {items && items.map((product) => (
        Object.entries(product).map(([id, product]) => (
          <Row key={product.id}>
            <CartItem
              product={product}
              id={product.id.toString()}
              name={product.name}
              number={product.number}
              image={
                product.image ? product.image : DEFAULT_PLACEHOLDER_IMAGE
              }
            />
          </Row>
        )
      )))}
      {children}
      <Row>
        <Col>
          <Button
            className={styles.submit}
            href="/quote"
            text="Voir votre soumission"
          />
        </Col>
      </Row>
    </Container>
  );
}
