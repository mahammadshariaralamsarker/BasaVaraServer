import { TTenant } from "./tenant.interface";
import { Tenant } from "./tenant.model";

//New rental request for a house
const createTenantRequestIntoDB = async (data: TTenant) => {
  return await Tenant.create(data);
};

const getTenantRequestsFromDB = async (tenantId: string) => {
  return await Tenant.find({ tenant: tenantId }).populate("products");
};

export const TenantService = {
  createTenantRequestIntoDB,
  getTenantRequestsFromDB,
};
