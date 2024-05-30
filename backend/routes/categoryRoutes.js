import express from 'express'
import { createCategoryController, deleteCategoryController, getCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';
import {isAdmin, requireSignIn} from './../middlewares/authMiddleware.js'

const router=express.Router()

//routes
//create category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController);

//update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);

//getAll category
router.get('/get-category',getCategoryController);

//single-category
router.get('/single-category/:name',singleCategoryController);

//delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController);

export default router