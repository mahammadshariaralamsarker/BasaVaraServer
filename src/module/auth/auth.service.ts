import { CustomError } from "../../helpers/handleCustomError";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (payload: IUser) => {
  const result = await User.create(payload);
  if (!result) {
    throw new CustomError("Failed to create user", 500);
  }
  return result;
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select(
    "+password"
  );

  if (!user) {
    throw new CustomError("This user is not found!", 404, { field: "email" });
  }
console.log(user, "user founds");
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatched) {
    throw new CustomError("Invalid credentials", 401, { field: "password" });
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    id: user._id.toString(),
  }; 
  const token = jwt.sign(jwtPayload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }); 

  const decoded = jwt.decode(token, { complete: true }); 
  return { token, user };
};

export const AuthService = {
  register,
  login, 
};
