import { QueryDocument } from './Database';

export interface BasicUserInformation {
  firstname:string;
  lastname:string;
  company:string;
  phoneNumber:string;
  address:string;
  province:string;
  city:string;
  postalCode:string;
}

export enum DatabaseCollection {
  Users = 'users',
  Quotes = 'quotes',
}

export interface WooCommerceCustomer {
  id:number;
  first_name:string;
  last_name:string;
  billing: {
    company:string;
    address_1:string;
    address_2:string;
    city:string;
    postcode:string;
    state:string;
    phone:string;
  };
  avatar_url:string;
}

export interface UserInformation extends BasicUserInformation {
  id:string;
  wooId:number;
  email:string;
}

export interface QueryIncompleteUserInformation extends BasicUserInformation {
  wooId:number;
}

export interface ClientUser {
  id:string;
  email:string;
  name:string;
  picture:string;
  isVerified:boolean;
  additionalUserInformation:QueryDocument;
}