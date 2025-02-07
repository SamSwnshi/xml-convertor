import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB   from "./db/config.js";
import router from "./routes/fetchReport.router.js"; 

dotenv.config();

const port = process.env.PORT;
connectDB();

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api", router);

app.listen(port,()=>{
    console.log(`server is running on Port: ${port}`);
})