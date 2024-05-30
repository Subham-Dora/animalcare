import express from 'express';
import {isAdmin,requireSignIn} from '../middlewares/authMiddleware.js'
import { deleteRescueController, getAllRescusController, getRescueController, rescueController, rescuePhotoController, rescueStatusController } from '../controllers/rescueController.js';
const router= express.Router();

import formidable from 'express-formidable';


//post rescue
router.post("/send-rescue",formidable(),requireSignIn,rescueController)

//get rescue -user
router.get('/get-rescue',requireSignIn,getRescueController)

//rescue photo
//get photo
router.get('/rescue-photo/:rid',rescuePhotoController);

//all rescue-admin
router.get('/all-rescue',requireSignIn,isAdmin,getAllRescusController)

//rescue status update
router.put('/rescue-status/:rescueId',requireSignIn,isAdmin,rescueStatusController)

//delete rescue
router.delete('/delete-rescue/:id',requireSignIn,deleteRescueController);

export default router