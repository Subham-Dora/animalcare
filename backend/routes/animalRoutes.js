import express from 'express';
import { adoptController, animalFiltersController, animalPhotoController, createAnimalController, deleteAnimalController, getAnimalController, getSingleAnimalController, updateAnimalController } from '../controllers/animalController.js';
import {isAdmin,requireSignIn} from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable';

const router = express.Router()

//routes
router.post('/create-animal',requireSignIn,isAdmin,formidable(),createAnimalController)

//update routes
router.put('/update-animal/:aid',requireSignIn,isAdmin,formidable(),updateAnimalController)

//get animals
router.get('/get-animal',getAnimalController)

//single animal
router.get('/get-animal/:id',getSingleAnimalController);

//get photo
router.get('/animal-photo/:aid',animalPhotoController);

//delete animal
router.delete('/animal-delete/:aid',deleteAnimalController)

//filter animal
router.post('/animal-filters',animalFiltersController)

//adopt
router.post('/adopt',adoptController)







export default router