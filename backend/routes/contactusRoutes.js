import express from 'express';
const router= express.Router();
import formidable from 'express-formidable';
import { contactusController, deleteContactUsController, getContactUsController } from '../controllers/contactusController.js';

//post contact us
router.post("/send-contactus",formidable(),contactusController);

//get contact us
router.get('/get-contactus',getContactUsController);

//delete contact us
router.delete('/delete-contactus/:id',deleteContactUsController);

export default router