import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

// Create a new Order ----------done
router.post('/confirm-order', OrderControllers.createOrder);
// checkout 
router.post('/checkout', OrderControllers.CheckoutOrder);
// Get all order -------- done
router.get('/', OrderControllers.getAllOrder);

router.get('/revenue', OrderControllers.getTotalOrderRevenue)

// Get a single order by ID----done
router.get('/:orderId', OrderControllers.getSingleOrder);

// Update a order by ID ----------- done
router.put('/:orderId', OrderControllers.updateOrder);

// Delete a order by ID ---------- done
router.delete('/:orderId', OrderControllers.deleteOrder);



export const OrderRoutes = router;
