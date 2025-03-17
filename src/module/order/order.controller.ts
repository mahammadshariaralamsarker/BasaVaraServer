/* eslint-disable no-console */
import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await OrderServices.createOrderIntoDB(payload);
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to create Order',
    });
  }
};

const CheckoutOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await OrderServices.CheckoutOrderIntoDB(payload);
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to create Order',
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAlOrdersFromDB();

    res.status(200).json({
      success: true,
      message: 'Order retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Order',
    });
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const result = await OrderServices.getSingleOrderFromDB(orderId);
    res.status(200).json({
      success: true,
      message: 'Order retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve order',
    });
  }
};

const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const  orderId  = req.params.orderId;
    const data = req.body;


    const result = await OrderServices.updateOrderFromDB(orderId, data);

    if (!result) {
       res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to update Order',
    });
  }
};

const deleteOrder = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { orderId } = req.params;

    const result = await OrderServices.deleteOrderFromDB(orderId);

    if (!result) {
        res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete Order',
    });
  }
};


const getTotalOrderRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getTotalPriceFromDB();
    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: { totalRevenue: result },
    });
  } catch (err) {
    console.error('Error calculating total revenue:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to calculate revenue. Please try again later.',
    });
  }
};


export const OrderControllers = {
    createOrder,
    getAllOrder,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    CheckoutOrder,
    getTotalOrderRevenue
};
