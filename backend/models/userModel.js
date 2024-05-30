import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
            type:String,
            required:true,
            trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0
    }
    
})

export default  mongoose.model('users',userSchema)