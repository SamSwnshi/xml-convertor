import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB   from "./db/config.js";

dotenv.config();

const port = process.env.PORT;
connectDB();

const app = express();

app.use(cors())
app.listen(port,()=>{
    console.log(`server is running on Port: ${port}`);
})