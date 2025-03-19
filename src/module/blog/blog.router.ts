import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { blogController } from "./blog.controller";
import { BlogValidation } from "./blog.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";

const blogRouter = Router();

blogRouter.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(BlogValidation.blogValidationSchema),
  blogController.createBlog
);
blogRouter.get("/:id", auth(USER_ROLE.admin), blogController.getSingleBlog);
blogRouter.patch("/:id", auth(USER_ROLE.admin), blogController.updateBlog);
blogRouter.delete("/:id", auth(USER_ROLE.admin), blogController.deleteBlog);
blogRouter.get("/", blogController.getBlogs);

export default blogRouter;
