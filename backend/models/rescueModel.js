import mongoose from 'mongoose'


const rescueSchema=new mongoose.Schema({
   
  user:{
    type:mongoose.ObjectId,
    ref:'users'
},
   
    animal:{
        type:String,
        required:true 
     },

     photo:{
      data:Buffer,
      contentType:String
   },
     condition:{
      type:String,
   },
     address: {
        type: {},
        required: true,
      },
      information: {
        type: {},
      },
    status:{
        type:String,
        default:'Reported',
        enum:['Coming ','Not Rescued', 'Rescued Successfully','Reported']
    }    
},
{timestamps:true})

export default mongoose.model('Rescue',rescueSchema);