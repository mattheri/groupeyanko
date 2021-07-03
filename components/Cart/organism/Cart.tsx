import React, { useEffect, useState } from "react";
import usePagination from "components/Hooks/usePagination";
import CartContentEmpty from "../atom/CartContentEmpty";
import CartContent from "../molecule/CartContent";
import useCart from "components/Hooks/useCart";
import CartContainer from "../atom/CartContainer";
import Badge from "components/Badge/organism/Badge";
import CartSvg from "../atom/CartSvg";
import SidePanel from "components/SidePanel/organism/Panel";

export function Cart() {
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleSidePanel = () => setIsOpen(!isOpen);
  const closeSidePanel = () => setIsOpen(false);

  return (
    <>
    <CartContainer onClick={toggleSidePanel}>
      <CartSvg />
      <Badge>{numberOfItems}</Badge>
    </CartContainer>
    <SidePanel isOpen={isOpen} onClick={toggleSidePanel} onClose={closeSidePanel}>
      {numberOfItems > 0 ? (
        <CartContent items={paginatedItems[pagination || 0]}>
          <Pagination fullWidth max={1} />
        </CartContent>
      ) : (
        <CartContentEmpty>
          Il n'y a aucun item dans votre panier pour le moment.
        </CartContentEmpty>
      )}
    </SidePanel>
    </>
  );
}
