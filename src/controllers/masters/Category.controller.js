
import CategoryModel from '../../models/master/category.model.js';


const createCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    if(!category){
      res.status(400).send("Category is required");
  }
    const newCategory = new CategoryModel({ category });

    await newCategory.save();
    res.status(201).json({
      message: 'Category created successfully',
      category: newCategory,
    });
  } catch (error) {
    next(error);
  }
};
const getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find({ deleted: false });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    console.log(id, category);
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { category },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message: 'Category updated successfully',
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    // const deletedCategory = await CategoryModel.findByIdAndUpdate(id, {
    //   deleted: true,
    // });

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};



