import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan  from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import rescueRoutes from './routes/rescueRoutes.js';
import contactusRoutes from './routes/contactusRoutes.js';


import cors from 'cors';

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/animal',animalRoutes);
app.use('/api/v1/rescue',rescueRoutes);
app.use('/api/v1/contactus',contactusRoutes);




//rest api
app.get("/",(req,res)=>{
    res.send("<h1>welcome to animal care website</h1>");

});

//PORT
const PORT=process.env.PORT || 8080;

//run listen

app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE}  mode on ${PORT}`.bgGreen.white);
});


