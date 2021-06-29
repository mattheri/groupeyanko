export type Image = {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
  [key: string]: any;
};

export type CategoryLink = {
  href: string;
};

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: Image;
  menu_order: number;
  count: 7;
  _links: {
    self: CategoryLink[];
    collection: CategoryLink[];
    up: CategoryLink[];
  };
  [key: string]: any;
}

export interface Product {
  readonly id: number;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  sku: string;
  manage_stock?: boolean;
  stock_quantity?: number | null;
  weight?: string;
  dimensions?: {
    length?: string;
    width?: string;
    height?: string;
  };
  categories: Pick<Category, "id" | "name" | "slug">[];
  images: Image[];
  ["jetpack-related-posts"]: {
    classes: [];
    context: string;
    date: string;
    excerpt: string;
    format: boolean;
    id: number;
    img: {
      alt_text: string;
      height: number;
      width: number;
      src: string;
    };
    rel: string;
    title: string;
    url: string;
    [key: string]: any;
  }[];
  [key: string]: any;
}

export type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  reType?: string;
  company: string;
  phoneNumber: string;
  address: string;
  province: string;
  city: string;
  postalCode: string;
  message?: string;
};

export type FormikValues<T> = T;

export type PropsType = { [key:string]:any };

export interface WooHeaders {
  ["x-wp-totalpages"]:string;
}