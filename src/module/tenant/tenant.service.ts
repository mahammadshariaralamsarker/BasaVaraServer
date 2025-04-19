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

export const TenantService = {
  createTenantRequestIntoDB,
  getTenantRequestsFromDB,
  updateTenantProfileDB,
};
