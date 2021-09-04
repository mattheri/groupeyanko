import { Product } from "types";
import { Row, Col } from "react-bootstrap";
import AddToCart from "components/AddToCart/organism/AddToCartController";
import styles from "./productsection.module.scss";
import Carousel from "components/Carousel/organism/Carousel";
import ProductImage from "./atom/ProductImage";
import { FC } from "react";

interface Props {
  product:Product;
};

const DEFAULT_IMAGE_PLACEHOLDER = "/uploads/images/placeholder.png";

const ProductSection:FC<Props> = ({ product }) => {
  return (
    <section className={styles.product}>
      <Row>
        <Col className="py-5" xs={12} md={6}>
          {product.images.length > 1 ? (
            <Carousel>
              {product.images.map((image, index) => (
                <ProductImage
                  src={image.src || DEFAULT_IMAGE_PLACEHOLDER}
                  alt={image.alt}
                  key={index}
                />
              ))}
            </Carousel>
          ) : (
            <ProductImage 
              src={product.images[0].src || DEFAULT_IMAGE_PLACEHOLDER} 
              alt={product.images[0].alt || product.name} 
            />
          )}
        </Col>
        <Col className="py-5" xs={12} md={6}>
          <h3>{product.name}</h3>
          <p dangerouslySetInnerHTML={{ __html: product.short_description }} />
          <AddToCart
            useInput
            replaceAmount
            product={product}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Description</h3>
          <p dangerouslySetInnerHTML={{ __html: product.description }} />
        </Col>
      </Row>
    </section>
  );
}

export default ProductSection;
