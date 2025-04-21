import express from 'express';
import auth from '../../middlewares/auth';
import { TenantController } from './tenant.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TenantValidationSchema } from './tenant.validation';

const router = express.Router();

router.post(
  '/requests',
  validateRequest(TenantValidationSchema.createTenantValidationSchema),
  TenantController.submitRequest
); //, auth("tenant")
router.get('/my-requests', TenantController.getMyRequests); //, auth("tenant")
router.put('/profile', TenantController.updateTenantProfile); //, auth("tenant")

export const TenantRouter = router;
