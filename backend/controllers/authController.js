import userModel from "../models/userModel.js";
import  {comparePassord, hassPassword}  from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import adoptModel from "../models/adoptModel.js";



export const registerController = async(req,res) => {
    try{
        const {username,email,phone,password,answer}=req.body
        //validation
        if(!username){
            return res.send({message:'Name is Required'})
        }
        if(!email){
            return res.send({message:'Email is Required'})
        }
        if(!phone){
            return res.send({message:'Phone is Required'})
        }
        if(!password){
            return res.send({message:'Password is Required'})
        }
        if(!answer){
            return res.send({message:'Answer is Required'})
        }

        //existing user 
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
           success:false,
           message:'Already Register please login'
        })
    }
        const hashedPassword=await hassPassword(password)
        //save
        const user =await new userModel({username,email,phone,password:hashedPassword,answer}).save()

        res.status(201).send({
            success:true,
            message:'user register succcessfully',
            user
        })
    }catch(error){
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
};

//POST LOGIN

export const loginController= async(req,res)=>{
    try{
        const {email,password}=req.body
        //validate
        if(!email || !password){
          return res.status(404).send({
            success:false,
            message:'invalid email or password'
          })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                success:false,
                message:'Email is not registered'

            })
        }
        const match= await comparePassord(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            })
        }
        //token
        const token =await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:'Login successfully',
            user:{
               _id:user._id,
               username:user.username,
               email:user.email,
               phone:user.phone,
               role:user.role
            },
            token
        })

    } catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
};

//forgetPasswordController
export const forgotPasswordController= async(req,res)=>{
    try{
        const {email,answer, newPassword}=req.body
        if(!email){
            res.status(400).send({message:'Email is required'})
        }
        if(!answer){
            res.status(400).send({message:'answer is required'})
        }
        if(!newPassword){
            res.status(400).send({message:'new password is required'})
        }
        //check
        const user =await userModel.findOne({email,answer})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Wrong Email or Answer'
            })
        }
        const hashedPassword= await hassPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashedPassword});
        res.status(200).send({
            success:true,
            message:'Password reset succcessfully',
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'someting went wrong',
            error
        })
    }
};

//test controller
export const testController=(req,res)=>{
    res.send('protected route');
}

//get all users controller
export const getAllUserController=async(req,res)=>{
    try{
        const users=await userModel.find({role:0})
        res.status(200).send({
            success:true,
            message:"all users list",
            users
        })
    }catch(error){
    res.status(500).send({
        success:false,
        error,
        message:'error while getting all users'

    })
    }
}



//update profile
export const updateProfileController=async(req,res)=>{
    try{
        const {username,phone,email,password}=req.body
        const user =await userModel.findById(req.user._id)

        //password
        if(password){
            return res.json({error:'Password is required '})
        }

        const hashedPassword= password ? await hassPassword(password): undefined


    const updateUser= await userModel.findByIdAndUpdate(req.user._id,{
        username : username || user.username,
        phone : phone || user.phone,
        email : email || user.email,
        password : hashedPassword || user.password,


    },{new:true})

    res.status(200).send({
        success:true,
        message:'Profile Updated Succcessfully',
        updateUser
    })
    }catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Error while Updating Profile'.
            error
        })

    }
}


//adopts
export const getAdoptsController= async (req,res)=>{
    try{
        const adopts=await adoptModel.find({user:req.user._id}).populate("animal","-photo").populate("user","username").populate({ path: 'animal', populate: { path: 'category'}})
        res.json(adopts)
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting adopts',
            error
        })
    }
}



//all-adopts
export const getAllAdoptsController= async (req,res)=>{
    try{
        const adopts=await adoptModel.find({}).populate("animal","-photo").populate("user",["username","phone"]).populate({ path: 'animal', populate: { path: 'category'}}).sort({createdAt:"-1"})
        res.json(adopts)
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting adopts',
            error
        })
    }
}


//adopt status update
export const adoptStatusController = async(req,res)=>{
    try{
      const {adoptId}=req.params
      const  {status}=req.body
      const  adopts =await adoptModel.findByIdAndUpdate(adoptId,{status},{new:true})
      res.json(adopts)
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while updating adopts',
            error
        })
    }
}

//delete category
export const deleteAdoptController = async(req,res)=>{
    try{
        const {id}=req.params
        await adoptModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Adopt request deleted successfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while deleting adopt',
            error
        })
    }
}