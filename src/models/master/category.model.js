import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {

   category: {
      type: String,
      required: true,
    },   
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model('Category', categorySchema);
export default CategoryModel;
