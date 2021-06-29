import { Cart } from "components/Context/CartContext";

export type Product = Cart;

export interface Quote {
  submittedOn:number;
  products:{
    [x:string]:Product;
  };
}

export interface Quotes {
  id:string;
  quotes:Quote[];
}