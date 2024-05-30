import fs from "fs";
import rescueModel from "../models/rescueModel.js"

//send rescue report
export const rescueController = async (req, res) => {
  try {
    const {animal,condition,address,information} = req.fields;
    const { photo } = req.files;
    
        
    const rescue = await rescueModel({ ...req.fields });
    if (photo) {
      rescue.photo.data = fs.readFileSync(photo.path);
      rescue.photo.contentType = photo.type;
    }

    await rescue.save();
    res.status(201).send({
      success: true,
      message: "Rescue request send successfully",
      rescue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in sending rescue request",
    });
  }
};


//show rescue report -user

export const getRescueController= async (req,res)=>{
    try{
        const rescue=await rescueModel.find({user:req.user._id}).populate("user","username")
      
         res.json(rescue)
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting adopts',
            error
        })
    }
}


//get photo
export const rescuePhotoController = async(req,res)=>{
    try{
       const rescue = await rescueModel.findById(req.params.rid).select('photo')
       if(rescue.photo.data){
        res.set('Content-type',rescue.photo.contentType)
        return res.status(200).send(
            rescue.photo.data
        );
       }
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting rescue photo',
            error
        })
    }
};



//all-rescue-admin
export const getAllRescusController= async (req,res)=>{
    try{
        const rescues=await rescueModel.find({}).populate("user",["username","phone"]).sort({createdAt:"-1"})
        res.json(rescues)
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting rescues',
            error
        })
    }
}


//rescue status update
export const rescueStatusController = async(req,res)=>{
    try{
      const {rescueId}=req.params
      const  {status}=req.body
      const  rescue =await rescueModel.findByIdAndUpdate(rescueId,{status},{new:true})
      res.json(rescue)
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while updating rescue status',
            error
        })
    }
}

//delete rescue
export const deleteRescueController = async(req,res)=>{
    try{
        const {id}=req.params
        await rescueModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Rescue request canceled successfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while canceling rescue request',
            error
        })
    }
}