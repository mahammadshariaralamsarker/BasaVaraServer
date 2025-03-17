import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";
import { adminController } from "./admin.controller";

const adminRouter = Router();

adminRouter.get(
  "/listings",
  auth(USER_ROLE.admin),
  adminController.getAllHousesByAdmin
);

adminRouter.get(
  "/users",
  auth(USER_ROLE.admin),
  adminController.getAllUsersByAdmin
);

adminRouter.patch(
  "/users/:userId/block",
  auth(USER_ROLE.admin),
  adminController.userBlockByAdmin
);
adminRouter.patch(
  "/users/:userId",
  auth(USER_ROLE.admin),
  adminController.updateRoleByAdmin
);

adminRouter.delete(
  "/blogs/:id",
  auth(USER_ROLE.admin),
  adminController.deleteBlogByAdmin
);

export default adminRouter;
 
//* DELETE** /admin/user/:id:` Delete user.
// PUT** /admin/listings/:id:` Update or moderate a rental listing.
// DELETE** /admin/listings/:id:` Remove a rental listing if necessary.
