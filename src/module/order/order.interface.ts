import { Types } from 'mongoose';

export type Order = {
    email: string; 
    products: {
      product: Types.ObjectId;
      quantity: number;
      price: number;
    }[];
    totalItems: number; 
    totalPrice: number; 
    trxID: string; 
  };
  