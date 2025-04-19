import { model, Schema } from "mongoose";
import { TTenant } from "./tenant.interface";

const tenantSchema = new Schema<TTenant>(
  {
    products: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    tenant: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    message: { type: String, required: true },
    phoneNumber: { type: String }, // filled by landlord if approved
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Tenant = model<TTenant>("Tenant", tenantSchema);
