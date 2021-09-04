import { Cart, CartContext, CartContextState } from 'components/Context/CartContext';
import { Product } from 'types';
import { useContext, useState } from 'react';
import ApiService from 'services/ApiService';
import { ApiResponse } from 'services/domain/Api';

const useCart = () => {
  const { cart, setCart } = useContext(CartContext);

  const addProductToCart = (product: Product, number: number) => {
      const cartProduct:Cart = { ...product, number: number };
      if (product.id in cart) {
        cartProduct.number = cart[`${product.id}`].number + number;
      }

      return setCart((state) => ({ ...state, [`${product.id}`]: cartProduct }));
  }

  const changeProductQuantity = async (id: string, number?: number, noSubstract?:boolean) => {
    if (!cart.hasOwnProperty(`${id}`)) {
      const response:ApiResponse<Product> = await ApiService.get({
        url: `/api/product/${id}`,
      });
      const product = response.data;

      if (response.status === 200) {
        addProductToCart(product, number);
      }
    }

    if (!number || number < 0) {
      return setCart(cart => {
        delete cart[id];
        return { ...cart };
      });
    }

    if (noSubstract) {
      return setCart((state => ({ 
        ...state, [`${id}`]: { ...state[id], number: number }
      })));
    }

    if (number) {
      return setCart((state => ({ 
          ...state, [`${id}`]: { ...state[id], number: number - number } 
      })));
    }
  }

  const resetCart = () => setCart(() => ({}));

  const mergeToCart = (products:CartContextState) => setCart((state) => ({ ...state, ...products }));

  const productInCart = (id: string) => cart.hasOwnProperty(`${id}`);

  return {
    cart,
    addProductToCart,
    changeProductQuantity,
    resetCart,
    mergeToCart,
    productInCart,
  }
}

export default useCart;
