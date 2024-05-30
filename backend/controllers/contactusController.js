import fs from "fs";
import contactusModel from "../models/contactusModel.js"

//send contact us
export const contactusController = async (req, res) => {
  try {
    const {name,email,subject,message} = req.fields;        
    const contactus = await contactusModel({ ...req.fields });
   

    await contactus.save();
    res.status(201).send({
      success: true,
      message: "contact us submitted successfully successfully",
      contactus,
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

//get-contactus
export const getContactUsController= async (req,res)=>{
    
        try{
            const contactus=await contactusModel.find().sort({createdAt:"-1"})
            res.status(200).send({
                success:true,
                message:"all contact us list",
                contactus
            })
        }catch(error){
        res.status(500).send({
            success:false,
            error,
            message:'error while getting inquiries'
    
        })
        }
}


//delete inquiry
export const deleteContactUsController = async(req,res)=>{
    try{
        const {id}=req.params
        await contactusModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Inquiry deleted successfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while deleting inquiry',
            error
        })
    }
}