import express from 'express';
import { ProductControllers } from './rentalHouse.controller';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';

const router = express.Router();

// Create a new product ----------done
router.post('/listings',multerUpload.fields([{ name: 'images' }]),
parseBody, ProductControllers.createProduct);

// Get all products -------- done
router.get('/landlords/listings', ProductControllers.getAllProducts);

// Get a single product by ID----done
router.get('/landlords/listings/:productId', ProductControllers.getSingleProduct);

// Update a product by ID ----------- 
router.put('/landlords/listings/:productId',multerUpload.fields([{ name: 'images' }]),
parseBody, ProductControllers.updateProduct);

// Delete a product by ID ---------- done
router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
