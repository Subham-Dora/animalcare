import mongoose from 'mongoose'


const adoptSchema=new mongoose.Schema({
   
    animal:{
        type:mongoose.ObjectId,
        ref:'Animals'
    },
    user:{
        type:mongoose.ObjectId,
        ref:'users'
    },
    status:{
        type:String,
        default:'Requested',
        enum:['Request Accepted','Request Rejected','Requested']
    }    
},
{timestamps:true})

export default mongoose.model('Adopt',adoptSchema);