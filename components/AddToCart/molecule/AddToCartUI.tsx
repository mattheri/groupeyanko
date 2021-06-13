import { ChangeEvent } from "react";
import { Product } from "next-env";
import { Button } from "components/Button/atom/Button";
import styles from "./addtocart.module.scss";
import cn from "classnames";
import Form from "react-bootstrap/Form";

type AddToCartProps = {
  onAdd: () => void;
  onRemove: () => void;
  onManageInput: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCartChange: (product: any, number: number) => void;
  useInput: boolean;
  cartNumber: number;
  useLayout: boolean;
  className: string;
  product: Product;
  replaceAmount: boolean;
};

const DEFAULT_PLACEHOLDER_IMAGE = "/uploads/images/placeholder.png";

export function AddToCartUI({
  onAdd,
  onManageInput,
  onRemove,
  onChange,
  onCartChange,
  useInput,
  cartNumber,
  useLayout,
  className,
  product,
  replaceAmount,
}: AddToCartProps) {
  const productImage = product.images.length ? product.images[0].src : DEFAULT_PLACEHOLDER_IMAGE;
  const PRODUCT = {
    ...product,
    productImage
  };

  return (
    <div
      className={cn({
        [styles.addTo]: styles.addTo,
        [className]: className,
      })}
    >
      <Button
        layout={useLayout}
        disabled={cartNumber <= 1}
        className={styles.controls}
        onClick={onRemove}
        text="-"
      />
      {useInput ? (
        <Form.Control
          onChange={onChange}
          className={styles.input}
          type="text"
          value={cartNumber}
        />
      ) : (
        <p>{cartNumber}</p>
      )}
      <Button
        layout={useLayout}
        className={styles.controls}
        onClick={onAdd}
        text="+"
      />
      <Button
        layout={useLayout}
        className={styles.addItemBtn}
        onClick={() =>
          useInput
            ? onManageInput()
            : onCartChange(PRODUCT, cartNumber)
        }
        text={
          useInput
            ? "Mettre à jour"
            : "Ajouter au panier"
        }
      />
    </div>
  );
}
