import { Types } from "mongoose";

export type TTenant = {
  products: Types.ObjectId;
  tenant: Types.ObjectId;
  status?: "pending" | "approved" | "rejected";
  message: string;
  phoneNumber?: string;
  paymentStatus?: "pending" | "paid";
};
