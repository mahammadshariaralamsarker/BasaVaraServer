/* eslint-disable no-console */
import { Request, Response } from 'express';
import { CategoryServices } from './category.service';

const createCategory = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await CategoryServices.createCategoryIntoDB(payload);
    res.status(200).json({
      success: true,
      message: 'Category created successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to create Category',
    });
  }
};

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryServices.getAlCategoryDB();

    res.status(200).json({
      success: true,
      message: 'Category retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Category',
    });
  }
};

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const  categoryId  = req.params.categoryId;
    const data = req.body;


    const result = await CategoryServices.updateCategoryDB(categoryId, data);

    if (!result) {
       res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to update Category',
    });
  }
};

const deleteCategory = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { categoryId } = req.params;

    const result = await CategoryServices.deleteCategoryDB(categoryId);

    if (!result) {
        res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete Category',
    });
  }
};

export const CategoryControllers = {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
};
