import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminService } from "./admin.service";

const getAllHousesByAdmin = catchAsync(async (req, res) => {
  const houses = await adminService.getAllHouses();

  if (!houses || houses.length === 0) {
    throw new Error("No houses found");
  }
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Houses retrieved successfully",
    data: houses,
  });
});


//
const userBlockByAdmin = catchAsync(async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    throw new Error("User is not authenticated or authorized");
  }

  const { userId } = req.params;

  const result = await adminService.blockUser(userId);

  if (!result) {
    throw new Error("User not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User blocked successfully",
    data: result,
  });
});

const deleteBlogByAdmin = catchAsync(async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    throw new Error("User is not authenticated or authorized");
  }

  const { id: blogId } = req.params;

  const result = await adminService.deleteBlog(blogId);

  if (!result) {
    throw new Error("Blog not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog deleted successfully",
    data: result,
  });
});

const getAllUsersByAdmin = catchAsync(async (req, res) => {
  const users = await adminService.getAllUsers();

  if (!users || users.length === 0) {
    throw new Error("No users found");
  }
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Users retrieved successfully",
    data: users,
  });
});

const updateRoleByAdmin = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const payload = req.body; 
  const result = await adminService.updateRoleByAdmin(userId, payload);

  if (!result) {
    throw new Error("User not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User role Changed successfully",
    data: result,
  });
});

export const adminController = {
  getAllHousesByAdmin,
  //
  userBlockByAdmin,
  deleteBlogByAdmin,
  getAllUsersByAdmin,
  updateRoleByAdmin,
};
