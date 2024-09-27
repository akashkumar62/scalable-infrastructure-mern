import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from 'cors';

const app=express();
app.use(cors())
app.use(express.json())
app.use("/api/user",router)
app.use("/api/blog",blogRouter)
mongoose.connect('mongodb+srv://xiome555:BhEYPKC3xnu76MD1@cluster0.qj14auh.mongodb.net/Blogg?retryWrites=true&w=majority')
.then(() => app.listen(5000))
.then(()=>console.log("Database connected and app is listening to 5000"))
.catch((err)=>console.log(err))














//BhEYPKC3xnu76MD1
//xiome555