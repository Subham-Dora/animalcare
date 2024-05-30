import mongoose from 'mongoose'

const animalSchema =new mongoose.Schema({
    name:{
       type:String,
       required:true 
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true
    },
    type:{
        type:String,
        required:true 
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    vaccination:{
        type:Boolean,
    },
    description:{
        type:String,
        required:true
    },
    photo:{
       data:Buffer,
       contentType:String
    }


},{timestamps:true})

export default mongoose.model('Animals',animalSchema)