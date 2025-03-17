import mongoose from "mongoose";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";
import { ProductModel } from "../product/product.model";
const stripe = require('stripe')('sk_test_51L1wwjDAYSz72lr1qJ4h8sa7mvvNNFTPGjgMeqoQtnWKYXGT7zONgAmDJAIrYSUtaDu9xroi1FCToiW90FtP4gah00eYkVqyIB');


export const createOrderIntoDB = async (payload: Order) => {
  const session = await mongoose.startSession(); // Start transaction
  session.startTransaction();

  try {
    console.log(payload)
    // Check stock for each product
    for (const item of payload.products) {
      const product = await ProductModel.findById(item.product).session(session);

      if (!product) {
        throw new Error(`Product with ID ${item.product} not found`);
      }

      if (product.quantity < item.quantity) {
        throw new Error(`Not enough stock for product ${product.title}`);
      }

      // Deduct quantity from product stock
      product.quantity -= item.quantity;
      await product.save({ session });
    }

    // Create order after stock is updated
    const result = await OrderModel.create([payload], { session });

    await session.commitTransaction(); // Commit transaction
    session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction(); // Rollback on failure
    session.endSession();
    throw error;
  }
};















// cehckout 
const CheckoutOrderIntoDB = async (payload: Order) => {
  const result = new OrderModel(payload);
  const stripeBuyPrices = Number(result?.totalPrice);
  const amount = Number((stripeBuyPrices  * 100))
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    payment_method_types: ["card"],
    currency: "usd",
  });


  return {paymentIntent,result};
};

// Get all Orders 
const getAlOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

// Get single Order following by id
const getSingleOrderFromDB = async (id: string) => {
  const result = await OrderModel.findById({ _id: id });
  return result;
};


// Update a Order by ID
const updateOrderFromDB = async (id: string, data: Order) => {
  const result = await OrderModel.findByIdAndUpdate(id, data, { new: true })
  return result;
};

// Delete a ORDER by ID
const deleteOrderFromDB = async (id: string): Promise<Order | null> => {
  const result = await OrderModel.findOneAndDelete({ _id: id });
  return result;
};


const getTotalPriceFromDB = async () => {
  const result = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  return result.length > 0 ? result[0].totalRevenue : 0;
};


//all service is exported from this function
export const OrderServices = {
  createOrderIntoDB,
  getAlOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderFromDB,
  deleteOrderFromDB,
  getTotalPriceFromDB,
  CheckoutOrderIntoDB
};
