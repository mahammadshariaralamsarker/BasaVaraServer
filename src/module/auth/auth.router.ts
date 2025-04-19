import { Router } from "express";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "../user/user.validation";
import { globalErrorHandler } from "../../middlewares/globalErrorHandler";
import auth from "../../middlewares/auth";

const authRouter = Router();

authRouter.post(
  "/register",
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.register
);

authRouter.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login
);

authRouter.post(
  "/change-password",
  auth("admin", "tenant", "landlord"),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword
);

authRouter.post("/refresh-token", AuthControllers.refreshToken);

authRouter.use(globalErrorHandler);

export default authRouter;
