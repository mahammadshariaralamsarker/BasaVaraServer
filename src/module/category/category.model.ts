import { Schema, model } from 'mongoose';
import { Category } from './category.interface';

const categorySchema = new Schema<Category>({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    slug: {
        type: String,
        unique: true,
        required: [true, 'slug is required'],
        match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be in lowercase, and only contain letters, numbers, and hyphens'],
    },
});

export const CategoryModel = model<Category>('Category', categorySchema);