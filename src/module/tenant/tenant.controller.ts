import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TenantService } from "./tenant.service";

const submitRequest = catchAsync(async (req, res) => {
  const tenantId = req.user?.id; // from auth middleware
  console.log(tenantId);
  const payload = { ...req.body, tenant: tenantId };
  const result = await TenantService.createTenantRequestIntoDB(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Rental Request submitted successfully",
    data: result,
  });
});

const getMyRequests = catchAsync(async (req, res) => {
  const tenantId = req.user?.id; // from auth middleware
  const result = await TenantService.getTenantRequestsFromDB(tenantId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Retrieved your rental requests",
    data: result,
  });
});

//done
const updateTenantProfile = catchAsync(async (req, res) => {
  const tenantId = req.user?.id;
  const { role, ...rest } = req.body; // Prevent role from being updated
  console.log(tenantId, rest);

  const result = await TenantService.updateTenantProfileDB(tenantId, rest);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Tenant Profile Updated Successfully",
    data: result,
  });
});

const respondToRentalRequest = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  console.log(requestId)
  const { status, phoneNumber } = req.body;

  const result = await TenantService.respondToRentalRequestDB(
    requestId,
    status,
    phoneNumber
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rental Request responded successfully",
    data: result,
  });
});

export const TenantController = {
  submitRequest,
  getMyRequests,
  updateTenantProfile,
  respondToRentalRequest
};
