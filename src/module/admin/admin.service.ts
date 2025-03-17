import Blog from "../blog/blog.model";
import { ProductModel } from "../product/product.model";
import User from "../user/user.model";

const getAllHouses = async () => {
  const result = await ProductModel.find();
  return result;
};




const blockUser = async (userId: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true }
  );
  return result;
};
const deleteBlog = async (blogId: string) => {
  const result = await Blog.findByIdAndDelete(blogId);
  return result;
};
const getAllUsers = async () => {
  const result = await User.find();
  return result;
};
const updateRoleByAdmin = async (userId: string, payload: { role: string }) => {
  const role = { payload };
  const result = await User.findByIdAndUpdate(
    userId,
    { role: payload.role },
    { new: true }
  );
  return result;
};

export const adminService = {
  getAllHouses,
  
  //
  blockUser,
  deleteBlog,
  getAllUsers,
  updateRoleByAdmin,
};
