import { Types } from "mongoose";

export type TProduct = {
  location: string;
  description: string;
  rent: string;
  bedrooms: string;
  imageUrls: string[];
  images?:string[];
  LandlordID: Types.ObjectId;
};
