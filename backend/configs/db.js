import mongoose from "mongoose";

const connectDB = async () => {
    try {
         mongoose.connection.on("connected",()=>{console.log("Database connected successfully...")});

         let mongodbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";

         const projectName = "BuildrAI";
         if(!mongodbURI){
            throw new error("MONGODB_URI is not defined")
         }
         if(mongodbURI.endsWith('/')){
            mongodbURI = mongodbURI.slice(0, -1);
         }
         await mongoose.connect(`${mongodbURI}/${projectName}`);
    } catch (error) {
         console.error("Error connecting to mongoDB: " + error);
    }
}

export default connectDB;