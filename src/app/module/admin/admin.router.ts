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
  "/user/:id",
  auth(USER_ROLE.admin),
  adminController.userDeleteByAdmin
);

 
export default adminRouter;
  
// PUT** /admin/listings/:id:` Update or moderate a rental listing.
// DELETE** /admin/listings/:id:` Remove a rental listing if necessary.
