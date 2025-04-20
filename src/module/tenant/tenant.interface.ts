import { Types } from "mongoose";

export interface ITenant {
  products: Types.ObjectId;
  tenant: Types.ObjectId;
  status?: "pending" | "approved" | "rejected";
  message: string;
  phone?: string;
  paymentStatus?: "pending" | "paid";
}
