import QueryBuilder from "../../builder/querybuilder"
import { IBlog } from "./blog.interface"
import Blog from "./blog.model"

const createBlog = async (payload: IBlog): Promise<IBlog> => {
//   payload.role = 'admin';
  const result = (await Blog.create(payload)).populate("author", "name email role")
  return result
}

// search, filtering and pagination functions for blog posts
const getBlogs = async (query: Record<string, unknown> ) => {
    const searchableFields = ["title", "content"];

    const blogs = new QueryBuilder(Blog.find(), query).search(searchableFields).filter().sort().select()
    const result = await blogs.modelQuery.populate("author", "name email role");
    return result;
}

const getSingleBlog = async (id: string) => {
  const result = await Blog.findById(id).populate("author", "name email role")
  return result
}

const updateBlog = async (id: string, data: IBlog) => {

  const result = await Blog.findOneAndUpdate({_id: id}, data, {
    new: true,
  })
  return result

}

const deleteBlog = async (blogId: string, userId: string) => {
  //  console.log(blogId, userId)

   const result = await Blog.findByIdAndDelete({_id: blogId, another:userId})
   if(result) {
    throw new Error ('Could not delete')
   }
  return result
}

export const blogService = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
}
