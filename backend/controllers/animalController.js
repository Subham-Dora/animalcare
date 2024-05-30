import animalModel from "../models/animalModel.js"
import fs from 'fs'
import adoptModel from "../models/adoptModel.js"

export const createAnimalController= async(req,res)=>{
try{
    const {name,category,type,age,gender,vaccination,description,adoptrequest}=req.fields
    const {photo}=req.files
    //validation
    switch(true){
        case !name:
            return res.status(500).send({error:'Name is Required'})
        case !category:
            return res.status(500).send({error:'Category is Required'})
        case !type:
            return res.status(500).send({error:'Type is Required'})
        case !age:
            return res.status(500).send({error:'Age is Required'})
        case !gender:
            return res.status(500).send({error:'Gender is Required'})
        case !description:
            return res.status(500).send({error:'Description is Required'})
        case photo && photo.size>1000000:
            return res.status(500).send({error:'Photo is Required and should be less then 1mb'});
                
        
    }
const animals =await animalModel({...req.fields})
if(photo){
    animals.photo.data =fs.readFileSync(photo.path)
    animals.photo.contentType=photo.type
}
await animals.save()
res.status(201).send({
    success:true,
    message:'Animal added successfully',
    animals
})
}catch(error){
   console.log(error) 
   res.status(500).send({
    success:false,
    error,
    message:'Error in creating animal'
   })

}
}

//get all animal
export const getAnimalController = async(req,res) => {
    try{
        const animals=await animalModel.find({}).populate('category').select("-photo").sort({createdAt:-1})
        res.status(200).send({
           success:true,
           totalCount:animals.length,
           message:'All Animals',
           animals
        })
    }catch(error){
        res.status(500).send({
            success:false,
            message:'Error in getting product',
            error:error.message
        })
    }
}

//get single animal
export const getSingleAnimalController =async(req,res)=>{
   try{
        const animal =await animalModel.findById(req.params.id).select('-photo').populate('category')
        res.status(200).send({
            success:true,
            message:'Single animal fetched',
            animal
        })
   }catch(error){
        console.log(error)
        res.status(500).send({
           success:false,
           message:'Error while getting single animal' ,
           error
        })
   }
};

//get photo
export const animalPhotoController = async(req,res)=>{
    try{
       const animal = await animalModel.findById(req.params.aid).select('photo')
       if(animal.photo.data){
        res.set('Content-type',animal.photo.contentType)
        return res.status(200).send(
            animal.photo.data
        );
       }
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting animal photo',
            error
        })
    }
};

//delete controller
export const deleteAnimalController = async(req,res)=>{
    try{
       await animalModel.findByIdAndDelete(req.params.aid).select('-photo')
       res.status(200).send({
        success:true,
        message:'Animal deleted successfully'
       })
    }catch(error){
        console.log(error)
        res.status(500).send({
           success:false,
           message:'Error while deleting animal' 
        })
    }
}

//update controller
export const updateAnimalController =async(req,res)=>{
    try{
        const {name,category,type,age,gender,vaccination,description,adoptrequest}=req.fields
        const {photo}=req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required'})
            case !category:
                return res.status(500).send({error:'Category is Required'})
            case !type:
                return res.status(500).send({error:'Type is Required'})
            case !age:
                return res.status(500).send({error:'Age is Required'})
            case !gender:
                return res.status(500).send({error:'Gender is Required'})
            case !description:
                return res.status(500).send({error:'Description is Required'})
            case photo && photo.size>1000000:
                return res.status(500).send({error:'Photo is Required and should be less then 1mb'});
                    
            
        }
    const animals =await animalModel.findByIdAndUpdate(req.params.aid,{...req.fields},{new:true})

    if(photo){
        animals.photo.data =fs.readFileSync(photo.path)
        animals.photo.contentType=photo.type
    }
    await animals.save()
    res.status(201).send({
        success:true,
        message:'Animal updated successfully',
        animals
    })
    }catch(error){
       console.log(error) 
       res.status(500).send({
        success:false,
        error,
        message:'Error in updating animal'
       })
    
    }
}


//filters
export const animalFiltersController = async(req,res)=>{
    try{
    const {checked}=req.body
    let args={}
    if(checked.length > 0) args.category = checked;
    const animals = await animalModel.find(args);
    res.status(200).send({
       success: true,
       animals
    })
    
    }catch(error){
        console.log(error);
        res.status(400).send({
          success:false,
          message:'error while filtering animals',
          error  
        })
    }
}


//adopt 

export const adoptController= async(req,res)=>{
    try{
        const {animalid,id}=req.body
        
        const adopt =await new adoptModel({user:id,animal:animalid}).save();
        res.status(201).send({
            success:true,
            message:'adopt request send succcessfully',
            adopt
        })
      
        
    }catch(error){
       console.log(error) 
       res.status(500).send({
        success:false,
        error,
        message:'Error in sending adopt request'
       })
    
    }
    }