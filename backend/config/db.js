import mongoose from "mongoose";


export const connectDb = async ()=>{
    await mongoose.connect(process.env.MongoDB_URI).then(()=>console.log("Database connected"))
}