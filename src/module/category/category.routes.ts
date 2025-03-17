import express from 'express';
import { CategoryControllers } from './category.controller';

const router = express.Router();

// Create a new Category ----------done
router.post('/', CategoryControllers.createCategory);

// Get all Category -------- done
router.get('/', CategoryControllers.getAllCategory);

// Update a Category by ID ----------- done
router.put('/:categoryId', CategoryControllers.updateCategory);

// Delete a Category by ID ---------- done
router.delete('/:categoryId', CategoryControllers.deleteCategory);



export const CategoryRoutes = router;
