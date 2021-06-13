import React, { useEffect, useContext, useState } from "react";
import Popup from "reactjs-popup";
import styles from "../cart.module.scss";
import "reactjs-popup/dist/index.css";
import { usePagination } from "components/Hooks/usePagination";
import { CartContentEmpty } from "../atom/CartContentEmpty";
import { CartContent } from "../molecule/CartContent";
import { CartSvg } from "../atom/CartSvg";
import { Badge } from "components/Badge/organism/Badge";
import useCart from "components/Hooks/useCart";

/**
 * Cart component. Receives the cart object from the Cart Context.
 * Uses reactjs-popup to show the cart contents on hover (https://react-popup.elazizi.com/)
 */
export function Cart() {
  const [numberOfItems, setNumberOfItems] = useState(0);
  const { cart } = useCart();

  const mapCartToArray = () =>
    cart && Object.entries(cart).map(([id, product]) => ({ [`${id}`]: product }));

  const [itemsToPaginate, setItemsToPaginate] = useState(
    mapCartToArray()
  );

  const getNumberOfItems = () => {
    let numberOfItem = Object.keys(cart).length;
    Object.entries(cart).map(([key, value]) => {
        if (value.number > 1) {
            numberOfItem += value.number - 1
        }
    });
    return numberOfItem;
}

  useEffect(() => {
    setNumberOfItems(getNumberOfItems());
    setItemsToPaginate(mapCartToArray());
  }, [cart]);

  const { paginatedItems, pagination, Pagination } = usePagination(
    itemsToPaginate,
    3
  );

  return (
    <Popup
      className={styles.popup}
      trigger={
        <div className={styles.cart}>
          <CartSvg />
          <Badge number={numberOfItems} />
        </div>
      }
      position="bottom right"
      on={["hover", "focus"]}
      mouseLeaveDelay={500}
    >
      {numberOfItems > 0 ? (
        <CartContent items={paginatedItems[pagination || 0]}>
          <Pagination className={styles.pagination} />
        </CartContent>
      ) : (
        <CartContentEmpty>
          Il n'y a aucun item dans votre panier pour le moment.
        </CartContentEmpty>
      )}
    </Popup>
  );
}
