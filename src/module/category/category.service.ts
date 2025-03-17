import { Category } from "./category.interface";
import { CategoryModel } from "./category.model";


// Create a new Category
const createCategoryIntoDB = async (payload: Category) => {
    console.log(payload)
    const result = await CategoryModel.create(payload);
    return result;
};

// Get all Category 
const getAlCategoryDB = async () => {
    const result = await CategoryModel.find();
    return result;
};

// Update a Category by ID
const updateCategoryDB = async (id: string, data: Category) => {
    const result = await CategoryModel.findByIdAndUpdate(id, data, { new: true })
    return result;
};

// Delete a Category by ID
const deleteCategoryDB = async (id: string): Promise<Category | null> => {
    const result = await CategoryModel.findOneAndDelete({ _id: id });
    return result;
};



//all service is exported from this function
export const CategoryServices = {
    createCategoryIntoDB,
    getAlCategoryDB,
    updateCategoryDB,
    deleteCategoryDB
};
