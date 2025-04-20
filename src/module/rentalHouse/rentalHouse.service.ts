import mongoose from 'mongoose';
import { TProduct } from './rentalHouse.interface';
import { ProductModel } from './rentalHouse.model';
import AppError from '../../helpers/error';
import { StatusCodes } from 'http-status-codes';
import { IImageFiles } from '../../middlewares/interface/IImageFile';

// Create a new product
const createProductIntoDB = async (
  productData: Partial<TProduct>,
  productImages: IImageFiles
) => {
  const { images } = productImages;
  if (!images || images.length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Product images are required.');
  }

  productData.imageUrls = images.map((image) => image.path);

  const result = await ProductModel.create(productData);
  return result;
};

// Get all products
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

// Get single product following by id
const getSingleProductFromDB = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const result = await ProductModel.findById(id);
  return result;
};

// Update a product by ID
const updateProductInDB = async (id: string, data: TProduct) => {
  console.log('data.images', data.images);
  if (data.images && data.images.length > 0) {
    data.imageUrls = data.images.map((image: any) => image.path);
  }
  const result = await ProductModel.findByIdAndUpdate(id, data, { new: true });

  return result;
};

// Delete a product by ID
const deleteProductFromDB = async (id: string): Promise<TProduct | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const result = await ProductModel.findOneAndDelete({ _id: id });
  return result;
};

//all service is exported from this function
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
};

// all services
