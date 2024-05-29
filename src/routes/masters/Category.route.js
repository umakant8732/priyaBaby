import express from 'express';
import { createCategory ,getCategories,getCategory,updateCategory,deleteCategory} from "../../controllers/masters/Category.controller.js";

const CategoryRouter = express.Router();

CategoryRouter.post('/', createCategory);
CategoryRouter.get('/', getCategories);
CategoryRouter.get('/:id', getCategory);
CategoryRouter.put('/:id', updateCategory);
CategoryRouter.put('/delete/:id', deleteCategory);

export default CategoryRouter;