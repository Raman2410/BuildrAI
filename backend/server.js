import express from "express";
import cors from 'cors';
import 'dotenv/config'
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();
app.use(express.json());
app.use( cors({
    origin: "http://localhost:5173", // your React app URL
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ add this
  }));

app.get('/',(req,res)=>{
    res.send('Server is live...');
})

app.use('/api/users',userRouter);
app.use('/api/resumes',resumeRouter);
app.use('/api/ai',aiRouter);

app.listen(PORT,()=>{
    console.log("Server is running at PORT 3000... ")
})