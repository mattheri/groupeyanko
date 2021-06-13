import { Cart, CartContext, CartContextState } from 'components/Context/CartContext';
import { Product } from 'next-env';
import { useContext } from 'react';

const useCart = () => {
  const { cart, setCart } = useContext(CartContext);

  const addProductToCart = (product: Product, number: number) => {
      const cartProduct:Cart = { ...product, number: number };
      if (cart.hasOwnProperty(`${product.id}`)) {
        cartProduct.number = cart[`${product.id}`].number + number;
      }

      return setCart((state) => ({ ...state, [`${product.id}`]: cartProduct }));
  }

  const changeProductQuantity = (id: string, number?: number, noSubstract?:boolean) => {
    if (!cart.hasOwnProperty(`${id}`)) return;

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

  return {
    cart,
    addProductToCart,
    changeProductQuantity,
    resetCart,
    mergeToCart,
  }
}

export default useCart;
