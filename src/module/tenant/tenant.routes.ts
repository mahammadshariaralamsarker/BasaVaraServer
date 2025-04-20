import express from "express";
import auth from "../../middlewares/auth";
import { TenantController } from "./tenant.controller";
import validateRequest from "../../middlewares/validateRequest";
import { TenantValidationSchema } from "./tenant.validation";

const router = express.Router();

router.post(
  "/requests",
  auth("tenant"),
  validateRequest(TenantValidationSchema.createTenantValidationSchema),
  TenantController.submitRequest
);
router.get("/my-requests", auth("tenant"), TenantController.getMyRequests);
router.put("/profile", auth("tenant"), TenantController.updateTenantProfile);

// router.put(
//   "/requests/:requestId",
//   auth("landlord"),
//   TenantController.respondToRentalRequest
// );

export const TenantRouter = router;
