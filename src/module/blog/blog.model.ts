import mongoose, { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
    },
    content: {
        type: String,
        required: true,
        minlength: 10,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    }
}, 
{
    timestamps: true, 
  });

const Blog = model<IBlog>("Blog", blogSchema);

export default Blog;
