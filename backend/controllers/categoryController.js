import categoryModel from "../models/categoryModel.js"

//create
export const createCategoryController = async(req,res) => {
try{
    const {name} =req.body
    if(!name){
        return res.status(401).send({message:'name is required'})
    }
    const existingCategory =await categoryModel.findOne({name})
    if(existingCategory){
       return  res.status(200).send({
        success:true,
        message:'Category Already Exists'
       })
    }
    const category =await new categoryModel({name}).save();
    res.status(201).send({
        success:true,
        message:'new category created',
        category
    })
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'error in category'
    })
}
};

//update category
export const updateCategoryController=async (req,res)=>{
    try{
        const {name}=req.body
        const {id} =req.params
        const category=await categoryModel.findByIdAndUpdate(id,{name},{new:true})
        res.status(200).send({
           success:true,
           message:'category updated successfully',
           category
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            errror,
            message:'error while updating category'
        })
    }

};

//get all category
export const getCategoryController=async(req,res)=>{
    try{
        const category=await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"all category list",
            category
        })
    }catch(error){
    res.status(500).send({
        success:false,
        error,
        message:'error while getting all categories'

    })
    }
}


//single category
export const singleCategoryController=async(req,res)=>{
    try{
        const category=await categoryModel.findOne({name:req.params.name})
        res.status(200).send({
            success:true,
            message:'Get single category successfully',
            category
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error while getting single category'
        })
    }
}

//delete category
export const deleteCategoryController = async(req,res)=>{
    try{
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Category deleted successfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while deleting category',
            error
        })
    }
}