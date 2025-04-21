import AppError from "../../helpers/error";
import { ProductModel } from "../rentalHouse/rentalHouse.model";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { ITenant } from "./tenant.interface";

import { Tenant } from "./tenant.model";

//New rental request for a house
const createTenantRequestIntoDB = async (data: ITenant) => {
  const result = await Tenant.create(data);
  return result;
};

const getTenantRequestsFromDB = async (tenantId: string) => {
  const result = await Tenant.find({ tenant: tenantId }).populate("products");
  return result;
};

const updateTenantProfileDB = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

//   status: "approved" | "rejected",
//   phoneNumber?: string
// ) => {
//   const request = await Tenant.findById(requestId);

//   if (!request) {
//     throw new AppError(400, "Tenant Request Not found");
//   }

//   const product = await ProductModel.findById(request.products);
//   if (!product) {
//     throw new AppError(400, "Product Not found");
//   }

//   // console.log(request);
//   // console.log("This is product", product);

//   const landlord = await User.findById(product.LandlordID);
//   if (!landlord) {
//     throw new AppError(400, "User Not found");
//   }

//   console.log(landlord);

//   // If status is "Approved", check if the landlord's phone number is provided
//   if (status === "approved") {
//     const landlordPhone = landlord.phone || phoneNumber;
//     if (!landlord?.phone) {
//       if (!landlordPhone) {
//         throw new AppError(404, "Phone number is required");
//       }
//       request.phone = landlordPhone;
//     } else {
//       request.phone = landlordPhone;
//     }

//     request.status = status; // Update the status to Approved/Rejected
//     await request.save(); // Save the changes

//     return request;
//   }
// };

export const TenantService = {
  createTenantRequestIntoDB,
  getTenantRequestsFromDB,
  updateTenantProfileDB,
};
