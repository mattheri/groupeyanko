import React, { useEffect, useState } from "react";
import { usePagination } from "components/Hooks/usePagination";
import CartContentEmpty from "../atom/CartContentEmpty";
import CartContent from "../molecule/CartContent";
import useCart from "components/Hooks/useCart";
import CartPopupTrigger from "../molecule/CartPopupTrigger";

export function Cart() {
  const [numberOfItems, setNumberOfItems] = useState(0);
  const { cart } = useCart();

  const mapCartToArray = () =>
    cart && Object.entries(cart).map(([id, product]) => ({ [`${id}`]: product }));

  const [itemsToPaginate, setItemsToPaginate] = useState(
    mapCartToArray()
  );

  const getNumberOfItems = () => {
    let numberOfItem = cart ? Object.keys(cart).length : 0;
    cart && Object.entries(cart).map(([key, value]) => {
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
    <CartPopupTrigger numberOfItems={numberOfItems}>
      {numberOfItems > 0 ? (
        <CartContent items={paginatedItems[pagination || 0]}>
          <Pagination />
        </CartContent>
      ) : (
        <CartContentEmpty>
          Il n'y a aucun item dans votre panier pour le moment.
        </CartContentEmpty>
      )}
    </CartPopupTrigger>
  );
}
