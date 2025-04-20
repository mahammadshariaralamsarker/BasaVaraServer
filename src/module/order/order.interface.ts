import { Types } from "mongoose";

export type TOrder = {
  request: Types.ObjectId; // link to the approved rental request
  tenant: Types.ObjectId;
  amount: number;
  status: "Pending" | "Paid";
  transaction: {
    id: string;
    method: string;
    sp_code: string;
    sp_message: string;
    date_time: string;
  };
};
