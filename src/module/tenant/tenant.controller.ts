import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TenantService } from "./tenant.service";

const submitRequest = catchAsync(async (req, res) => {
  const tenantId = req.user?._id; // from auth middleware
  console.log(tenantId);
  const payload = { ...req.body, tenant: tenantId };
  const result = await TenantService.createTenantRequestIntoDB(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Request sent successfully to landlord",
    data: result,
  });
});

export const TenantController = {
  submitRequest,
};
