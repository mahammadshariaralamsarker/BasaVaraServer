import { model, Schema } from "mongoose";
import { ITenant } from "./tenant.interface";

const tenantSchema = new Schema<ITenant>(
  {
    products: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    tenant: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    message: { type: String, required: true },
    phone: { type: String },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Tenant = model<ITenant>("Tenant", tenantSchema);
