import mongoose from "mongoose";
import { TProduct } from "./rentalHouse.interface";
import { ProductModel } from "./rentalHouse.model";
import AppError from "../../helpers/error";
import { StatusCodes } from "http-status-codes";
import { IImageFiles } from "../../middlewares/interface/IImageFile";
import { Tenant } from "../tenant/tenant.model";
import User from "../user/user.model";

// Create a new product
const createProductIntoDB = async (
  productData: Partial<TProduct>,
  productImages: IImageFiles
) => {
  const { images } = productImages;
  if (!images || images.length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Product images are required.");
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
  console.log("data.images", data.images);
  if (data.images && data.images.length > 0) {
    data.imageUrls = data.images.map((image: any) => image.path);
  }
  const result = await ProductModel.findByIdAndUpdate(id, data, { new: true });

  return result;
};

//respond to requests
const respondToRentalRequestDB = async (
  requestId: string,
  status: "Approved" | "Rejected",
  phoneNumber?: string
) => {
  const request = await Tenant.findById(requestId);

  if (!request) {
    throw new AppError(400, "Tenant Request Not found");
  }

  const product = await ProductModel.findById(request.products);
  if (!product) {
    throw new AppError(400, "Product Not found");
  }

  // console.log(request);
  // console.log("This is product", product);

  const landlord = await User.findById(product.LandlordID);
  if (!landlord) {
    throw new AppError(400, "User Not found");
  }

  console.log(landlord);

  // If status is "Approved", check if the landlord's phone number is provided
  const landlordPhone = landlord.phone || phoneNumber;
  if (status === "Approved") {
    if (!landlord?.phone) {
      if (!landlordPhone) {
        throw new AppError(404, "Phone number is required");
      }
      request.phone = landlordPhone;
    } else {
      request.phone = landlordPhone;
    }
  } else if (status === "Rejected") {
    request.phone = landlordPhone;
  }

  request.status = status; // Update the status to Approved/Rejected
  await request.save(); // Save the changes

  return request;
};

//landlord can retrieve its own listings

const getLandlordListings = async (landlordId: string) => {
  const result = await ProductModel.find({ LandlordID: landlordId });
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
  getLandlordListings,
  respondToRentalRequestDB,
  deleteProductFromDB,
};
