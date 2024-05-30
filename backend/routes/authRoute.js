import  express  from "express";
import  {registerController,loginController,testController, forgotPasswordController, getAllUserController, updateProfileController, getAdoptsController, getAllAdoptsController, adoptStatusController, deleteAdoptController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST
router.post('/register',registerController);

//LOGIN || POST
router.post('/login',loginController);

//forget password || POST
router.post('/forgot-password',forgotPasswordController);

//test routes
router.get('/test',requireSignIn,isAdmin, testController);

//protected user route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

//protected admin route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

router.get('/getall-users',requireSignIn,isAdmin,getAllUserController);


//update profile
router.put('/profile',requireSignIn,updateProfileController)

//adopts-user
router.get('/adopts',requireSignIn,getAdoptsController)

//all adopts-admin
router.get('/all-adopts',requireSignIn,isAdmin,getAllAdoptsController)

//adopt status update
router.put('/adopt-status/:adoptId',requireSignIn,isAdmin,adoptStatusController)

//delete adopts
router.delete('/delete-adopt/:id',requireSignIn,deleteAdoptController);




export default router